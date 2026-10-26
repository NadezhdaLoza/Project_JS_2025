//Departments-Dialog.jsx
import { Input, Space } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import DepartmentService from "../../../api/services/department-service";

export const DepartmentDialog = ({
    visible,
    onOk,
    onCancel,
    currentRecord,
    ...props
}) => {
    const [department, setDepartment] = useState(null);

    useEffect(() => {
        if (currentRecord) {
            setDepartment(currentRecord);
        } else {
            setDepartment(null);
        }
    }, [currentRecord])

    const onOkHandler = async () => {
        const record =
            currentRecord
                ? await DepartmentService.updateRecord({
                    id: currentRecord.id,
                    ...department,
                })
                : await DepartmentService.createRecord(department)
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
                    value={department?.name || ''}
                    onChange={e => setDepartment({ ...department, name: e.target.value })}
                    placeholder="Укажите название структурного подразделения"
                />

                <Input
                    value={department?.classOfWorkingConditions || ''}
                    onChange={e => setDepartment({ ...department, classOfWorkingConditions: e.target.value })}
                    placeholder="Укажите класс условий труда"
                />

                <Input
                    value={department?.startTimeOfWorkingDay || ''}
                    onChange={e => setDepartment({ ...department, startTimeOfWorkingDay: e.target.value })}
                    placeholder="Укажите время начала рабочего дня"
                />

                <Input
                    value={department?.endTimeOfWorkingDay || ''}
                    onChange={e => setDepartment({ ...department, endTimeOfWorkingDay: e.target.value })}
                    placeholder="Укажите время окончания рабочего дня"
                />

            </Space>
        </Modal>
    )
}