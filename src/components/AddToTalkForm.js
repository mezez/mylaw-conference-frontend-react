import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import PropTypes from 'prop-types';

class AddTalkForm extends Component {
    static propTypes = {
    };

    titleRef = React.createRef();

    handleChange = (event) => {
        //update the fish (to state);
        //take a copy of the fish current fish
        const talkId = event.currentTarget.value
        this.props.setTalkInfo(this.props.attendeeId, talkId);
    }

    render() {
        return (

            // <FormGroup>
            //     <Label for="title">Talk</Label>
            //     <Input type="text" name="title" id="title" ref={this.titleRef} value={this.props.value.title} onChange={this.handleChange} placeholder="Talk Title" />
            // </FormGroup>

            <FormGroup>
                <Label for="talk">Choose Talk</Label>
                <Input ref={this.titleRef} onChange={this.handleChange} empty='Please Select' type="select" name="select" id="select">
                    <option value=''>Please Select a Talk</option>
                    {this.props.talks.map((talk, index) => {
                        return <option value={talk._id} key={index}>{talk.title}</option>
                    })}

                </Input>
            </FormGroup>

        );
    }
}

export default AddTalkForm;