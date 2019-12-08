import React, { Component } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Talks from './Talks';
import defaultConfig from '../config';
import AddModal from './AddModal';
import AddTalkForm from './AddTalkForm';
import AddAttendeeForm from './AddAttendeeForm';
import openSocket from 'socket.io-client';


class App extends Component {


    state = {
        config: {},
        talks: [],
        talk: {
            title: ""
        },
        attendee: {
            name: "",
            email: ""
        }
    };

    updateTalk = (title) => {
        const updatedTalk = { ...this.state.talk, title: title };
        this.setState({
            talk: updatedTalk
        });
    }

    updateAttendee = (key, value) => {
        const updatedAtt = { ...this.state.attendee, [key]: value };
        this.setState({
            attendee: updatedAtt
        });
    }

    homeRef = React.createRef();
    // aboutRef = React.createRef();
    // projectRef = React.createRef();
    // contactRef = React.createRef();

    scrollToRef = (name) => {
        const ref = this[name];
        console.log(ref);

        if (ref.current) {
            ref.current.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            })
        }
    }

    saveTalk = () => {
        try {
            //save talk
            if (this.state.talk.title === "") {
                throw Error("Title Cannot be Empty");
            }

            fetch('https://mylaw-conference.herokuapp.com/talk', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: this.state.talk.title
                })
            }).then(res => {
                this.setState({ talk: { title: '' } });

                if (res.status !== 201) {
                    throw Error('Could not save talk');
                }
                return res.json();

            }).then(resData => {
                this.addTalk(resData.talk);
            }).catch(err => {
                console.log(err);
                alert('Error Occurred while trying to save talk. Please try again');

            });
        } catch (err) {
            alert("Title Cannot be empty");
        }
    };


    saveAttendee = () => {
        try {
            //save attendee
            if ((this.state.attendee.name === "") || (this.state.attendee.email === "")) {
                throw Error("Name and Email Cannot be Empty");
            }

            fetch('https://mylaw-conference.herokuapp.com/attendee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.attendee.name,
                    email: this.state.attendee.email,
                })
            }).then(res => {
                this.setState({ attendee: { name: '', email: '' } });

                if (res.status !== 201) {
                    throw Error('Could not save attendee');
                }
                return res.json();

            }).then(resData => {
                //console.log(resData);
                alert('Attendee Saved Successfully');

            }).catch(err => {
                alert('An error occurred while saving attendee. Please try again');
                console.log(err);

            });
        } catch (err) {
            alert("Name and Email are required");
        }
    };

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
            this.setState({
                talks: resData.talks
            });
        }).catch(err => {
            console.log(err);

        });
    }

    updateTalksAferDelete = (talks) => {
        this.setState({ talks: talks, attendee: { name: "", email: "" } });
    }

    addTalk = (talk) => {
        const updatedTalks = [...this.state.talks];
        updatedTalks.unshift(talk);
        this.setState({
            talks: updatedTalks
        });
    }

    modalDiv = styled.div`
        margin-top:5rem;
        margin-left:0rem;
        width:98%;
        
        padding: 10px;
        box-shadow: 2px 2px 5px 4px #888888;
    `;

    async componentDidMount() {
        this.getTalks();
        this.setState({
            config: defaultConfig
        });

        const socket = openSocket('https://mylaw-conference.herokuapp.com');
        socket.on('talks', data => {
            if (data.action === 'create') {

                //note that create was set on the emit() on server
                this.addTalk(data.talk);

            }
        });
    }

    styledContainer = styled.div`
        width:90%;
    `;


    render() {
        return (
            <this.styledContainer className='container-fluid'>
                <div className='row' ref={this.homeRef}><Header history={this.props.history} brand={this.state.config.brand} scrollToRef={this.scrollToRef} /></div>
                <br />
                <this.modalDiv className='row'>
                    <AddModal form={<AddTalkForm set={this.updateTalk} value={this.state.talk} />} modalTitle={"Add Talk"} buttonLabel={"Add Talk"} save={this.saveTalk} />{"*"}
                    <AddModal form={<AddAttendeeForm set={this.updateAttendee} value={this.state.attendee} />} modalTitle={"Add Attendee"} buttonLabel={"Add Attendee"} save={this.saveAttendee} />
                </this.modalDiv>

                <Talks updateTalksAferDelete={this.updateTalksAferDelete} talks={this.state.talks} />
            </this.styledContainer>
        );
    }
}


export default App;