//import React from 'react';
import React, { Component } from 'react';
import { render } from 'react-dom';
import Router from './components/Router';
import './css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';



render(<Router />, document.querySelector('#main'));
//render(<StorePicker />, document.getElementById('main'));