import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Tag, Input, Select, message } from 'antd';
import { getAllSubmittedFiles } from "../../../config/Firebase/firebase";
import moment from "moment";

const { Search } = Input;
const { Option } = Select;

const colorMapping = {
  graded: 'green',
  pending: 'blue'
}

const parseResult = (item) => {
  return {
    key: item.scanId,
    assignmentName: item.assignmentName,
    scanId: item.scanId,
    courseCode: item.courseCode.toUpperCase(),
    timeSubmitted: moment(item.timeSubmitted).format('LLL'),
    status: item.status,
    similarityScore: item.similarityScore + " %",
    fileUrl: item.fileUrl,
    assignmentScore: item.assignmentScore
  }
}

function RecentSubmissions() {        

  const userId = useSelector(store => store.auth.userData.uid);

  const [submittedFiles, setSubmittedFiles] = useState([]);

  useEffect(() => {
      const getAllSubmittedFilesForUser = async (filter, value) => {
        try{
          const response = await getAllSubmittedFiles(filter, value);
          const reformattedScannedResults = response.map(parseResult)
          setSubmittedFiles(reformattedScannedResults) 
        } catch (error) {
          message.error(error.message);
        }
      }
      getAllSubmittedFilesForUser("userId", userId);
  }, [userId])


  const columns = [
    {
      title: 'Assignment Name',
      dataIndex: 'assignmentName',
    },
    {
      title: 'Course Code',
      dataIndex: 'courseCode',
    },
    {
      title: 'Scan ID',
      dataIndex: 'scanId',
      render: scanId => <Link to={`/dashboard/scan/${scanId}/results`}>{scanId}</Link>
    },
    {
      title: 'Similarity Score',
      dataIndex: 'similarityScore',
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
      title: 'Time Submitted',
      dataIndex: 'timeSubmitted',
    },
    {
      title: 'Assignment Score',
      dataIndex: 'assignmentScore',
      render: (assignmentScore) => (
        <span>{(assignmentScore !== "" && -100 <= assignmentScore && assignmentScore <= 100) ? assignmentScore : "-"}</span>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, item) => (
        <div>
          <a href={item.fileUrl} rel="noopener noreferrer" target="_blank">View document</a>
        </div>
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
        <Table columns={columns} dataSource={submittedFiles} />
      </>
      
  )
}

export default RecentSubmissions;
