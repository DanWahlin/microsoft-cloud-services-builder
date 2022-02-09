import React from 'react';
import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from '@mui/material';

import './App.css';
import ReactFlow from './Components/ReactFlow';
import CloudServicePicker from './Components/CloudServicePicker';
import TabPanel from './Components/TabPanel';

function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <main>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            <img src="/images/microsoft-logo.svg" alt="icon" className="icon"></img> Microsoft Cloud Blocks
          </Typography>
        </Toolbar>
      </AppBar>

      <div className="App app-grid">
        <div className="app-top-row">
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Cloud Categories" />
              <Tab label="Cloud Scenarios" />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <CloudServicePicker />
          </TabPanel>
          <TabPanel value={value} index={1}>
            Scenarios
          </TabPanel>
        </div>
        <div className="app-bottom-row">
          <ReactFlow />
        </div>
      </div>
    </main>
  );
}

export default App;
