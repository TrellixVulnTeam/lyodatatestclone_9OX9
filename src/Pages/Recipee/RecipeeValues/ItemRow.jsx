import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormHelperText, TableCell, TableRow, TextField } from '@material-ui/core'
import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { db } from '../../../firebase'
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';

import EditIcon from '@material-ui/icons/Edit';
import { Alert, AlertTitle } from '@material-ui/lab';
const ItemRow= ({row}) => {

    const [step, setStep] = useState(row.step)
    const [time1, setTime] = useState(row.time1)
    const [time2, setKeepTime] = useState(row.time2)
    const [temp1, setTemp] = useState(row.temp1)
    const [pressure, setPressure] = useState(row.pressure)
    const [openEdit, setOpenEdit] = useState(false)
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
      const handleEditOpen = () => {
      setOpenEdit(true)
    }
    const handleEditClose = () => {
      setOpenEdit(false)
    }

     const handleDelete = (id) => {
    db.collection('recipeeData').doc(id).delete()
}
const updateRecipeValues=(e) => {
  e.preventDefault()
  if(step?.trim().length === 0){
    return setError("Empty strings are not accepted as valid inputs ! Please try again with a valid input")
  }
  if(step.length > 20){
    return setError("Step length should be less than 20 characters")
  }

  if(temp1 > 100 || temp1 < -100){
    return setError("Temperature should be between -100 to 100 deg C")
  }

  if(pressure > 2000 || pressure < -2000){
    return setError("Pressure should be between -2000 to 2000 mT")
  }

  if(time1 < 0 || time1 > 300){
    return setError("Time shuld be between 0 to 300 mins")
  }

  if(time2 < 0 || time2 > 300){
    return setError("Keep Time shuld be between 0 to 300 mins")
  }
    setLoading(true)
    const recipeValues = {time1, time2, step, pressure, temp1}
    db.collection('recipeeData').doc(row.id).update(recipeValues).then((data) => {
        console.log(data)
       setOpenEdit(false)
        setLoading(false)
    })
    
  }

  function handleOpen(){
    setOpen(true)
  }

  function handleClose(){
    setOpen(false)
  }

    return (
         <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.step}
              </TableCell>
              <TableCell align="right">{row.time1}</TableCell>
              <TableCell align="right">{row.time2}</TableCell>
              <TableCell align="right">{row.temp1}</TableCell>
              <TableCell align="right">{row.pressure}</TableCell>
              <TableCell align="right">
                  <Button onClick={() => handleEditOpen()}><EditIcon/></Button>
                  <Button onClick={() => handleOpen()}><DeleteSweepIcon/></Button>
                  
                  </TableCell>
                 <Dialog
                    open={openEdit}
                    onClose={handleEditClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title"><b>Edit {step}</b></DialogTitle>
                    <DialogContent>
                     
                    <form  onSubmit={updateRecipeValues} >
                      {error && <Alert severity='error'>{error}</Alert>}
                     
                    <TextField 
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label='Step'
                    value={step}
                
                        onChange={(e) => setStep(e.target.value)}
                    />
                    <FormHelperText>Step length should be less than 20 characters</FormHelperText>
                    <TextField 
                    variant="outlined"
                    margin="normal"
                    required
                    type='number'
                   
                    fullWidth
                    label='Temperature (deg C)'
                    value={temp1}
                  
                        onChange={(e) => setTemp(e.target.value)}
                    />
                   <FormHelperText>Temperature should be between -100 to 100 deg C</FormHelperText>
                    <TextField 
                    variant="outlined"
                    margin="normal"
                    required
                    type='number'
                    fullWidth
                    label='Pressure (mT)'
                    value={pressure}
                   
                        onChange={(e) => setPressure(e.target.value)}
                    />
                      <FormHelperText>Pressure should be between -2000 to 2000 mT</FormHelperText>
                    <TextField 
                    variant="outlined"
                    margin="normal"
                    required
                    type='number'
                    fullWidth
                    label='Time (mins)'
                   value={time1}
                        onChange={(e) => setTime(e.target.value)}
                    />
                      <FormHelperText>Time shuld be between 0 to 300 mins</FormHelperText>
                    <TextField 
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    type='number'
                    label='KeepTime (mins)'
                    value={time2}
                    
                        onChange={(e) => setKeepTime(e.target.value)}
                    />
                     <FormHelperText>Keep Time shuld be between 0 to 300 mins</FormHelperText>
                       
                    
                    <DialogActions>
                      <Button color="secondary" onClick={handleEditClose}>Cancel</Button>
                       {!loading && <Button
                          type="submit"
                          fullWidth
                          variant="outlined"
                          color="primary"
                       
                        
                        >
                          Update
                          </Button>}
                      {
                        loading && <Button
                          type="submit"
                          fullWidth
                          variant="outlined"
                          color="primary"
                          disabled
                          
                        >Updating values...</Button>
                      }   
                    </DialogActions>
                     <Alert severity="info">Incomplete set of data will not allow you to update details !</Alert>
                  </form>
                    </DialogContent>
                </Dialog>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                  <Alert severity="error" variant="filled">
                    <AlertTitle><strong>Delete</strong></AlertTitle>
                    <DialogTitle id="alert-dialog-title">{"Are You Sure You Want To Delete?"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText color="white" id="alert-dialog-description">
                        Deleting will be a permanent action and data pervailing will be permanently deleted and can not be retrieved back.                    </DialogContentText>
                    </DialogContent>
                    </Alert>
                    <DialogActions>
                    <Button onClick={handleClose} color="primary" variant="outlined">
                        Disagree
                    </Button>
                    <Button   onClick={(e)=>{
                        handleDelete(row.id);
                        }} color="secondary" variant="outlined" autoFocus>
                        Agree
                    </Button>
                    </DialogActions>
                </Dialog>
            </TableRow>
    )
}

export default ItemRow
