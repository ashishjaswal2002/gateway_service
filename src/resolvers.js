require('dotenv').config();
const axios = require('axios');

const FOLLOW_SERVICE_URL = process.env.FOLLOW_SERVICE_URL || 'http://localhost:4001/api/v1';

const resolvers = {
    Query: {
        getFollowers: async (_, { userId }) => {
            try {
                const response = await axios.get(`${FOLLOW_SERVICE_URL}/followers/${userId}`);
                const followers = response.data.data.followers;
                // Map MongoDB _id to GraphQL id
                return followers.map(user => ({
                    id: user._id,
                    username: user.username
                }));
            } catch (error) {
                const errorMessage = error.response ? error.response.data.message : error.message;
                throw new Error(errorMessage);
            }
        },
        getFollowing: async (_, { userId }) => {
            try {
                const response = await axios.get(`${FOLLOW_SERVICE_URL}/following/${userId}`);
                const following = response.data.data.following;
                return following.map(user => ({
                    id: user._id,
                    username: user.username
                }));
            } catch (error) {
                const errorMessage = error.response ? error.response.data.message : error.message;
                throw new Error(errorMessage);
            }
        },
    },
    Mutation: {
        followUser: async (_, { followerId, followingId }) => {
            try {
                await axios.post(`${FOLLOW_SERVICE_URL}/follow`, {
                    followerId,
                    followingId,
                });
                return { success: true, message: 'Successfully followed user' };
            } catch (error) {
                // Handle specific errors from the service
                const errorMessage = error.response ? error.response.data.message : error.message;
                throw new Error(errorMessage);
            }
        },
        unfollowUser: async (_, { followerId, followingId }) => {
            try {
                await axios.post(`${FOLLOW_SERVICE_URL}/unfollow`, {
                    followerId,
                    followingId,
                });
                return { success: true, message: 'Successfully unfollowed user' };
            } catch (error) {
                const errorMessage = error.response ? error.response.data.message : error.message;
                throw new Error(errorMessage);
            }
        },
    },
};

module.exports = resolvers;
