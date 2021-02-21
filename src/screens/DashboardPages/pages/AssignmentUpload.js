import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { Upload, Icon, Select, Button, Input, message } from 'antd';
import { loadUserFile, createScanResult  } from "../../../config/Firebase/firebase";
import { lecturer_courses } from "../../../config/constants"
import { getSimilarityResult } from "../../../services/checkSimilarityResult"
import { nanoid } from 'nanoid'
import moment from "moment";

const { Dragger } = Upload;

const { Option } = Select;



function AssignmentUpload() { 

    const userId = useSelector(store => store.auth.userData.uid)
    const [ fileList, setFileList ] = useState([])
    const [ courseCode, setCourseCode ] = useState("eeg507")
    const [ assignmentName, setAssignmentName ] = useState("");
    const [ scanning, setScanning ] = useState(false)

    const handleChange = (value) => {
        setCourseCode(value)
    }

    const handleTextChange = (event) => {
        const {value} = event.target
        setAssignmentName(value);
    }

    const handleScan = async () => {
        setScanning(true)
        try {
            const currentFile = fileList[0]
            const downloadUrl = await loadUserFile(currentFile);
            const uniqueId = nanoid(10).toLowerCase();
            const payload = {
                scanId: uniqueId,
                userId,
                assignmentName,
                courseCode,
                fileUrl: downloadUrl,
                isSubmitted: false,
                scanStartTime: moment().format('MMM Do, YYYY')
            }
            await createScanResult(payload);

            const requestBody = {
                fileUrl: downloadUrl,
                scanId: uniqueId,
                userId
            }

            const result = await getSimilarityResult(requestBody);
            message.success(result.message)

        } catch (error) {
            message.error(error.message)
        } finally {
            setScanning(false)
        }
    }

    const draggerProps = {
        name: 'file',
        listType: 'picture',
        onRemove: () => {
            setFileList([])
        },
        beforeUpload: file => {
            setFileList([file])
            return false;
        },
        fileList
      };

    return (
        <div className='upload-container'>
            <div className='select-course'>
                <p>Select Course</p>
                <Select 
                    onChange={handleChange} 
                    value={courseCode}
                    style={{ width: 200 }}
                    size='large'>
                    {lecturer_courses.map(course => 
                        (
                            <Option key={course.key}>{course.value}</Option>
                        )
                    )}
                </Select>
                <div className='assignment-name'>
                    <p>Enter Assignment Name</p>
                    <Input 
                        onChange={handleTextChange} 
                        value={assignmentName}
                        style={{ width: 400 }}
                        size='large'>
                    </Input>
                </div>
            </div>
            <div className='upload-file'>
                <div className="upload-file-dragger">
                    <Dragger {...draggerProps}>
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    </Dragger>  
                </div>
                <div className="scan-button-container">
                    <Button
                        disabled={(fileList.length === 0 || assignmentName === "") ? 1: 0}
                        size="large"
                        type="primary"
                        onClick={handleScan}
                        loading={scanning}
                    >
                        {/* TODO Loader for all spinners */}
                        Scan
                    </Button>
                </div>
            </div>
            
        </div>
    )
}

export default AssignmentUpload;



