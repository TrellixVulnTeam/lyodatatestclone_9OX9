import { Dialog, Paper, TableCell, makeStyles, Card, TableContainer, TableHead, TableRow, Typography,Toolbar, DialogContent, DialogActions, Button, TextField, Select, FormHelperText, Fab } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useEffect } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import DQLayout from "../../components/DQNewSidebar/DQLayout";
import { db } from "../../firebase";
import { firebaseLooper } from "../../utils/tools";
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import SafetyView from "./SComponents/SafetyView";

const useStyles = makeStyles((theme) => ({
  layoutRoot: {
   backgroundColor: 'whitesmoke',
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',

  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#141256',
  },
 wrapper: {
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 250
  },
  
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
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


function Safety({match}) {
	const [contents, setContents] = useState([])
	const [contents1, setContents1] = useState([])
	const [open, setOpen] = useState(false)
	const [title, setTitle] = useState('')
	const [cause, setCause] = useState('')
	const [action, setAction] = useState('')
	const [desc, setDesc] = useState('')
	const [error, setError] = useState('')
	const [type, setType] = useState(0)
	const classes = useStyles()
	useEffect(() => {
		db.collection('DQNew').doc(match.params.id)
		.collection('content').doc('safety')
		.collection('details')
		.onSnapshot(snapshot => {
			const data = firebaseLooper(snapshot)
			data.sort(function(a,b){
				return (a.index - b.index)
			})
			setContents(data)
		})
		
	}, [])
	function handleOpen(){
		setOpen(true)
	}
	function handleClose(){
		setOpen(false)
	}
	
	function handleSubmit(e){
		e.preventDefault()

		if(cause?.trim().length===0 || desc?.trim().length===0 || action?.trim().length===0){
			return setError("Empty Spaces are not accepted as input!")
		}

		const index = contents.length
		db.collection('DQNew').doc(match.params.id)
		.collection('content').doc('safety')
		.collection('details').add({desc,index,cause,action})
		.then(() => {
			setOpen(false)
			setDesc("")
			setTitle("")
			setCause("")
			setAction("")
		})
	}
	return (
		<>
		<DQLayout match={match}  />
		 <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
		<div style={{color: '#43425D'}}>
		<div className={classes.fab}>
				<Fab component={NavLink} to={`/DQ/${match.params.id}/Design-Specs`} style={{marginRight: '20px'}}  color="primary" aria-label="add">
  <KeyboardArrowLeftIcon/>
</Fab>

			<Fab component={NavLink} to={`/DQ/${match.params.id}/Attachments`}  color="primary" aria-label="add">
  <KeyboardArrowRightIcon/>
</Fab>
			</div>
			<br />
			<Typography align='center' variant='h1' gutterBottom><b>SAFETY INTERLOCKS</b></Typography>
			<Toolbar style={{display: 'flex', justifyContent: 'flex-end'}}>
				<Button onClick={handleOpen} style={{background: 'orange', color: 'white'}}>Add Items</Button>
			</Toolbar>

			<TableContainer component={Paper}>
		<Table  aria-label="simple table">
			<TableHead >
			<TableRow>
			<TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}}><b className='text-lg font-bold italic'>_</b></TableCell>
			<TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="left"><b className='text-lg font-bold italic'>Description</b></TableCell>
			<TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="left"><b className='text-lg font-bold italic'>Cause</b></TableCell>
			<TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="left"><b className='text-lg font-bold italic'>Action</b></TableCell>
			<TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="right"><b className='text-lg font-bold italic'>Options</b></TableCell>
			</TableRow>
			</TableHead>
					{
						contents.map(module => (
				
							<>
							<SafetyView module={module} match={match} key={module.id}/>	
			
					</>
						))
					}
					
		</Table>
		</TableContainer>
		<Dialog open={open} onClose={handleClose} fullWidth>
			<form onSubmit={handleSubmit}>
				{error && <Alert severity='error'>{error}</Alert>}
				<Typography variant='h3' align='center' gutterBottom><b>Add new items</b></Typography>
	<DialogContent>
		<TextField error={desc.length>150} required value={desc}  multiline rows={5} variant='outlined' label='Desctiption' fullWidth onChange={(e) => setDesc(e.target.value)}/>	
		<FormHelperText  style={{marginBottom: '3%'}}> Description should be max {desc.length}/150 characters</FormHelperText>
		<TextField error={cause.length>150} required value={cause}multiline  variant='outlined' label='Cause' fullWidth onChange={(e) => setCause(e.target.value)}/>
		<FormHelperText style={{marginBottom: '3%'}}>Cause should be max {cause.length}/50</FormHelperText>
		<TextField error={action.length>150} value={action} required  multiline rows={7} variant='outlined' label='Action' fullWidth onChange={(e) => setAction(e.target.value)}/>	
		<FormHelperText style={{marginBottom: '3%'}}> Actions should be max {action.length}/150 characters</FormHelperText>
		{/* <Select style={{marginBottom: '3%'}} variant='outlined'  fullWidth onChange={(e) => setType(e.target.value)}>
			<option className='capitalize' value={0}>Documentation</option>
			<option value={1}>ACCESSORIES</option>
		</Select> */}
		
	</DialogContent>
	<DialogActions>
		<Button color='secondary' onClick={handleClose} variant='contained'>Cancel</Button>
		<Button type="submit" disabled={desc.length > 150 || action.length > 150 || cause.length > 150} style={{background: 'orange', color: 'white'}}>Add New</Button>
	</DialogActions>
			</form>
	
</Dialog>
		</div>
          </Card>
        </div>
      </div>
		 {/* <div style={{display: 'flex', justifyContent: 'flex-end'}}>
		<Button component={NavLink} to={`/DQ/${match.params.id}/Design-Specs`} style={{background: 'blue', color: 'white', marginLeft: '25px',  marginRight: '4%'}}>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-90deg-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z"/>
</svg>
					</Button>  
					<Button component={NavLink} to={`/DQ/${match.params.id}/Attachments`} style={{background: 'blue', color: 'white', marginLeft: '25px'}}>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-90deg-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M14.854 4.854a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 4H3.5A2.5 2.5 0 0 0 1 6.5v8a.5.5 0 0 0 1 0v-8A1.5 1.5 0 0 1 3.5 5h9.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4z"/>
</svg>
				</Button>
	  </div> */}
		
		</>
	)
}

export default Safety
