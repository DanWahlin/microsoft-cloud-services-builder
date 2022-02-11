import React from 'react';
import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from '@mui/material';

import './App.css';
import ServicesDiagram from 'components/Diagram/ServicesDiagram';
import CloudServicePicker from 'components/CloudServices/CloudServicePicker';
import TabPanel from 'shared/TabPanel';
import DocumentList from 'components/Docs/DocumentList';
import { RecoilRoot } from 'recoil';

function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <main>
      <AppBar position="fixed">
        <Toolbar className="toolbar">
          <Typography variant="h6" noWrap component="div">
            <div className="image-title-container">
              <img src="/images/microsoft-logo.svg" alt="icon" className="icon"></img> 
              <span>Microsoft Cloud Services Builder</span>
            </div>
          </Typography>
        </Toolbar>
      </AppBar>

      <RecoilRoot>
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
            <ServicesDiagram />
            <DocumentList />
          </div>
        </div>
      </RecoilRoot>
    </main>
  );
}

export default App;
