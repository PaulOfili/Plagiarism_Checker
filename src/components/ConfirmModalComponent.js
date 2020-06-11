import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Icon } from 'antd';
import PropTypes from 'prop-types';

const { confirm } = Modal
function ConfirmComponent({disabled, title, content, confirmText, performAction}){

    function showDeleteConfirm() {
      confirm({
        title: 'Are you sure delete this task?',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          console.log('OK');
        },
      });
    }

    return (
      <div>
        <Icon type="delete" onClick={showDeleteConfirm} style={{fontSize: '18px', color:'red'}}/>
      </div>
    );
}

ConfirmComponent.propTypes = {
    title: PropTypes.string.isRequired,
    performAction: PropTypes.func.isRequired,
}

export default ConfirmComponent;