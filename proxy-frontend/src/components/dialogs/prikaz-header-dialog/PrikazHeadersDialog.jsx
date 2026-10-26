//PrikazHeadersDialog.jsx
import { DatePicker, Input, Space, Select } from "antd"; 

import Modal from "antd/lib/modal/Modal"; 

import React, { useEffect, useState } from "react"; 

import PrikazHeadersService from "../../../api/services/prikaz-header-service"; 

import dayjs from 'dayjs';

 

const { Option } = Select; 

 

export const PrikazHeadersDialog = ({ 
 visible, 
 onOk, 
 onCancel, 
 currentRecord, 
 individuals, 
 organizations, 
 ...props 

}) => { 
 const [prikazHeader, setPrikazHeader] = useState(null); 

 
 useEffect(() => { 
  if (currentRecord) { 
   setPrikazHeader(currentRecord); 
  } else { 
   setPrikazHeader(null); 
  } 
 }, [currentRecord]) 


 const onOkHandler = async () => { 
  const record = 
   currentRecord 
    ? await PrikazHeadersService.updateRecord({ 
     id: currentRecord.id, 
     ...prikazHeader, 
    }) 
    : await PrikazHeadersService.createRecord(prikazHeader) 
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
     value={prikazHeader?.number || ''} 
     onChange={e => setPrikazHeader({ ...prikazHeader, number: e.target.value })} 
     placeholder="Укажите номер документа" 
    /> 

 
    <Space style={{width: '100%'}}> 

 
    <DatePicker  
      value={dayjs(prikazHeader?.dateOfCreate , 'YYYY-MM-DD').isValid() ? dayjs(prikazHeader.dateOfCreate , 'YYYY-MM-DD') : null} 
      onChange={date => setPrikazHeader({ ...prikazHeader, dateOfCreate: date })} 
      placeholder={"Укажите дату создания документа"} 
      style={{ width: 472 }} 
      format="DD.MM.YYYY" 
      allowClear={false} 
     /> 
 
    </Space> 

 
    <Space style={{width: '100%'}}> 
    
     <Select 
      value={prikazHeader?.organizationId || null} 
      onChange={value => setPrikazHeader({ ...prikazHeader, organizationId: value })} 
      placeholder={"Выберите организацию"} 
      style={{ width: 472 }} 
     > 
      {organizations.map(it => <Option 
       value={it.id}> 
       {it.title} 
      </Option>)} 
    </Select> 

    </Space> 

 
   </Space> 
  </Modal> 
 ) 

 

}  