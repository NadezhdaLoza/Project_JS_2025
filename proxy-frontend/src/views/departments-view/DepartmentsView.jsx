//DepartmentsView.jsx
import { Button, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import DepartmentService from "../../api/services/department-service";
import { DepartmentDialog } from "../../components/dialogs/departments-dialog/DepartmentsDialog";

export const DepartmentsView = ({ ...props }) => {
  const columns = [
    {
      title: "Код",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Наименование",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Класс условий труда",
      dataIndex: "classOfWorkingConditions",
      key: "classOfWorkingConditions",
    },
    {
      title: "Время начала рабочего дня",
      dataIndex: "startTimeOfWorkingDay",
      key: "startTimeOfWorkingDay",
    },
    {
      title: "Время окончания рабочего дня",
      dataIndex: "endTimeOfWorkingDay",
      key: "endTimeOfWorkingDay",
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

  const [list, setList] = useState([]);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const list = await DepartmentService.getAllRecords();
      setList(list);
    };

    fetchData();
  }, []);

  const createRecordHandler = () => {
    setCurrentRecord(null);
    setVisible(true);
  };

  const updateRecordHandler = (record) => {
    setCurrentRecord(record);
    setVisible(true);
  };

  const deleteRecordHandler = async (recordId) => {
    await DepartmentService.removeRecord(recordId);
    setList(list.filter((it) => it.id !== recordId));
  };

  return (
    <div style={{ padding: 16 }}>
      <Table dataSource={list} columns={columns} />
      <Button onClick={createRecordHandler}>Создать</Button>
      <DepartmentDialog
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
      />
    </div>
  );
};
