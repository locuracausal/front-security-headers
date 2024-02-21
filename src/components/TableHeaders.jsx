
import { DataGrid } from '@mui/x-data-grid';
import CardHeaderDetail from "../components/CardHeaderDetail";
import {Grid} from '@mui/material'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';



const columns = [
    { field: 'header', headerName: 'Header', width:'200' },
    { field: 'ftype', headerName: 'Ftype', width:'200'},
    { field: 'directive', headerName: 'Directive', width:'200' },
    { field: 'value', headerName: 'Value', width:'200' },
    { field: 'description', headerName: 'Description', width:'400' },
  ];


export default function DataTable({ headers }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  return (

    <div style={{  backgroundColor: 'white'}}>
      {matches ?
      <DataGrid
        rows={headers}
        columns={columns}
      />:
      <>
      {headers.map((header, index )=>
          <Grid item lg='12' key={index} sx={{p:1}}>
            <CardHeaderDetail headerBody={header}/>
          </Grid> 
          ) }
          
          </>
          }

    </div>
  );
}