import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTrustee, removeTrustee, editTrustee } from '../../../../store/actions/searchReport';
import { Button, Icon, Card } from 'antd';
import PlaceDateComponent from './CommonFields/CommonFieldsComponent';


function IncorporatedComponent({requestId}) {    

    const searchReport = useSelector((store) => store.searchReport);

    const actionDispatch = useDispatch();
    const addTrusteeDispatch = useCallback((requestId) => actionDispatch(addTrustee(requestId)),[actionDispatch]);
    const removeTrusteeDispatch = useCallback((requestId, trusteeIndex) => actionDispatch(removeTrustee(requestId, trusteeIndex)),[actionDispatch]);
    const editTrusteeDispatch = useCallback((requestId, trusteeIndex, data) => actionDispatch(editTrustee(requestId, trusteeIndex, data)), [actionDispatch])

    return (
        <div className="search-report-container">
            <form>
                <PlaceDateComponent type="incorporation" requestId={requestId}/>
                <div id="search-report-trustees">
                    <h3>Particulars of Trustees</h3>
                    {
                        searchReport[requestId].trustees.map((value, index) => {
                            const nameId = `name-${index}`;
                            const addressId = `address-${index}`;
                            
                            return (
                                <Card 
                                    key={`trustee-${index}`} 
                                    title={`Trustee details ${index+1}`} 
                                    extra={<Icon type='close' onClick={(event) => removeTrusteeDispatch(requestId, index)} />}>
                            
                                    <div className="form-group">
                                        <input 
                                            onChange={(e) => editTrusteeDispatch(requestId, index, e.target)}
                                            value={value.name}
                                            className="form__input" 
                                            type="text" 
                                            data-idx={index} 
                                            id={nameId} 
                                            name="name" 
                                            required
                                        />
                                        <label className="form__label" htmlFor={nameId}>Name of Trustee</label>
                                    </div>
                                    <div className="form-group">                                        
                                        <input 
                                            onChange={(e) => editTrusteeDispatch(requestId, index, e.target)}
                                            value={value.address}
                                            className="form__input" 
                                            type="text" 
                                            data-idx={index} 
                                            id={addressId} 
                                            name="address" 
                                            required
                                        />
                                        <label className="form__label" htmlFor={nameId}>Address of Trustee</label>
                                  
                                    </div>
                                </Card>
                            )
                        })
                    }
                    <div style={{textAlign: 'center', marginTop: '2rem'}}>
                        <Button type="dashed" onClick={() => addTrusteeDispatch(requestId)} style={{ width: '30%' }}>
                            <Icon type="plus" /> Trustee
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default IncorporatedComponent;