import { Input, Space } from "antd"; 
import Modal from "antd/lib/modal/Modal"; 
import { DatePicker } from "antd"; 
import React, { useEffect, useState } from "react"; 
import { Select } from 'antd'; 
import PrikazBodyService from "../../../api/services/prikaz-body-service"; 
import dayjs from 'dayjs';

const { Option } = Select; 

export const PrikazBodiesDialog = ({ 
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
      setPrikazBody({
        ...currentRecord,
        transferFrom: currentRecord.transferFrom ? dayjs(currentRecord.transferFrom) : null,
        transferTo: currentRecord.transferTo ? dayjs(currentRecord.transferTo) : null
      }); 
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
    try {
      const recordData = {
        ...prikazBody,
        transferFrom: prikazBody.transferFrom ? prikazBody.transferFrom.format('YYYY-MM-DD') : null,
        transferTo: prikazBody.transferTo ? prikazBody.transferTo.format('YYYY-MM-DD') : null,
      };

      if (currentRecord) {
        recordData.id = currentRecord.id;
      } else {
        recordData.HeaderId = HeaderId;
      }

      console.log('Saving prikaz body record:', recordData);

      const record = currentRecord 
        ? await PrikazBodyService.updateRecord(recordData) 
        : await PrikazBodyService.createRecord(recordData);
      
      onOk(record); 
    } catch (error) {
      console.error('Error saving prikaz body record:', error);
    }
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
              {it.lastName} {it.firstName}
            </Option>
          ))} 
        </Select> 

        <Input  
          value={prikazBody?.tabNumber || ''} 
          onChange={e => setPrikazBody({ ...prikazBody, tabNumber: e.target.value })} 
          placeholder="Укажите табельный номер" 
        /> 

        <Select 
          value={prikazBody?.departmentOldId || null} 
          onChange={value => setPrikazBody({...prikazBody, departmentOldId: value})} 
          placeholder={"Выберите старое структурное подразделение"} 
          style={{ width: '100%' }} 
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
          style={{ width: '100%' }} 
        > 
          {departments.map(it => (
            <Option key={it.id} value={it.id}>
              {it.name || it.title} 
            </Option>
          ))} 
        </Select> 

        <Space style={{ width: '100%' }}> 
          <Input  
            value={prikazBody?.postOld || ''} 
            onChange={e => setPrikazBody({ ...prikazBody, postOld: e.target.value })} 
            placeholder="Укажите старую должность" 
            style={{ width: 232 }} 
          />    
          <Input  
            value={prikazBody?.postNew || ''} 
            onChange={e => setPrikazBody({ ...prikazBody, postNew: e.target.value })} 
            placeholder="Укажите новую должность" 
            style={{ width: 232 }} 
          /> 
        </Space> 
        
        <Input  
          value={prikazBody?.salary || ''} 
          onChange={e => setPrikazBody({ ...prikazBody, salary: e.target.value })} 
          placeholder="Укажите зарплату" 
        /> 

        <Space style={{ width: '100%' }}> 
          <DatePicker 
            value={prikazBody?.transferFrom} 
            onChange={date => setPrikazBody({ ...prikazBody, transferFrom: date })} 
            placeholder={"Укажите дату перевода (с)"} 
            style={{ width: 232 }} 
            format="DD.MM.YYYY"
            allowClear={false} 
          />   
          <DatePicker 
            value={prikazBody?.transferTo} 
            onChange={date => setPrikazBody({ ...prikazBody, transferTo: date })} 
            placeholder={"Укажите дату перевода (по)"} 
            style={{ width: 232 }} 
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