import React, {useState, useEffect} from 'react';
// import {Switch, Route} from 'react-router-dom';
import Header from '../../components/header/header';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Tab } from '@material-ui/core';



const useStyle = makeStyles({
    table: {
        minWidth: 650,
    }
})

const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles(theme => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  }))(TableRow)



function HomePage() {
    const classes = useStyle();
    const [dataAlbum, setDataAlbum] = useState([])

    async function fetchdata() {
        // const res = await fetch("https://jsonplaceholder.typicode.com/todos/1")
        const res = await fetch("https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/albums?include_groups=single%2Cappears_on&market=ES&limit=1&offset=5")
        
        res.json()
        .then(res => dataAlbum(res))
        .catch(err => console.log(err))
        console.log(res)
    }

    useEffect(() => {
        fetchdata()
    },[])
    return (
        <div>
            <Header />
            <TableContainer component={Paper}>
                <Table classesName={classes.table} arial-label='customized table'>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Album</StyledTableCell>
                            <StyledTableCell align="right">Song</StyledTableCell>
                            <StyledTableCell align="right">Artist</StyledTableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataAlbum.map(data => (
                            <StyledTableRow key={data.id}>
                              <StyledTableCell component='th' scope='row'>
                                {data.album_group}
                              </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default HomePage;