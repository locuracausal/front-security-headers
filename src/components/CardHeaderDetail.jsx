import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material"




export default  function CardHeaderDetail ({headerBody})  {

    const { header, _type, description ,value, url, severity, ftype, directive} = headerBody
    return (
        <Card sx={{ minWidth: 260 }}>
            <CardHeader
                title={ header }
                subheader={'Type :' + _type}
            />
            <CardContent>
                <Grid
                 container  
                 direction="row"
                 justifyContent="space-between"
                 alignItems="center">
                    <Grid item xs='4'>
                        <Typography fontWeight={'bold'}>
                            Description :
                        </Typography>
                    </Grid>
                    <Grid item xs='8'>
                        <Typography >
                            {description}
                        </Typography>
                    </Grid>
                    <Grid item xs='4'>
                        <Typography fontWeight={'bold'}>
                            Value :
                        </Typography>
                    </Grid>
                    <Grid item xs='8'>
                        <Typography >
                            {value}
                        </Typography>
                    </Grid>
                    <Grid item xs='4'>
                        <Typography fontWeight={'bold'}>
                            Url :
                        </Typography>
                    </Grid>
                    <Grid item xs='8'>
                        <Typography >
                            {url}
                        </Typography>
                    </Grid>
                    <Grid item xs='4'>
                        <Typography fontWeight={'bold'}>
                            Severity :
                        </Typography>
                    </Grid>
                    <Grid item xs='8'>
                        <Typography >
                            {severity}
                        </Typography>
                    </Grid>
                    <Grid item xs='4'>
                        <Typography fontWeight={'bold'}>
                            FType :
                        </Typography>
                    </Grid>
                    <Grid item xs='8'>
                        <Typography >
                            {ftype}
                        </Typography>
                    </Grid>
                    <Grid item xs='4'>
                        <Typography fontWeight={'bold'}>
                            Directive :
                        </Typography>
                    </Grid>
                    <Grid item xs='8'>
                        <Typography >
                            {directive}
                        </Typography>
                    </Grid>
                    
                </Grid>

            </CardContent>

        </Card>
    )
}