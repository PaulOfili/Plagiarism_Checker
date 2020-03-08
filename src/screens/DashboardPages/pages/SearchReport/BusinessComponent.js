import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProprietor, removeProprietor, editProprietor } from '../../../../store/actions/searchReport';
import { Button, Icon, Card } from 'antd';
import PlaceDateComponent from './CommonFields/CommonFieldsComponent';


function BusinessComponent({requestId}) {    

    const searchReport = useSelector((store) => store.searchReport);

    const actionDispatch = useDispatch();
    const addProprietorDispatch = useCallback((requestId) => actionDispatch(addProprietor(requestId)),[actionDispatch]);
    const removeProprietorDispatch = useCallback((requestId, proprietorIndex) => actionDispatch(removeProprietor(requestId, proprietorIndex)),[actionDispatch]);
    const editProprietorDispatch = useCallback((requestId, proprietorIndex, data) => actionDispatch(editProprietor(requestId, proprietorIndex, data)), [actionDispatch])

    return (
        <div className="search-report-container">
            <form>
                <PlaceDateComponent type="business" requestId={requestId}/>
                <div id="search-report-proprietors">
                    <h3>Particulars of Proprietors</h3>
                    {
                        searchReport[requestId].proprietors.map((value, index) => {
                            const nameId = `name-${index}`;
                            const addressId = `address-${index}`;
                            
                            return (
                                <Card 
                                    key={`proprietor-${index}`} 
                                    title={`Proprietor details ${index+1}`} 
                                    extra={<Icon type='close' onClick={(event) => removeProprietorDispatch(requestId, index)} />}>
                            
                                    <div className="form-group">
                                        <input 
                                            onChange={(e) => editProprietorDispatch(requestId, index, e.target)}
                                            value={value.name}
                                            className="form__input" 
                                            type="text" 
                                            data-idx={index} 
                                            id={nameId} 
                                            name="name" 
                                            required
                                        />
                                        <label className="form__label" htmlFor={nameId}>Name of Proprietor</label>
                                    </div>
                                    <div className="form-group">                                        
                                        <input 
                                            onChange={(e) => editProprietorDispatch(requestId, index, e.target)}
                                            value={value.address}
                                            className="form__input" 
                                            type="text" 
                                            data-idx={index} 
                                            id={addressId} 
                                            name="address" 
                                            required
                                        />
                                        <label className="form__label" htmlFor={nameId}>Address of Proprietor</label>
                                  
                                    </div>
                                </Card>
                            )
                        })
                    }
                    <div style={{textAlign: 'center', marginTop: '2rem'}}>
                        <Button type="dashed" onClick={() => addProprietorDispatch(requestId)} style={{ width: '30%' }}>
                            <Icon type="plus" /> Proprietor
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default BusinessComponent;