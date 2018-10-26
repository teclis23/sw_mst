import React from 'react';
import { inject, observer} from "mobx-react";
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';

import {TableHeader} from "./Table/TableHeader.jsx";

import {desc, stableSort, getSorting} from "./utils.js";


const rows = [
  { id: 'id', numeric: false, disablePadding: false, label: 'id' },
  { id: 'name', numeric: false, disablePadding: false, label: 'name' },
  { id: 'height', numeric: true, disablePadding: false, label: 'height' },
  { id: 'mass', numeric: true, disablePadding: false, label: 'mass' },
];


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 600,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  button: {
    margin: theme.spacing.unit,
  },
});


@inject("appStore")
@observer
class PeopleTable extends React.Component {
  constructor(props, context) {
    super(props,context);

    this.appStore = this.props.appStore;

    this.state = {
      order: 'asc',
      orderBy: 'id',
      selected: [],
      data:[],
      page: 0,
      rowsPerPage: 5,
    };
  }
  
 

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
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
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;


  selectPersonHeandler = (person) => {
    this.appStore.people.selectPerson(person);
  }

  deletePerson = (person) => {
      this.appStore.people.deletePerson(person);
  }


  filterPersons = () => {
    let query = this.appStore.people.filter.toLowerCase();
    
    return this.appStore.people.persons.filter((person) => {
      let name =  person.name.toLowerCase();
      let height = person.height.toString().toLowerCase();
      let mass = person.mass.toString().toLowerCase();

      return (name.indexOf(query) !== -1
      || mass.indexOf(query) !== -1
      || height.indexOf(query) !== -1);
    });
  }
  
  render() {
    
    const { classes, isLoading } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;

    let laodingInfo = isLoading ? <h1>Loading...</h1> : '';

    let persons =  this.appStore.people.filter != "" ? this.filterPersons() : this.appStore.people.persons.map((person)=> person);

    return (
      <Paper className={classes.root}>
        {laodingInfo}
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">

            <TableHeader
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={persons.length}
              rows={rows}
            />

            <TableBody>

              {stableSort(persons, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map( (person, index) => {

                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={person.id}
                    >
                      <TableCell numeric>{person.id}</TableCell>
                      <TableCell numeric>{person.name}</TableCell>
                      <TableCell numeric>{person.height}</TableCell>
                      <TableCell numeric>{person.mass}</TableCell>
                      <TableCell >
                        <Link to={`/details`}> 
                          <IconButton className={classes.button} aria-label="Edit" onClick={ () => this.selectPersonHeandler(person) }>
                          <EditIcon  fontSize="small"/>                  
                          </IconButton>
                        </Link>    
                        <IconButton className={classes.button} aria-label="Delete"  onClick={ () => this.deletePerson(person) }>
                          <DeleteIcon  fontSize="small"/>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );

                })}
            </TableBody>

          </Table>
        </div>
        
        <TablePagination
          component="div"
          count={persons.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

PeopleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PeopleTable);