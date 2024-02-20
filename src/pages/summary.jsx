import { useState, useEffect} from 'react'
import {toast} from 'react-hot-toast'
import { useLocation, useNavigate} from 'react-router-dom';
import { Button, Grid, CircularProgress ,  List, ListItem,ListItemText, Typography } from "@mui/material"
import { postData } from '../http.js'

function Detail() {
  const [loading, setLoading] = useState(true)
  // const [domain, setDomain] = useState('')
  // const [analyzedHeaders, setAnalyzedHeaders] = useState([])
  const [presents, setPresent ] = useState([])
  const [missings, setMissing ] = useState([])
  const { state } = useLocation()
  const { domainDetail } = state
  console.log(state)
  const navigate = useNavigate()


  useEffect(() => {
    if(domainDetail !== ''){
    setLoading(true)  

      postData('/sh_check/', {url: domainDetail})
        .then(res => {
           console.log('Present headers: ', Object.keys(res.present).map(key => ({header:key, value: res.present[key]}))) 
            setPresent(Object.keys(res.present).map(key => ({header:key, value: res.present[key]})))
            setMissing(res.missing)

            toast.success('The analysis was successfully completed',{duration:4000})
            console.log('Response Sh Check :',res)})
          .catch(err => {
            toast.error(err.message ,{duration:4000})
            console.log('Error desde test domain function', err)
          })
          .finally(() => setLoading(false))
        
    console.log('Use effect')}
  },[domainDetail])

  return (
    <>
      <Grid container   justifyContent={'center'}  sx={{pr:1, mt:8 }}> 
        <Grid container sx={{m:2}} flexDirection={'row'} >
          <Typography color='black' variant='h6'> Analyzing host: {domainDetail}  </Typography>
          {loading && <CircularProgress size={20} sx={{m:1}} />}
        </Grid>
        <Grid container sx={{m:2}} flexDirection={'row'} >
          <Button sx={{ml:1}} color="info"  onClick={() => navigate('/')}>  Take a new checkup </Button>
        </Grid>
        {presents.length > 0 &&
              <Grid item xs='12'  sx={{pr:1}}>
              {/* <Button onClick={()=> navigate('/detail',{state: {domainDetail: domain}})} >Detail</Button> */}
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
              <Grid item xs='12' sx={{pr:1}}>
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
    </> 
  );
}

export default Detail;