import { DatePicker, Button, Space, Table, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import PrikazBodyService from "../../../api/services/prikaz-body-service";
import PrikazHeadersService from "../../../api/services/prikaz-header-service";
import OrganizationService from "../../../api/services/organization-service";
import IndividualService from "../../../api/services/individuals-service";
import DepartmentService from "../../../api/services/department-service";
import { PrikazBodiesDialog } from "../../../components/dialogs/prikaz-body-dialog/PrikazBodiesDialog";
import { useReactToPrint } from "react-to-print";
import dayjs from "dayjs";

const { Option } = Select;

export const PrikazView = ({ onOk, onClick, ...props }) => {
  const columns = [
    {
      title: "Код",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Физ. лицо",
      key: "lastName",
      render: (text, record) => {
        const individual = individuals.find(
          (it) => it.id === record.IndividualId,
        );
        return individual
          ? `${individual.lastName} ${individual.firstName}`
          : "Не указано";
      },
    },
    {
      title: "Табельный номер",
      dataIndex: "tabNumber",
    },
    {
      title: "Старое структурное подразделение",
      key: "oldDepartment",
      render: (text, record) =>
        departments.find((it) => it.id === record.departmentOldId)?.name,
    },
    {
      title: "Новое структурное подразделение",
      key: "newDepartment",
      render: (text, record) =>
        departments.find((it) => it.id === record.departmentNewId)?.name,
    },
    {
      title: "Старая должность",
      dataIndex: "postOld",
    },
    {
      title: "Новая должность",
      dataIndex: "postNew",
    },
    {
      title: "Зарплата",
      dataIndex: "salary",
    },
    {
      title: "Дата перевода (с)",
      dataIndex: "transferFrom",
      render: (text) =>
        text ? dayjs(text).format("DD.MM.YYYY") : "Не указано",
    },
    {
      title: "Дата перевода (по)",
      dataIndex: "transferTo",
      render: (text) =>
        text ? dayjs(text).format("DD.MM.YYYY") : "Не указано",
    },
    {
      title: "Номер ТД (основания)",
      dataIndex: "numberOfContract",
    },
    {
      title: "Действия",
      key: "actions",
      render: (text, record) => {
        return (
          <Space size="middle">
            <div
              onClick={() => updateRecordHandler(record)}
              style={{ cursor: "pointer" }}
            >
              <EditOutlined />
            </div>
            <div
              onClick={() => deleteRecordHandler(record.id)}
              style={{ cursor: "pointer" }}
            >
              <DeleteOutlined />
            </div>
          </Space>
        );
      },
    },
  ];

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const navigate = useNavigate();
  const { id } = useParams();

  console.log("PrikazView ID:", id, "Type:", typeof id);
  const [prikazHeader, setPrikazHeader] = useState(null);
  const [list, setList] = useState([]);
  const [individuals, setIndividuals] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Frontend: Loading prikaz view data for ID:", id);

        const [
          headerData,
          bodyData,
          individualsData,
          organizationsData,
          departmentsData,
        ] = await Promise.all([
          PrikazHeadersService.getOneRecord(id),
          PrikazBodyService.getAllHeadersRecords(id),
          IndividualService.getAllRecords(),
          OrganizationService.getAllRecords(),
          DepartmentService.getAllRecords(),
        ]);

        console.log("Frontend: Header data:", headerData);
        console.log("Frontend: Body data:", bodyData);

        setPrikazHeader(headerData);
        setList(bodyData || []);
        setIndividuals(individualsData);
        setOrganizations(organizationsData);
        setDepartments(departmentsData);
      } catch (error) {
        console.error("Frontend: Error loading prikaz data:", error);
      }
    }
    fetchData();
  }, [id]);

  const createRecordHandler = () => {
    setCurrentRecord(null);
    setVisible(true);
  };

  const updateRecordHandler = (record) => {
    console.log("Editing record:", record);
    setCurrentRecord(record);
    setVisible(true);
  };

  const deleteRecordHandler = async (recordId) => {
    console.log("Deleting record ID:", recordId);
    try {
      await PrikazBodyService.removeRecord(recordId);
      setList(list.filter((it) => it.id !== recordId));
      console.log("Record deleted successfully");
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  const updateHeaderField = async (field, value) => {
    try {
      const updatedHeader = { ...prikazHeader, [field]: value };
      setPrikazHeader(updatedHeader);

      // Сохраняем изменения в базе данных
      await PrikazHeadersService.updateRecord({
        id: prikazHeader.id,
        [field]: value,
      });
    } catch (error) {
      console.error("Error updating header:", error);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <div ref={componentRef}>
        <Space
          direction={"vertical"}
          align={"center"}
          style={{ width: "100%", marginBottom: 24 }}
        >
          <h2>
            Приказ о перемещении работников №{" "}
            <strong>{prikazHeader?.number}</strong>
          </h2>

          <Space>
            Дата создания
            <DatePicker
              format="DD.MM.YYYY"
              value={
                prikazHeader?.dateOfCreate
                  ? dayjs(prikazHeader.dateOfCreate)
                  : null
              }
              onChange={(date) =>
                updateHeaderField("dateOfCreate", date.format("YYYY-MM-DD"))
              }
              style={{ width: 232 }}
              allowClear={false}
            />
          </Space>

          <Space>
            Наименование организации:{" "}
            <strong>
              <Select
                value={prikazHeader?.organizationId || null}
                onChange={(value) => updateHeaderField("organizationId", value)}
                placeholder={"Выберите организацию"}
                style={{ width: 425 }}
              >
                {organizations.map((it) => (
                  <Option key={it.id} value={it.id}>
                    {it.title}
                  </Option>
                ))}
              </Select>
            </strong>
          </Space>
        </Space>

        <Table dataSource={list} columns={columns} rowKey="id" />
      </div>

      <Space>
        <Button onClick={createRecordHandler}>Добавить</Button>
        <Button type="dashed" onClick={handlePrint}>
          Печать
        </Button>
      </Space>

      <PrikazBodiesDialog
        visible={visible}
        onOk={(record) => {
          currentRecord
            ? setList(
                list.map((it) =>
                  it.id === currentRecord.id ? { ...record } : it,
                ),
              )
            : setList([...list, record]);

          setCurrentRecord(null);
          setVisible(false);
        }}
        onCancel={() => setVisible(false)}
        currentRecord={currentRecord}
        departments={departments}
        individuals={individuals}
        HeaderId={id}
      />
    </div>
  );
};
