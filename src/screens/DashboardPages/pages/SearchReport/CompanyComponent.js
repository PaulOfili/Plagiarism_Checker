import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addDirector, removeDirector, editDirector } from '../../../../store/actions/searchReport';
import { Button, Icon, Card } from 'antd';
import PlaceDateComponent from './CommonFields/CommonFieldsComponent';


function CompanyComponent({requestId}) {    

    const searchReport = useSelector((store) => store.searchReport);

    const actionDispatch = useDispatch();
    const addDirectorDispatch = useCallback((requestId) => actionDispatch(addDirector(requestId)),[actionDispatch]);
    const removeDirectorDispatch = useCallback((requestId, directorIndex) => actionDispatch(removeDirector(requestId, directorIndex)),[actionDispatch]);
    const editDirectorDispatch = useCallback((requestId, directorIndex, data) => actionDispatch(editDirector(requestId, directorIndex, data)), [actionDispatch])

    return (
        <div className="search-report-container">
            <form>
                <PlaceDateComponent type="company" requestId={requestId}/>
                <div id="search-report-directors">
                    <h3>Particulars of Directors</h3>
                    {
                        searchReport[requestId].directors.map((value, index) => {
                            const nameId = `name-${index}`;
                            const addressId = `address-${index}`;
                            
                            return (
                                <Card 
                                    key={`director-${index}`} 
                                    title={`Director details ${index+1}`} 
                                    extra={<Icon type='close' onClick={(event) => removeDirectorDispatch(requestId, index)} />}>
                            
                                    <div className="form-group">
                                        <input 
                                            onChange={(e) => editDirectorDispatch(requestId, index, e.target)}
                                            value={value.name}
                                            className="form__input" 
                                            type="text" 
                                            data-idx={index} 
                                            id={nameId} 
                                            name="name" 
                                            required
                                        />
                                        <label className="form__label" htmlFor={nameId}>Name of Director</label>
                                    </div>
                                    <div className="form-group">                                        
                                        <input 
                                            onChange={(e) => editDirectorDispatch(requestId, index, e.target)}
                                            value={value.address}
                                            className="form__input" 
                                            type="text" 
                                            data-idx={index} 
                                            id={addressId} 
                                            name="address" 
                                            required
                                        />
                                        <label className="form__label" htmlFor={nameId}>Address of Director</label>
                                  
                                    </div>
                                </Card>
                            )
                        })
                    }
                    <div style={{textAlign: 'center', marginTop: '2rem'}}>
                        <Button type="dashed" onClick={() => addDirectorDispatch(requestId)} style={{ width: '30%' }}>
                            <Icon type="plus" /> Director
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CompanyComponent;