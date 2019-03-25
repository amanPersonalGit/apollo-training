import React from 'react';
import { Query } from "react-apollo";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import gql from "graphql-tag";

const MESSAGES = gql`
    query{
        messages{
            to
            from
            message
        }
    }`;

class GetMessages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { to, from } = this.props;
        return (
            <Query query={MESSAGES}>
            {({ loading, error, data }) => {
                if (loading) return <CircularProgress />;
                if (error) return `Error!: ${error}`;
                console.log(data);
                return <h1>Hello</h1>
            }}
            </Query>
        );
    }
}

export default GetMessages;