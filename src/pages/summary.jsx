import { useState, useEffect} from 'react'
import {toast} from 'react-hot-toast'
import { useLocation, useNavigate} from 'react-router-dom';
import { Box, Button,Chip, Grid, Card, CardHeader,CircularProgress ,Skeleton, /* ListItem,ListItemText,*/ Typography } from "@mui/material"
import { postData } from '../http.js'
import TableHeaders from "../components/TableHeaders"

function Detail() {
  const [loading, setLoading] = useState(true)
  // const [domain, setDomain] = useState('')
  // const [analyzedHeaders, setAnalyzedHeaders] = useState([])
  // const [resultSuccess, setResultSuccess] = useState(false)
  const [presents, setPresent ] = useState([])
  const [missings, setMissing ] = useState([])
  const [calification, setCalification] = useState({value:'', color:''})
  const { state } = useLocation()
  const { domainDetail } = state
  console.log(state)
  const navigate = useNavigate()

  const [analyzedHeaders, setAnalyzedHeaders] = useState([])
  const severityList = ['ERROR','CRITICAL','HIGH', 'SYNTAX', 'HIGH_MAYBE', 'MEDIUM', 'MEDIUM_MAYBE','STRICT_CSP','LOW','INFO', 'NONE' ]

  const getColorSeverity = (severityType) => {
    const i =  severityList.findIndex((s) =>s === severityType )
    if (i < 3)  return '#db1e1e'
    if (i < 6)  return '#ffd242'
    return '#008000'
    
  }

  getColorSeverity('HIGH')
  
  const calificationFunc = (presentsQty, missingQty) => {
    const percentage = presentsQty / (presentsQty + missingQty) * 100 
    if (percentage >= 85)
      return {value:'A', color:'#4cad3f'}
    if (percentage >= 70)
      return {value:'B', color:'#4cad3f'}
    if (percentage >= 50)
      return {value:'C', color:'#ffd242'}
    if (percentage >= 40)
      return {value:'D', color:'#db1e1e'}
    return {value:'F', color:'#db1e1e'}
  }


  useEffect(() => {
    if(domainDetail !== ''){
  

      postData('/sh_check/', {url: 'https://' + domainDetail})
        .then(res => {
            setPresent(Object.keys(res.present).map(key => ({header:key, value: res.present[key]})))
            setMissing(res.missing)
            const missing = res.missing.length
            const presents = Object.keys(res.present).length
            setCalification(calificationFunc(presents, missing))

            toast.success('The analysis was successfully completed',{duration:4000})
          })
          .catch(err => {
            toast.error(err.message ,{duration:4000})
          })        
  }
  },[domainDetail])

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
  }
  },[domainDetail])



  return (
    <>
      <Grid container  flexDirection={'row'} justifyContent={'start'}  sx={{ mt:8, maxWidth:{xs:430, sm:600, md:800 , lg:1200, xl:1400}}}> 
        <Grid container  sx={{m:2}} flexDirection={'row'} >
          <Typography color='black' variant='h6'> Analyzing host: {domainDetail}  </Typography>
          {loading && <CircularProgress size={20} sx={{m:1}} />}
        </Grid>
        <Grid container sx={{m:2}} flexDirection={'row'} >
          <Button sx={{ml:1}} color="info"  onClick={() => navigate('/')}>  Take a new checkup </Button>
        </Grid>

        
        
        {(presents.length > 0 || missings.length > 0) &&
              <Grid item xs='12'  sx={{pr:1}}>
              {/* <Button onClick={()=> navigate('/detail',{state: {domainDetail: domain}})} >Detail</Button> */}
                  

                  <Card sx={{m:2}}>
                    <CardHeader title='Security Report summary '/>
                    <Grid container flexDirection={'row'} alignContent={'center'} justifyContent={'space-around'} sx={{p:2}}>
                    <Grid item xs={12} lg={3}>
                      <Card sx={{background:calification.color, display:'flex', justifyContent:'center' }}>
                        <Box sx={{m:3}}>
                          <Typography variant='h1' color='#fff'> {calification.value} </Typography>
                        </Box>
                        
                      </Card>
                      </Grid>
                        <Grid container xs={12} lg={8}>
                        {presents.map((present, index) => (<Grid  sx={{m:1}} key={index}> <Chip label={present.header + ':' + present.value} color="success" size="small" /></Grid>))}
                        {missings.map((missing, index) => (
                          <Grid key={index}  sx={{m:1}} ><Chip  size="small" label={missing}  color='error' /> </Grid>
                          )) }
                        </Grid>
                      </Grid>

                  </Card>
                  {loading ? 
                  <Grid>
                    <Skeleton sx={{height:200}}/>
                    <Skeleton sx={{ height:300}}/>
                  </Grid>
                  :
                  <>
                  {severityList.map((severity, index) =>
                    analyzedHeaders.some(obj => obj.severity === severity) &&
                    <Card key={index} sx={{m:2 , p:2, background:getColorSeverity(severity)}}>
                      
                      <CardHeader title= {<Typography color='#fff' variant='h4'> {severity} </Typography> }/>
                      <TableHeaders headers={analyzedHeaders.filter(header => header.severity === severity)}/>
                    </Card>
                  )}
                  </>}
              </Grid>
            }
      </Grid> 
    </> 
  );
}

export default Detail;