import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import PropTypes from 'prop-types';

class AddAttendeeForm extends Component {
    static propTypes = {
    };

    titleRef = React.createRef();

    handleChange = (event) => {
        //update the fish (to state);
        //take a copy of the fish current fish
        const key = event.currentTarget.name;
        const value = event.currentTarget.value



        this.props.set(key, value);
    }

    render() {
        return (
            <>
                <FormGroup>
                    <Label for="title">Name</Label>
                    <Input type="text" required name="name" id="name" ref={this.nameRef} value={this.props.value.name} onChange={this.handleChange} placeholder="Full name" />
                </FormGroup>
                <FormGroup>
                    <Label for="title">Email</Label>
                    <Input type="email" required name="email" id="name" ref={this.emailRef} value={this.props.value.email} onChange={this.handleChange} placeholder="Email address" />
                </FormGroup>
            </>

        );
    }
}

export default AddAttendeeForm;