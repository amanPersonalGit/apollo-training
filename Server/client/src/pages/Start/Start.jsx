import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { GetUser } from '../Queries'
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const ADD_USER = gql`
mutation AddUser($username: String!, $useremail: String!){
    addUser(name: $username, email: $useremail){
        name
    }
}`;

class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            newUser: false,
            name: '',
            username: '',
            email: '',
            useremail: '',
            hitQuery: false,
            addUser: false,
        }
    }

    handlechange = field => (event) => {
        this.setState({
            [field]: event.target.value,
        });
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleUserOpen = () => {
        this.setState({ newUser: true });
    };

    handleClose = () => {
        this.setState({ open: false, newUser: false });
    };

    handleSubmit = () => {
        this.setState({
            open: false,
            hitQuery: true,
        });
    };

    handleClick = (e, addUser, username, useremail) => {
        e.preventDefault();
        addUser({ variables: { username, useremail } });
        this.setState({
            newUser: false,
            addUser: true,
        })
    }

    render() {
        const { name, email, hitQuery, username, useremail, addUser } = this.state;
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Login
                </Button>
                <Button variant="outlined" color="primary" onClick={this.handleUserOpen}>
                    Create User
                </Button>
                {
                    (hitQuery) ? (
                        <GetUser name={name} email={email} />
                    ) : ''
                }
                {
                    (addUser) ? (
                        <GetUser name={username} email={useremail} />
                    ) : ''
                }
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Enter Details</DialogTitle>
                    <DialogContent>
                        <TextField
                            value={name}
                            label="Name *"
                            fullWidth
                            onClick={this.handlechange('name')}
                            onChange={this.handlechange('name')}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            value={email}
                            label="Email Address"
                            fullWidth
                            onClick={this.handlechange('email')}
                            onChange={this.handlechange('email')}
                            margin="normal"
                            variant="outlined"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Login
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.newUser}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Enter Details</DialogTitle>
                    <DialogContent>
                        <TextField
                            value={username}
                            label="Name *"
                            fullWidth
                            onClick={this.handlechange('username')}
                            onChange={this.handlechange('username')}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            value={useremail}
                            label="Email Address"
                            fullWidth
                            onClick={this.handlechange('useremail')}
                            onChange={this.handlechange('useremail')}
                            margin="normal"
                            variant="outlined"
                        />
                    </DialogContent>
                    <Mutation mutation={ADD_USER}>
                        {(addUser, { data }) => (
                            <DialogActions>
                                <Button onClick={this.handleClose} color="primary">
                                    Cancel
                        </Button>
                                <Button onClick={(e) => {
                                    this.handleClick(e, addUser, username, useremail)
                                }} color="primary">
                                    Create
                        </Button>
                            </DialogActions>
                        )}
                    </Mutation>
                </Dialog>
            </div>
        );
    }
}

export default Start;
