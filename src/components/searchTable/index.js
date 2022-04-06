import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from '@mui/material/Typography';

import DataUtils from "../../utils/utils";
import Dialog from "../popup";
const columns = [
  { id: "id", label: "ID", minWidth: 100, textAlign: "center" },
  { id: "left", label: "Left", minWidth: 400, textAlign: "right" },
  { id: "key", label: "Key", minWidth: 200, textAlign: "center", color: "blue", fontWeight: 900 },
  { id: "right", label: "Right", minWidth: 400, textAlign: "left", },
];

export default function TableSearch({rowsSrc, rowsTar, typeSearch}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [imageName, setImageName] = React.useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (id) => {
    setImageName(id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ padding: "30px" }}>
      <Dialog
        open={open}
        handleClose={handleClose}
        imageName={imageName}
      ></Dialog>
      <hr />
      <p style={{margin: "10px 0", fontSize: 18}}>Found total: <span style={{color: "red", fontWeight: 900}}>{rowsSrc? rowsSrc.length : 0}</span> results, Type: <span style={{color: "red", fontWeight: 900}}>{typeSearch}</span></p>
      <Typography variant="h6" gutterBottom component="div">
        Source language: 
      </Typography>
      <Paper sx={{ width: "100%", overflow: "hidden", marginTop: 2 }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      textAlign: "center",
                      minWidth: column.minWidth,
                      backgroundColor: "#2b3e51",
                      color: "white",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rowsSrc
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row) => {
                  return (
                    <TableRow
                      style={{ cursor: "pointer" }}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                      onClick={() => handleClickOpen(row.id)}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{
                              textAlign: column.textAlign,
                              color: column?.color,
                              fontWeight: column?.fontWeight
                            }}
                          >
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
      </Paper>
      <Typography variant="h6" gutterBottom component="div">
        Target language: 
      </Typography>
      <Paper
        sx={{ width: "100%", overflow: "hidden" }}
      >
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      textAlign: "center",
                      minWidth: column.minWidth,
                      backgroundColor: "#2b3e51",
                      color: "white",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rowsTar
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row) => {
                  return (
                    <TableRow
                      style={{ cursor: "pointer" }}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                      onClick={() => handleClickOpen(row.id)}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{
                              textAlign: column.textAlign,
                              color: column?.color,
                              fontWeight: column?.fontWeight
                            }}
                          >
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
          rowsPerPageOptions={[5]}
          component="div"
          count={rowsSrc.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
