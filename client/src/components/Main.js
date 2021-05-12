import React, { useState, useEffect, useRef} from "react";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Fade from '@material-ui/core/Fade';
import Alert from '@material-ui/lab/Alert';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Grid from '@material-ui/core/Grid';
import Logo from '../images/logo.png';




import actions from "../services/service";


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 700,
    padding: '2em',
    // padding: 'auto',
    margin: 'auto',
    
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  auto: {
    padding: 'auto',
    margin: 'auto',
    maxWidth: 620,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

  },
  media: {
    height: 220,
  },
  box: {

    width: 260
  },
  formControl: {
    margin: theme.spacing(5),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  title:{
      textAlign: 'center',
    marginBottom: '1em',
    paddingTop: '0.5em',
      fontSize: '2.3em',
      fontWeight: '700',
      color: 'black'
  },
  button:{
    color: 'rgb(0 0 0 / 67%)',
    float: 'right',
  },
  button2: {
float: 'right'
  },
  text_send: {
  fontSize: '2em',
  fontStyle: 'italic',
  marginRight: '7em',
  float: 'left !important',
      },
  alert: {
    left: '0',
    pointerEvents: 'none',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: '1500',
  },
  input: {
    width: 42,
  }
}));


  

export default function  Main() {
    const classes = useStyles();
   const [data, setData] = useState('')
   const [transf, setTransf] = useState(null);
   const [returns, setReturns] = useState([]);
   const [error4, setError4] = useState(null);
   const [error5, setError5] = useState(null);
   const [showForm, setShowForm] =  useState(true);
   const handleChange=(e)=>{
console.log(e.target.value)
setData(e.target.value)
   }
   
   const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: 'rgb(241 240 240);',
      color: theme.palette.common.black ,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

   const Returns = ()=>{
    if(returns.length > 0) {
        console.log("r",returns)
  console.log('DDD', JSON.parse(returns[0].data))
  let main = [];

  returns.map(x =>{
      main.push(JSON.parse(x.data))
  })
console.log("MAIN", main)
  const ceils = (data) =>{
    console.log(data.length)
    return data.map((x, i) => (
        <TableCell key={x+i}  align="center" component="th" scope="row">
              {i === 1? x.substring(4, 6) + '/' + x.substring(6, 8) + '/' + x.substring(0, 4)  : ('')}
           {i !== 1 ?
            x ? x : ("-")
            :('')}
        
        </TableCell>
     
    ))
  }
          return main.map((x, i) => (
            
            <TableRow key={i}>

          {ceils(x)}
          </TableRow>
              
            ))
          }
         
  }





  
    
    

   const handleSubmit=()=>{
     if(data){
      setShowForm(null)
      setTransf(true);
    actions.transfer(data).then(x =>{
      if(x.data) {
        console.log(x.data)
    if(x.data.length > 0){
setReturns(x.data)
console.log("Here")
    }
    else{
        setError5(true);
        setTimeout(() => {
          setError5(null);
        }, 3000);  
        setShowForm(true)
    }
}
    else{
            setError4(true);
            setTimeout(() => {
              setError4(null);
            }, 5000);
          
    }
   }).catch(err=>{

    setError4(true);
        setTimeout(() => {
          setError4(null);
        }, 5000);
})
}    
  }

  function refreshPage() {
    window.location.reload(false);
  }

    
    return (
        <Card className={classes.root}>
          <CardContent>
      
        <CardMedia
              className={classes.media}
              image={Logo}
           

            />
      
      {error5 ?<Fade style={{marginTop: '1em'}} in={error5} timeout={{ enter: 300, exit: 1000 }}>
          <Alert  severity="error">Can't find any records for this ID!</Alert>
        </Fade>: ('')} 
     
        {showForm? <form style={{ display: 'flex', justifyContent: 'spaceBetween', alignItems: 'center', marginTop: '3em' }}  noValidate autoComplete="off">
     
        <Grid container spacing={1}>
    
        
        <Grid item xs={9}>
   
        <TextField style={{width: '100%', fontSize: '2em !i'}}    id="outlined-textarea" multiline required  variant="outlined"  onChange={handleChange} label="Enter the Parent Sku" defaultValue={data} />
        </Grid>
     <Grid item xs={3}>
  <Button style={{width: '100%', height: '100%'}} variant="outlined" color="primary" onClick={handleSubmit}>Submit</Button>
  </Grid>
        </Grid>
      </form> : ('')}
      <Typography variant="body2"  component="h1" align='center' style={{marginTop: '4em'}}>
        </Typography>
        {error4 ?<Fade in={error4} timeout={{ enter: 300, exit: 1000 }}>
          <Alert  severity="error">Server error occurred. Please, reload the page!</Alert>
        </Fade>: ('')}
           </CardContent> 
    


{returns.length > 0 ? <> <TableContainer  style={{maxHeight: '200px !important', overflow: 'auto'}} component={Paper}>
      <Table stickyHeader size="small" aria-label="a dense table">
        <TableHead >
          <TableRow>
            <StyledTableCell align="center">ID</StyledTableCell>
            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align="center">Element</StyledTableCell>
            <StyledTableCell align="center">Value1</StyledTableCell>
            <StyledTableCell align="center">Value2</StyledTableCell>
            <StyledTableCell align="center">Value3</StyledTableCell>
            <StyledTableCell align="center">Value4</StyledTableCell>
            <StyledTableCell align="center">Value5</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <Returns/>
        </TableBody>
      </Table>
    </TableContainer>
    <Typography  align='center' style={{ marginTop: '2em'}} >
    <Button onClick={refreshPage} size='large' variant="outlined" color='primary' >
  Complete
</Button>
              </Typography>
  
    </> : ('')}
        </Card>
      );

}