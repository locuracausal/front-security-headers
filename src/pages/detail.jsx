import { useState, useEffect} from 'react'
import { useLocation, /* other hooks */ } from 'react-router-dom'; 
import CardHeaderDetail from "../components/CardHeaderDetail";
import {  Grid, CircularProgress ,  Typography } from "@mui/material"
import { postData } from '../http.js'

function Detail() {
  const [loading, setLoading] = useState(true)
  const [domain, setDomain] = useState('')
  const { state } = useLocation();
  const { domainDetail } = state
  setDomain(domainDetail)
  console.log(state);
  const header1 = {
    "header": "content-security-policy-report-only",
    "_type": "finding",
    "ftype": "nonce_length",
    "severity": "INFO",
    "directive": "script-src",
    "url": "https://www.google.com",
    "value": "'nonce-t4ZyE-7ZS4JDd0LaelN04Q'",
    "description": "Nonces should only use the base64 charset."
  }
  useEffect(() => {
    if(domain !== ''){
    setLoading(true)  
    postData('/security_headers/', {url:domain})
      .then((res) => {
        console.log('Res security', res)
      })
      .catch(err => console.log('Error call'))
      .finally(()=> )
    console.log('Use effect')}
  },[domain])

  return (
    <>
      <Grid container  justifyItems={'flex-start'}  sx={{pr:1 }}> 
        <Grid container sx={{m:2}} flexDirection={'row'} >
          <Typography color='black' variant='h6'> Analyzing host: {domain}  </Typography>
          {loading && <CircularProgress size={20} sx={{m:1}} />}
        </Grid>
       
        <Grid item lg='6'>
          <CardHeaderDetail headerBody={header1}/>
        </Grid>
      </Grid> 
    </>
  );
}

export default Detail;