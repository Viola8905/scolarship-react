import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "surname", label: "Surname", minWidth: 200 },
  { id: "money", label: "Scolarship", minWidth: 100 },
];

function createData(surname, money, delete1) {
  //const density = population / size;
  return { surname, money };
}

const rows = [
  createData("Mykyta", 100),
  createData("Arestovych", 200),
  createData("Kim", 300),
  createData("Beiden", 400),
  createData("Vereschuk", 500),
  createData("Kuleba", 600),
  createData("Skichko", 700),
  createData("Zelenskiy", 800),
  createData("Ghost", 400),
  createData("Sholz", 500),
];




export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const Biggest = () => {
    let max = rows[3];
		for(let i= 0;  i < rows.length; i++){
			if(rows[i].money > max.money){
				max = rows[i]  
				
			}
		}
		return (
      <div style = {{display:'flex', justifyContent:'space-between', fontWeight: 800, padding: '20px 10px'}}>
        <div>The biggest scolarship has {max.surname}</div>
        <div>{max.money}$</div>
      </div>
    );
  };
	

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

			<Paper sx={{ width: "50%", overflow: "hidden", margin:'50px auto' }}>
					{Biggest()}
			</Paper>
			
    </>
  );
}
