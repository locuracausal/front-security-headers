import { useState, useEffect} from 'react'
import { useLocation, useNavigate} from 'react-router-dom'; 
import CardHeaderDetail from "../components/CardHeaderDetail";
import TableHeaders from "../components/TableHeaders";
import { Button, Grid, CircularProgress ,  Typography } from "@mui/material"
import { postData } from '../http.js'

function Detail() {
  const [loading, setLoading] = useState(true)
  // const [domain, setDomain] = useState('')
  const [analyzedHeaders, setAnalyzedHeaders] = useState([])
  const { state } = useLocation()
  const { domainDetail } = state
  console.log(state)
  const navigate = useNavigate()

  useEffect(() => {
    if(domainDetail !== ''){
    setLoading(true)  
    postData('/security_headers/', {url:domainDetail})
      .then((res) => {
        console.log('Res security', res)
        setAnalyzedHeaders(res.map((header, index ) => ({id: index, ...header})))
      })
      .catch(err => console.log('Error call', err))
      .finally(()=> setLoading(false))
    console.log('Use effect')}
  },[domainDetail])

  return (
    <>
      <Grid container flexDirection={'row'} justifyContent={'start'}  sx={{pr:1 }}> 
        <Grid container sx={{maxWidth:1200, m:3}}>
          <Grid item sx={{m:2}} flexDirection={'row'} >
            <Typography color='black' variant='h6'> Analyzing host: {domainDetail}  </Typography>
            {loading && <CircularProgress size={20} sx={{m:1}} />}
          </Grid>
        <Grid container sx={{m:1}} flexDirection={'row'} >
          <Button sx={{ml:1}} color="info"  onClick={() => navigate('/')}>  Take a new checkup </Button>
        </Grid>
          
          <TableHeaders headers={analyzedHeaders} />
        </Grid>
        
        {false && analyzedHeaders.map((header, index )=>
          <Grid item lg='12' key={index} sx={{p:1}}>
            <CardHeaderDetail headerBody={header}/>
          </Grid> 
          ) }
      </Grid> 
    </> 
  );
}

export default Detail;