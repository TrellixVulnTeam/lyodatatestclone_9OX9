import React from 'react';
import '../OpenTok.css'
import { OTSubscriber } from 'opentok-react';
import CheckBox from './CheckBox';
import { Button, Card, Container, Dialog, Grid } from '@material-ui/core';
import screenfull from 'screenfull';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close'
import '../OpenTok.css';
class Subscriber extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      audio: true,
      video: true,
      open: false
    };
  }

  setAudio = (audio) => {
    this.setState({ audio });
  }

  setVideo = (video) => {
    this.setState({ video });
  }

  onError = (err) => {
    this.setState({ error: `Failed to subscribe: ${err.message}` });
  }

  handleMode = () => {
    this.setState({open: true})
  }
  handleClose = () => {
    this.setState({open: false})
  }
  
  render() {
    return (
      <>

        <Grid 
        item
        lg={4}
            sm={6}
            xl={3}
            xs={12}
       >
        
          {
            this.state.open?
            <Dialog
        fullScreen open={this.state.open} onClose={this.handleClose}
        >
          <Toolbar>
             <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
           
            <OTSubscriber
          properties={
            {
              width: 1080, height:726,
            subscribeToAudio: false,
            subscribeToVideo: this.state.video
          }}
          onError={this.onError}
        />
        </Dialog>
        :
         <OTSubscriber
          properties={
            {
              width: 500, height:350,
            subscribeToAudio: this.state.audio,
            subscribeToVideo: this.state.video,
            showControls: true
          }}
          onError={this.onError}
        />

         }
       
      <Card style={{width:'500px', display: 'flex', justifyContent: 'space-between'}}>
        <div>
            <CheckBox
          label="Subscribe to Audio"
          initialChecked={this.state.audio}
          onChange={this.setAudio}
        />
        </div>
          <div>
             <CheckBox
          label="Subscribe to Video"
          initialChecked={this.state.video}
          onChange={this.setVideo}
        />
          </div>
          <div>
            <Button onClick={this.handleMode}>Change Mode</Button>
          </div>
        </Card>
        
      </Grid>

      <div>
         {this.state.error ? <div id="error">{this.state.error}</div> : null}
      </div>
      </>
     
    );
  }
}
export default Subscriber;


