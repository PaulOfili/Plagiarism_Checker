import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Table, Input, Select, message } from 'antd';
import { getAllSubmittedFiles, updateSubmittedFile } from "../../../config/Firebase/firebase"
import moment from "moment";

const { Search } = Input;
const { Option } = Select;

const parseResult = (item) => {
  return {
    key: item.scanId,
    fullName: item.studentName,
    matricNo: item.matricNo,
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

function StudentSubmissions() {    

  const lecturerData = useSelector(store => store.auth.userData);
  const [ submittedFiles, setSubmittedFiles ] = useState([]);
  const [ selectedRowKeys, setSelectedRowKeys ] = useState([]);

  useEffect(() => {
      const getAllSubmittedFilesForUser = async (filter, value) => {
        try{
          const response = await getAllSubmittedFiles(filter, value);
          const reformattedScannedResults = response.map(parseResult)
          const rowKeys = reformattedScannedResults
            .filter(item => item.status === "graded")
            .map(item => item.key);

          setSubmittedFiles(reformattedScannedResults) 
          setSelectedRowKeys(rowKeys);
        } catch (error) {
          message.error(error.message);
        }
          
      }
      getAllSubmittedFilesForUser("courseCode", lecturerData.lecturer_courses[0]);
  }, [lecturerData.lecturer_courses])

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys, selectedRows) => {
      setSelectedRowKeys(newSelectedRowKeys)
    },
    onSelect: async (record, selected) => {
      const updateGradedStatus = {
        scanId: record.key,
        status: (selected) ? "graded" : "pending",
        assignmentScore: (selected) ? record.assignmentScore : ""
      }
      try {
        await updateSubmittedFile(updateGradedStatus);
      } catch (error) {
        message.error(error.message)
      }
    }
  };

  const columns = [
    {
        title: 'Full Name',
        dataIndex: 'fullName',
    },
    {
        title: 'Matric No',
        dataIndex: 'matricNo',
    },
    {
      title: 'Assignment Name',
      dataIndex: 'assignmentName',
    },
    {
      title: 'Course Code',
      dataIndex: 'courseCode',
    },
    {
      title: 'Similarity Score',
      dataIndex: 'similarityScore',
    },
    {
      title: 'Time Submitted',
      dataIndex: 'timeSubmitted',
    },
    {
      title: 'Assignment Score',
      dataIndex: 'assignmentScore',
      render: (score, submission) => (
        <input type="number" 
              defaultValue={score} 
              max="100"
              data-key={submission.key}
              disabled={selectedRowKeys.includes(submission.key)} 
              style={{width:"60px", borderWidth: "1px"}} 
              onChange={handleAssignmentScoreChange}/>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, submission) => (
        <div>
          <a href={submission.fileUrl} rel="noopener noreferrer" target="_blank">View document</a>
        </div>
        ),
    },
  ];

  const handleSearch = (value) => {
  }

  const handleChange = async value => {
    try {
      const response = await getAllSubmittedFiles("courseCode", value)
      const reformattedScannedResults = response.map(parseResult);
      setSubmittedFiles(reformattedScannedResults) ;
    } catch (error) {
      message.error("An error occured. Please try again.")
    } 
  }

  const handleAssignmentScoreChange = event => {
    const value = event.target.value;
    const inputKey = event.target.dataset["key"];

    const newSubmittedFiles = submittedFiles.map(item => (item.key !== inputKey) ? item : {...item, assignmentScore: value});
    setSubmittedFiles(newSubmittedFiles);
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
            <p className='sort-filter__title'>Filter By :</p>
            {/* <Select 
              defaultValue="name" 
              onChange={handleChange} 
              style={{ width: 200 }}
              size='large'>
              <Option value="name">Name</Option>
              <Option value="newest">Newest first</Option>
              <Option value="similarity">Similarity score</Option>
              <Option value="status">Status</Option>
            </Select> */}
            <Select 
              defaultValue={lecturerData.lecturer_courses[0]}
              onChange={handleChange} 
              style={{ width: 200 }}
              size='large'>
             {lecturerData.lecturer_courses.map(course => 
                  (
                    <Option key={course}>{course.toUpperCase()}</Option>
                  )
              )}
            </Select>
          </div>
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={submittedFiles} />
      </>
      
  )
}

export default StudentSubmissions;