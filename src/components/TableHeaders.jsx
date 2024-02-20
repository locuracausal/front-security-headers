
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'header', headerName: 'Header', flex: 1 },
    { field: 'ftype', headerName: 'Ftype', flex: 1 },
    { field: 'severity', headerName: 'Severity', flex: 2 },
    { field: 'directive', headerName: 'Directive', flex: 2 },
    { field: 'url', headerName: 'URL', flex: 2 },
    { field: 'value', headerName: 'Value', flex: 2 },
    { field: 'description', headerName: 'Description', flex: 2 },
  ];


export default function DataTable({ headers }) {
  return (
    <div style={{ height: 800, width: '100%', backgroundColor: 'white'}}>
      <DataGrid
        rows={headers}
        columns={columns}
      />
    </div>
  );
}