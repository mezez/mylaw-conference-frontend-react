import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const AttendeeModal = (props) => {
    const {
        buttonLabel,
        className,
        modalTitle
    } = props;

    const [modal, setModal] = useState(false);

    const customToggle = () => {
        props.setData(props.data);
        setModal(!modal);
    };

    const toggle = () => setModal(!modal);
    const process = () => {
        setModal(!modal);
        props.save();
    }

    const state = props.getState;
    return (
        <div>
            <Button outline color="primary" onClick={customToggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
                <ModalBody>
                    {
                        state.attendees.map(attendee => {
                            if (attendee.name) {
                                return <>

                                    <div className='row'>
                                        <p className='col-lg-5'>Name: {attendee.name}</p>
                                        <p className='col-offset-1 col-lg-5'>Email: {attendee.email}</p>
                                    </div>
                                    <hr />

                                </>
                            } else {
                                return <p>No Attendees Available</p>
                            }

                        })
                    }
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default AttendeeModal;