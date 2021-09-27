import React from 'react';
import { Modal, Icon } from 'antd';
import PropTypes from 'prop-types';

const { confirm } = Modal
function ConfirmComponent({iconType, disabled, title, content, confirmText, performAction}){

    function showDeleteConfirm() {
      confirm({
        title: 'Are you sure you want to delete this item?',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
            performAction()
        },
      });
    }

    return (
      <div>
        <Icon type={iconType} onClick={showDeleteConfirm} style={{fontSize: '18px', color:'red'}}/>
      </div>
    );
}

ConfirmComponent.propTypes = {
    // title: PropTypes.string.isRequired,
    performAction: PropTypes.func.isRequired,
}

export default ConfirmComponent;