import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const AddModal = (props) => {
    const {
        buttonLabel,
        className,
        modalTitle
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const process = () => {
        setModal(!modal);
        props.save();
    }

    return (
        <div>
            <Button outline color="primary" onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
                <ModalBody>
                    {props.form}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={process}>Save</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default AddModal;