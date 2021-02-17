import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { Upload, Icon, Select, Button } from 'antd';
import { loadUserFile, createScanResult  } from "../../../config/Firebase/firebase";
import { getSimilarityResult } from "../../../services/checkSimilarityResult"
import { nanoid } from 'nanoid'
import moment from "moment";

const { Dragger } = Upload;

const { Option } = Select;



function AssignmentUpload() { 

    const userId = useSelector(store => store.auth.userData.uid)
    const [fileList, setFileList] = useState([])
    const [scanning, /*setScanning*/] = useState(false)

    const handleChange = (value) => {
    }

    const handleScan = async () => {
        // TODO Complete handle Scan
        // TODO Add the field for name of the assignment which is shown on recent scans page
        try {
            const currentFile = fileList[0]
            const downloadUrl = await loadUserFile(currentFile);
            const uniqueId = nanoid(10).toLowerCase();
            const payload = {
                scanId: uniqueId,
                userId,
                courseCode: "eeg",
                fileUrl: downloadUrl,
                isSubmitted: "NO",
                scanStartTime: moment().format('MMM Do, YYYY')
            }
            await createScanResult(payload);

            const requestBody = {
                fileUrl: downloadUrl,
                scanId: uniqueId,
                userId
            }

            //TODO Display this
            const result = await getSimilarityResult(requestBody);
            console.log(result)
            // await unloadUserFile(downloadUrl);

        } catch (error) {
            console.log(error)
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
                        // disabled={(fileList.length === 0) ? 1: 0}
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



