import React, {useEffect, useState} from 'react'
import { Button, Card, Container, makeStyles, TableCell, TableFooter, TablePagination, TableRow, TextField, Typography, useTheme } from '@material-ui/core';
import { db } from '../../firebase';
import { firebaseLooper } from '../../utils/tools';
import RecipeData from './RecipeData';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import PropTypes from 'prop-types';
import ContentDashboardLayout from '../../components/ContentSidebar/ContentDashboardLayout';
import { Autocomplete } from '@material-ui/lab';
import { NavLink } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  layoutRoot: {
    backgroundColor: 'white',
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
    paddingLeft: 256
  }
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
     table: {
    minWidth: 500,
  },
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};



function TablePaginationActions(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}


const Recipes = ({match}) => {
    const [searchTerm, setSearchTerm] = useState('')
    const classes = useStyles()
    const [ recipe, setRecipe] = useState([])
     const [mTitle, setMTitle] = useState('')
     const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, recipe.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


    useEffect(() => {
      db.collection('machineData')
       .doc(match.params.id)
        .onSnapshot(doc => {
         setMTitle(doc.data().title)
        })
        db.collection('recipes').where('mid', '==', `${match.params.id}`).onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setRecipe(data)
        })
    }, [])
   

    return (
        <div className="px-2">
        <ContentDashboardLayout match={match} />
         <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
            < >
            <div style={{display: 'flex', justifyContent: 'space-between', paddingLeft: '2.2rem'}}>
             
             <div>
                <Typography style={{color: 'black'}} variant='h1' align='left'><b>Recipe Data</b></Typography>
                 <Typography align='left' variant='body2' > These are all the required Recipe Data </Typography>
             </div>
             <div>
             <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              
              <div className="relative"> 
           <input style={{ border: '2px solid whitesmoke'}} onChange={(e) => setSearchTerm(e.target.value)} type="text" className="h-14 w-96 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none" placeholder="Search Recipes..."/>
            <div className="absolute top-4 right-3"><SearchIcon style={{opacity: '0.5'}}/>  </div>
        </div>
              <Button color='primary' variant='contained' style={{width: '150px', marginLeft: '4%', marginRight: '2%',  color: 'white'}} component={NavLink} to={`/machine-data/Reports/${match.params.id}/Add-Recipes`}>ADD New </Button>
      
      <hr/>
        </div>
             </div>
           </div>
        <div style={{paddingLeft: '2.2rem'}}>
          <>
            
        
              <br/>
               
              <br/>
              {(rowsPerPage > 0
            ? recipe.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : recipe
          ).
           filter((data) => {
              if(searchTerm === ""){
                  return data
              } else if (data.title?.toLowerCase().includes(searchTerm.toLocaleLowerCase())){
                      return data
                      }
          })
          .map((data) => (
            <RecipeData key={data.id} rows={data} match={match} />
          ))}
           
           
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
            <TableFooter style={{display: 'flex', justifyContent: 'flex-end'}}>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={recipe.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
              
        </TableFooter>
          </>
        </div>
      </>
          </Card>
        </div>
      </div>
         
      </div>
     
    )
}

export default Recipes
