import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';

const useStyle = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
    green: {
        backgroundColor: green[500],
    },

}))

function SignIn() {
    const classes = useStyle();
    return (
        <Container component='main' maxWidth='xs'>
            <div className={classes.paper}>
                <Avatar className={classes.green}>
                    <PersonIcon />
                </Avatar>
            </div>
        </Container>
    )
}

export default SignIn;