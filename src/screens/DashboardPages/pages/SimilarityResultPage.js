import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Progress, Button, Spin, message } from 'antd';
import moment from "moment";
import { getScanResult, createSubmittedFile, updateScanResult } from "../../../config/Firebase/firebase"
import SimilarCardComponent from "../../../components/SimilarCardComponent";

function SimilarityResultPage({location, history}) {    

    const userData = useSelector(store => store.auth.userData);
    const [scannedResult, setScannedResult] = useState(null);
    const [ isSubmitting, setSubmitting ] = useState(false)


    useEffect(() => {
        const getResultForScanId = async scanId => {
            const response = await getScanResult(scanId);
            setScannedResult(response) 
        }
        const pathNameArray = location.pathname.split('/');
        let scanId = pathNameArray[pathNameArray.length-2];
        getResultForScanId(scanId);
    }, [location.pathname])

    const handleSubmit = async () => {
        /**
         * full name, matric, assignemt name, score, coursecode,fileurl, scanid, grade
         */
        setSubmitting(true);
        try {
            const payload = {
                studentName: `${userData.firstname} ${userData.lastname}`,
                matricNo: userData.matricNo,
                assignmentName: scannedResult.assignmentName,
                similarityScore: scannedResult.results.score.aggregatedScore,
                courseCode: scannedResult.courseCode,
                fileUrl: scannedResult.fileUrl,
                scanId: scannedResult.scanId,
                timeSubmitted: moment().format('MMM Do, YYYY'),
                status: "pending",
                userId: userData.uid,
            }

            const updateSubmittedStatePayload = {
                scanId: scannedResult.scanId,
                isSubmitted: true
            }
            await createSubmittedFile(payload);
            await updateScanResult(updateSubmittedStatePayload);
            message.success("Successfully submitted. Redirecting to submission list in 3 seconds.")
            setTimeout(() => {
                history.push("/dashboard/recent-submissions");
            }, 3000);
            

        } catch (error) {
            message.error(error.message)
        } finally {
            setSubmitting(false)
        }
    }

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
                        status="normal"
                        percent={scannedResult.results.score.aggregatedScore} 
                    />
                    <div >
                        <Button
                        className="submit-button-container"
                            disabled={scannedResult.results.score.aggregatedScore > 15}
                            size="large"
                            type="primary"
                            onClick={handleSubmit}
                            loading={isSubmitting}
                        >
                            Submit Assignment
                        </Button>
                    </div>
                    {
                    scannedResult.results.score.aggregatedScore > 15 && (
                        <p className="warning-text">Your plagiarism score is too high. Please modify your assignment and scan again.</p>
                    )
                    }
                </div>
                <div className="similarity-result-websites">
                    <h1>Online sources referenced</h1>
                    {
                        scannedResult.results.internet.slice(0,3).map(webpage => (
                            <div key={webpage.id} className="similarity-result-website-card">
                                <a href={webpage.url}>
                                    <SimilarCardComponent 
                                        title={webpage.title}
                                        content={webpage.introduction}
                                        matchedWordsCount={webpage.matchedWords}
                                    />
                                </a>
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>
        
    )
}

export default SimilarityResultPage;