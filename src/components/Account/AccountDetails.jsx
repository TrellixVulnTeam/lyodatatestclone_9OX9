import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
  Container,
  Typography,
  CardActions,
  Avatar,
  InputLabel
} from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { db, storageRef } from '../../firebase'
import { firebaseLooper } from '../../utils/tools'
import { useAuth } from '../context/AuthContext'
import { Link, useHistory } from "react-router-dom"
import { Alert } from '@material-ui/lab';
import { useStorage } from '../../utils/useStorage';
import Page from '../Page';

const useStyles = makeStyles(() => ({
  root: {
     
      
  },
  avatar: {
    height: 100,
    width: 100
  }
}));

const AccountDetails = () => {

   const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState("")
    const [account, setAccount] = useState([])
     const [loading, setLoading] = useState(false)
     const [message, setMessage] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
     const [file, setFile] = useState(null);
     const [id, setId] = useState()
     const [disabled, setDisabled] = useState(true)
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const classes = useStyles();
    const history = useHistory()
     const types = ["image/png", "image/jpeg", "image/jpg"];

     useEffect(() => {
    db.collection('users').where('email', '==', currentUser.email ).get().then(snapshot => {
      const accountData = firebaseLooper(snapshot)
      setAccount(accountData[0])
      setId(accountData[0].id)
      
    })
  })

    const handleChange = (e) => {
        let selectedFile = e.target.files[0];
       
        if (selectedFile) {
            if (types.includes(selectedFile.type)) {
                
                setError(null);
                setFile(selectedFile);
                
            } else {
                setFile(null);
                setError("Please select an image file (png or jpg)");
                setDisabled(true)
            }
        }
       
        
    }

     const { progress, url } = useStorage(file);
    const [link, setLink] = useState(url)
  

 async function handleSubmit(e) {
        e.preventDefault()
    if (password !== passwordConfirm) {
      return setError("Passwords do not match! Please try again")
    }


      if (password.length < 6){
     
      return setError("Weak Password ! Passwords should be 6 characters")
    }

    if (email !== currentUser.email) {
     updateEmail(email)
    
    }
    setLoading(true)
    setError("")
     db.collection('users').doc(id).update({password})
    
    try {
      await  updatePassword(password)
            setMessage("Password updated successfully !")
    } catch (error) {
        setError("Failed to Update Password! Please try again")
    }

    
  }
   
  const handleUpload = () => {
     const reqData = {url}
        db.collection('users').doc(id).update(reqData).then(data => {
      console.log(data)
    })
  }
 
    return (
      <Page title='Account | LyoIms'>
          <Container maxWidth={false} style={{marginTop: '3%', marginBottom: '3%'}}>
            <div style={{display: 'flex', justifyContent: 'center'}}>
            {error && <Alert severity="error">{error}</Alert>}
            {message && <Alert severity="success">{message}</Alert>}
            </div>
           <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <div>
                      <Typography variant='h1'><b>Account Details</b></Typography>
              <Typography variant='h5'>Edit the data you want! </Typography>
                  </div>
                  <hr/>
                 
         </div>
          <br/>
            <Grid
            container
            spacing={3}
            >
             <Grid
          item
            lg={6}
            sm={12}
            xl={3}
            xs={12}
           >
             
      <Card >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
            src={account.url}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
           {` ${account.firstName} ${account.lastName}`}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {account.role}
          </Typography>
         
        </Box>
        
      </CardContent>
      <Divider />
       <CardActions style={{display: 'flex', justifyContent: 'space-evenly'}}>
     
       <input type="file"  onChange={handleChange} />
       <Button disabled={progress < 100}  variant="outlined" color="primary" onClick={handleUpload} >Upload</Button>
      </CardActions>
    </Card>
    <Grid>
      {file && <p>{progress}% uploaded</p>}
    </Grid>
    </Grid>

    
    
    {/* Details */}
    <Grid
      item
      lg={6}
      sm={12}
      xl={3}
      xs={12}
    >
          <form className={classes.root} onSubmit={handleSubmit}>
     <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        
        <Divider />
        <CardContent>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                required
                value={currentUser.email}
                variant="outlined"
                style={{marginBottom: "5%"}}
                onChange={(e) => setEmail(e.target.value)}
              />
            
              <TextField
                fullWidth
                label="Password"
                helperText="Create a new password for the account!"
                value={password}
                required
                type="password"
                variant="outlined"
                 style={{marginBottom: "5%"}}
                onChange={(e) => setPassword(e.target.value)}
              />

              <TextField
                fullWidth
                label="Re-enter Password"
                value={passwordConfirm}
                type="password"
                required
                style={{marginBottom: "5%"}}
                variant="outlined"
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
              
             
        

        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
          type="submit"
          style={{backgroundImage: 'linear-gradient(to left bottom, #420ffa, #004dff, #006eff, #238aff, #59a3ff)', color: 'white'}}
          variant="contained"
          onClick={handleSubmit}
          >
            Save details
          </Button>

           <Button
        style={{backgroundImage: ' linear-gradient(to right top, #fa0f0f, #fb3434, #f84d50, #f36268, #ea757e)' ,width: "100px", marginLeft: "5%"}}
          color="secondary"
          variant="contained"
          href="/"
          >
            Cancel
          </Button>
        </Box>
     </Card>
      </form>
    </Grid>
            </Grid>

       

        
    </Container>
      </Page>
      
    )
}

export default AccountDetails
