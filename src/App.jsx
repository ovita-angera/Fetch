import { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

// import AddServer from "./components/servers/AddServer";
// import ServicesDisplay from "./components/services/ServicesDisplay";
// import ProcessesDisplay from "./components/processes/ProcessesDisplay";
import { Process } from "./components/processes/Process";

import './App.css'


const App = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false); 

  return (
    <>
      <Button
      variant="contained" 
      onClick={handleOpen}
      >
        Add
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={{
           position: 'relative',
           top: '50%',
           left: '50%',
           transform: 'translate(-50%, -50%)',
           width: '50%',
           bgcolor: 'background.paper',
           border: '1px solid #000',
           boxShadow: 24,
           borderRadius: '20px'
        }}>
          {/* <AddServer /> */}
          <Process />
        </Box>
      </Modal>
      {/* <ServicesDisplay /> */}
      <br />
      {/* <ProcessesDisplay /> */}
    </>
  )
}

export default App
