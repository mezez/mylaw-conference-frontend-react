import React, { Component } from 'react'
import { Button } from 'reactstrap'
import AddToTalkForm from './AddToTalkForm';
import Header from './Header';
import AddModal from './AddModal';
import styled from 'styled-components';

export default class AddAttendeeToTalk extends Component {

    state = {
        talks: [],
        attendees: [],
        attendeeId: '',
        talkId: '',
    };

    setTalkInfo = (attendeeId, talkId) => {
        this.setState({ talkId: talkId, attendeeId: attendeeId });
    }

    saveAttendeeToTalk = (attendeeId, talkId) => {
        //save talk

        fetch(`https://mylaw-conference.herokuapp.com/add-to-talk/${this.state.attendeeId}/${this.state.talkId}`, {
            method: 'POST'
        }).then(res => {
            this.setState({ attendeeId: '', talkId: '' });

            if (res.status !== 201) {
                throw Error('Could not add attendee to talk');
            }
            return res.json();

        }).then(resData => {
            //console.log(resData);
            alert('Attendee has been added to talk');
        }).catch(err => {
            console.log(err);
            alert('Error Occurred while adding attendee to talk. Please try again');

        });
    }

    getTalks = () => {
        const url = "https://mylaw-conference.herokuapp.com/talks"
        fetch(url, {
            method: "GET"
        }).then(res => {
            if (res.status !== 200) {
                throw new Error("Could not get talks");
            }

            return res.json();
        }).then(resData => {
            console.log(resData.talks);

            this.setState({
                talks: resData.talks
            });
        }).catch(err => {
            console.log(err);

        });
    }

    getAttendees = () => {
        const url = "https://mylaw-conference.herokuapp.com/attendees"
        fetch(url, {
            method: "GET"
        }).then(res => {
            if (res.status !== 200) {
                throw new Error("Could not get attendees");
            }

            return res.json();
        }).then(resData => {
            console.log(resData.attendees);

            this.setState({
                attendees: resData.attendees
            });
        }).catch(err => {
            console.log(err);

        });
    }

    componentDidMount() {

        this.getTalks();
        this.getAttendees();

    }


    styledForm = styled.div`
        margin: 5%;
        @media (max-width: 1300px){
        margin-top: 15%;
    }
    `;
    styledDiv = styled.div`
        margin-left: 5%;
    `;



    render() {
        return (
            <>
                <this.styledDiv className='row' ref={this.homeRef}><Header history={this.props.history} brand={'Mylaw Conference'} /></this.styledDiv>
                <br />
                <this.styledForm>
                    {
                        this.state.attendees.map((attendee, attendeeIndex) => {
                            return <> <div className='row'>
                                <div className='col-lg-3'><p>Name: {attendee.name}</p></div>
                                <div className='col-offset-1 col-lg-8'>
                                    <AddModal modalTitle={`Add ${attendee.name} to talk`} save={this.saveAttendeeToTalk} buttonLabel={`Add ${attendee.name} to talk`} form={<AddToTalkForm attendeeId={attendee._id} setTalkInfo={this.setTalkInfo} talks={this.state.talks} />} />
                                </div>

                            </div>
                                <hr />
                            </>

                        })
                    }

                </this.styledForm>
            </>
        )
    }
}
