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
        const title = event.currentTarget.value
        this.props.set(title);
    }

    render() {
        return (

            <FormGroup>
                <Label for="title">Title</Label>
                <Input type="text" required name="title" id="title" ref={this.titleRef} value={this.props.value.title} onChange={this.handleChange} placeholder="Talk Title" />
            </FormGroup>

        );
    }
}

export default AddTalkForm;