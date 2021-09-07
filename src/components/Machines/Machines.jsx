import { Box, Button, CircularProgress, Container, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import MachineList from './MachineList';
import {Link, NavLink} from 'react-router-dom';
import Machine from './Machine';
import {db} from '../../firebase';
import {firebaseLooper} from '../../utils/tools'
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import Page from '../Page';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) =>( {
    add: {
    backgroundImage: 'linear-gradient(to left bottom, #fa630f, #fc8218, #fd9d29, #feb63f, #ffce59)',
    borderRadius: '20px',
    margin: theme.spacing(3, 0, 2),
    marginLeft: '5%'
    },
   backButton: {
        backgroundColor: "black",
        width: "100px",
        color: "white",
        borderRadius: "15px",
      
    },
}))
const Machines = () => {
    const classes = useStyles();
    const [searchTerm, setSearchTerm] = useState('')
    const [isLoading, setIsLoading] = useState(true);
    const [machines, setMachines] = useState([{
        title: '',
        desc: '',
        location: ''
    }]);
    const [error, setError] = useState(null)
    
    useEffect(() => {

        db.collection('machineData').onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setMachines(data)
            setIsLoading(false);
        })
   
    }, [])
    return (
        <Page className='' title="Machines | LyoIms">
          
        <div className=' ' >
            {/* <div  style={{display: 'flex', paddingTop: '20px', justifyContent:'space-between', paddingRight: '4.5rem', paddingLeft: '4.5rem'}}>
                <div >
                 <Typography variant='h1' style={{ color: '#43425D', marginBottom: '20px'}}><>Machines</></Typography>
             <Typography style={{color: '#43425D'}} variant='h5'>These are the available Machines</Typography>
            </div>
             <div style={{display: 'flex', justifyContent: 'flex-end' }}>
                 <div className="relative"> 
                 <div className="absolute top-4 right-3"> 
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill='gray' class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                  </div>
                 <input style={{width: '570px', height: '52px', border: '2px solid whitesmoke'}} onChange={(e) => setSearchTerm(e.target.value)} type="text" className="  pl-5 rounded z-0 focus:shadow focus:outline-none" placeholder="Search Machines..."/>
                  
                   </div>
               <Button component={NavLink} to={`/add-machine`} color='primary' variant='contained'  style={{width: '129px', height: '52px', marginLeft: '4%', color: 'white'}}>Add </Button>
             
              
               
            </div>
            </div> */}
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              {/* <Typography style={{marginRight: '15px'}} variant='h1' align='center'><b>{mTitle} : </b></Typography> */}
              <div style={{paddingLeft: '2.5rem'}}
              >
                 <Typography variant='h1' align='left'><b>Machines</b></Typography>
                  <Typography align='left' variant='body2' > These are all the  Machines and data </Typography>
              </div>
              <div>
              <div style={{display: 'flex', justifyContent: 'flex-end'}}>
               
               <div className="relative"> 
            <input style={{ border: '2px solid whitesmoke'}} onChange={(e) => setSearchTerm(e.target.value)} type="text" className="h-14 w-96 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none" placeholder="Search Machines..."/>
             <div className="absolute top-4 right-3"><SearchIcon style={{opacity: '0.5'}}/>  </div>
         </div>
               <Button color='primary' variant='contained' style={{width: '150px', marginLeft: '4%', marginRight: '2%',  color: 'white'}} component={NavLink} to={`/add-machine`}>ADD New </Button>
       
       <hr/>
         </div>
              </div>
            </div>
            
           
           
                   
                     {isLoading && <Typography variant="h3">
                    Loading...<CircularProgress size={50}/> 
                    </Typography>}
                      <Box pt={3}>
                           <Grid
                           
                        container
                        spacing={3}
                    >
                        { machines &&
                        machines.
                            filter((data) => {
                                if(searchTerm === ""){
                                    return data
                                } else if (data.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())){
                                        return data
                                        }
                                        else if (data.location.toLowerCase().includes(searchTerm.toLocaleLowerCase())){
                                            return data
                                            }
                                            else if (data.desc.toLowerCase().includes(searchTerm.toLocaleLowerCase())){
                                                return data
                                                }
                            })
                        .map((data) => (
                            <Grid

                            key={data.id}
                            lg={4}
                            md={6}
                            xs={12}
                            
                            >
                              <Machine key={data.id} data={data}/>   
                            </Grid>
                                    
                        ))
                
                }
                    </Grid>
                      </Box>
                    
                            
                    
         
                
                </div>
        
        </Page>
       
    )
}

export default Machines
