import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Tag, Input, Select } from 'antd';
import ConfirmModalComponent from '../../../components/ConfirmModalComponent';
import { editAssignRequests } from '../../../store/actions/requests';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { string } from 'prop-types';

const { Search } = Input;
const { Option } = Select;

const data = [
  {
    key: '1443443',
    name: 'John Brown',
    date: moment().format('MMM Do, YYYY'),
    similarity_score: 32,
    status: 'fail',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '4343435',
    name: 'Jim Green',
    date: moment().format('MMM Do, YYYY'),
    similarity_score: 42,
    status: 'approved',
    address: 'London No. 1 Lake Park',
  },
  {
    key: '355545',
    name: 'Joe Black',
    date: moment().format('MMM Do, YYYY'),
    similarity_score: 32,
    status: 'approved',
    address: 'Sidney No. 1 Lake Park',
  }
];

const colorMapping = {
  approved: 'green',
  fail: 'red'
}


function RecentSubmissions() {        

  const actionDispatch = useDispatch();
  const editAssignRequestsDispatch = useCallback((data) => actionDispatch(editAssignRequests(data)),[actionDispatch]);

  const assignRequests = () => {
     //DO SOMETHING LATER
  };


  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: text => <Link>{text}</Link>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Similarity Score',
      dataIndex: 'similarity_score',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: status => (
        <span>
          <Tag color={colorMapping[status]} key={status}>
            {status.toUpperCase()}
          </Tag>
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <ConfirmModalComponent performAction={assignRequests}/>
      ),
    },
  ];

  const handleSearch = (value) => {
    console.log(value)
  }

  const handleChange = (value) => {
    console.log(value)
  }

  return (
      <>
      <div class='filter-wrapper'>
        <div class='search-filter'>
          <Search
            placeholder="Search by submission name"
            onSearch={handleSearch}
            style={{height: 67, maxWidth: '20rem'}}
          />
        </div>
        <div class='sort-filter'>
          <p class='sort-filter__title'>Sort By :</p>
          <Select 
            defaultValue="name" 
            onChange={handleChange} 
            style={{ width: 200 }}
            size='large'>
            <Option value="name">Name</Option>
            <Option value="newest">Newest first</Option>
            <Option value="similarity" >Similarity score</Option>
            <Option value="status">Status</Option>
          </Select>
        </div>
      </div>
       
        <Table columns={columns} dataSource={data} />
      </>
      
  )
}

export default RecentSubmissions;
