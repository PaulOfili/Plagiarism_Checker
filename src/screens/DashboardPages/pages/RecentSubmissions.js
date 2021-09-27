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

const parseResponse = (item) => {
  return {
    key: item.scanId,
    assignmentName: item.assignmentName,
    scanId: item.scanId,
    courseCode: item.courseCode.toUpperCase(),
    timeCreated: -item.timeSubmitted,
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
  const [allSubmittedFiles, setAllSubmittedFiles] = useState({});
  const [sortingKey, setSortingKey ] = useState("timeCreated");


  useEffect(() => {
      const getAllSubmittedFilesForUser = async (filter, value) => {
        try{
          const response = await getAllSubmittedFiles(filter, value);
          const reformattedSubmittedFiles = response.map(parseResponse)
          setSubmittedFiles(reformattedSubmittedFiles);
          setAllSubmittedFiles(reformattedSubmittedFiles);
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
    const filteredSubmittedFiles = allSubmittedFiles.filter((result) => result.assignmentName.toLowerCase().startsWith(value.toLowerCase()));
    filteredSubmittedFiles.sort((a, b) => sortingCompare(a, b, sortingKey));
    setSubmittedFiles(filteredSubmittedFiles)
  }

  const sortingCompare = (a, b, key) => {
    if ( a[key] < b[key] ){
      return -1;
    }
    if ( a[key] > b[key] ){
      return 1;
    }
    return 0;
  }

  const handleChange = (value) => {
    let sortedSubmittedFiles = [...submittedFiles];
    sortedSubmittedFiles.sort((a, b) => sortingCompare(a, b, value));
    setSubmittedFiles(sortedSubmittedFiles);
    setSortingKey(value);

  }

  return (
      <>
        <div className='filter-wrapper'>
          <div className='search-filter'>
            <Search
              placeholder="Search by assignment name"
              onSearch={handleSearch}
              style={{height: 67, maxWidth: '20rem'}}
            />
          </div>
          <div className='sort-filter'>
            <p className='sort-filter__title'>Sort By :</p>
            <Select 
              onChange={handleChange} 
              style={{ width: 200 }}
              value={sortingKey}
              size='large'>
              <Option value="timeCreated">Newest first</Option>
              <Option value="assignmentName">Name</Option>
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
