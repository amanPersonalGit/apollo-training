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
        }
    }

    handleChange = field => (event) => {
        this.setState({
            [field]: event.target.value,
        });
    };

    handleClickOpen = () => {
        this.setState({
            open: true,
            name: '',
            email: '',
        });
    };

    handleUserOpen = () => {
        this.setState({
            newUser: true,
            username: '',
            useremail: '',
        });
    };

    handleClose = () => {
        this.setState({ open: false, newUser: false });
    };

    handleSubmit = () => {
        const {name, email} = this.state;
        if(name !== '' && email !== '') {
            window.localStorage.setItem('Name', name);
            window.localStorage.setItem('Email', email);
        }
        this.setState({
            open: false,
        });
    };

    handleLogout = () => {
        const { history } = this.props;
        window.localStorage.clear();
        history.push('/start');
    }

    handleClick = (e, addUser, username, useremail) => {
        e.preventDefault();
        if(username !== '' &&  useremail !== ''){
            window.localStorage.setItem('Name', username);
            window.localStorage.setItem('Email', useremail);
        }
        addUser({ variables: { username, useremail } });
        this.setState({
            newUser: false,
        })
    }

    render() {
        const { name, email, username, useremail } = this.state;
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Login
                </Button>
                <Button variant="outlined" color="primary" onClick={this.handleUserOpen}>
                    Create User
                </Button>
                <Button variant="outlined" color="primary" onClick={this.handleLogout}>
                    Log Out
                </Button>
                        <GetUser/>
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
                            onClick={this.handleChange('name')}
                            onChange={this.handleChange('name')}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            value={email}
                            label="Email Address"
                            fullWidth
                            onClick={this.handleChange('email')}
                            onChange={this.handleChange('email')}
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
                            onClick={this.handleChange('username')}
                            onChange={this.handleChange('username')}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            value={useremail}
                            label="Email Address"
                            fullWidth
                            onClick={this.handleChange('useremail')}
                            onChange={this.handleChange('useremail')}
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
