import { useState} from 'react'
// import { useNavigate } from "react-router-dom";
// import LoadingButton from '@mui/lab/LoadingButton'
import { LoadingButton } from '@mui/lab';
import toast from 'react-hot-toast'
import { Box, List, ListItemText, ListItem, Grid, FormControlLabel, CircularProgress ,  Typography, TextField, Checkbox } from "@mui/material"
import { postData } from '../http.js'

function Home() {
  const title = 'Headers Checkups'
  const subtitle = "Analyze the configuration of your site's headers to detect vulnerabilities and improve security."
  // const navigate = useNavigate()

  const [domain, setDomain ] = useState('')
  const [presents, setPresent ] = useState([])
  const [missings, setMissing ] = useState([])
  const [loading, setLoading] = useState(false)

  const testDomain = () => {
    if (!validateDomain(domain))
      toast.error('Ip or Domarin must be valid.', {
        duration: 15000,
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color:'red',
          background: '#fecaca',
        },
        
      });
      // toast.error('Ip or Domain must be valid.')
    else{
      setLoading(true)
      setPresent([])
      setMissing([])
      postData('/sh_check/', {url: domain})
        .then(res => {
           console.log('Present headers: ', Object.keys(res.present).map(key => ({header:key, value: res.present[key]}))) 
            setPresent(Object.keys(res.present).map(key => ({header:key, value: res.present[key]})))
            // setPresent(res.present)
            setMissing(res.missing)

            // navigate('/home2')
            toast.success('The analysis was successfully completed',{duration:4000})
            console.log('Response Sh Check :',res)})
          .catch(err => {
            console.log('Error desde test domain function', err)
          })
          .finally(() => setLoading(false))
        }
  }

  const validateDomain = (ipOrDomain) => {
      const regexIp = /\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b/i
      const regexDomain =/[A-Za-z0-9]+\.[A-Za-z]+/i 

      if (regexIp.test(ipOrDomain)) return true

      return regexDomain.test(ipOrDomain)              


    }



  return (
    <Grid container sx={{mt:8}} justifyContent={'center'}>
        <Grid item xs='8' sx={{pr:1}}>
            <Typography color="primary" fontWeight='bold' variant='h4'>{title}</Typography>
            <Typography  className='thin-letter' color="grey" variant='h5'>{subtitle}</Typography>
        </Grid>

        <Grid item xs='5' sx={{pr:1, mt:2}}>
            <TextField id="outlined-basic" fullWidth label="Hostname or IP address" variant="outlined" onChange={(e) => setDomain(e.target.value)} />
        </Grid>
        <Grid item xs='3' sx={{mt:2}}>
            <LoadingButton color='red' loading={loading} fullWidth variant="contained" onClick={testDomain}><Box sx={{p:1}}>Checkup</Box></LoadingButton>
        </Grid>
        <Grid item xs='8' sx={{m:2}} >
          <FormControlLabel
            value="start"
            control={<Checkbox />}
            label={<Typography  color="grey" variant='body1'>Do not show the results on the boards</Typography> }
            labelPlacement="start"
          />
        </Grid>
        <Grid container xs='12' lg='10' sx={{pr:1 }}>
          <Typography color='black' variant='h6'> Analyzing host: {domain}  </Typography>
          {loading && <CircularProgress size={20} sx={{m:1}} />}
        </Grid> 
        {presents.length > 0 &&
          <Grid item xs='12' lg='10' sx={{pr:1}}>
            <List>
              <Typography color='primary' variant='h5'> Present Headers </Typography>
              {presents.map((present, index) => (
                <ListItem  key={index} sx={{ background: index%2 === 1 ? '#f0fdf4' : '#dcfce7'}}>
                  <ListItemText ><Typography variant='caption' color='black'>{present.header} : {present.value}  </Typography> </ListItemText>
                </ListItem>

                )) }
            </List>
              
          </Grid>
        }
        {missings.length > 0 &&
          <Grid item xs='12' lg='10' sx={{pr:1}}>
            <List>
              <Typography color='red.main' variant='h5'> Missing Headers </Typography>
              {missings.map((missing, index) => (
                <ListItem  key={index} sx={{ background: index%2 === 0 ? '#f05654' : '#ff5654'}}>
                  <ListItemText ><Typography variant='caption' color='black'>{missing} </Typography> </ListItemText>
                </ListItem>

                )) }
            </List>
              
          </Grid>
        }
        

        
    </Grid>
  );
}

export default Home;