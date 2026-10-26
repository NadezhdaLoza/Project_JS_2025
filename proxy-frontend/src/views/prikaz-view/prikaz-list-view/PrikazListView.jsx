//PrikazListView.jsx
import { Button, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import OrganizationService from "../../../api/services/organization-service";
import PrikazHeadersService from "../../../api/services/prikaz-header-service";
import IndividualService from "../../../api/services/individuals-service";
import { PrikazHeadersDialog } from "../../../components/dialogs/prikaz-header-dialog/PrikazHeadersDialog";
import dayjs from "dayjs";

export const PrikazListView = ({ ...props }) => {
  const columns = [
    {
      title: "Код",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Номер",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Дата создания",
      dataIndex: "dateOfCreate",
      render: (text) => dayjs(text).format("DD.MM.YYYY"),
    },
    {
      title: "Организация",
      dataIndex: "organizationId",
      render: (text, record) =>
        organizations.find((it) => it.id === record.organizationId)?.title,
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

  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [visible, setVisible] = useState(false);

  const [individuals, setIndividuals] = useState([]);
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const individuals = await IndividualService.getAllRecords();
      const organizations = await OrganizationService.getAllRecords();
      const list = await PrikazHeadersService.getAllRecords(); //CAS
      setIndividuals(individuals);
      setOrganizations(organizations);
      setList(list);
    };

    fetchData();
  }, []);
  console.log(list);

  const createRecordHandler = () => {
    setCurrentRecord(null);
    setVisible(true);
  };

  const updateRecordHandler = (record) => {
    setCurrentRecord(record);
    setVisible(true);
  };

  const deleteRecordHandler = async (recordId) => {
    await PrikazHeadersService.removeRecord(recordId);
    setList(list.filter((it) => it.id !== recordId));
  };

  return (
    <div style={{ padding: 16 }}>
      <Table
        dataSource={list}
        columns={columns}
        onRow={(record, rowIndex) => ({
          onDoubleClick: (event) => {
            navigate(`/prikaz/${record.id}`);
          },
        })}
      />
      <Button onClick={createRecordHandler}>Создать</Button>
      <PrikazHeadersDialog
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
        individuals={individuals}
        organizations={organizations}
      />
    </div>
  );
};
