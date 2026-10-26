import { DatePicker, Button, Space, Table, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useParams } from "react-router";
import ProxyBodyService from "../../../api/services/proxy-body-service";
import ProxyHeadersService from "../../../api/services/proxy-header-service";
import OrganizationService from "../../../api/services/organization-service";
import IndividualService from "../../../api/services/individuals-service";
import ProductService from "../../../api/services/product-service";
import { ProxyBodiesDialog } from "../../../components/dialogs/proxy-bodies-dialog/ProxyBodiesDialog";
import { useReactToPrint } from "react-to-print";
import dayjs from "dayjs";

const { Option } = Select;

export const ProxyView = ({ onOk, onClick, ...props }) => {
  const columns = [
    {
      title: "Код",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Наименование",
      key: "title",
      render: (text, record) =>
        products.find((it) => it.id === record.productId)?.title,
    },
    {
      title: "ед. изм.",
      dataIndex: "unit",
    },
    {
      title: "Количество",
      dataIndex: "count",
    },
    {
      title: "Действия",
      key: "actions",
      render: (text, record) => {
        return (
          <Space size="middle">
            <div onClick={() => updateRecordHandler(record)}>
              <EditOutlined />
            </div>
            <div onClick={() => deleteRecordHandler(record.id)}>
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
  const { id } = useParams();
  const [proxy, setProxy] = useState(null);
  const [list, setList] = useState([]);
  const [individuals, setIndividuals] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [
          listData,
          individualsData,
          organizationsData,
          productsData,
          proxyData,
        ] = await Promise.all([
          ProxyBodyService.getAllRecords(id),
          IndividualService.getAllRecords(),
          OrganizationService.getAllRecords(),
          ProductService.getAllRecords(),
          ProxyHeadersService.getOneRecord(id),
        ]);

        setList(listData);
        setProxy(proxyData);
        setIndividuals(individualsData);
        setOrganizations(organizationsData);
        setProducts(productsData);
      } catch (error) {
        console.error("Error loading proxy data:", error);
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
      await ProxyBodyService.removeRecord(recordId);
      setList(list.filter((it) => it.id !== recordId));
      console.log("Record deleted successfully");
    } catch (error) {
      console.error("Error deleting record:", error);
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
            Доверенность № <strong>{proxy?.number}</strong>
          </h2>

          <Space>
            Дата выписки
            <DatePicker
              format="DD.MM.YYYY"
              value={dayjs(proxy?.dischargeDate, "YYYY-MM-DD") || null}
              onChange={(date) =>
                setProxy(
                  { ...proxy, dischargeDate: date },
                  ProxyHeadersService.updateRecord({
                    ...proxy,
                    dischargeDate: date,
                  }),
                )
              }
              style={{ width: 232 }}
              allowClear={false}
            />
          </Space>

          <Space>
            Дата действия
            <DatePicker
              format="DD.MM.YYYY"
              value={dayjs(proxy?.endDate, "YYYY-MM-DD") || null}
              onChange={(date) =>
                setProxy(
                  { ...proxy, endDate: date },
                  ProxyHeadersService.updateRecord({
                    ...proxy,
                    endDate: date,
                  }),
                )
              }
              style={{ width: 232 }}
              allowClear={false}
            />
          </Space>

          <Space>
            Доверенность выдана:{" "}
            <strong>
              <Select
                value={proxy?.organizationId || null}
                onChange={(value) =>
                  setProxy(
                    { ...proxy, organizationId: value },
                    ProxyHeadersService.updateRecord({
                      ...proxy,
                      organizationId: value,
                    }),
                  )
                }
                placeholder={"Выберите организацию"}
                style={{ width: 425 }}
              >
                {organizations.map((it) => (
                  <Option value={it.id}>{it.title}</Option>
                ))}
              </Select>
            </strong>
          </Space>

          <Space>
            Получатель:{" "}
            <strong>
              <Select
                value={proxy?.individualId || null}
                onChange={(value) =>
                  setProxy(
                    { ...proxy, individualId: value },
                    ProxyHeadersService.updateRecord({
                      ...proxy,
                      individualId: value,
                    }),
                  )
                }
                placeholder={"Выберите получателя"}
                style={{ width: 425 }}
              >
                {individuals.map((it) => (
                  <Option value={it.id}>
                    {it.lastName} {it.firstName} {it.patronymic}
                  </Option>
                ))}
              </Select>
            </strong>
          </Space>
        </Space>

        <Table dataSource={list} columns={columns} />
      </div>

      <Space>
        <Button onClick={createRecordHandler}>Создать</Button>
        <Button type="dashed" onClick={handlePrint}>
          Печать
        </Button>
      </Space>

      <ProxyBodiesDialog
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
        products={products}
        proxyHeaderId={id}
      />
    </div>
  );
};
