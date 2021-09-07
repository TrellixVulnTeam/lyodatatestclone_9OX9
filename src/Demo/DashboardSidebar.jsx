import { useEffect, useState } from 'react';
import { Link as RouterLink, NavLink, Redirect, useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  Typography
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
  PhoneCall as PhoneIcon,
  Video as VideoIcon,
  LogOut as LogOutIcon,
  Book as Book
} from 'react-feather';
import VideoCallIcon from '@material-ui/icons/VideoCall'
import NavItem from './NavItem';
import { useAuth } from '../components/context/AuthContext';
import { db } from '../firebase';
import { firebaseLooper } from '../utils/tools';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import DashboardIcon from '@material-ui/icons/Dashboard';

const items = [
  
  {
    href: '/',
    icon: DashboardIcon,
    title: 'Dashboard'
  },
  {
    href: '/machine-data',
    icon: ShoppingBagIcon,
    title: 'Machines'
  },
  {
    href: '/video-call',
    icon: VideoIcon,
    title: 'Video Call'
  },
  {
    href: '/file-manager',
    icon: Book,
    title: 'Files'
  },
 

];

const itemSecond = [

   {
    href: '/users',
    icon: UsersIcon,
    title: 'Users'
  },
 {
    href: '/account',
    icon: UserIcon,
    title: 'Account'
  },
  {
    href: '/settings',
    icon: SettingsIcon,
    title: 'Settings'
  },
  {
    href: '/user-manual',
    icon: ListAltOutlinedIcon,
    title: 'User Manual'
  }
]

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  const {currentUser, logout} = useAuth()
  const [userData, setUserData] = useState([])
  const [navbar, setNavbar] = useState([])
  const [error, setError] = useState('')
  const history = useHistory()
  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }
  useEffect(() => {
    db.collection('company').doc('navbar').onSnapshot(snapshot => {
      const data = snapshot.data()
      setNavbar(data)
    })
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    if(currentUser){
      db.collection('users').where('email', '==', `${currentUser.email}`).onSnapshot(doc => {
      const data = firebaseLooper(doc)
      setUserData(data[0])
    })
    } else {
      <Redirect to='/login'/>
    }
    
  }, [location.pathname]);

  const content = (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
     <a style={{textDecoration: 'none', color:'white', backgroundColor: 'black'}} className="flex items-center w-full px-3 mt-3" href="#">
			
                 <img
    alt="Logo"
    width="50px"
    src={navbar.url}
   
  />
			<span className="ml-2 text-sm font-bold uppercase ">{navbar.name}</span>

		</a>
      <Divider />
      <Box m={2} >
        <List className="flex flex-col items-center w-full mt-3 border-t border-gray-700">
          <>
            {/* <Button component={NavLink} style={{textDecoration: 'none', color:'orange'}} className="flex items-center w-full h-12 px-3 mt-2 text-gray-200 bg-black rounded" to="/">
                    <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
 				</svg>
					
					<span className="ml-2 text-sm font-medium">DASHBOARD</span>
 			</Button> */}
        {/* <div className="flex items-center w-full h-12  mt-2 rounded"> */}
        {/* <ListItem
      disableGutters
      style={{
        display: 'flex',
        
       
      }}
     
    >
    
      <Button
      
        component={RouterLink}
        style={{
          background: 'orange',
          color: 'white',
          fontWeight: 'medium',
          justifyContent: 'flex-start',
          letterSpacing: 0,
          py: 1.25,
          textTransform: 'none',
          width: '100%',
          
        }}
        to='/'
      >
        
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bar-chart-fill" viewBox="0 0 16 16">
  <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z"/>
</svg>
        <span>
          
            <b className='ml-2'>Dashboard</b> 
         
        </span>
      </Button>
      </ListItem>  */}
            {/* </div> */}
          </>
          
         
          
          {items.map((item) => (
            <div key={item.title} className="flex items-center w-full h-12 mt-2  ">
              <NavItem
              href={`${item.href}`}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
            </div>
            
          ))}
          <div className='flex flex-col items-center w-full mt-2 border-t border-gray-700'>
          {itemSecond.map((item) => (
            <div key={item.title} className="flex items-center w-full h-12 mt-2  ">
              
                <NavItem
              href={`${item.href}`}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
           
            </div>
            
          ))}
        </div>
        </List>
      </Box>
      <Box style={{ flexGrow: 1 }} />
      {/* <Box
      m={2}
      p={2}
        style={{
          backgroundColor: 'whitesmoke',
          
        }}
      >
        <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          Want to Logout?
        </Typography>
       
      </Box> */}
       <Box
        pt= {2}
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: '4.2rem'
            
          }}
        >
          <div className="flex items-center w-full p-3 mt-2  ">
              <ListItem
      disableGutters
      style={{
        display: 'flex',
        color: 'white',
          fontWeight: 'medium',
          justifyContent: 'flex-start',
          background: 'orange',
          borderRadius: "0.25rem"
       
      }}
      
    >

       <Button
          fullWidth
          style={{backgroundColor: "orange", color: "white",
          fontWeight: 'medium',
          justifyContent: 'flex-start',
          letterSpacing: 0,
          py: 1.25,
          display: 'flex',
          textTransform: 'none',
          width: '100%',}}
          
            
            
            onClick={handleLogout}
          >
           
            <LogOutIcon style={{color: 'white', marginLeft: '5px'}}/>
           
            <b className="ml-2">Log Out</b>
          </Button>
    </ListItem>
          </div>
      
        </Box>
       
    </Box>

  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            style: {
              width:250,
              backgroundColor: '#43425D'
            }
          }}
        >
          {content}
        </Drawer>
     
      </Hidden>
        
      <Hidden mdDown>
        <Drawer
          anchor="left"
          variant="persistent"
          open
          PaperProps={{
            style: {
              width: 250,
              backgroundColor: '#43425D'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default DashboardSidebar;