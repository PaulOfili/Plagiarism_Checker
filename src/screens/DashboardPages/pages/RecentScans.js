import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Table, Tag, Input, Select, message } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getAllScanResults } from "../../../config/Firebase/firebase"

const { Search } = Input;
const { Option } = Select;

const colorMapping = {
  completed: 'green',
  error: 'red',
  pending: 'blue'
}

const parseResult = (item) => {
  return {
    key: item.scanId,
    scanId: item.scanId,
    courseCode: item.courseCode.toUpperCase(),
    scanStartTime: moment(item.scanStartTime).format('LLL'),
    scanFinishTime: (item.scanFinishTime) 
    ?  moment(item.scanFinishTime).format('LLL')
    : "Pending",
    status: (item.status) 
    ? item.status
    : "pending",
    isSubmitted: item.isSubmitted,
    similarityScore: (item.results && item.results.score) 
    ? item.results.score.aggregatedScore + " %"
    : "Pending",
    fileUrl: item.fileUrl
  }
}

function RecentScans() {   
  
  const userId = useSelector(store => store.auth.userData.uid);


  const [scannedResults, setScannedResults] = useState([]);

  useEffect(() => {
      const getAllScannedResultsForUser = async userId => {
        try{
          const response = await getAllScanResults(userId);
          const reformattedScannedResults = response.map(parseResult)
          setScannedResults(reformattedScannedResults) 
        } catch (error) {
          message.error(error.message);
        }
      }
      getAllScannedResultsForUser(userId);
  }, [userId])

  const columns = [
    {
      title: 'Scan ID',
      dataIndex: 'scanId',
      render: (scanId, scan) => (scan?.status === "completed") ? <Link to={`/dashboard/scan/${scanId}/results`}>{scanId}</Link> : <p>{scanId}</p>
    },
    {
      title: 'Course code',
      dataIndex: 'courseCode',
    },
    {
      title: 'Scan start time',
      dataIndex: 'scanStartTime',
    },
    {
      title: 'Scan finish time',
      dataIndex: 'scanFinishTime',
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
      title: 'Similarity Score',
      dataIndex: 'similarityScore',
    },
    {
      title: 'Submitted?',
      dataIndex: 'isSubmitted',
      render: isSubmitted => (isSubmitted === true) ? "YES" : "NO"
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, scan) => (
        <a href={scan.fileUrl} rel="noopener noreferrer" target="_blank">View document</a>
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
        <Table columns={columns} dataSource={scannedResults} />
      </>
      
  )
}

export default RecentScans;
