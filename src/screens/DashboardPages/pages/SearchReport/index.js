import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from 'antd';
import CompanyComponent from './CompanyComponent'
import BusinessComponent from './BusinessComponent';
import IncorporatedComponent from './IncorporatedComponent';
import ConfirmModalComponent from '../../../../components/ConfirmModalComponent';
import { postSubmitReport } from '../../../../store/actions/searchReport';

const { Option }  = Select;

function SearchReport({match}) {    
    const requestId = match.params.id;

    const searchReport = useSelector((store) => store.searchReport);
    const actionDispatch = useDispatch();
    const postSubmitReportDispatch = useCallback((requestId, data) => actionDispatch(postSubmitReport(requestId, data)),[actionDispatch]);

    const [organizationType, setOrganizationType] = useState('Incorporated');

    const onChange = (value) => {
        setOrganizationType(value)
    }

    const renderReportForm = () => {
        let form;

        if(organizationType === 'Incorporated') {
            form = <IncorporatedComponent requestId={requestId} />
        } else if (organizationType === 'Company') {
            form = <CompanyComponent requestId={requestId} />
        } else if (organizationType === 'Business') {
            form = <BusinessComponent requestId={requestId} />
        }

        return form;
    }

    const submitRerport = () => {
        const reportBody = searchReport[requestId];
        postSubmitReportDispatch(requestId, reportBody)
    };

    return (
        <div id="search-report-type">
            <Select
                className='search-report-dropdown'
                defaultValue={organizationType}
                onChange={onChange}
                placeholder={'Select one please'}
                size='large'
                filterOption={(input, option) => 
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                <Option value='Incorporated'>Incorporated Trustees</Option>
                <Option value='Company'>Company</Option>
                <Option value='Business'>Business</Option>
            </Select>

            {
              renderReportForm()
            }

            <ConfirmModalComponent disabled={false} title="Do you want to be submit this form?" content={'Proceed?'} confirmText="Submit report" performAction={submitRerport}/>
        </div>

    )
}

export default SearchReport;