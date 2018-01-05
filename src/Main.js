import React,{Component} from 'react';

import al from './utile/func.js';
al()
var users = [
  { 'user': 'barney ' },
  { 'user': ' fred' }
];
export default class Main extends Component{
  render(){
    return(
      <div>
        { _.map(users, 'user') }
      </div>
    )
  }
}
