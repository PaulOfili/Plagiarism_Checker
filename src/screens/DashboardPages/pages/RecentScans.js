import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Table, Tag, Input, Select, message } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getAllScanResults, deleteScanResult } from "../../../config/Firebase/firebase"
import ConfirmComponent from '../../../components/ConfirmModalComponent';

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
    assignmentName: item.assignmentName,
    courseCode: item.courseCode.toUpperCase(),
    timeCreated: -item.scanStartTime,
    scanStartTime: moment(item.scanStartTime).format('LLL'),
    scanFinishTime: (item.scanFinishTime) 
    ?  moment(item.scanFinishTime).format('LLL')
    : "Pending",
    status: (item.status) 
    ? item.status
    : "pending",
    isSubmitted: item.isSubmitted,
    similarityScore: (item.results && item.results.score) 
    ? item.results.score.aggregatedScore
    : "Pending",
    fileUrl: item.fileUrl
  }
}

function RecentScans() {   
  
  const userId = useSelector(store => store.auth.userData.uid);

  const [scannedResults, setScannedResults] = useState([]);
  const [allScannedResult, setAllScannedResults] = useState([]);
  const [sortingKey, setSortingKey ] = useState("timeCreated");

  const deleteSelectedScanResult = async (scanId) => {
      try {
        await deleteScanResult(scanId);
        const filteredAllScans = allScannedResult.filter(scan => scan.scanId !== scanId);
        const filteredScans = scannedResults.filter(scan => scan.scanId !== scanId);
        setAllScannedResults(filteredAllScans);
        setScannedResults(filteredScans);
      } catch(error) {
        message.error(error.message);
      }
  }

  const getAllScannedResultsForUser = async userId => {
    try{
      const response = await getAllScanResults(userId);
      const reformattedScannedResults = response.map(parseResult)
      setAllScannedResults(reformattedScannedResults);
      setScannedResults(reformattedScannedResults) 
    } catch (error) {
      message.error(error.message);
    }
  }

  useEffect(() => {
      getAllScannedResultsForUser(userId);
  }, [userId])

  const columns = [
    {
        title: "Assignment Name",
        dataIndex: "assignmentName",
    },
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
      render: score => (score === "Pending" ? "Pending" : score + " %")
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
          <div style={{display: "flex", width: "100%", justifyContent:"space-between"}}>
              <a href={scan.fileUrl} rel="noopener noreferrer" target="_blank">View document</a>
              <ConfirmComponent iconType="delete" performAction={() => deleteSelectedScanResult(scan.scanId)}/>
          </div>
      ),
    },
  ];

  const handleSearch = (value) => {
    const filteredScanResult = allScannedResult.filter((result) => result.assignmentName.toLowerCase().startsWith(value.toLowerCase()));
    filteredScanResult.sort((a, b) => sortingCompare(a, b, sortingKey));
    setScannedResults(filteredScanResult)
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
    let sortedScanResult = [...scannedResults];
    sortedScanResult.sort((a, b) => sortingCompare(a, b, value));
    setScannedResults(sortedScanResult);
    setSortingKey(value);
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
              onChange={handleChange} 
              style={{ width: 200 }}
              value={sortingKey}
              size='large'>
              <Option value="timeCreated">Newest first</Option>
              <Option value="assignmentName">Name</Option>
              <Option value="similarityScore">Similarity score</Option>
              <Option value="status">Status</Option>
            </Select>
          </div>
        </div>
        <Table columns={columns} dataSource={scannedResults} />
      </>
      
  )
}

export default RecentScans;
