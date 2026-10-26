import { DatePicker, Input, Space, Select } from "antd";

import Modal from "antd/lib/modal/Modal";

import React, { useEffect, useState } from "react";

import ProxyHeadersService from "../../../api/services/proxy-header-service";

import dayjs from "dayjs";

const { Option } = Select;

export const ProxyHeadersDialog = ({
  visible,
  onOk,
  onCancel,
  currentRecord,
  individuals,
  organizations,
  ...props
}) => {
  const [proxyHeader, setProxyHeader] = useState({});

  useEffect(() => {
    if (currentRecord) {
      setProxyHeader({
        ...currentRecord,
        dischargeDate: currentRecord.dischargeDate
          ? dayjs(currentRecord.dischargeDate)
          : dayjs(),
        endDate: currentRecord.endDate ? dayjs(currentRecord.endDate) : dayjs(),
      });
    } else {
      setProxyHeader({
        dischargeDate: dayjs(),
        endDate: dayjs(),
      });
    }
  }, [currentRecord, visible]);

  const onOkHandler = async () => {
    try {
      const recordToSave = {
        ...proxyHeader,
        dischargeDate: proxyHeader.dischargeDate
          ? proxyHeader.dischargeDate.format("YYYY-MM-DD")
          : null,
        endDate: proxyHeader.endDate
          ? proxyHeader.endDate.format("YYYY-MM-DD")
          : null,
      };

      const record = currentRecord
        ? await ProxyHeadersService.updateRecord({
            id: currentRecord.id,
            ...recordToSave,
          })
        : await ProxyHeadersService.createRecord(recordToSave);

      onOk(record);
      setProxyHeader({});
    } catch (error) {
      console.error("Error saving proxy header:", error);
    }
  };

  return (
    <Modal
      open={visible}
      title={currentRecord ? "Редактировать" : "Создать"}
      onOk={onOkHandler}
      onCancel={onCancel}
      DD
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Input
          value={proxyHeader?.number || ""}
          onChange={(e) =>
            setProxyHeader({ ...proxyHeader, number: e.target.value })
          }
          placeholder="Укажите номер документа"
        />

        <Space style={{ width: "100%" }}>
          <DatePicker
            value={
              dayjs(proxyHeader?.dischargeDate, "YYYY-MM-DD").isValid()
                ? dayjs(proxyHeader.dischargeDate, "YYYY-MM-DD")
                : null
            }
            onChange={(date) =>
              setProxyHeader({ ...proxyHeader, dischargeDate: date })
            }
            placeholder={"Укажите дату выписки"}
            style={{ width: 232 }}
            format="DD.MM.YYYY"
            allowClear={false}
          />

          <DatePicker
            value={
              dayjs(proxyHeader?.endDate, "YYYY-MM-DD").isValid()
                ? dayjs(proxyHeader.endDate, "YYYY-MM-DD")
                : null
            }
            onChange={(date) =>
              setProxyHeader({ ...proxyHeader, endDate: date })
            }
            placeholder={"Укажите дату окончания"}
            style={{ width: 232 }}
            format="DD.MM.YYYY"
            allowClear={false}
          />
        </Space>

        <Space style={{ width: "100%" }}>
          <Select
            value={proxyHeader?.individualId || null}
            onChange={(value) =>
              setProxyHeader({ ...proxyHeader, individualId: value })
            }
            placeholder={"Выберите физ. лицо"}
            style={{ width: 232 }}
          >
            {individuals.map((it) => (
              <Option value={it.id}>{it.lastName}</Option>
            ))}
          </Select>

          <Select
            value={proxyHeader?.organizationId || null}
            onChange={(value) =>
              setProxyHeader({ ...proxyHeader, organizationId: value })
            }
            placeholder={"Выберите организацию"}
            style={{ width: 232 }}
          >
            {organizations.map((it) => (
              <Option key={it.id} value={it.id}>
                {it.title}
              </Option>
            ))}
          </Select>
        </Space>
      </Space>
    </Modal>
  );
};
