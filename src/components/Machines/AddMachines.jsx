import { Button, Card, CardContent, Container, FormHelperText, makeStyles, TextField, Typography } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom'
import {db} from '../../firebase'
import {firebaseLooper} from '../../utils/tools'
import { useAuth } from '../context/AuthContext';
import faker from 'faker'
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: "20px"
  
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#141256',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    alignItems: "center"
  },
  submit: {
      backgroundImage: 'linear-gradient(to left bottom, #fa630f, #fc8218, #fd9d29, #feb63f, #ffce59)',
      align: "center",
      color: "white",
      width: "100%",
      borderRadius: '20px',
      margin: theme.spacing(3, 0, 2),
  }
}));

const AddMachines = () => {
  const { currentUser } = useAuth()
  const [title, setMachineName] = useState('')
  const [location, setMachineLocation] = useState('');
  const [createdBy, setCreatedBy] = useState(currentUser.email);
   const [desc, setDesc] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('')
  const notification = `${currentUser.email} has created a new Machine!`
  const link = 'machine-data'
  const history = useHistory();
  const [notifyData, setNotifyData] = useState([])
 
    const handleSubmit = (e) => {
      
    e.preventDefault();
    var result = {title,location,createdBy,desc }
    if(title?.trim().length===0 || desc?.trim().length===0 || location?.trim().length===0){
      return setError("Empty Spaces can't be added as input! Please try again with a valid input")
    }
   
      db.collection('machineData').add(result).then(data => {
          history.push('/machine-data')
          console.log(data)
          setLoading(true)
          setError("")
        })
   
    
       
       
    }



  const classes= useStyles();
    return (
        <Container  component="main" style={{ marginBottom: "100px"}}>
          <Container className={classes.paper}>
            <Alert severity="info">You are currently adding a new Machine</Alert>
            <br/>
            <Typography component="h1" variant="h1">
         <b>Add Machine</b> 
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} >
          {error && <Alert severity='error'>{error}</Alert>}
          <Card >
            <CardContent>

              <TextField
          value={title}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={title.length > 30}
            
            id="machine_name"
            label="Machine Name"
            name="machine_name"
            autoFocus
            onChange={(e) => setMachineName(e.target.value)}
          />
          <FormHelperText>Title should be max 30 Char</FormHelperText>
          <TextField
          value={location}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={location.length > 30}
            name="location"
            label="Location"
            onChange={(e) => setMachineLocation(e.target.value)}
            id="machine_location"
            
          />
          <FormHelperText style={{marginBottom:"20px"}}>Location should be max 30 char long</FormHelperText>
          
           <TextField
           fullWidth
           value={createdBy}
           variant="outlined"
            id="user"
            label="Created By"
            type="text"
            disabled
            onChange ={(e) => setCreatedBy(e.target.value)}
           style={{marginBottom: '20px'}}
          />
         
           <TextField
           fullWidth
           value={desc}
           required
           variant="outlined"
            id="desc"
            label="Description"
            type="text"
            multiline
            rows={7}
            onChange ={(e) => setDesc(e.target.value)}
           
          />
          <FormHelperText>Description should be min {desc.length}/150</FormHelperText>
         {!loading && <Button
            type="submit"
            variant="contained"
            className={classes.submit}
            disabled={title.length > 30 ||  location.length > 30}
          >
            Add  Machine
            </Button>}
         {
           loading && <Button
            type="submit"
            
            variant="contained"
            
            disabled
            className={classes.submit}
          >Adding Machine...</Button>
         }   

            </CardContent>
          </Card>
          
          </form>
          </Container>
        </Container>
    )
}

export default AddMachines
