import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { Button,TextField } from '@mui/material';
import {Grid} from '@mui/material';
import OtpInterface from './OtpInterface';


export default function UserSignUpDrawer(props) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [anchor,setAnchor]=React.useState('right')
  const [btnStatus,setBtnStatus]=React.useState(false)
  const [mobile,setMobile]=React.useState('')
  const [btnMsg,setBtnMsg]=React.useState('Get an OTP')
  const [getOtp,setOtp]=React.useState('')
  const [generatedOtp,setGeneratedOtp]=React.useState('')

   React.useEffect(function(){

    setState({ ...state, ['right']: props.status });
   },[props])
   
   const GenerateOtp=()=>{
    if(btnMsg=='Change Mobile')
    {
      setBtnStatus(false)
      setBtnMsg('Get an OTP')
      setMobile('')
    }
    else{
    var otp=parseInt(Math.random()*8999)+1000
    alert(otp)
    setBtnStatus(true)
    setBtnMsg('Change Mobile')
    setGeneratedOtp(otp)
    }
   }
   const handleOtpChange=(value)=>{
    setOtp(value)
    
   }

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    props.handleStatus(open)

    setState({ ...state, ['right']: open });
  };

  const list = (anchor) => (
     <Grid container spacing={3} style={{width:400,padding:30}} >
    
     <Grid item xs={12}>
     <img src="/assets/Logo1.png" style={{width:70,padding:3}} />
     </Grid>
     <Grid item xs={12} style={{textAlign:'center',width:24,fontFamily:'poppins'}}>
     LogIn
     </Grid>
     <Grid item xs={12}>
     <TextField onChange={(event)=>setMobile(event.target.value)} value={mobile} variant='outlined' fullWidth label={ <span style={{width:24,fontFamily:'poppins'}}>Mobile Number...</span>}></TextField>
     </Grid>
     <Grid item xs={12}>
     <Button style={{
                  background: "linear-gradient(270deg,#1caba2, 20%,#1c7fab)",
                  color: "#fff",
                  fontFamily: "inherit",
                }} variant='contained' color='inherit' fullWidth onClick={GenerateOtp}>{btnMsg}</Button>
     </Grid>
     {btnStatus?
     <Grid item xs={12}>
      <OtpInterface getOtp={getOtp} generatedOtp={generatedOtp} GenerateOtp={GenerateOtp} onChange={handleOtpChange} mobile={mobile}/>
     </Grid>:<></>}
     

     </Grid>
  )

  return (
    <div>
     
        <React.Fragment key={'right'}>
         
          <Drawer
            anchor={'right'}
            open={props.status}
            onClose={toggleDrawer('right', false)}
          >
            {list('right')}
          </Drawer>
        </React.Fragment>
   
    </div>
  );
}