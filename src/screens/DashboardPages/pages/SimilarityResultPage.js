import React, { useState, useEffect } from 'react';
import { Card, Progress, Button, Spin } from 'antd';
import moment from "moment";
import { getScanResult } from "../../../config/Firebase/firebase"

function SimilarityResultPage({location}) {    

    // const getResultForScanId = useCallback((data) => getScanResults(data), []);
    const [scannedResult, setScannedResult] = useState(null);

    useEffect(() => {
        const getResultForScanId = async scanId => {
            const response = await getScanResult(scanId);
            setScannedResult(response) 
        }
        const pathNameArray = location.pathname.split('/');
        let scanId = pathNameArray[pathNameArray.length-2];
        getResultForScanId(scanId);
    }, [location.pathname])

    if (scannedResult === null) {
        return <Spin size="large"/>
    }

    return (
        <div className="similarity-result-container">
            <div className="similarity-result__metrics">
                <div className="similarity-result__metrics-box" style={{background: "#fff"}}>
                    <h2>Total Word Count</h2>
                    <p>{scannedResult.scannedDocument.totalWords}</p>
                </div>
                <div className="similarity-result__metrics-box" style={{background: "#fff"}}>
                    <h2>Identical Word Count</h2>
                    <p>{scannedResult.results.score.identicalWords}</p>
                </div>
                <div className="similarity-result__metrics-box" style={{background: "#fff"}}>
                    <h2>Time Created</h2>
                    <p>{moment(scannedResult.scannedDocument.creationTime).format('MMM Do, YYYY')}</p>
                </div>
            </div>
            <div className="similarity-result-score-container">
                <div className="similarity-result-score">
                    <h1>Similarity Score</h1>
                    <Progress 
                        type="circle" 
                        strokeWidth={8}
                        width={240}
                        // strokeColor="#F3E197"
                        status="normal"
                        percent={scannedResult.results.score.aggregatedScore} 
                    />
                    <div >
                        <Button
                        className="submit-button-container"
                            // disabled={(fileList.length === 0) ? 1: 0}
                            size="large"
                            type="primary"
                            // onClick={handleScan}
                            // loading={submitting}
                        >
                            Submit Assignment
                        </Button>
                </div>
                </div>
                <div className="similarity-result-websites">
                    <h1>Online sources referenced</h1>
                    {
                        scannedResult.results.internet.map(webpage => (
                            <div key={webpage.id} className="similarity-result-website-card">
                                <Card title={webpage.title} style={{ width: 300 }}>
                                    <p>{webpage.introduction}</p>
                                    <p>{webpage.matchedWords}</p>
                                </Card>
                            </div>
                        ))
                    }
                    <div className="similarity-result-website-card">
                        <Card title="This is a title 1" style={{ width: 300 }}>
                            <p>Card content</p>
                        </Card>
                    </div>
                </div>
            </div>

        </div>
        
    )
}

export default SimilarityResultPage;