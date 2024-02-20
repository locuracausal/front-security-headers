import { useState} from 'react'
import { useNavigate } from "react-router-dom";
import DifferenceIcon from '@mui/icons-material/Difference';
// import LoadingButton from '@mui/lab/LoadingButton'
import { LoadingButton } from '@mui/lab';
import toast from 'react-hot-toast'
import { Box, Button,   Grid, FormControlLabel,  Typography, TextField, Checkbox } from "@mui/material"
// import { postData } from '../http.js'

function Home() {
  const title = 'Headers Checkups'
  const subtitle = "Analyze the configuration of your site's headers to detect vulnerabilities and improve security."
  const titleHeaderInfo = 'Headers in Web Requests: Enhancing Security and Communication'
  const paragraphHeaderInfo = "Request headers are key components of HTTP (Hypertext Transfer Protocol) communications that contain additional information about the request that the client (usually a web browser) makes to the server. These headers provide important details about the type of content the client is requesting, as well as information about the client itself, such as cookies or authentication information.The headers in the requests can include a variety of information, such as the client's browser type, the type of content being requested, the user's preferred language, the cookies that the client has previously stored, and many other data relevant to the transaction between the client and the server. In the context of web security, headers in requests can also include security headers, such as headers related to CORS (Cross-Origin Resource Sharing), CSP (Content Security Policy), HSTS (HTTP Strict Transport Security), among others. These headers play a crucial role in protecting against various vulnerabilities and web attacks, such as malicious code injection or theft of confidential information."
  
  const navigate = useNavigate()

  const [domain, setDomain ] = useState('')
  // const [presents, setPresent ] = useState([])
  // const [missings, setMissing ] = useState([])
  const [loading, setLoading] = useState(false)

  const lastSitesHeadersTest = [
    "insecurity.blog",
    "synder-1.hotflow.synderapp.com",
    "synder-1.hotflow.synderapp.com",
    "rybun.rocks",
    "rybun.rocks",
    "google.com",
    "facebook.com",
    "expired.badssl.com",
    "facebook.com",
    "dsadsa.com",
    "facebook.com",
    "insecurity.blog",
    "facebook.com",
    "facebook.com",
    "facebook.com",
    "facebook.com",
    "google.com",
    "facebook.com",
    "linkedin.com",
    "rybun.rocks",
    "mantina.com",
    "google.com",
    "coremoney.com",
    "ssl.doctor",
    "ssl.doctor",
    "ipv6onlyhosting.com",
    "test-ipv6.hu",
    "rybun.rocks",
    "Rybun.rocks",
    "monguers.es"
  ];

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
    else{
      setLoading(true)
      // setPresent([])
      // setMissing([])
      navigate('summary', {state: {domainDetail: domain}})
    }
      // postData('/sh_check/', {url: domain})
      //   .then(res => {
      //      console.log('Present headers: ', Object.keys(res.present).map(key => ({header:key, value: res.present[key]}))) 
      //       // setPresent(Object.keys(res.present).map(key => ({header:key, value: res.present[key]})))
      //       // setMissing(res.missing)

      //       toast.success('The analysis was successfully completed',{duration:4000})
      //       console.log('Response Sh Check :',res)})
      //     .catch(err => {
      //       toast.error(err.message ,{duration:4000})
      //       console.log('Error desde test domain function', err)
      //     })
      //     .finally(() => setLoading(false))
      //   }
  }

  const validateDomain = (ipOrDomain) => {
      const regexIp = /\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b/i
      const regexDomain =/[A-Za-z0-9]+\.[A-Za-z]+/i 

      if (regexIp.test(ipOrDomain)) return true

      return regexDomain.test(ipOrDomain)              

    }



  return (
    <>
      <section className='section-1'>
        <Grid container  sx={{m:6 , maxWidth:1000  }} justifyContent={'center'}>
            <Grid item xs='12' lg='8' sx={{pr:1}}>
                <Typography color="primary" fontWeight='bold' variant='h4'>{title}</Typography>
                <h2 >{subtitle}</h2>
            </Grid>

            <Grid item xs='12' lg='5' sx={{pr:1, mt:2}}>
                <TextField id="outlined-basic" fullWidth label="Hostname or IP address" variant="outlined" onChange={(e) => setDomain(e.target.value)} />
            </Grid>
            <Grid item xs='12' lg='3' sx={{mt:2}}>
                <LoadingButton color='red' loading={loading} fullWidth variant="contained" onClick={testDomain}><Box sx={{p:1}}>Checkup</Box></LoadingButton>
            </Grid>
            <Grid item xs='12' sx={{m:2}} >
              <FormControlLabel
                value="start"
                control={<Checkbox />}
                label={<Typography  color="grey" variant='body1'>Do not show the results on the boards</Typography> }
                labelPlacement="start"
              />
            </Grid>
            {/* {presents.length > 0 &&
              <Grid item xs='12' lg='10' sx={{pr:1}}>7
              <Button onClick={()=> navigate('/detail',{state: {domainDetail: domain}})} >Detail</Button>
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
            } */}
            

            
        </Grid>
      </section>
      <section className='section-2'>
        <Grid container flexDirection={'row'} sx={{m:3, maxWidth:1200}} justifyContent={'start'} alignContent={'start'}>
          <Grid item >
            <Box sx={{m:1 , mb:0}}>
              <h1 className='text-xl' style={{ color:'black' }}>
                Last Headers Doctor Checkups :
              </h1>
            </Box>

          </Grid>
          <Grid xs='12' container>
          {lastSitesHeadersTest.map((site, index) => 
              <Box sx={{m:1}} className='border-button' key={index}>
                <Button className='border-button' size='small' color="info" onClick={() => navigate('detail', {state:{detailDomain: site}})} variant="outlined">{site}</Button>
              </Box>
              
            
            )}
          </Grid>
        </Grid>

      </section>
      <section className='section-3'>
        <Grid container flexDirection={'row'} sx={{m:3}} justifyContent={'center'} alignContent={'center'}>
          <Grid container xs='12' lg='2' sx={{p:2, m:3}} >
              <DifferenceIcon style={{ fontSize: 250 }}  />
          </Grid>
          <Grid xs='12' lg='7' item sx={{p:2}}>
              <Typography color="white" fontWeight='bold' variant='h4'>{titleHeaderInfo}</Typography>
              <h2 className='text-xl' style={{ color:'white' }} >{paragraphHeaderInfo}</h2>
          </Grid>
        </Grid>

      </section>
      <section className='section-2'>
      <Grid container flexDirection={'row'} sx={{m:3, maxWidth:1200}} justifyContent={'space-around'} alignContent={'start'}>
          <Grid container xs={12}>
            <Box sx={{m:1 , mb:0, flexDirection:'row', justifyContent:'start' }}>
              <h1 className='text-xl' style={{ color:'black' }}>
                Other related tools: :
              </h1>
            </Box>
          </Grid>
        <Grid item sx={{m:1 , mb:0}}>
          <Button onClick={() => window.open('https://ssl.doctor/', '_blank')}>
           <img src="https://dns.doctor/images/dns_doctor_logo_.png" width={300} alt="Link to dns doctor" />
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={() => window.open('https://ssl.doctor/', '_blank')}>
            <img src="https://ssl.doctor/assets/logotype.png"  width={300} alt="Link to ssl doctor" />
          </Button>
          
        </Grid>
      </Grid>

      </section>

    </>


  );
}

export default Home;