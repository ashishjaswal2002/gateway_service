const { gql } = require('graphql-tag');

const typeDefs = gql`
  type User {
    id: ID!
    username: String
  }

  type Query {
    getFollowers(userId: ID!): [User]
    getFollowing(userId: ID!): [User]
  }

  type Mutation {
    followUser(followerId: ID!, followingId: ID!): FollowResponse
    unfollowUser(followerId: ID!, followingId: ID!): FollowResponse
  }

  type FollowResponse {
    success: Boolean!
    message: String
  }
`;

module.exports = typeDefs;
