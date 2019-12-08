import React, { Component, useState } from 'react'
import { Button } from 'reactstrap'
import styled from 'styled-components';
import TalkAttendees from './TalkAttendees';
import PropTypes from 'prop-types';

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
        margin-top:3rem;
        margin-left:0rem;
        border-radius: 5%;
        border: 1px solid grey;
        padding: 10px;
        box-shadow: 2px 2px 5px 4px #888888;
    `;

    attDiv = styled.div`
    position: fixed;
    opacity:1;
	top: 1;
	overflow: hidden;
    z-index: 1000;
    background-color:white;
    margin-left:36%;
    margin-top:3rem;
    border: 1px solid grey;
    padding: 10px;
    box-shadow: 2px 2px 5px 4px #888888;
    `;

    setAttendees = () => {

        return (
            //display attendee component
            <TalkAttendees attendees={this.state.attendees} />
        );
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
                    <this.styledDiv className='col-lg-4 col'>
                        {
                            this.props.talks.map((talk, index) => {
                                if (talk) {
                                    const { attendees } = talk;
                                    return (
                                        <>
                                            <h4>{talk.title}</h4> <Button outline color="primary" onClick={
                                                () => {
                                                    this.setState({ talk: talk.title, attendees: attendees });

                                                }
                                            }>View Attendees</Button>{' '}
                                            <Button outline color="danger" onClick={
                                                () => {

                                                    this.removeTalk(index, talk._id);

                                                }
                                            }>Remove</Button>
                                            <hr />
                                        </>
                                    )
                                } else {
                                    return <p>No Talks Available</p>
                                }
                            })
                        }
                    </this.styledDiv >
                    <this.attDiv className=' col-lg-6'>
                        <>
                            <h4>Attendees</h4><br />
                            <p>Talk: {this.state.talk}</p><hr />
                            {
                                this.state.attendees.map(attendee => {
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

                                })}
                        </>

                    </this.attDiv>
                </>

            </div>
        )
    }
}

