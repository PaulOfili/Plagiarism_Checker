import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DatePicker, Select } from 'antd';
import { editCommonField } from '../../../../../store/actions/searchReport';
import moment from 'moment';

const { Option }  = Select;

const config = {
    incorporation: {
        companyNameLabel: 'Name of Association',
        companyRegistrationDateLabel: 'Date Of Incorporation'
    },
    business: {
        companyNameLabel: 'Name of Business',
        companyRegistrationDateLabel: 'Date Of Registration'
    },
    company: {
        companyNameLabel: 'Name of company',
        companyRegistrationDateLabel: 'Date Of Incorporation'
    },
}

function PlaceDateComponent({type, requestId}) {    

    const searchReport = useSelector((store) => store.searchReport);

    const actionDispatch = useDispatch();
    const editCommonFieldDispatch = useCallback((requestId, data) => actionDispatch(editCommonField(requestId, data)), [actionDispatch]);


    const onDropdownChange = (value, option, name) => {
        editCommonFieldDispatch(requestId, {name, value})
        // setSearchType(value)
    }

    const onDateChange = (_, dateString, requestId, name) => {
        const dateDate = {name, value: dateString}
        editCommonFieldDispatch(requestId, dateDate)
    }
    return (
        <div>
           <div className="form-group">
                <input 
                    name="placeOfSearch" 
                    value={searchReport[requestId].placeOfSearch}
                    onChange={(e) => editCommonFieldDispatch(requestId, e.target)}
                    className="form__input" 
                    type="text" id="placeOfSearch" 
                    required/>
                <label className="form__label" htmlFor="placeOfSearch">Place of Search</label>
            </div>

            <div className="form-group">
                <label className="form__label-date">Date of Search</label>
                <DatePicker 
                    className="form__input-date"
                    name="dateOfSearch"
                    value={searchReport[requestId].dateOfSearch ? moment(searchReport[requestId].dateOfSearch) : null}
                    onChange={(date, dateString) => onDateChange(date, dateString, requestId, 'dateOfSearch')} 
                    size="large" 
                />
            </div> 
            <div className="form-group">
                <label className="form__label-date">Type of Search</label>
                <Select
                    className='search-report-dropdown'
                    defaultValue={searchReport[requestId].typeOfSearch}
                    onChange={(value) =>onDropdownChange(value,null,'typeOfSearch')}
                    placeholder={'Select one please'}
                    size='large'
                    filterOption={(input, option) => 
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value='Low'>Low</Option>
                    <Option value='Medium'>Medium</Option>
                    <Option value='High'>High</Option>
                </Select>
            </div>
            <div className="form-group">
                <input 
                    name="companyName" 
                    value={searchReport[requestId].companyName}
                    onChange={(e) => editCommonFieldDispatch(requestId, e.target)}
                    className="form__input" 
                    type="text" id="companyName"
                    required/>
                <label className="form__label" htmlFor="companyName">{config[type].companyNameLabel}</label>
            </div>
            <div className="form-group">
                <input 
                    name="registeredAddress" 
                    value={searchReport[requestId].registeredAddress}
                    onChange={(e) => editCommonFieldDispatch(requestId, e.target)}
                    className="form__input" 
                    type="text" id="registeredAddress"
                    required/>
                <label className="form__label" htmlFor="registeredAddress">Registered Office Address</label>
            </div>
            <div className="form-group">
                <label className="form__label-date" htmlFor="dateOfRegistration">{config[type].companyRegistrationDateLabel}</label>
                <DatePicker 
                    className="form__input-date"
                    name="dateOfRegistration"
                    value={searchReport[requestId].dateOfRegistration ? moment(searchReport[requestId].dateOfRegistration) : null}
                    onChange={(date, dateString) => onDateChange(date, dateString, requestId, 'dateOfRegistration')} 
                    size="large" 
                />            
            </div>
            <div className="form-group">
                <input 
                    name="annualReturns" 
                    value={searchReport[requestId].annualReturns}
                    onChange={(e) => editCommonFieldDispatch(requestId, e.target)}
                    className="form__input" 
                    type="number" id="annualReturns"
                    required/>
                <label className="form__label" htmlFor="annualReturns">Annual Returns</label>
            </div>
            <div className="form-group">
                <input 
                    name="registrationNumber" 
                    value={searchReport[requestId].registrationNumber}
                    onChange={(e) => editCommonFieldDispatch(requestId, e.target)}
                    className="form__input" 
                    type="number" id="registrationNumber"
                    required/>
                <label className="form__label" htmlFor="registrationNumber">Registration Number</label>
            </div>
        </div>
    )
}

export default PlaceDateComponent;