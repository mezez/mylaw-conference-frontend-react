import React, { Component } from 'react'

export default class AttendeePage extends Component {
    render() {
        return (
            <div>
                <h3>Attendees</h3>
                {
                    this.state.attendees.map(attendee => {
                        if (attendee.name) {
                            return <>
                                <div className='row'>
                                    <p className='col-lg-5'>Name: {attendee.name}</p>
                                    <p className='col-offset-1 col-lg-5'>Email: {attendee.email}</p>

                                </div>

                            </>
                        } else {
                            return <p>No Attendees Available</p>
                        }

                    })}
            </div>
        )
    }
}
