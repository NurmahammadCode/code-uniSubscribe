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
import {useHistory} from 'react-router-dom'
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
import AddCircleIcon from "@material-ui/icons/Add";
import ListSubheader from "@material-ui/core/ListSubheader";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";

import MusicNoteIcon from "@material-ui/icons/MusicNote";
import CodeIcon from "@material-ui/icons/Code";
import DragHandleIcon from "@material-ui/icons/DragHandle";

import { deleteSub } from '../store/actions'
import { Link } from 'react-router-dom'

import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';


const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 1200,
      margin: "0 auto",
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
    animatedItem: {
      animation: `$myEffect 1500ms ${theme.transitions.easing.easeInOut}`
    },
   
    animatedItemExiting: {
      animation: `$myEffectExit 2000ms ${theme.transitions.easing.easeInOut}`,
      opacity: 0,
      transform: "translateX(-200%)"
    },
  
    "@keyframes myEffect": {
      "0%": {
        opacity: 0,
        transform: "translateX(-200%)"
      },
      "100%": {
        opacity: 1,
        transform: "translateX(0)"
      }
    },
    "@keyframes myEffectExit": {
      "0%": {
        opacity: 1,
        transform: "translateX(0)"
      },
      "100%": {
        opacity: 0,
        transform: "translateX(-200%)"
      }
    }
  })
);

function createData(companyname: string, price: number, edate: string) {
  return { companyname, price, edate };
}
const SignupSchema = Yup.object().shape({
  companyname: Yup.string()
    .required("Company Name is a required field!")
    .min(4, "Too Short!")
    .max(20, "Too Long!"),
  price: Yup.string().required("Price is a required field!"),
  link: Yup.string()
    .required("Link is a required field!")
    .min(4, "Too Short!")
    .max(20, "Too Long!"),
  // date: Yup.date()
  //   .min(new Date().toLocaleDateString())
  //   .required("Date is a required field!"),
  category: Yup.string()
    .required("Category is a required field!")
    .min(4, "Too Short!")
    .max(20, "Too Long!"),
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
  const [display, setDisplay] = React.useState(false)
  const [close, setClose] = React.useState(true);
  const [exit, setExit] = React.useState(false);


  const [pageNumber, setPageNumber] = React.useState<Number>(0);
  const [countOfData, setCountOfData] = React.useState<Number>(5);

  const [userId, setUserId] = React.useState<Number>(1);
  const [isEdit, setIsEdit] = React.useState<Boolean>(false);
  const [selectedSubId, setSelectedSubId] = React.useState<any>(null);
  const [companyName, setCompanyName] = React.useState<any>(null);

  const [addCompanyName, setAddCompanyName] = React.useState<String>();
  const [addPrice, setAddPrice] = React.useState<String>();
  const [addLink, setAddLink] = React.useState<String>();
  const [addCategory, setAddCategory] = React.useState<String>();

  const [addExpirationDate, setAddExpirationDate] = React.useState<Date>();
  const [addNotifyDate, setAddNotifyDate] = React.useState<Number>(5);

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
  const handleListOpened = () => {
    setDisplay(true)
  }
  const handleListClose = () => {
    setDisplay(false)
  }
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
      category: addCategory,
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
          <Badge onClick={handleListOpened}
            style={{ marginLeft: "1rem", cursor: "pointer" }}
            color="secondary" badgeContent={0} showZero>
            <MailIcon />
          </Badge>

          <Dialog
            open={display}
            onClose={handleListClose}

            aria-labelledby="form-dialog-title"
          >
            <DialogTitle
              id="form-dialog-title"
              style={{ color: "#f50057", fontWeight: "bolder", margin: "0 50px" }}
            >
              Subscriptions Notifications
            </DialogTitle>
            <DialogContent>

              <Formik
                initialValues={{
                  companyname: "",
                  price: "",
                  link: "",
                  date: new Date(),
                  category: ""
                }}
                onSubmit={(values) => {
                  // setSubmitting(false);
                  const newSubObject = {
                    subscriptionName: values.companyname,
                    price: Number(values.price),
                    detail: null,
                    notified: null,
                    link: values.link,
                    notifyDate: addNotifyDate,
                    category: values.category,
                    expiredDate: moment(values.date)
                      .toISOString()
                      .substring(0, 10),
                  };

                }}
              >
                {({ errors, touched, handleSubmit }) => (
                  <form>



                    {state.filteredSubscriptions.map((item: any, index: any) => item.notifyDate == true ? <ul>
                      <li>

                      </li>
                    </ul> : <ul></ul>)}

                    <button className="btn" onClick={(e) => { e.preventDefault(); handleListClose() }} color="primary" style={{ backgroundColor: "#f50057", color: "white", fontWeight: "bold", margin: "5px 3px" }}>Close</button>

                  </form>
                )}
              </Formik>
            </DialogContent>
          </Dialog>
          <Button
            variant="contained"
            onClick={handleClickOpen}
            style={{ fontWeight: "bold", marginLeft: "auto" }}
            color="secondary"
          >
            Add New Subscription <AddCircleIcon />
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
                  category: "",
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
                    category: values.category,
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
                    <label
                      htmlFor="category"
                      style={{ color: "#3f51b5", fontWeight: "bold" }}
                    >
                      Category
                    </label>
                    <Field
                      name="category"
                      type="text"
                      className="form-control"
                    />
                    {errors.category && touched.category ? (
                      <div style={{ color: "#f50057", fontWeight: "bold" }}>
                        {errors.category}
                      </div>
                    ) : null}
                    <button
                      className="btn"
                      onClick={(e) => {
                        e.preventDefault();
                        handleClose();
                      }}
                      color="primary"
                      style={{
                        backgroundColor: "#f50057",
                        color: "white",
                        fontWeight: "bold",
                        margin: "5px 3px",
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn"
                      onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                      style={{
                        fontWeight: "bold",
                        backgroundColor: "#3f51b5",
                        color: "white",
                        margin: "5px 3px",
                      }}
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
        <img src="https://code.edu.az/media/open-graph/Code-Academy-Logo-1.jpg" style={{width:"12rem",margin:"0 auto"}}></img>
        <Typography variant="h5" style={{ textAlign: "center", marginTop: "0.2rem", color: "#3f51b5" }}>CA Student</Typography>

        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          className={classes.sidebarroot}
        >
          <ListItem style={{ height: "40px" }} button onClick={handleClick}>
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
              <ListItem style={{ height: "35px" }} button className={classes.sidebarnested}>
                <ListItemIcon>
                  <SportsEsportsIcon />
                </ListItemIcon>
                <ListItemText primary="Games" />
              </ListItem>
              <ListItem style={{ height: "35px" }} button className={classes.sidebarnested}>
                <ListItemIcon>
                  <MovieIcon />
                </ListItemIcon>
                <ListItemText primary="Movies" />
              </ListItem>
              <ListItem style={{ height: "35px" }} button className={classes.sidebarnested}>
                <ListItemIcon>
                  <SportsBasketballIcon />
                </ListItemIcon>
                <ListItemText primary="Sports" />
              </ListItem>
              <ListItem style={{ height: "35px" }} button className={classes.sidebarnested}>
                <ListItemIcon>
                  <MusicNoteIcon />
                </ListItemIcon>
                <ListItemText primary="Music" />
              </ListItem>
              <ListItem style={{ height: "35px" }} button className={classes.sidebarnested}>
                <ListItemIcon>
                  <CodeIcon />
                </ListItemIcon>
                <ListItemText primary="Development" />
              </ListItem>
              <ListItem style={{ height: "35px" }} button className={classes.sidebarnested}>
                <ListItemIcon>
                  <DragHandleIcon />
                </ListItemIcon>
                <ListItemText primary="Other" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem style={{ height: "40px" }} button>
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
      >
        <div className={classes.drawerHeader} />
        <TableContainer
          component={Paper}
          style={{ boxShadow: "none", margin: "0 auto" }}
        >
          <Table
            className={`${classes.table} ${clsx(classes.animatedItem, {
              [classes.animatedItemExiting]: exit
            })}`} 
            
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
                <TableCell
                  style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                  align="right"
                >
                  Category
                </TableCell>
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
                        {item.expiredDate ? item.expiredDate : "12/09/29"}
                      </TableCell>
                    )}
                    {isEdit == true && selectedSubId === item.id ? (
                      <TableCell align="right">
                        <TextField id="standard-basic" label="Price" />
                      </TableCell>
                    ) : (
                      <TableCell align="right">{item.category} </TableCell>
                    )}
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
        {state.subscriptions.length > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2%",
            }}
          >

            <nav className="pagination-outer mt-3" style={{ margin: "0 auto" }} aria-label="Page navigation">
              <ul className="pagination">
                <li
                  onClick={() => {
                    handleDecrease();
                  }}
                  className="page-item"
                >
                  <a href="#" className="page-link" aria-label="Previous">
                    <span aria-hidden="true">??</span>
                  </a>
                </li>

                {state &&
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
                        {" "}
                        <a className="page-link" href="#">
                          {index + 1}
                        </a>{" "}
                      </li>
                    )
                  )}
                <li
                  onClick={() => {
                    if (state) handleIncrease();
                  }}
                  className="page-item"
                >
                  <a href="#" className="page-link" aria-label="Next">
                    <span aria-hidden="true">??</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </main>
    </div>
  );
}
