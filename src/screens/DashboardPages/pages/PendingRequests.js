import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'antd';
import ConfirmModalComponent from '../../../components/ConfirmModalComponent';
import { postAssignRequests, editAssignRequests, getAllPendingRequests } from '../../../store/actions/requests';

const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: text => text,
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];

  const data = [
    {
      key: '1443443',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '4343435',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '355545',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '53535353',
      name: 'Another User',
      age: 99,
      address: 'Sidney No. 1 Lake Park',
    },
  ];

function PendingRequests() {        

  
  const selectedRowKeys = useSelector((store) => store.requests.assignToMeRequests.data);

  const actionDispatch = useDispatch();
  const postAssignRequestsDispatch = useCallback((data) => actionDispatch(postAssignRequests(data)),[actionDispatch]);
  const editAssignRequestsDispatch = useCallback((data) => actionDispatch(editAssignRequests(data)),[actionDispatch]);
  const getAllPendingRequestsDispatch = useCallback(() => actionDispatch(getAllPendingRequests()), [actionDispatch]);
  // const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);


  const assignRequests = () => {
     //DO SOMETHING LATER
  };

  

  const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        editAssignRequestsDispatch(selectedRowKeys);
        setSelectedRows(selectedRows)
      },
      selectedRowKeys
  };
  
  const hasSelected = selectedRowKeys.length > 0;

  return (
      <>
          <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
          <ConfirmModalComponent disabled={!hasSelected} title="Do you want to be assigned these items?" content={selectedRows} confirmText="Assign to me" performAction={assignRequests}/>
      </>
      
  )
}

export default PendingRequests;
