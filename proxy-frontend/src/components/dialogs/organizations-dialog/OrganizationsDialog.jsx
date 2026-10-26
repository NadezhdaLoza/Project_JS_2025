import { Input, Space } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import OrganizationService from "../../../api/services/organization-service";

export const OrganizationsDialog = ({
    visible,
    onOk,
    onCancel,
    currentRecord,
    ...props
}) => {
    const [organization, setOrganization] = useState(null);

    useEffect(() => {
        if (currentRecord) {
            setOrganization(currentRecord);
        } else {
            setOrganization(null);
        }
    }, [currentRecord])

    const onOkHandler = async () => {
        const record =
            currentRecord
                ? await OrganizationService.updateRecord({
                    id: currentRecord.id,
                    ...organization,
                })
                : await OrganizationService.createRecord(organization)
        onOk(record);
    }

    return (
        <Modal
            open={visible}
            title={currentRecord ? 'Редактировать' : 'Создать'}
            onOk={onOkHandler}
            onCancel={onCancel}
        >

            <Space direction="vertical" style={{ width: '100%' }}>
                <Input
                    value={organization?.title || ''}
                    onChange={e => setOrganization({ ...organization, title: e.target.value })}
                    placeholder="Укажите наименование"
                />

                <Input
                    value={organization?.inn || ''}
                    onChange={e => setOrganization({ ...organization, inn: e.target.value })}
                    placeholder="Укажите ИНН"
                />
            </Space>

        </Modal>
    )
}