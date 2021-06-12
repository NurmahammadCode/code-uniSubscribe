import React, { useEffect } from "react";
import clsx from "clsx";
import {
  withStyles,
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MovieIcon from "@material-ui/icons/Movie";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import SportsBasketballIcon from "@material-ui/icons/SportsBasketball";
import DeleteIcon from "@material-ui/icons/Delete";
import ListIcon from "@material-ui/icons/List";
import moment from "moment";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import CircularProgress from "@material-ui/core/CircularProgress";

//import TextField from '@material-ui/core/TextField';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import "./style.scss";

import Pagination from "@material-ui/lab/Pagination";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { addSub, getFilteredSubs, getSubscriptions } from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { ISubscription } from "../models/types";
import AddIcon from "@material-ui/icons/Add";
import ListSubheader from "@material-ui/core/ListSubheader";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";

import { deleteSub } from "../store/actions";
import { useHistory } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      "& > *": {
        marginTop: theme.spacing(2),
      },
    },
    table: {
      width: "1250",
    },
    sidebarroot: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    sidebarnested: {
      paddingLeft: theme.spacing(4),
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  })
);

function createData(companyname: string, price: number, edate: string) {
  return { companyname, price, edate };
}
const rows = [
  createData("Frozen yoghurt", 159, "15.05.2021"),
  createData("Ice cream sandwich", 237, "10.04.2021"),
  createData("Eclair", 262, "28.03.2021"),
  createData("Cupcake", 305, "19.06.2021"),
  createData("Gingerbread", 356, "18.04.2021"),
  createData("Gingerbread", 356, "15.04.2021"),
  createData("Gingerbread", 356, "27.05.2021"),
  createData("Gingerbread", 356, "18.04.2021"),
];

const SignupSchema = Yup.object().shape({
  companyname: Yup.string().required("Company Name is a required field!"),
  price: Yup.string().required("Price is a required field!"),
  link: Yup.string().required("Link is a required field!"),
  date: Yup.date().required("Date is a required field!"),
});

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

export default function PersistentDrawerLeft() {
  const history = useHistory();
  const state = useSelector((state: any) => state);
  console.log(state);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [close, setClose] = React.useState(true);

  const [pageNumber, setPageNumber] = React.useState<Number>(0);
  const [countOfData, setCountOfData] = React.useState<Number>(5);

  const [userId, setUserId] = React.useState<Number>(1);
  const [isEdit, setIsEdit] = React.useState<Boolean>(false);
  const [selectedSubId, setSelectedSubId] = React.useState<any>(null);
  const [companyName, setCompanyName] = React.useState<any>(null);

  const [addCompanyName, setAddCompanyName] = React.useState<String>();
  const [addPrice, setAddPrice] = React.useState<String>();
  const [addLink, setAddLink] = React.useState<String>();
  const [addExpirationDate, setAddExpirationDate] = React.useState<Date>();
  const [addNotifyDate, setAddNotifyDate] = React.useState<Number>(5);
  const [addCategory, setAddCategory] = React.useState<String>("MOVIE");

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date()
  );

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setShow(true);
  };
  const handleClick = () => {
    setClose(!close);
  };
  const handleEdit = (selectedId: Number, name: String) => {
    setCompanyName(name);
    setIsEdit(true);
    setSelectedSubId(selectedId);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleSave = (selectedId: Number = 1) => {
    setIsEdit(false);
    setSelectedSubId(null);
  };

  const handleAddSub = () => {
    const newSubObject = {
      companyName: addCompanyName,
      price: addPrice,
      link: addLink,
      date: addExpirationDate?.toISOString().substring(0, 10),
    };
    addSub(newSubObject, userId)(dispatch);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    getSubscriptions(userId)(dispatch);
    getFilteredSubs(userId, pageNumber, countOfData)(dispatch);
  }, [getSubscriptions, dispatch]);

  const pageChangeHandle = useCallback(() => {
    getFilteredSubs(userId, pageNumber, countOfData)(dispatch);
  }, [pageNumber, countOfData, userId]);

  // const handleChange = useCallback(
  //   (event: any, value: any) => {
  //     setPageNumber(value);
  //     pageChangeHandle();
  //   },
  //   [setPageNumber, pageChangeHandle]
  // );

  const handleDecrease = () => {
    setPageNumber(Number(pageNumber) - 1);
    setTimeout(() => {
      pageChangeHandle();
    }, 300);
  };

  const handleIncrease = () => {
    setPageNumber(Number(pageNumber) + 1);
    setTimeout(() => {
      pageChangeHandle();
    }, 300);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        style={{ marginTop: "0" }}
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">SUBSCRIPTION LIST</Typography>
          <Button
            variant="contained"
            onClick={handleClickOpen}
            style={{ fontWeight: "bold", marginLeft: "auto" }}
            color="secondary"
          >
            Add New Subscription <AddIcon />
          </Button>
          <Dialog
            open={show}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle
              id="form-dialog-title"
              style={{ color: "#f50057", fontWeight: "bolder" }}
            >
              Add Subscription
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                To subscribe, please enter all datas correctly
              </DialogContentText>
              <Formik
                initialValues={{
                  companyname: "",
                  price: "",
                  link: "",
                  date: new Date(),
                }}
                validationSchema={SignupSchema}
                onSubmit={(values) => {
                  // setSubmitting(false);
                  const newSubObject = {
                    subscriptionName: values.companyname,
                    price: Number(values.price),
                    detail: null,
                    notified: null,
                    link: values.link,
                    notifyDate: addNotifyDate,
                    category: addCategory,
                    expiredDate: moment(values.date)
                      .toISOString()
                      .substring(0, 10),
                  };
                  addSub(newSubObject, userId)(dispatch);
                  setTimeout(() => {
                    getFilteredSubs(userId, pageNumber, countOfData)(dispatch);
                  }, 300);
                  handleClose();
                }}
              >
                {({ errors, touched, handleSubmit }) => (
                  <form>
                    <label
                      htmlFor="companyName"
                      style={{ color: "#3f51b5", fontWeight: "bold" }}
                    >
                      Company Name
                    </label>
                    <Field name="companyname" className="form-control" />
                    {errors.companyname && touched.companyname ? (
                      <div style={{ color: "#f50057", fontWeight: "bold" }}>
                        {errors.companyname}
                      </div>
                    ) : null}
                    <label
                      htmlFor="price"
                      style={{ color: "#3f51b5", fontWeight: "bold" }}
                    >
                      Price
                    </label>
                    <Field name="price" className="form-control" />
                    {errors.price && touched.price ? (
                      <div style={{ color: "#f50057", fontWeight: "bold" }}>
                        {errors.price}
                      </div>
                    ) : null}
                    <label
                      htmlFor="link"
                      style={{ color: "#3f51b5", fontWeight: "bold" }}
                    >
                      Link
                    </label>
                    <Field name="link" type="text" className="form-control" />
                    {errors.link && touched.link ? (
                      <div style={{ color: "#f50057", fontWeight: "bold" }}>
                        {errors.link}
                      </div>
                    ) : null}
                    <label
                      htmlFor="date"
                      style={{ color: "#3f51b5", fontWeight: "bold" }}
                    >
                      Expirition Date
                    </label>

                    <Field name="date" type="date" className="form-control" />
                    {errors.date && touched.date ? (
                      <div style={{ color: "#f50057", fontWeight: "bold" }}>
                        {errors.date}
                      </div>
                    ) : null}

                    <Button
                      onClick={handleClose}
                      style={{ fontWeight: "bold" }}
                      color="primary"
                    >
                      Cancel
                    </Button>
                    <button
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                      style={{ fontWeight: "bold" }}
                      color="primary"
                    >
                      Add
                    </button>
                  </form>
                )}
              </Formik>
            </DialogContent>
          </Dialog>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <img src="https://yorktonrentals.com/wp-content/uploads/2017/06/usericon.png"></img>
        <Typography
          variant="h5"
          style={{ textAlign: "center", marginTop: "0.5rem", color: "#3f51b5" }}
        >
          John Doe
        </Typography>

        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          className={classes.sidebarroot}
        >
          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary="Category" />
            {close ? (
              <ExpandLess style={{ color: "#3f51b5" }} />
            ) : (
              <ExpandMore style={{ color: "#3f51b5" }} />
            )}
          </ListItem>
          <Collapse in={close} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.sidebarnested}>
                <ListItemIcon>
                  <SportsEsportsIcon />
                </ListItemIcon>
                <ListItemText primary="Games" />
              </ListItem>
              <ListItem button className={classes.sidebarnested}>
                <ListItemIcon>
                  <MovieIcon />
                </ListItemIcon>
                <ListItemText primary="Movies" />
              </ListItem>
              <ListItem button className={classes.sidebarnested}>
                <ListItemIcon>
                  <SportsBasketballIcon />
                </ListItemIcon>
                <ListItemText primary="Sports" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Trash" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText
              onClick={() => {
                localStorage.setItem("token", "");
                history.push("/");
              }}
              primary="Log Out"
            />
          </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
        style={
          {
            // display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
            // height: "100vh",
          }
        }
      >
        <div className={classes.drawerHeader} />
        <TableContainer component={Paper} style={{ boxShadow: "none" }}>
          <Table
            className={classes.table}
            aria-label="simple table"
            style={{ margin: "0 auto" }}
          >
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                  Company Name
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                  align="right"
                >
                  Price
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                  align="right"
                >
                  Expiration Date
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            {state ? (
              state.filteredSubscriptions.map((item: any, index: any) => (
                <TableBody key={index}>
                  <TableRow>
                    {isEdit == true && selectedSubId === item.id ? (
                      <TableCell component="th" scope="row">
                        <TextField
                          value={companyName}
                          id="standard-basic"
                          label="Company name"
                        />
                      </TableCell>
                    ) : (
                      <TableCell component="th" scope="row">
                        {item.subscriptionName}
                      </TableCell>
                    )}
                    {isEdit == true && selectedSubId === item.id ? (
                      <TableCell align="right">
                        <TextField id="standard-basic" label="Price" />
                      </TableCell>
                    ) : (
                      <TableCell align="right">{item.price} $</TableCell>
                    )}
                    {isEdit == true && selectedSubId === item.id ? (
                      <TableCell align="right">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Date picker inline"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                              "aria-label": "change date",
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </TableCell>
                    ) : (
                      <TableCell align="right">
                        {item.notifyDate ? "12/09/29" : "12/09/29"}
                      </TableCell>
                    )}
                    <TableCell
                      align="right"
                      style={{ padding: "0.5rem", width: 60 }}
                    >
                      <Button
                        variant="contained"
                        onClick={() => {
                          isEdit == true && selectedSubId === item.id
                            ? handleSave()
                            : handleEdit(item.id, item.companyName);
                        }}
                        style={{ fontWeight: "bold" }}
                        color="primary"
                      >
                        {isEdit == true && selectedSubId === item.id
                          ? "Save"
                          : "Edit"}
                      </Button>
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{ padding: "0.5rem", width: 150 }}
                    >
                      <Button
                        onClick={() => {
                          deleteSub(userId, item.id)(dispatch);
                          setTimeout(() => {
                            getFilteredSubs(
                              userId,
                              pageNumber,
                              countOfData
                            )(dispatch);
                          }, 300);
                        }}
                        variant="contained"
                        style={{ fontWeight: "bold" }}
                        color="secondary"
                      >
                        Unsubscribe
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))
            ) : (
              <CircularProgress color="secondary" />
            )}
          </Table>
        </TableContainer>

        <div
        // style={{
        //   display: "flex",
        //   justifyContent: "center",
        //   marginTop: "2%",
        // }}
        >
          {/* <Button variant="contained" color="primary" onClick={handleDecrease}>
              Back
            </Button> */}
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li
                onClick={() => {
                  handleDecrease();
                }}
                className="page-item"
              >
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </li>
              {state.subscriptions.length &&
                [...Array(Math.ceil(state.subscriptions.length / 5) - 1)].map(
                  (item, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setPageNumber(index);
                        pageChangeHandle();
                      }}
                      className="page-item"
                    >
                      <a className="page-link" href="#">
                        {index + 1}
                      </a>
                    </li>
                  )
                )}

              <li
                onClick={() => {
                  if (state) handleIncrease();
                }}
                className="page-item"
              >
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Next</span>
              </li>
            </ul>
          </nav>
          {/* <Button variant="contained" color="primary" onClick={handleIncrease}>
              Front
            </Button> */}
        </div>
      </main>
    </div>
  );
}
