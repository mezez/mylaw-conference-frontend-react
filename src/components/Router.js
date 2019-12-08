import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import AddAttendeeToTalk from './AddAttendeeToTalk';
import NotFound from './NotFound';

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>

                <Route exact path='/' component={App} />
                <Route exact path='/add-attendee-to-talk' component={AddAttendeeToTalk} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
};

export default Router;