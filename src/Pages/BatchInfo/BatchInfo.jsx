
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import { Button, Card, Container, Dialog, Grid, InputLabel, Select, TablePagination, TextField, Typography } from '@material-ui/core';
 import ContentDashboardLayout from '../../components/ContentSidebar/ContentDashboardLayout';
import { db } from '../../firebase';
import { firebaseLooper } from '../../utils/tools';
import Page from '../../components/Page';



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



export default function BatchInfo({match}) {
  const classes = useStyles();
  const [title, setTitle] = useState('')
   const [mTitle, setMTitle] = useState('')
  const [open, setOpen] = useState(false)
  const [batch, setBatch] = useState([])
  useEffect(() => {
     db.collection('machineData')
       .doc(match.params.id)
        .onSnapshot(doc => {
         setMTitle(doc.data().title)
        })
    db.collection('batchReport').where('machine_id', '==', `${match.params.id}`).onSnapshot(doc => {
      const data = firebaseLooper(doc)
      data.sort(function(a,b){
        return(b.time - a.time)
      })
       setBatch(data)
      
     console.log(data)
    })
    
  }, [])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <div style={{paddingLeft: '2.5rem', paddingRight: '2.5rem'}}>
        <Page title='Batch Reports | LyoIms'>

<ContentDashboardLayout match={match}/>
<div className={classes.wrapper}>
  <div className={classes.container}>
    <Card className={classes.content}>
       {/* <Typography variant='h4' align='left'><b>{mTitle}</b></Typography> */}
       <div style={{display: 'flex', justifyContent: 'space-between'}}>
         <div>
           <Typography variant='h2' align='left'><b>Batch Report</b></Typography>
           <Typography variant='body-2' align='left'>These are all the batch reports</Typography>
         </div>
         <div>
           <div style={{display: 'flex', justifyContent: 'flex-end'}}>
         <div className="relative"> 
           <input style={{ border: '2px solid whitesmoke'}} onChange={(e) => setTitle(e.target.value)} type="text" className="h-14 w-96 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none" placeholder="Search Batch..."/>
            <div className="absolute top-4 right-3"> <SearchIcon style={{opacity: '0.5'}}/> </div>
        </div>
        </div>
         </div>
       </div>
      
      <br />
        <br/>
         <TableContainer component={Paper}>
<Table className={classes.table} aria-label="simple table">
  <TableHead>
    <TableRow>
      <TableCell style={{backgroundColor: '#d8e3e7'}}><b>Manual</b></TableCell>
      <TableCell style={{backgroundColor: '#d8e3e7'}} align="center"><b>User</b></TableCell>
      <TableCell style={{backgroundColor: '#d8e3e7'}} align="center"><b>Date & Time</b></TableCell>
      <TableCell style={{backgroundColor: '#d8e3e7'}} align="center"><b>Image</b></TableCell>
   
    </TableRow>
  </TableHead>
  <TableBody>
    {batch.
    filter((data) => {
        if(title === ""){
            return data
        } else if (data.manual_name.toLowerCase().includes(title.toLocaleLowerCase())){
                return data
        }else if (data.user_id.toLowerCase().includes(title.toLocaleLowerCase())){
                return data
        }
       
      })
    .map((row) => (
      <TableRow key={row.id}>
        <TableCell style={{backgroundColor: 'whitesmoke'}} component="th" scope="row">
          {row.manual_name}
        </TableCell>
        <TableCell align="center">{row.user_id}</TableCell>
        <TableCell align="center">{row.time.toDate().toString().substring(0,15)}</TableCell>
        <TableCell align="right"><img loading="lazy" src={row.url} width={350} height={250}/></TableCell>
        
      </TableRow>
    ))}
  </TableBody>
</Table>
<div style={{display: 'flex', justifyContent: 'flex-end'}}>
   
   
</div>
<div style={{width: '100%'}}>
     
</div>
</TableContainer>
    </Card>
  </div>
</div>
</Page>
    </div>
    
   
  )
}
