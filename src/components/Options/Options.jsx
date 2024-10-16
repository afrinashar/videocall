import { Button, Container, TextField, Grid, Typography, Paper } from '@mui/material';
import React, { useState, useContext } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled } from '@mui/icons-material';
import { SocketContext } from '../../SocketContext';
import './Options.css';

const Options = ({ children }) => {
  const { me, callAccepted, Name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');

  return (
    <Container className='container'>
      <Paper elevation={10} className='paper'>
        <form className='root' noValidate autoComplete='off'>
          <Grid container className='gridContainer'>
            <Grid item xs={12} md={6} className='padding'>
              <Typography gutterBottom variant='h6'>Account Info</Typography>
              <TextField label='Name' value={Name} onChange={(e) => setName(e.target.value)} fullWidth />
              <CopyToClipboard text={me} className='margin'>
                <Button 
                  variant='contained' 
                  style={{ backgroundColor: '#6a1b9a', color: 'white' }} // Purple
                  fullWidth 
                  startIcon={<Assignment fontSize='large' />}
                >
                  Copy Your ID
                </Button>
              </CopyToClipboard>
            </Grid>

            <Grid item xs={12} md={6} className='padding'>
              <Typography gutterBottom variant='h6'>Make a Call</Typography>
              <TextField label='ID For Call' value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth />
              <Grid className='margin'>
                {callAccepted && !callEnded ? (
                  <Button
                    variant='contained'
                    style={{ backgroundColor: '#8e24aa', color: 'white' }} // Lighter purple for Hang Up
                    fullWidth
                    startIcon={<PhoneDisabled fontSize='large' />}
                    onClick={leaveCall}
                  >
                    Hang Up
                  </Button>
                ) : (
                  <Button
                    variant='contained'
                    style={{ backgroundColor: '#6a1b9a', color: 'white' }} // Purple for Call
                    fullWidth
                    onClick={() => callUser(idToCall)}
                    startIcon={<Phone fontSize='large' />}
                  >
                    Call
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </form>
        {children}
      </Paper>
    </Container>
  );
}

export default Options;
