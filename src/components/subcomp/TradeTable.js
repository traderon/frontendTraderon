import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
// mui
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
// import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
// import DeleteIcon from "@mui/icons-material/Delete";
// import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import Stack from "@mui/material/Stack";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
// action
import { getTradesFromDatabase } from "../../actions/tradesActions";

function createData(
  id,
  accountId,
  status,
  opendate,
  symbol,
  entry,
  exit,
  size,
  pips,
  returnPips,
  return1,
  return2,
  returnNet,
  side,
  setups,
  mistakes,
  sub
) {
  return {
    id,
    accountId,
    status,
    opendate,
    symbol,
    entry,
    exit,
    size,
    pips,
    returnPips,
    return1,
    return2,
    returnNet,
    side,
    setups,
    mistakes,
    sub,
  };
}

function subRow(subRowData, isOpen) {
  const subrow = subRowData;
  const open = isOpen;
  return (
    <React.Fragment>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={14}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead sx={{ bgcolor: "aliceblue" }}>
                  <TableRow>
                    <TableCell>ACTION</TableCell>
                    <TableCell>SPREAD</TableCell>
                    <TableCell>TYPE</TableCell>
                    <TableCell>DATE</TableCell>
                    <TableCell>TIME</TableCell>
                    <TableCell>SIZE</TableCell>
                    <TableCell>POSITION</TableCell>
                    <TableCell>PRICE</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subrow.map((subRow, i) => (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">
                        {subRow.action}
                      </TableCell>
                      <TableCell>{subRow.spread}</TableCell>
                      <TableCell>{subRow.type}</TableCell>
                      <TableCell>{subRow.date.slice(0, 10)}</TableCell>
                      <TableCell>{subRow.date.slice(11, 19)}</TableCell>
                      <TableCell>{subRow.size}</TableCell>
                      <TableCell>{subRow.position}</TableCell>
                      <TableCell>{subRow.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "account",
    numeric: false,
    disablePadding: true,
    label: "ACCOUNT ID",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: true,
    label: "STATUS",
  },
  {
    id: "opendate",
    numeric: false,
    disablePadding: true,
    label: "OPEN DATE",
  },
  {
    id: "symbol",
    numeric: false,
    disablePadding: true,
    label: "SYMBOL",
  },
  {
    id: "entry",
    numeric: true,
    disablePadding: true,
    label: "ENTRY",
  },
  {
    id: "exit",
    numeric: true,
    disablePadding: true,
    label: "EXIT",
  },
  {
    id: "size",
    numeric: true,
    disablePadding: true,
    label: "SIZE",
  },
  {
    id: "pips",
    numeric: true,
    disablePadding: true,
    label: "PIPS",
  },
  {
    id: "returnPips",
    numeric: true,
    disablePadding: true,
    label: "RETURN / PIPS",
  },
  {
    id: "return1",
    numeric: true,
    disablePadding: true,
    label: "RETURN $",
  },
  {
    id: "return2",
    numeric: true,
    disablePadding: true,
    label: "RETURN %",
  },
  {
    id: "returnNet",
    numeric: true,
    disablePadding: true,
    label: "NET RETURN",
  },
  {
    id: "side",
    numeric: false,
    disablePadding: true,
    label: "SIDE",
  },
  {
    id: "setups",
    numeric: false,
    disablePadding: true,
    label: "SETUPS",
  },
  {
    id: "mistakes",
    numeric: false,
    disablePadding: true,
    label: "MISTAKES",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead sx={{ bgcolor: "lightcyan" }}>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        <TableCell />
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            component="th"
            align="left"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ pr: headCell.id === "return1" ? 1.5 : 0 }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar(props) {
  const { numSelected, selected } = props;
  const userId = useSelector((store) => store.auth.user.public_id);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const handleDelete = () => {
    axios
      .post("/api/delete_trades", { userId: userId, tradeId: selected })
      .then(() => {
        enqueueSnackbar(`Deleted ${numSelected} trades`, {
          variant: "success",
        });
        dispatch(getTradesFromDatabase({ user: userId }, enqueueSnackbar));
      })
      .catch(() => {
        enqueueSnackbar("Error occured", { variant: "error" });
      });
  };

  return (
    <>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={0.5}
            width={1}
          >
            <Typography
              sx={{ flex: "1 1 100%" }}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              {numSelected} trades selected
            </Typography>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </Stack>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Trades
          </Typography>
        )}

        {/* {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )} */}
      </Toolbar>
      <Divider />
    </>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable(props) {
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [opened, setOpened] = React.useState([]);
  const [rows, setRows] = React.useState([]);

  useEffect(() => {
    setRows(
      props.dataToDisplay.map((tdata) => {
        return createData(
          tdata.id,
          tdata.accountId,
          tdata.status,
          tdata.openDate.slice(0, 10),
          tdata.symbol,
          parseFloat(tdata.entry),
          tdata.exit === null ? 0 : parseFloat(tdata.exit),
          Math.abs(parseFloat(tdata.size)),
          Math.abs(parseFloat(tdata.pips)),
          parseFloat(tdata.returnPips),
          parseFloat(tdata.return),
          parseFloat(tdata.returnPercent),
          parseFloat(tdata.returnNet),
          tdata.side,
          tdata.setups ? tdata.setups : [],
          tdata.mistakes ? tdata.mistakes : [],
          tdata.subs ? tdata.subs : []
        );
      })
    );
  }, [props]);

  useEffect(() => {
    props.tradeSelect(selected);
  }, [selected, props]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const subClick = (event, id) => {
    const openedIndex = opened.indexOf(id);
    let newOpened = [];

    if (openedIndex === -1) {
      newOpened = newOpened.concat(opened, id);
    } else if (openedIndex === 0) {
      newOpened = newOpened.concat(opened.slice(1));
    } else if (openedIndex === opened.length - 1) {
      newOpened = newOpened.concat(opened.slice(0, -1));
    } else if (openedIndex > 0) {
      newOpened = newOpened.concat(
        opened.slice(0, openedIndex),
        opened.slice(openedIndex + 1)
      );
    }

    setOpened(newOpened);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;
  const isOpened = (id) => opened.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [rows, order, orderBy, page, rowsPerPage]
  );

  return (
    <Box>
      {visibleRows.length > 0 ? (
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            selected={selected}
          />
          <TableContainer>
            <Table
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const isItemOpened = isOpened(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <Fragment key={index}>
                      <TableRow hover sx={{ cursor: "pointer" }}>
                        <TableCell padding="checkbox" scope="row">
                          <Checkbox
                            color="primary"
                            onClick={(event) => handleClick(event, row.id)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.id}
                            selected={isItemSelected}
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell padding="none">
                          <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={(event) => subClick(event, row.id)}
                          >
                            {Object.keys(row.sub).length > 0 ? (
                              isItemOpened ? (
                                <KeyboardArrowUpIcon />
                              ) : (
                                <KeyboardArrowDownIcon />
                              )
                            ) : null}
                          </IconButton>
                        </TableCell>
                        <TableCell scope="row" padding="none" align="left">
                          {row.accountId}
                        </TableCell>
                        <TableCell
                          id={labelId}
                          scope="row"
                          padding="none"
                          align="left"
                        >
                          {row.status === "WIN" ? (
                            <Typography
                              color="white"
                              bgcolor="#2b9929"
                              width="80%"
                              textAlign="center"
                              fontSize={14}
                              borderRadius={3}
                            >
                              WIN
                            </Typography>
                          ) : row.status === "LOSS" ? (
                            <Typography
                              color="white"
                              bgcolor="#ff2c4f"
                              width="80%"
                              textAlign="center"
                              fontSize={14}
                              borderRadius={3}
                            >
                              LOSS
                            </Typography>
                          ) : (
                            <Typography
                              color="black"
                              bgcolor="#fafe8e"
                              width="80%"
                              textAlign="center"
                              fontSize={14}
                              borderRadius={3}
                            >
                              OPEN
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell scope="row" padding="none" align="left">
                          {row.opendate}
                        </TableCell>
                        <TableCell scope="row" padding="none" align="left">
                          <b>{row.symbol}</b>
                        </TableCell>
                        <TableCell padding="none" scope="row" align="left">
                          {row.entry < 100
                            ? row.entry.toFixed(4)
                            : row.entry.toFixed(2)}
                        </TableCell>
                        <TableCell padding="none" scope="row" align="left">
                          {row.status === "OPEN"
                            ? null
                            : row.exit < 100
                            ? row.exit.toFixed(4)
                            : row.exit.toFixed(2)}
                        </TableCell>
                        <TableCell padding="none" align="left">
                          {row.status === "OPEN" || row.size === 0
                            ? null
                            : row.size.toFixed(2)}
                        </TableCell>
                        <TableCell padding="none" align="left">
                          {row.pips.toFixed(2)}
                        </TableCell>
                        <TableCell
                          padding="none"
                          align="left"
                          sx={
                            row.returnPips < 0
                              ? { color: "orangered" }
                              : { color: "darkgreen" }
                          }
                        >
                          {row.returnPips.toFixed(8)}
                        </TableCell>
                        <TableCell
                          padding="none"
                          scope="row"
                          align="left"
                          sx={
                            row.return1 < 0
                              ? { color: "orangered" }
                              : { color: "darkgreen" }
                          }
                        >
                          {row.status === "OPEN"
                            ? null
                            : row.return1.toFixed(2)}
                        </TableCell>
                        <TableCell
                          align="left"
                          padding="none"
                          sx={
                            row.return2 < 0
                              ? { color: "orangered" }
                              : { color: "darkgreen" }
                          }
                        >
                          {row.return2.toFixed(2)}
                        </TableCell>
                        <TableCell
                          align="left"
                          padding="none"
                          sx={
                            row.returnNet < 0
                              ? { color: "orangered" }
                              : { color: "darkgreen" }
                          }
                        >
                          {row.returnNet.toFixed(2)}
                        </TableCell>
                        <TableCell scope="row" padding="none" align="left">
                          {row.side === "LONG" ? (
                            <Typography
                              width="85%"
                              border={1}
                              borderColor="green"
                              textAlign="center"
                              fontSize={14}
                              borderRadius={1}
                            >
                              LONG
                            </Typography>
                          ) : (
                            <Typography
                              width="85%"
                              border={1}
                              borderColor="red"
                              textAlign="center"
                              fontSize={14}
                              borderRadius={1}
                            >
                              SHORT
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell scope="row" padding="none" align="left">
                          {row.setups.length > 0 ? (
                            <Stack direction="row" spacing={1}>
                              {row.setups.map((setup, i) => (
                                <Typography
                                  key={i}
                                  bgcolor="lightgreen"
                                  color="black"
                                  textAlign="center"
                                  fontSize={12}
                                  borderRadius={1}
                                >
                                  {setup}
                                </Typography>
                              ))}
                            </Stack>
                          ) : (
                            ""
                          )}
                        </TableCell>
                        <TableCell scope="row" padding="none" align="left">
                          {row.mistakes.length > 0 ? (
                            <Stack direction="row" spacing={1}>
                              {row.mistakes.map((mistake, i) => (
                                <Typography
                                  key={i}
                                  bgcolor="lightpink"
                                  color="black"
                                  textAlign="center"
                                  fontSize={12}
                                  borderRadius={1}
                                >
                                  {mistake}
                                </Typography>
                              ))}
                            </Stack>
                          ) : (
                            ""
                          )}
                        </TableCell>
                      </TableRow>
                      {Object.keys(row.sub).length > 0
                        ? subRow(row.sub, isItemOpened)
                        : null}
                    </Fragment>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
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
          <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Dense Show"
            sx={{ ml: 1 }}
          />
        </Paper>
      ) : (
        <Fade in={true} timeout={3600}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <Stack py={10} alignItems="center" color="text.disabled">
              <TextSnippetIcon sx={{ fontSize: 120 }} />
              <Typography variant="h4">No data to display</Typography>
            </Stack>
          </Paper>
        </Fade>
      )}
    </Box>
  );
}
