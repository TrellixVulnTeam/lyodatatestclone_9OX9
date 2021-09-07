import React, { useEffect, useRef, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import { NavLink, useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../../firebase';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="">
        Arizon Systems Pvt Ltd.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#141256',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  button_submit: {
      background:'#141256',
      borderRadius: '20px',
      margin: theme.spacing(3, 0, 2),
  }
}));

export default function ForgotPass() {
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
   const [navbar, setNavbar] = useState([])

    async function handleSubmit(e) {
        e.preventDefault()

        try {
        setMessage("")
        setError("")
        setLoading(true)
        await resetPassword(email)
        setMessage("Check your inbox for further instructions")
        } catch {
        setError("Failed to reset password ! Email doesn't exist in database. Contact admin if this is a mistake")
        }

        setLoading(false)
    }

    useEffect(() => {
       db.collection('company').doc('navbar').onSnapshot(snapshot => {
      const data = snapshot.data()
      setNavbar(data)
    })
    }, [])
  return (
     <div>

        <div className="bg-white font-family-karla h-screen">

    <div className="w-full flex flex-wrap">
    <div style={{backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/lyodata.appspot.com/o/login%2FGroup%20244.png?alt=media&token=9903cf0f-9a60-4955-93b0-cb057089f561")`}} className="w-1/2 shadow-2xl bg-yellow-800 ">
            <div className="object-cover w-full h-screen hidden md:block ">
              <img className='ml-auto mr-auto pt-64' src={navbar.url} alt="" />
            </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col">

            <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
                
            </div>
          
            <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <p style={{font: 'normal normal bold 40px/21px Montserrat', letterSpacing: '2.36px', color: '#43425D', opacity: 1}}  className="text-center text-black font-bold text-xl p-4">
              
              {navbar.name}</p>
                {/* <p className="text-center text-3xl">Forgot Password?</p> */}
                <p style={{font: 'normal normal normal 20px/13px Roboto', color: '#4D4F5C', opacity: 0.5}} className="text-center text-3xl">Forgot Password ?</p>
                 {error && <b style={{color: 'red'}}>{error}</b>}
                 {message && <b style={{color: 'green'}}>{message}</b>}
                <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleSubmit}>
                    <div className="flex flex-col pt-4">

                        <TextField onChange={(e) => setEmail(e.target.value)} type="email" label="Email" required id="email" placeholder="your@email.com" variant='outlined' fullWidth/>
                    </div>
    
                   <button type='submit' style={{backgroundColor: 'orange'}} className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8">Reset Password</button>
                </form>
                <div className="text-center pt-12 pb-12">
                    <p>Made a mistake? <NavLink to="/login" className="underline font-semibold">Login Here</NavLink></p>
                </div>
            </div>

        </div>

        
        
    </div>

</div>
        </div>
  );
}