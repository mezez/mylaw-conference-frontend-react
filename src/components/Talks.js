import React, { Component, useState } from 'react'
import { Button } from 'reactstrap'
import styled from 'styled-components';
import TalkAttendees from './TalkAttendees';
import AttendeeModal from './AttendeeModal';
import PropTypes from 'prop-types';
import { thisExpression } from '@babel/types';

export default class Talks extends Component {

    state = {
        talk: "",
        attendees: [
            { email: "" }
        ]
    };

    static propTypes = {
        talks: PropTypes.object
    }

    styledDiv = styled.div`
        margin-top:2rem;
        margin-bottom:1rem;
        width: 98%;
        margin-left:1rem;
        border: 1px solid grey;
        padding: 10px;
        box-shadow: 2px 2px 5px 4px #888888;
    `;

    attDiv = styled.div`
    padding:1rem;

    .styledButton {
        margin-left: 1rem;
    }
    `;


    setAttendees = () => {

        return (
            //display attendee component
            <TalkAttendees attendees={this.state.attendees} />
        );
    }

    setData = (data) => {
        this.setState(data);
    }

    removeTalk = (index, talkId) => {

        const url = 'https://mylaw-conference.herokuapp.com/delete-talk/' + talkId;
        console.log(url);

        fetch(url, {
            method: 'POST',
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            // body: JSON.stringify({
            //     title: this.state.title
            // })
        }).then(res => {
            if (res.status !== 200) {
                throw Error('Could not delete talk');
            }
            return res.json();

        }).then(resData => {
            this.setState({ talk: "", attendees: [] });
            const talks = this.props.talks;
            //const arrIndex = (talks.length - 1) - index;
            talks.splice(index, 1);
            this.props.updateTalksAferDelete(talks);

        }).catch(err => {
            alert('An error occurred while deleting talk');
            console.log(err);

        });
    }

    render() {
        return (
            <div className='row'>

                <>
                    <this.styledDiv>
                        {
                            this.props.talks.map((talk, index) => {
                                if (talk) {
                                    const { attendees } = talk;
                                    const data = { talk: talk.title, attendees: attendees };
                                    return (
                                        <>
                                            <h4>{talk.title}</h4>
                                            <this.attDiv className='row'>

                                                {
                                                    <AttendeeModal data={data} getState={this.state} modalTitle={`${talk.title} Attendees`} buttonLabel={"View Attendees"} setData={this.setData} />
                                                }*
                                                <Button outline color="danger" onClick={
                                                    () => {

                                                        this.removeTalk(index, talk._id);

                                                    }
                                                }>Remove</Button>
                                            </this.attDiv>
                                            <hr />
                                        </>
                                    )
                                } else {
                                    return <p>No Talks Available</p>
                                }
                            })
                        }
                    </this.styledDiv >

                </>

            </div>
        )
    }
}

