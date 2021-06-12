import React from 'react';
import clsx from 'clsx';
import { withStyles, makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import ListIcon from '@material-ui/icons/List';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

//import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import "./style.scss"

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    table: {
      width: 1000,
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  }),
);

function createData(companyname: string, price: number, edate: string) {
  return { companyname, price, edate };
}
const rows = [
  createData('Frozen yoghurt', 159, "15.05.2021"),
  createData('Ice cream sandwich', 237, "10.04.2021"),
  createData('Eclair', 262, "28.03.2021"),
  createData('Cupcake', 305, "19.06.2021"),
  createData('Gingerbread', 356, "18.04.2021"),
  createData('Gingerbread', 356, "15.04.2021"),
  createData('Gingerbread', 356, "27.05.2021"),
  createData('Gingerbread', 356, "18.04.2021"),
];

const SignupSchema = Yup.object().shape({
  companyname: Yup.string()
    .min(2, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Company Name is a required field!'),
  price: Yup.string().matches(/^[+-]?\d*(?:[.,]\d*)?$/, 'Should be a number').required("Price is a required field!"),
  link: Yup.string().matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/, 'Enter correct url!'
  ).required('Link is a required field!').min(10, 'Too Short!')
    .max(50, 'Too Long!'),
  date: Yup.date()
    .min(new Date().toLocaleDateString())
    .required("Date is a required field!"),
});

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);


export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [show, setShow] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}>
          <MenuIcon />
          </IconButton>
          <Typography variant="h6" >
             SUBSCRIPTION LIST
          </Typography>
          <Button variant="contained" onClick={handleClickOpen} style={{ fontWeight: "bold", marginLeft: "auto" }} color="secondary">
            Add New Subscription
          </Button><Dialog open={show} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" style={{color:"#f50057",fontWeight:"bolder"}}>Add Subscription</DialogTitle>
            <DialogContent>
            <DialogContentText>
            To subscribe, please enter all datas correctly
             </DialogContentText>
              <Formik
                initialValues={{
                  companyname: '',
                  price: '',
                  link: '',
                  date: ''
                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                  console.log(values);
                }}>
                {({ errors, touched }) => (
                  <Form>
                    <label htmlFor="companyName" style={{ color: "#3f51b5", fontWeight: "bold" }} >Company Name</label>
                    <Field name="companyname" className="form-control" />
                    {errors.companyname && touched.companyname ? (
                      <div style={{ color: "#f50057", fontWeight: "bold" }}>{errors.companyname}</div>
                    ) : null}
                    <label htmlFor="price" style={{ color: "#3f51b5", fontWeight: "bold" }}>Price</label>

                    <Field name="price" className="form-control" />
                    {errors.price && touched.price ? (
                      <div style={{ color: "#f50057", fontWeight: "bold" }}>{errors.price}</div>
                    ) : null}
                    <label htmlFor="link" style={{ color: "#3f51b5", fontWeight: "bold" }}>Link</label>

                    <Field name="link" type="text" className="form-control" />
                    {errors.link && touched.link ? <div style={{ color: "#f50057", fontWeight: "bold" }}>{errors.link}</div> : null}
                    <label htmlFor="expiritionDate" style={{ color: "#3f51b5", fontWeight: "bold" }}> Expirition Date</label>

                    <Field name="date" type="date" className="form-control" />
                    {errors.date && touched.date ? (
                      <div style={{ color: "#f50057", fontWeight: "bold" }}>{errors.date}</div>
                    ) : null}
                  </Form>
                )}
              </Formik>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} style={{ fontWeight: "bold" }} color="primary">
                Cancel
              </Button>
              <Button onClick={handleClose} style={{ fontWeight: "bold" }} color="primary">
                Add
              </Button>
            </DialogActions>
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
        }}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Category'].map((text, index) => (
            <>
              <ListItem button >
                <ListItemIcon>{index % 2 !== 0 ? <DeleteIcon /> : <ListIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
              <ListItem button >
                <ListItemText primary={'Game'} />
              </ListItem>
              <ListItem button >
                <ListItemText primary={'Sport '} />
              </ListItem>
              <ListItem button >
                <ListItemText primary={'Movie'} />
              </ListItem>
            </>
          ))}
          {['Trash'].map((text, index) => (
            <>
              <ListItem button >
                <ListItemIcon>{index % 2 !== 0 ? <ListIcon /> : <DeleteIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>

            </>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}>
        <div className={classes.drawerHeader} />
        <TableContainer component={Paper} style={{ boxShadow: "none" }}>
          <Table className={classes.table} aria-label="simple table" style={{ margin: "0 auto" }}>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>Company Name</TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right">Price</TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right">Expiration Date</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow >
                  <TableCell component="th" scope="row">
                    {row.companyname}
                  </TableCell>
                  <TableCell align="right" >{row.price} $</TableCell>
                  <TableCell align="right" >{row.edate}</TableCell>
                  <TableCell align="right" style={{ padding: "0.5rem", width: 60 }}><Button variant="contained" onClick={handleClose} style={{ fontWeight: "bold" }} color="primary">
                    Edit
                  </Button>
                  </TableCell>
                  <TableCell align="right" style={{ padding: "0.5rem", width: 150 }}><Button variant="contained" onClick={handleClose} style={{ fontWeight: "bold" }} color="secondary">
                    Unsubscribe
                  </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
    </div>
  );
}

