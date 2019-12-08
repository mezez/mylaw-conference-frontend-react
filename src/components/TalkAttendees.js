import React, { Component } from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default class TalkAttendees extends Component {
    static propTypes = {
        attendee: PropTypes.array
    }

    styledDiv = styled.div`
         max-width: 30%;
        border: 1px solid grey;
        padding: 10px;
        box-shadow: 2px 2px 5px 4px #888888;
    `;
    render() {
        if (this.props.attendees.length > 0) {
            return (
                <this.styledDiv className="well">
                    {
                        this.props.attendees.map(attendee => {
                            return <>
                                <p>Name: {attendee.name}</p>
                                <p>Email: {attendee.email}</p>
                            </>
                        })
                    }

                </this.styledDiv>
            )
        } else {
            return <p>No attendees at this time</p>
        }
    }
}
