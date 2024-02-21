import { Card,Box, CardContent, Grid, ListItem, Typography } from "@mui/material"

const ListItemHeader = ({text, value}) => {

    return (
        <>
            <ListItem item xs='12' sx={{ display:'flex', alignSelf:'start' }}>
                <Typography fontWeight={'bold'}>
                    {text} :
                </Typography>
                {/* <Box sx={{m:1}}>
                <Typography variant="caption" >
                    {value}
                </Typography>
                </Box> */}
                
            </ListItem>
            <ListItem item xs='12'sx={{ display:'flex', alignSelf:'start' }}>
                <Typography variant="caption" >
                    {value}
                </Typography>
            </ListItem>
        </>
    )
} 


export default  function CardHeaderDetail ({headerBody})  {

    const { header, _type, description ,value, url, severity, ftype, directive} = headerBody
    return (
        <Card sx={{  }}>
            <CardContent>
                <Grid
                 container  
                 direction="row"
                 justifyContent="start"
                 alignItems="center">
                    <ListItemHeader text={'Header'} value={header}/>
                    <ListItemHeader text={'Type'} value={_type}/>
                    <ListItemHeader text={'Description'} value={description}/>
                    <ListItemHeader text={'Value'} value={value}/>
                    <ListItemHeader text={'Url'} value={url}/>
                    <ListItemHeader text={'Severity'} value={severity}/>
                    <ListItemHeader text={'FType'} value={ftype}/>
                    <ListItemHeader text={'Directive'} value={directive}/>
                    
                </Grid>

            </CardContent>

        </Card>
    )
}