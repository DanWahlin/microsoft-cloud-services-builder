import React from 'react';
import './App.css';
import ReactFlow from './Components/ReactFlow';
import ServicePicker from './Components/ServicePicker';

function App() {
  return (
    <div className="App">
      <ServicePicker />
      <ReactFlow />
    </div>
  );
}

export default App;
