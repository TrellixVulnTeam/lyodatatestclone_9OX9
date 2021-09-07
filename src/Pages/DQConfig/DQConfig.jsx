import { useEffect, useState } from "react"
import { db } from "../../firebase"
import { firebaseLooper } from "../../utils/tools"
import DQConfigView from "./components/DQConfigView"
import { DialogContent, Fab, FormHelperText, makeStyles,  Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow  } from "@material-ui/core";
import { Button, Dialog, Typography, TextField, DialogActions, Card } from "@material-ui/core"
import DQLayout from "../../components/DQNewSidebar/DQLayout";
import { NavLink } from "react-router-dom";
import DQBrands from "../brands/DQBrands";
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  layoutRoot: {
   backgroundColor: 'whitesmoke',
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',

  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
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

export default function DQConfigD({match}) {
	const classes = useStyles()
    const [config, setConfig] = useState([])
    const [title, setTitle] = useState('')
    const [error, setError] = useState('')
    const [desc, setDesc] = useState('')
    const [openAdd, setOpenAdd] = useState(false)
    const [type, setType] = useState(0)
    useEffect(() => {
        db.collection('DQNew').doc(match.params.id).collection('content').doc('config')
        .collection('module').onSnapshot(snap => {
            const data = firebaseLooper(snap)
            data.sort(function(a,b){
              return(a.index-b.index)
            })
            setConfig(data)
        })
    },[])
    function handleOpenAdd(){
		setOpenAdd(true)
	}
	function handleCloseAdd(){
		setOpenAdd(false)
	}
    function handleSubmit(e){
      e.preventDefault()
      if(title?.trim().length === 0 || desc?.trim().length === 0){
        return setError("Empty strings are not accepted as valid input ! Try again with a valid input")
      }
        const  index = config.length
		db.collection('DQNew')
		.doc(match.params.id)
		.collection('content')
		.doc('config')
		.collection('module')
		.add({title, desc, index,type})
    .then(() => {setTitle('')
    setDesc("")
    setError("")
    setOpenAdd(false)
    }
    )
    }
	return (
		<>
		
			
			<DQLayout match={match}/>
		 <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
            <Typography variant='h1' align='center' gutterBottom ><b>Equipment Configuration</b></Typography>
            <hr />
          <div style={{display: 'flex', marginBottom: '3%', paddingRight: '3%', justifyContent: 'flex-end'}}>
				{/* <Button component={NavLink} to={`/DQ/${match.params.id}/General-Information`} style={{background: 'blue', color: 'white', marginLeft: '25px',  marginRight: '4%'}}>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-90deg-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z"/>
</svg>
					</Button> */}
				<Button style={{color: 'white', background: 'black', marginRight: '4%'}} onClick={handleOpenAdd}>Add Module</Button>
		
				{/* <Button component={NavLink} to={`/DQ/${match.params.id}/Specifications`} style={{background: 'blue', color: 'white'}}>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-90deg-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M14.854 4.854a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 4H3.5A2.5 2.5 0 0 0 1 6.5v8a.5.5 0 0 0 1 0v-8A1.5 1.5 0 0 1 3.5 5h9.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4z"/>
</svg>
				</Button> */}
				
				<br />
			</div>
          <div>
            <div component={Paper}>
		<Table aria-label="simple table">
			<TableHead>
			<TableRow>
			<TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}}><b className='text-lg font-bold italic'>Title</b></TableCell>
			<TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="left"><b className='text-lg font-bold italic'>Description</b></TableCell>
			<TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="right"><b className='text-lg font-bold italic'>Actions</b></TableCell>
			</TableRow>
			</TableHead>
            {
                config&&
                config.map(data => (
                    <>
                     
                            
					<DQConfigView type={data.type} match={match} key={data.id} module={data}/>
 
                   </> 
                ))
            }
             
            	</Table>
		</div>
    <div className={classes.fab}>
				<Fab component={NavLink} to={`/DQ/${match.params.id}/Specifications`} style={{marginRight: '20px'}}  color="primary" aria-label="add">
  <KeyboardArrowLeftIcon/>
</Fab>

			<Fab component={NavLink} to={`/DQ/${match.params.id}/Design-Specs`}  color="primary" aria-label="add">
  <KeyboardArrowRightIcon/>
</Fab>
			</div>
        <Dialog open={openAdd} fullWidth onClose={handleCloseAdd}>
<form onSubmit={handleSubmit}>
  <Typography variant='h4' align='center'  gutterBottom style={{marginTop: '15px'}}><b>Add New Modules</b></Typography>
  {error && <Alert severity="error" >{error}</Alert>}
<DialogContent>
<TextField error={title.length > 30} required  label='Title'  variant='outlined' fullWidth onChange={(e) => setTitle(e.target.value)}/>
<FormHelperText style={{marginBottom: '5%'}}>Title should be {title.length}/30</FormHelperText>
<TextField error={desc.length>100} required  rows={5} multiline label='Description' variant='outlined' fullWidth onChange={(e) => setDesc(e.target.value)}/>  
<FormHelperText style={{marginBottom: '5%'}}>Description should be max {desc.length}/100</FormHelperText>
<Select required onChange={(e) => setType(e.target.value)} value={type} variant='outlined' fullWidth>
  <option selected value={0}>2 Row (Type 0)</option>
  <option value={1}>SERVICES REQUIRED FROM CUSTOMER END</option>
</Select>
<FormHelperText className='italic'>Select Type Before Adding Module</FormHelperText>
</DialogContent>
<DialogActions>
<Button onClick={handleCloseAdd} variant='contained' color='secondary'>Cancel</Button>
<Button type="submit" style={{background:'orange', color:'white'}} >Add New</Button>
</DialogActions>
</form>


</Dialog>
		<br />
    <div>

    </div>
    <br />
    <div>

    </div>
    <br />
        </div>

          </Card>
        </div>
      </div>
     </>
    
	)
	
        }
