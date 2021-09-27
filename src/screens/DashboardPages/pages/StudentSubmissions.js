import React, { useState, useEffect,useMemo } from 'react';
import { useSelector } from "react-redux";
import { Table, Input, Select, message } from 'antd';
import { getAllSubmittedFiles, updateSubmittedFile, deleteSubmittedFile } from "../../../config/Firebase/firebase"
import moment from "moment";
import ConfirmComponent from '../../../components/ConfirmModalComponent';

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

  const getAllSubmittedFilesForUser = useMemo(() => async (filter, value) => {
    try{
      const response = await getAllSubmittedFiles(filter, value);
      const reformattedSubmittedFiles = response.map(parseResult);
      const rowKeys = reformattedSubmittedFiles
        .filter(item => item.status === "graded")
        .map(item => item.key);
      setSubmittedFiles(reformattedSubmittedFiles);
      setSelectedRowKeys(rowKeys);
    } catch (error) {
      message.error(error.message);
    }  
  }, [])

  useEffect(() => {
      
      getAllSubmittedFilesForUser("courseCode", lecturerData.lecturer_courses[0]);
  }, [lecturerData.lecturer_courses, getAllSubmittedFilesForUser])

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
        if (selected && (!updateGradedStatus.assignmentScore || updateGradedStatus.assignmentScore === "")) {
            throw new Error("You forgot to add the score")
        }
        await updateSubmittedFile(updateGradedStatus);
      } catch (error) {
        message.error(error.message)
      }
    }
  };

  const deleteSelectedSubmittedFile = async (scanId) => {
    try {
      await deleteSubmittedFile(scanId);
      const filteredSubmittedFile = submittedFiles.filter(file => file.scanId !== scanId);
      const filteredSelectedRowKeys = selectedRowKeys.filter(key => key !== scanId);
      setSubmittedFiles(filteredSubmittedFile);
      setSelectedRowKeys(filteredSelectedRowKeys);
    } catch(error) {
      message.error("Something went wrong. Please try again");
    }
}

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
            onChange={handleAssignmentScoreChange}
        />
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, submission) => (
        <div style={{display: "flex", width: "100%", justifyContent:"space-between"}}>
            <a href={submission.fileUrl} rel="noopener noreferrer" target="_blank">View document</a>
            <ConfirmComponent iconType="delete" performAction={() => deleteSelectedSubmittedFile(submission.scanId)}/>
        </div>
     ),
    },
  ];

  const handleSearch = (value) => {
    const filteredSubmittedFiles = submittedFiles.filter((file) => file.matricNo.toLowerCase().startsWith(value.toLowerCase()));
    setSubmittedFiles(filteredSubmittedFiles);
  }

  const handleChange = async value => {
    const response = await getAllSubmittedFiles("courseCode", value);
    const reformattedSubmittedFiles = response.map(parseResult);
    const rowKeys = reformattedSubmittedFiles
            .filter(item => item.status === "graded")
            .map(item => item.key);
    setSubmittedFiles(reformattedSubmittedFiles);
    setSelectedRowKeys(rowKeys);
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
              placeholder="Search by matric number"
              onSearch={handleSearch}
              style={{height: 67, maxWidth: '20rem'}}
            />
          </div>
          <div className='sort-filter'>
            <p className='sort-filter__title'>Filter By :</p>
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