import React, { Component } from 'react';
import './App.css';
import View from './View.js'
const data1 = {
  "values": [
      { "a": "A", "b": 28 }, { "a": "B", "b": 55 }, { "a": "C", "b": 43 },
      { "a": "D", "b": 91 }, { "a": "E", "b": 81 }, { "a": "F", "b": 53 },
      { "a": "G", "b": 19 }, { "a": "H", "b": 87 }, { "a": "I", "b": 52 }
  ]
};

class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="App">
          <textarea 
          cols="40" 
          rows="20"
          ref={(div)=> this.divTarget=div}>
          </textarea>
          <View data={data1}></View>
          <div id="vis"></div>
          <button>

          </button>
      </div>
    );
  }
}

export default App;
