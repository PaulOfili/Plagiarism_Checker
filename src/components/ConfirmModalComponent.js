import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'antd';
import PropTypes from 'prop-types';
import { showConfirmModal, hideConfirmModal } from '../store/actions/confirmModal';

function ConfirmComponent({disabled, title, content, confirmText, performAction}){

  const confirmModalOptions = useSelector((store) => store.confirmModal);


    const actionDispatch = useDispatch();
    const showConfirmModalDispatch = useCallback(() => actionDispatch(showConfirmModal()),[actionDispatch]);
    const hideConfirmModalDispatch = useCallback(() => actionDispatch(hideConfirmModal()),[actionDispatch]);

    const showModal = () => {
        showConfirmModalDispatch();
    };

    const handleOk = () => {
        performAction();
  };

    const handleCancel = () => {
      hideConfirmModalDispatch();
    };

    const displayedContent = typeof content === 'object' ? content.map(request => (<p>{request.name}</p>))
                                                        : content

    return (
      <div>
        <Button type="primary" onClick={showModal} disabled={disabled} className="confirm-modal__button">
          {confirmText}
        </Button>
        <Modal
          title={title}
          visible={confirmModalOptions.isVisible}
          onOk={handleOk}
          confirmLoading={confirmModalOptions.isLoading}
          onCancel={handleCancel}
        >
          {displayedContent}
        </Modal>
      </div>
    );
}

ConfirmComponent.propTypes = {
    disabled: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string
        })
      ), 
      PropTypes.string
    ]).isRequired,
    performAction: PropTypes.func.isRequired,
}

export default ConfirmComponent;