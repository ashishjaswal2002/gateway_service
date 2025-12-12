const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { ApolloServerPluginLandingPageLocalDefault } = require('@apollo/server/plugin/landingPage/default');
require('dotenv').config();
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
});

const startServer = async () => {
    const port = parseInt(process.env.PORT) || 4000;
    const { url } = await startStandaloneServer(server, {
        listen: { port },
    });
    console.log(`  Gateway Service ready at: ${url}`);
};

startServer();
