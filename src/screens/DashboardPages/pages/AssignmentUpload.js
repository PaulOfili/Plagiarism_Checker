import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Upload, Icon, Select, Button, message } from 'antd';

const { Dragger } = Upload;

const { Option } = Select;



function AssignmentUpload() { 
    const [fileList, setFileList] = useState([])
    const [scanning, setScanning] = useState(false)

    const handleChange = (value) => {
        console.log(value)
    }

    const handleScan = () => {

    }

    const draggerProps = {
        name: 'file',
        listType: 'picture',
        onRemove: file => {
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
            <div className='upload-file'>
                <Dragger {...draggerProps}>
                    <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                </Dragger>
                <div className="scan-button-container">
                    <Button
                        style={{opacity: (fileList.length === 0) ? 0: 1}}
                        size="large"
                        type="primary"
                        onClick={handleScan}
                        loading={scanning}
                    >
                        Scan
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default AssignmentUpload;



