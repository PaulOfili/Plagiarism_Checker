import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'antd';

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
];

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => text,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
        <span>
            <Link to={`/dashboard/search-report/${record.key}`}>Generate Search Report</Link>
        </span>
        ),
    },
];


function AssignedRequests() {    

    return (
        <div>
            Welcome to all assigned requests
            <br />
            <Table columns={columns} dataSource={data} />
        </div>
    )
}

export default AssignedRequests;



