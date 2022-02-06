import React from 'react';
import './App.css';
import ReactFlow from './Components/ReactFlow';
import CloudServicePicker from './Components/CloudServicePicker';

function App() {
  return (
    <div className="App">
      <CloudServicePicker />
      <ReactFlow />
    </div>
  );
}

export default App;
