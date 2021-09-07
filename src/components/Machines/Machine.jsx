import React, { useState, useEffect } from 'react';
import {Link, NavLink, useHistory} from 'react-router-dom'
import {db} from '../../firebase'
import {firebaseLooper} from '../../utils/tools'
import OpenWithIcon from '@material-ui/icons/OpenWith';
import {
  
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles,
  Button,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  TextField,
  Container,
  FormHelperText,
 
} from '@material-ui/core';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import{Alert, AlertTitle} from '@material-ui/lab';
import { useAuth } from '../context/AuthContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: "100%",
    backgroundColor: theme.palette.background.dark,
    marginLeft: "50px",
    marginBottom: "50px"
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  }
}));

const Machine= ({data, ...rest}) => {

  const classes = useStyles();
   const {currentUser} = useAuth()
    const [openEdit, setOpenEdit] = useState(false)
    const [open, setOpen] = useState(false)
    const [error, setError] = useState("")
   const [title, setTitle] = useState(data.title)
  const [location, setLocation] = useState(data.location);
  const [createdBy, setCreatedBy] = useState(data.createdBy);
  const [loading, setLoading] = useState(false);  
  const [desc, setDesc] = useState(data.desc)
  
 
      const handleClickOpen = () => {
    setOpen(true);
  };

   const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
      setOpenEdit(true)
    }
  const handleEditClose = () => {
      setOpenEdit(false)
    }


 const updateMachine=(e) => {
  
    e.preventDefault();
   
    if(title?.trim().length===0 || desc?.trim().length===0 || location?.trim().length===0){
      return setError("Empty Spaces can't be added as input! Please try again with a valid input")
    }
    const dataMachine = {title,location,desc}
      db.collection('machineData').doc(data.id).update(dataMachine).then(()=>{
        setLoading(false)
        setOpenEdit(false)

      })
  }

    const handleDelete = (id) => {
        db.collection('machineData').doc(id).delete().then(() => {
         
         
        })
    }

   
  return (
      <
      
      >
       <CardContent >               
           
            {/* <Box
            pb={3}
            style={{
            display: 'flex',
            justifyContent: 'center',
            
            }}
            >

            </Box> */}
                
               
                {/* <Typography
                  align="center"
                  color="textPrimary"
                  gutterBottom
                  variant="h3"
                >
                  {data.title} 
                
                </Typography>
                <Typography
                  align="center"
                  color="textPrimary"
                  variant="body1"
                >
                  {data.location}
                </Typography>
                <Typography
                  
                  color="textPrimary"
                  variant="body1"
                >
                 <b>:- {data.desc}</b> 
                </Typography> */}
              <div 
               data-aos="flip-left"
               data-aos-easing="ease-out-cubic"
              data-aos-duration="2000"  className="w-full max-w-sm px-4 py-3 mx-auto hover:shadow-2xl  bg-white rounded-md shadow-md dark:bg-gray-800">
        {/* <div className="flex items-center justify-between">
            <span className="text-sm font-light text-gray-800 dark:text-gray-400">Courses and MOOCs</span>
            <span className="px-3 py-1 text-xs text-indigo-800 uppercase bg-indigo-200 rounded-full dark:bg-indigo-300 dark:text-indigo-900">psychology</span>
        </div> */}

        <div>
           
            <div  className="flex items-center justify-between">
              <h1 style={{color: '#FF9A40'}} className="mt-2 text-lg font-semibold text-gray-800 dark:text-white line-clamp-1">{data.title}</h1>
            
            <Button style={{backgroundColor: 'orange'}} component={NavLink}  to={`/machine-data/Manuals/${data.id}/Manuals`} className="px-3 py-1 text-xs text-white uppercase  rounded-full dark:bg-indigo-300 dark:text-indigo-900">Open </Button>
        </div>
          <span className="text-sm font-light text-gray-800 line-clamp-1 dark:text-gray-400">{data.location}</span>
           {data && <p className="mt-2 break-all line-clamp-3 text-sm text-gray-600 dark:text-gray-300">{data.desc} </p>}
        </div>

        <div>
            <div className="flex items-center justify-center mt-4">
                <button  onClick={() => handleEdit()} class="mr-2 text-gray-800 cursor-pointer dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                   <svg style={{opacity: '0.68'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
                </button>

                <button style={{opacity: '0.68'}} onClick={() => handleClickOpen()} className="mr-2 text-gray-800 cursor-pointer dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                  </svg>
                </button>
            </div>
        </div>
    </div>
               </CardContent>
             
            <div>
              <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                ><Alert variant="filled" severity="error">
                  <AlertTitle>Delete</AlertTitle>
                    <DialogTitle id="alert-dialog-title">{"Are You Sure You Want To Delete?"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText color="white" id="alert-dialog-description">                         
                         Deleting will be a permanent action and data pervailing will be permanently deleted and can not be retrieved back. 
                         
                    </DialogContentText>
                    </DialogContent>
                    </Alert>
                    <DialogActions>
                    <Button
                    style={{width: "100px", backgroundColor: "blue"}}
                     variant="contained" onClick={handleClose} color="secondary">
                        Disagree
                    </Button>
                    <Button 
                     style={{width: "100px", backgroundColor: "red"}}
                    variant="contained"
                      onClick={(e)=>{
                        handleDelete(data.id);
                         handleClose()}} color="primary" autoFocus>
                        Agree
                    </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                fullWidth
                    open={openEdit}
                    onClose={handleEditClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{`Edit ${data.title}`}</DialogTitle>
                    <DialogContent>
                    <Alert severity="info">You are currently editing Machine data!</Alert>
                    <form onSubmit={updateMachine} className={classes.form}  >
                        <TextField
                        defaultValue={title}
                        label="Machine Name"
                          variant="outlined"
                          error={title === "" || title.length > 35}
                          margin="normal"
                          required
                          fullWidth
                          id="title"
                          name="title"
                          autoFocus
                          onChange={(e) => setTitle(e.target.value)}
                        />
                        <FormHelperText>Title should be max {title.length}/30</FormHelperText>
                        <TextField
                        label="Machine Location"
                        error={location==="" || location.length > 40}
                        defaultValue={location}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          name="desc"
                          onChange={(e) => setLocation(e.target.value)}
                          id="desc"
                          multiline
                        />
                        <FormHelperText>Location should be max {location.length}/40 </FormHelperText>
                         <TextField
                        label="Machine Description"
                       error={desc==="" || desc.length < 150}
                        defaultValue={desc}
                        multiline
                        rows={7}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          name="desc"
                          onChange={(e) => setDesc(e.target.value)}
                          id="desc"
                         
                        />
                          <FormHelperText  style={{marginBottom: "20px"}}>Description should be minimum {desc.length}/150 </FormHelperText>
                        <TextField
                      
                        defaultValue={createdBy}
                        disabled
                        fullWidth
                        variant="outlined"
                          label="Created By"
                          onChange={(e) => setCreatedBy(e.target.value)}
                        />
                        {error && <Alert severity="error" >{error}</Alert>}
                    <DialogActions>
                      <Button color="secondary" onClick={handleEditClose}>Cancel</Button>
                     <Button
                          type="submit"
                         
                          variant="contained"
                          color="primary"
                          
                          disabled={ title.length > 30 || location.length > 40  || desc.length < 150} 
                          
                        >
                          Update
                          </Button>
                     
                    </DialogActions>
                     
                  </form>
                    </DialogContent>
                </Dialog>
                </div>
        
         
           
    </>
  );
};
 


export default Machine;