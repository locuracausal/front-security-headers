import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material"

const ListItemHeader = ({text, value}) => {

    return (
        <>
            <Grid item xs='2' sx={{border:"ActiveBorder"}}>
                <Typography fontWeight={'bold'}>
                    {text} :
                </Typography>
            </Grid>
            <Grid item xs='10'>
                <Typography variant="caption" >
                    {value}
                </Typography>
            </Grid>
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
                 justifyContent="space-between"
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