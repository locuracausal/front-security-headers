import { AppBar,Box, Button, Container,Grid, Toolbar, Typography } from '@mui/material';

function MyAppBar() {
  return (
    <>
      <AppBar color='white' elevation={0} position="fixed"  >
        <Container > 
          <Toolbar>
          <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
          <Grid item>
          <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
              <img src='/favicon-doctor.png' alt="Header Doctor Logo" width={35} height={25} />          
              <Box sx={{ml:1 }}> <Typography  color='red.main' fontWeight="bold" variant="h4">HEADER</Typography></Box>
              <Typography variant="h4" color='primary'>DOCTOR</Typography>
          </Box>

          </Grid>
          <Box sx={{m:2}}>
            <Button variant='contained' color='primary' onClick={()=> { window.open(import.meta.env.VITE_API_DOMAIN + '/docs', '_blank')}}> <Box sx={{p:1}}>API</Box></Button>
          </Box>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}



export default MyAppBar;
