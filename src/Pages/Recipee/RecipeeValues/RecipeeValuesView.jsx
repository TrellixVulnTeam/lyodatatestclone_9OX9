import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { db } from '../../../firebase';
import { firebaseLooper } from '../../../utils/tools';
import { Button, Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, InputLabel, Select, TablePagination, TextField, Toolbar, Typography } from '@material-ui/core';
import StepDashboardLayout from '../../../components/StepSidebar/StepDashboardLayout'
import TestData from '../../../Pages/Tests/TestData'

import ItemRow from './ItemRow';
import AddRecipeeValues from './AddRecipeeValues';
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
   wrapper: {
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 256
  },
  
  },
  container: {
      display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
  },
  content: {
     padding: '20px',
      flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
    },
}));



export default function RecipeeValuesView({match}) {
  const classes = useStyles();
  const [recipeeData, setRecipeeData] = useState([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [mTitle, setMTitle] = useState('')
  const [openAdd, setOpenAdd] = useState(false)
  
  
  const [batch, setBatch] = useState([])
  useEffect(() => {
     db.collection('recipes')
       .doc(match.params.id)
        .onSnapshot(doc => {
         setMTitle(doc.data().title)
        })
    db.collection('recipeeData').where('rid', '==', `${match.params.id}`).onSnapshot(doc => {
      const data = firebaseLooper(doc)
       data.sort(function(a,b) {
                return(a.index-b.index)
            })
      setRecipeeData(data)
    })
    db.collection('realtimeData').where('recipe_id', '==', `${match.params.id}`).onSnapshot(doc => {
      const data = firebaseLooper(doc)

      setBatch(data)
    })
  }, [])
    
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }




  return (
    <div>
      <StepDashboardLayout match={match}/>

      <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
             {/* <Typography variant='h4' align='left'><b>{mTitle}</b></Typography> */}
            <Typography variant='h3' align='center'><b>Recipe Values</b></Typography>
            {
              <Grid style={{marginTop: '30px', paddingLeft: '20px', marginBottom: '25px'}}>
                <InputLabel  variant='standard'>Select Batch</InputLabel>
                <Select style={{width: '45%'}}>
                  {
                    batch.map(data => (
                      <option value={data.time}>{data.time}</option>
                    ))
                  }
                </Select>
              </Grid>
            }
               <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><b>Step</b></TableCell>
            <TableCell align="right"><b>Time(min)</b></TableCell>
            <TableCell align="right"><b>Keep Time(min)</b></TableCell>
            <TableCell align="right"><b>Temperature(deg C)</b></TableCell>
            <TableCell align="right"><b>Pressure&nbsp;(bars / P)</b></TableCell>
            <TableCell align="right"><b>Actions&nbsp;</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recipeeData.map((row) => (
            <ItemRow row={row}/>
          ))}
        </TableBody>
      </Table>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <Button style={{color: 'orangered'}} onClick={() => setOpenAdd(!openAdd)}>Add Data</Button>
          <Button onClick={handleOpen}>Show Graph</Button>
      </div>
      <div style={{width: '100%'}}>
        <Dialog fullWidth={true} open={openAdd} onClose={() => setOpenAdd(false)}>
          <Toolbar>
            <Button onClick={() => setOpenAdd(false)} color='primary' style={{color: 'white'}} variant='contained'>Close</Button>
          </Toolbar>
          <DialogContent>
            <AddRecipeeValues match={match}/>
          </DialogContent>
        </Dialog>
           <Dialog
           fullScreen
            open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
             
                <Button style={{width: '20%', margin: '3%', textDecoration: 'bold'}} onClick={handleClose} color="primary" variant="outlined">
                   close
                </Button>
            <Container style={{width: '75%'}}>
                 <TestData reid={match.params.id} data={recipeeData} />
            </Container>
                </Dialog>

      </div>
    </TableContainer>
          </Card>
        </div>
      </div>
    </div>
   
  )
}
