import React from 'react';
import { CircularProgress } from '@material-ui/core';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import GetFriends from '../GetFriends';

const GET_USERS = gql`
    query User($name: String!, $email: String!){
        user(name: $name, email: $email){
            name
        }
    }`;

class GetUser extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    render (){
        const name = window.localStorage.getItem('Name');
        const email = window.localStorage.getItem('Email');
        if(name&&email){
            return <Query query={GET_USERS} variables={{ name, email }}>
            {({ loading, error, data }) => {
                if (loading) return <CircularProgress />;
                if (error) return `Error!: ${error}`;
                if(data.user != null) return <GetFriends from={data.user.name} />
                return null;
            }}
            </Query>
        }
        return null;
    }
}

export default GetUser;