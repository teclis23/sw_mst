import React from 'react';
import PropTypes from 'prop-types';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';


export class TableHeader extends React.Component {
    constructor(props) {
        super(props);

    }

    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };
     

    render() {

        const { onSelectAllClick, order, orderBy, numSelected, rowCount, rows } = this.props;

        return (
        <TableHead  id="table_header">
            <TableRow>

            {rows.map(row => {
                return (
                <TableCell
                    key={row.id}
                    numeric={row.numeric}
                    padding={row.disablePadding ? 'none' : 'default'}
                    sortDirection={orderBy === row.id ? order : false}
                >
                    <Tooltip
                    title="Sort"
                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                    enterDelay={300}
                    >
                    <TableSortLabel
                        active={orderBy === row.id}
                        direction={order}
                        onClick={this.createSortHandler(row.id)}
                    >
                        <Typography  color="secondary">{row.label}</Typography>
                    </TableSortLabel>
                    </Tooltip>
                </TableCell>
                );
            }, this)}
            <TableCell>
                <Typography  color="secondary">Actions</Typography>
            </TableCell>
            </TableRow>
        </TableHead>
        );
    }
}


TableHeader.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };


export default TableHeader;
