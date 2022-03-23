const { gql } = require("graphql-request");

const subscriptionWhere = gql`
  query Subscriptions_aggregate($where: subscriptions_bool_exp) {
    subscriptions_aggregate(where: $where) {
      nodes {
        feed
        guildId
        id
        userId
      }
    }
  }
`;

const addSubscription = gql`
  mutation Insert_subscriptions($objects: [subscriptions_insert_input!]!) {
    insert_subscriptions(objects: $objects) {
      affected_rows
      returning {
        feed
        id
      }
    }
  }
`;

const subscriptions = gql`
  query Subscriptions_aggregate($where: subscriptions_bool_exp) {
    subscriptions_aggregate(where: $where) {
      nodes {
        feed
        id
      }
    }
  }
`;

module.exports = { subscriptionWhere, addSubscription, subscriptions };
