import { Input, Space } from "antd"; 
import { DatePicker } from "antd"; 
import Modal from "antd/lib/modal/Modal"; 
import React, { useEffect, useState } from "react"; 
import { Select } from 'antd'; 
import dayjs from 'dayjs';

const { Option } = Select; 

let localId = 0;

export const PrikazBodiesCreateDialog = ({ 
  visible, 
  onOk, 
  onCancel, 
  currentRecord,  
  HeaderId, 
  individuals = [], 
  departments = [], 
  ...props 
}) => { 
  const [prikazBody, setPrikazBody] = useState({
    IndividualId: null,
    tabNumber: '',
    departmentOldId: null,
    departmentNewId: null,
    postOld: '',
    postNew: '',
    salary: '',
    transferFrom: null,
    transferTo: null,
    numberOfContract: ''
  }); 

  useEffect(() => { 
    if (currentRecord) { 
      setPrikazBody(currentRecord); 
    } else { 
      setPrikazBody({
        IndividualId: null,
        tabNumber: '',
        departmentOldId: null,
        departmentNewId: null,
        postOld: '',
        postNew: '',
        salary: '',
        transferFrom: null,
        transferTo: null,
        numberOfContract: ''
      }); 
    } 
  }, [currentRecord, visible]); 

  const onOkHandler = async () => { 
    const record = { 
      id: localId, 
      HeaderId: HeaderId, 
      IndividualId: prikazBody.IndividualId, 
      tabNumber: prikazBody.tabNumber, 
      departmentOldId: prikazBody.departmentOldId, 
      departmentNewId: prikazBody.departmentNewId, 
      postOld: prikazBody.postOld, 
      postNew: prikazBody.postNew, 
      salary: prikazBody.salary, 
      transferFrom: prikazBody.transferFrom ? dayjs(prikazBody.transferFrom).format('YYYY-MM-DD') : null, 
      transferTo: prikazBody.transferTo ? dayjs(prikazBody.transferTo).format('YYYY-MM-DD') : null, 
      numberOfContract: prikazBody.numberOfContract, 
    }; 
    onOk(record); 
    setPrikazBody(null); 
    localId += 1; 
  }; 

  return ( 
    <Modal 
      open={visible} 
      title={currentRecord ? 'Редактировать' : 'Создать'} 
      onOk={onOkHandler} 
      onCancel={onCancel} 
      okText="Сохранить"
      cancelText="Отмена"
    > 
      <Space direction="vertical" style={{ width: '100%' }}> 
        <Select 
          value={prikazBody?.IndividualId || null} 
          onChange={value => setPrikazBody({...prikazBody, IndividualId: value})} 
          placeholder={"Выберите физ. лицо"} 
          style={{ width: '100%' }} 
        > 
          {individuals.map(it => (
            <Option key={it.id} value={it.id}>
              {it.lastName}
            </Option>
          ))} 
        </Select> 

        <Input  
          value={prikazBody?.tabNumber || ''} 
          onChange={e => setPrikazBody({ ...prikazBody, tabNumber: e.target.value })} 
          placeholder="Укажите табельный номер" 
        /> 

        <Space style={{ width: '100%' }}> 
          <Select 
            value={prikazBody?.departmentOldId || null} 
            onChange={value => setPrikazBody({...prikazBody, departmentOldId: value})} 
            placeholder={"Выберите старое структурное подразделение"} 
            style={{ width: '48%' }} 
          > 
            {departments.map(it => (
              <Option key={it.id} value={it.id}>
                {it.name || it.title} 
              </Option>
            ))} 
          </Select> 

          <Select 
            value={prikazBody?.departmentNewId || null} 
            onChange={value => setPrikazBody({...prikazBody, departmentNewId: value})} 
            placeholder={"Выберите новое структурное подразделение"} 
            style={{ width: '48%' }} 
          > 
            {departments.map(it => (
              <Option key={it.id} value={it.id}>
                {it.name || it.title} 
              </Option>
            ))} 
          </Select> 
        </Space> 

        <Space style={{ width: '100%' }}> 
          <Input  
            value={prikazBody?.postOld || ''} 
            onChange={e => setPrikazBody({ ...prikazBody, postOld: e.target.value })} 
            placeholder="Укажите старую должность" 
            style={{ width: '48%' }} 
          />    
          <Input  
            value={prikazBody?.postNew || ''} 
            onChange={e => setPrikazBody({ ...prikazBody, postNew: e.target.value })} 
            placeholder="Укажите новую должность" 
            style={{ width: '48%' }} 
          />   
        </Space> 
        
        <Input  
          value={prikazBody?.salary || ''} 
          onChange={e => setPrikazBody({ ...prikazBody, salary: e.target.value })} 
          placeholder="Укажите зарплату" 
        /> 

        <Space style={{ width: '100%' }}> 
          <DatePicker 
            value={prikazBody?.transferFrom ? dayjs(prikazBody.transferFrom) : null} 
            onChange={date => setPrikazBody({ ...prikazBody, transferFrom: date })} 
            placeholder={"Укажите дату перевода (с)"} 
            style={{ width: '48%' }} 
            format="DD.MM.YYYY"
            allowClear={false} 
          />   
          <DatePicker 
            value={prikazBody?.transferTo ? dayjs(prikazBody.transferTo) : null} 
            onChange={date => setPrikazBody({ ...prikazBody, transferTo: date })} 
            placeholder={"Укажите дату перевода (по)"} 
            style={{ width: '48%' }} 
            format="DD.MM.YYYY"
            allowClear={false} 
          />   
        </Space> 

        <Input  
          value={prikazBody?.numberOfContract || ''} 
          onChange={e => setPrikazBody({ ...prikazBody, numberOfContract: e.target.value })} 
          placeholder="Укажите номер ТД, основания для перевода" 
        /> 
      </Space> 
    </Modal> 
  ); 
}; 