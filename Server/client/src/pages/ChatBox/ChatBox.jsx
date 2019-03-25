import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import GetMessages from '../GetMessages/GetMessages';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
});

class ChatBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { match, classes } = this.props;
        const { from, to } = match.params;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            {to}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <GetMessages to={to} from={from} />
            </div>
        );
    }
}

export default withStyles(styles)(ChatBox);