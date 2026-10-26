import { DatePicker, Button, Space, Table, Select, Input } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import ProxyBodyService from "../../../api/services/proxy-body-service";
import ProxyHeadersService from "../../../api/services/proxy-header-service";
import OrganizationService from "../../../api/services/organization-service";
import IndividualService from "../../../api/services/individuals-service";
import ProductService from "../../../api/services/product-service";
import { ProxyBodiesCreateDialog } from "../../../components/dialogs/proxy-bodies-dialog/ProxyBodiesCreateDialog";
import dayjs from "dayjs";

const { Option } = Select;

export const ProxyCreateView = ({ onOk, onClick, ...props }) => {
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

  const navigate = useNavigate();
  const { id } = useParams();
  const [proxyHeader, setProxyHeader] = useState({
    dischargeDate: dayjs(new Date()),
    endDate: dayjs(new Date()),
  });
  const [list, setList] = useState([]);
  const [individuals, setIndividuals] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Frontend: Starting data fetch, ID:", id);

        const debugFetchProxyBodies = async (id) => {
          try {
            const response = await fetch(`/api/proxybodies/${id}`);

            const text = await response.text();

            if (text.includes("<!DOCTYPE") || text.includes("<html")) {
              console.error("Frontend: Server returned HTML instead of JSON");
              return [];
            }

            const data = JSON.parse(text);
            return data;
          } catch (error) {
            console.error("Frontend: Fetch error:", error);
            return [];
          }
        };

        const [individualsData, organizationsData, productsData] =
          await Promise.all([
            IndividualService.getAllRecords(),
            OrganizationService.getAllRecords(),
            ProductService.getAllRecords(),
          ]);

        setIndividuals(individualsData);
        setOrganizations(organizationsData);
        setProducts(productsData);

        if (id) {
          console.log("Frontend: Loading proxy data for ID:", id);

          const [headerData, bodyData] = await Promise.all([
            ProxyHeadersService.getOneRecord(id),
            debugFetchProxyBodies(id),
          ]);

          console.log("Frontend: Header data:", headerData);
          console.log("Frontend: Body data:", bodyData);

          setProxyHeader({
            ...headerData,
            dischargeDate: headerData.dischargeDate
              ? dayjs(headerData.dischargeDate)
              : dayjs(),
            endDate: headerData.endDate ? dayjs(headerData.endDate) : dayjs(),
          });
          setList(bodyData || []);
        } else {
          setProxyHeader({
            dischargeDate: dayjs(),
            endDate: dayjs(),
          });
          setList([]);
        }
      } catch (error) {
        console.error("Frontend: Error loading data:", error);
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

  const saveHeader = async () => {
    await ProxyHeadersService.createRecord(proxyHeader);
  };

  const saveBody = async (id) => {
    list.forEach(async (record) => {
      record["proxyHeaderId"] = id;
      delete record.id;
      await ProxyBodyService.createRecord(record);
    });
  };

  const saveRecordHandler = async () => {
    try {
      console.log("=== START SAVE ===");
      console.log("Current list:", list);
      console.log("Proxy header:", proxyHeader);

      const headerToSave = {
        ...proxyHeader,
        dischargeDate: proxyHeader.dischargeDate
          ? proxyHeader.dischargeDate.format("YYYY-MM-DD")
          : null,
        endDate: proxyHeader.endDate
          ? proxyHeader.endDate.format("YYYY-MM-DD")
          : null,
        number: parseInt(proxyHeader.number) || 0,
      };

      console.log("Header to save:", headerToSave);

      let savedHeader;
      if (id) {
        console.log("Updating existing header with ID:", id);
        savedHeader = await ProxyHeadersService.updateRecord({
          id: id,
          ...headerToSave,
        });
      } else {
        console.log("Creating new header");
        savedHeader = await ProxyHeadersService.createRecord(headerToSave);
      }

      console.log("Saved header:", savedHeader);

      const headerId = id || savedHeader.id;
      console.log("Using header ID:", headerId);
      console.log("Body records to save:", list.length);

      for (const record of list) {
        console.log("Processing record:", record);

        const bodyToSave = {
          productId: record.productId,
          count: record.count,
          unit: record.unit,
          proxyHeaderId: headerId,
        };

        console.log("Body to save:", bodyToSave);

        try {
          if (record.id && typeof record.id === "number" && record.id > 0) {
            console.log("Updating existing body record");
            bodyToSave.id = record.id;
            const result = await ProxyBodyService.updateRecord(bodyToSave);
            console.log("Update result:", result);
          } else {
            console.log("Creating new body record");
            const result = await ProxyBodyService.createRecord(bodyToSave);
            console.log("Create result:", result);
          }
        } catch (error) {
          console.error("Error saving body record:", error);
        }
      }

      console.log("=== END SAVE - Navigating to:", `/proxy/${headerId}`);
      navigate(`/proxy/${headerId}`);
    } catch (error) {
      console.error("Error saving proxy:", error);
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
            <label>
              Доверенность №
              <Input
                value={proxyHeader?.number || ""}
                onChange={(e) =>
                  setProxyHeader({ ...proxyHeader, number: +e.target.value })
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
            Дата выписки
            <DatePicker
              format="DD.MM.YYYY"
              value={proxyHeader?.dischargeDate}
              onChange={(date) =>
                setProxyHeader({ ...proxyHeader, dischargeDate: date })
              }
              style={{ width: 232 }}
              allowClear={false}
            />
          </Space>

          <Space>
            Дата действия
            <DatePicker
              format="DD.MM.YYYY"
              value={dayjs(proxyHeader?.endDate, "YYYY-MM-DD") || new Date()}
              onChange={(date) =>
                setProxyHeader({ ...proxyHeader, endDate: date })
              }
              style={{ width: 232 }}
              allowClear={false}
            />
          </Space>

          <Space>
            Доверенность выдана:{" "}
            <strong>
              <Select
                value={proxyHeader?.organizationId || null}
                onChange={(value) =>
                  setProxyHeader({ ...proxyHeader, organizationId: value })
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
                value={proxyHeader?.individualId || null}
                onChange={(value) =>
                  setProxyHeader({ ...proxyHeader, individualId: value })
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

      <Space
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button onClick={createRecordHandler}>Добавить</Button>

        <Space style={{ display: "flex", gap: 10 }}>
          <Button onClick={(event) => navigate("/")}>Отменить</Button>

          <Button onClick={saveRecordHandler}>Сохранить</Button>
        </Space>
      </Space>

      <ProxyBodiesCreateDialog
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
