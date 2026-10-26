import { DatePicker, Button, Space, Table, Select, Input } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import PrikazBodyService from "../../../api/services/prikaz-body-service";
import PrikazHeadersService from "../../../api/services/prikaz-header-service";
import OrganizationService from "../../../api/services/organization-service";
import IndividualService from "../../../api/services/individuals-service";
import { PrikazBodiesCreateDialog } from "../../../components/dialogs/prikaz-body-dialog/PrikazBodiesCreateDialog";
import dayjs from "dayjs";
import DepartmentService from "../../../api/services/department-service";

const { Option } = Select;

export const PrikazCreateView = () => {
  const columns = [
    {
      title: "Код",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Физ. лицо",
      key: "lastName",
      render: (text, record) =>
        individuals.find((it) => it.id === record.IndividualId)?.title ||
        "Не указано",
    },
    {
      title: "Табельный номер",
      dataIndex: "tabNumber",
    },
    {
      title: "Старое структурное подразделение",
      key: "oldDepartment",
      render: (text, record) =>
        departments.find((it) => it.id === record.departmentOldId)?.name ||
        "Не указано",
    },
    {
      title: "Новое структурное подразделение",
      key: "newDepartment",
      render: (text, record) =>
        departments.find((it) => it.id === record.departmentNewId)?.name ||
        "Не указано",
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
      title: "Дата перевода (c)",
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
  const navigate = useNavigate();
  const { id } = useParams();

  const [prikazHeader, setPrikazHeader] = useState({
    number: "",
    dateOfCreate: dayjs().format("YYYY-MM-DD"),
    organizationId: null,
  });

  const [list, setList] = useState([]);
  const [individuals, setIndividuals] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [individualsData, organizationsData, departmentsData] =
          await Promise.all([
            IndividualService.getAllRecords(),
            OrganizationService.getAllRecords(),
            DepartmentService.getAllRecords(),
          ]);

        setIndividuals(individualsData || []);
        setOrganizations(organizationsData || []);
        setDepartments(departmentsData || []);

        if (id) {
          console.log("Frontend: Loading prikaz data for ID:", id);

          const [headerData, bodyData] = await Promise.all([
            PrikazHeadersService.getOneRecord(id),
            PrikazBodyService.getAllHeadersRecords(id),
          ]);

          console.log("Frontend: Header data:", headerData);
          console.log("Frontend: Body data:", bodyData);

          setPrikazHeader({
            ...headerData,
            dateOfCreate: headerData.dateOfCreate
              ? dayjs(headerData.dateOfCreate)
              : dayjs(),
          });
          setList(bodyData || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setIndividuals([]);
        setOrganizations([]);
        setDepartments([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const createRecordHandler = () => {
    setCurrentRecord(null);
    setVisible(true);
  };

  const updateRecordHandler = (record) => {
    setCurrentRecord(record);
    setVisible(true);
  };

  const deleteRecordHandler = async (recordId) => {
    setList(list.filter((it) => it.id !== recordId));
  };

  const saveRecordHandler = async () => {
    if (!prikazHeader.number || !prikazHeader.organizationId) {
      alert("Заполните номер приказа и выберите организацию");
      return;
    }

    try {
      setLoading(true);

      const headerToSave = {
        ...prikazHeader,
        dateOfCreate: dayjs(prikazHeader.dateOfCreate).format("YYYY-MM-DD"),
        number: parseInt(prikazHeader.number) || 0,
      };

      console.log("=== START SAVE PRIKAZ ===");
      console.log("Current list:", list);
      console.log("Prikaz header:", headerToSave);

      let savedHeader;
      if (id) {
        console.log("Updating existing header with ID:", id);
        savedHeader = await PrikazHeadersService.updateRecord({
          id: id,
          ...headerToSave,
        });
      } else {
        console.log("Creating new header");
        savedHeader = await PrikazHeadersService.createRecord(headerToSave);
      }

      console.log("Saved header:", savedHeader);

      const headerId = id || savedHeader.id;
      console.log("Using header ID:", headerId);
      console.log("Body records to save:", list.length);

      // Сохраняем body записи
      for (const record of list) {
        console.log("Processing record:", record);

        const bodyToSave = {
          IndividualId: record.IndividualId,
          tabNumber: record.tabNumber,
          departmentOldId: record.departmentOldId,
          departmentNewId: record.departmentNewId,
          postOld: record.postOld,
          postNew: record.postNew,
          salary: record.salary,
          transferFrom: record.transferFrom
            ? dayjs(record.transferFrom).format("YYYY-MM-DD")
            : null,
          transferTo: record.transferTo
            ? dayjs(record.transferTo).format("YYYY-MM-DD")
            : null,
          numberOfContract: record.numberOfContract,
          HeaderId: headerId,
        };

        console.log("Body to save:", bodyToSave);

        try {
          if (record.id && typeof record.id === "number" && record.id > 0) {
            console.log("Updating existing body record");
            bodyToSave.id = record.id;
            const result = await PrikazBodyService.updateRecord(bodyToSave);
            console.log("Update result:", result);
          } else {
            console.log("Creating new body record");
            const result = await PrikazBodyService.createRecord(bodyToSave);
            console.log("Create result:", result);
          }
        } catch (error) {
          console.error("Error saving body record:", error);
        }
      }

      console.log("=== END SAVE - Navigating to:", `/prikaz/${headerId}`);
      navigate(`/prikaz/${headerId}`);
    } catch (error) {
      console.error("Error saving prikaz:", error);
      alert("Ошибка при сохранении: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !organizations.length) {
    return <div style={{ padding: 16 }}>Загрузка...</div>;
  }

  return (
    <div style={{ padding: 16 }}>
      <div ref={componentRef}>
        <Space
          direction={"vertical"}
          align={"center"}
          style={{ width: "100%", marginBottom: 24 }}
        >
          <h2>
            <label>
              Приказ о перемещении работников №
              <Input
                value={prikazHeader.number}
                onChange={(e) =>
                  setPrikazHeader({ ...prikazHeader, number: e.target.value })
                }
                placeholder="№"
                style={{
                  width: "65px",
                  fontWeight: "bold",
                  fontSize: "14pt",
                  marginLeft: 10,
                }}
              />
            </label>
          </h2>

          <Space>
            Дата
            <DatePicker
              format="DD.MM.YYYY"
              value={
                prikazHeader.dateOfCreate
                  ? dayjs(prikazHeader.dateOfCreate)
                  : dayjs()
              }
              onChange={(date) =>
                setPrikazHeader({ ...prikazHeader, dateOfCreate: date })
              }
              style={{ width: 232 }}
              allowClear={false}
            />
          </Space>

          <Space>
            Наименование организации:
            <Select
              value={prikazHeader.organizationId}
              onChange={(value) =>
                setPrikazHeader({ ...prikazHeader, organizationId: value })
              }
              placeholder={"Выберите организацию"}
              style={{ width: 425 }}
            >
              {organizations.map((it) => (
                <Option key={it.id} value={it.id}>
                  {it.title}
                </Option>
              ))}
            </Select>
          </Space>

          <Table
            dataSource={list}
            columns={columns}
            rowKey="id"
            style={{ width: "100%" }}
            pagination={false}
          />
        </Space>
      </div>

      <Space
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button onClick={createRecordHandler} type="primary">
          Добавить
        </Button>

        <Space style={{ display: "flex", gap: 10 }}>
          <Button onClick={() => navigate("/prikaz")}>Отменить</Button>
          <Button onClick={saveRecordHandler} type="primary" loading={loading}>
            Сохранить
          </Button>
        </Space>
      </Space>

      <PrikazBodiesCreateDialog
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
        onCancel={() => {
          setCurrentRecord(null);
          setVisible(false);
        }}
        currentRecord={currentRecord}
        departments={departments}
        individuals={individuals}
        HeaderId={id}
      />
    </div>
  );
};
