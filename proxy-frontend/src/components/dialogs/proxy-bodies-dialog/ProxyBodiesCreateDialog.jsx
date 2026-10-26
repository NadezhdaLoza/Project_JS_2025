import { Input, Space } from "antd";

import Modal from "antd/lib/modal/Modal";

import React, { useEffect, useState } from "react";

import { Select } from "antd";

const { Option } = Select;

export const ProxyBodiesCreateDialog = ({
  visible,
  onOk,
  onCancel,
  currentRecord,
  products,
  proxyHeaderId,
  ...props
}) => {
  const [proxyBody, setProxyBody] = useState(null);

  useEffect(() => {
    if (currentRecord) {
      setProxyBody(currentRecord);
    } else {
      setProxyBody(null);
    }
  }, [currentRecord]);

  const onOkHandler = async () => {
    console.log("Dialog onOk, proxyBody:", proxyBody);
    if (proxyBody) {
      const record = {
        productId: proxyBody.productId,
        count: proxyBody.count,
        unit: proxyBody.unit,
      };
      console.log("Record to add:", record);
      onOk(record);
      setProxyBody(null);
    }
  };

  return (
    <Modal
      open={visible}
      title={currentRecord ? "Редактировать" : "Создать"}
      onOk={onOkHandler}
      onCancel={onCancel}
    >
      <Space direction="vertical">
        <Select
          value={proxyBody?.productId || null}
          onChange={(value) => setProxyBody({ ...proxyBody, productId: value })}
          placeholder={"Выберите продукт"}
          style={{ width: "100%" }}
        >
          {products.map((it) => (
            <Option value={it.id}>{it.title}</Option>
          ))}
        </Select>

        <Space>
          <Input
            value={proxyBody?.unit || ""}
            onChange={(e) =>
              setProxyBody({ ...proxyBody, unit: e.target.value })
            }
            placeholder="Укажите ед. измерения"
          />

          <Input
            value={proxyBody?.count || ""}
            onChange={(e) =>
              setProxyBody({ ...proxyBody, count: +e.target.value })
            }
            placeholder="Укажите количество"
          />
        </Space>
      </Space>
    </Modal>
  );
};
