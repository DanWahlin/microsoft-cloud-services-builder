import React from 'react';
import { AppBar, Box, Modal, Tab, Tabs, Toolbar, Typography, Grid } from '@mui/material';

import './App.css';
import ServicesDiagram from 'components/Diagram/ServicesDiagram';
import CloudServicePicker from 'components/CloudServices/CloudServicePicker';
import TabPanel from 'shared/TabPanel';
import DocumentList from 'components/Docs/DocumentList';
import { RecoilRoot } from 'recoil';
import HelpIcon from '@mui/icons-material/Help';

function App() {
    const [value, setValue] = React.useState(0);
    const [open, setOpen] = React.useState(false);

    function handleChange(event: React.SyntheticEvent, newValue: number) {
        setValue(newValue);
    };

    function showHelp() {
        setOpen(true);
    }

    function closeHelp() {
        setOpen(false);
    }

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60vw',
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <main>
            <AppBar position="fixed">
                <Toolbar className="toolbar">
                    <Typography variant="h6" noWrap component="div" className="w-100">
                        <div className="header-image-title-container">
                            {/* <img src="/images/microsoft-logo.svg" alt="icon" className="icon" />  */}
                            <img src="/images/codeWithDanLogo_white.png" alt="icon" className="codewithdan-icon" />
                            <span className="header-title ">Microsoft Cloud Services Builder</span>
                            <HelpIcon className="help-icon" onClick={showHelp} />
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
                            <CloudServicePicker categoryType="categories" />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <CloudServicePicker categoryType="scenarios" />
                        </TabPanel>
                    </div>
                    <div className="app-bottom-row">
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <ServicesDiagram />
                            </Grid>
                            <Grid item xs={4}>
                                <DocumentList />
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </RecoilRoot>

            <Modal
                open={open}
                onClose={closeHelp}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Using the Microsoft Cloud Services Builder:
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} component="div">
                        <ol>
                            <li>Select a cloud service category or scenario.</li>
                            <li>Drag and drop a cloud service on to the <strong>Selected Cloud Services</strong> canvas.</li>
                            <li>Drag and drop additional services.</li>
                            <li>Connect services together by dragging a line between service connection points.</li>
                            <li>View <strong>Docs/Microsoft Learn/Azure CLI</strong> information for your selected services.</li>
                        </ol>
                    </Typography>
                </Box>
            </Modal>

        </main>
    );
}

export default App;
