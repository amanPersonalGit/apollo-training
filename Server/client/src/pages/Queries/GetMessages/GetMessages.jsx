import React from 'react';
import { Query } from "react-apollo";
import CircularProgress from '@material-ui/core/CircularProgress';
import gql from "graphql-tag";
import MessageSent from '../../Subscriptions';

const MESSAGES = gql`
    query Messages($to: String!, $from: String!){
        messages(to: $to, from: $from){
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
            <Query query={MESSAGES} variables={{ to, from }}>
                {({ loading, error, data, subscribeToMore }) => {
                    if (loading) return <CircularProgress />;
                    if (error) return `Error!: ${error}`;
                    return <MessageSent messages={data.messages} subscribeToMore={subscribeToMore} to={to} from={from} />
                }}
            </Query>
        );
    }
}

export default GetMessages;