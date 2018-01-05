import React,{Component} from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter,Route,Switch } from 'react-router-dom';

import './css/index.less';
var json = require('../config.json');
import Main from './Main.js';

const routers = (<BrowserRouter>
  <Switch>
    <Route path="/" component={Main}/>
  </Switch>
</BrowserRouter>)

const RootElement = document.getElementById('title');
ReactDom.render(<div>{routers}</div>,RootElement);
