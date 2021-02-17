import React from 'react';
import { Table, Tag, Input, Select } from 'antd';
import ConfirmModalComponent from '../../../components/ConfirmModalComponent';
import { Link } from 'react-router-dom';
import moment from 'moment';

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


  const assignRequests = () => {
     //DO SOMETHING LATER
  };


  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: text => <Link to="">{text}</Link>,
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
        <ConfirmModalComponent iconType="delete" performAction={assignRequests}/>
      ),
    },
  ];

  const handleSearch = (value) => {
  }

  const handleChange = (value) => {
  }

  return (
      <>
        <div className='filter-wrapper'>
          <div className='search-filter'>
            <Search
              placeholder="Search by submission name"
              onSearch={handleSearch}
              style={{height: 67, maxWidth: '20rem'}}
            />
          </div>
          <div className='sort-filter'>
            <p className='sort-filter__title'>Sort By :</p>
            <Select 
              defaultValue="name" 
              onChange={handleChange} 
              style={{ width: 200 }}
              size='large'>
              <Option value="name">Name</Option>
              <Option value="newest">Newest first</Option>
              <Option value="similarity">Similarity score</Option>
              <Option value="status">Status</Option>
            </Select>
          </div>
        </div>
        <Table columns={columns} dataSource={data} />
      </>
      
  )
}

export default RecentSubmissions;
