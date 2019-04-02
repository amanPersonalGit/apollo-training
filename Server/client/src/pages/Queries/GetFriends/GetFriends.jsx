import React from 'react';
import { Query } from "react-apollo";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import gql from "graphql-tag";

const FRIENDS = gql`
    query Friends($from: String!){
        friends(name: $from)
    }`;

class GetFriends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { from } = this.props;
        return (
            <Query query={FRIENDS} variables={{ from }}>
            {({ loading, error, data }) => {
                if (loading) return <CircularProgress />;
                if (error) return `Error!: ${error}`;
                return data.friends.map(to => <div key={to} style={{textAlign:'center', margin:10}}><Link color="inherit" underline="none" component={RouterLink} to={`/start/${from}/${to}`}>{to}</Link></div> );
            }}
            </Query>
        );
    }
}

export default GetFriends;