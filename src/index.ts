import express from 'express';
import session from "express-session";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import bodyParser from "body-parser";
import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import typeDefs from "./gql/typeDefs";
import resolvers from "./gql/resolvers";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import cors from "cors"
import { loadEnv } from "./common/envLoader";
import { DataSource } from "typeorm"
// import { AppDataSource } from './data-source';
loadEnv();

require("dotenv").config();

const app = express();
const router = express.Router();
const redis = new Redis({
    port: Number(process.env.REDIS_PORT),
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD
});
const RedisStore = connectRedis(session);
const redisStore = new RedisStore({
    client: redis
});

console.log("client url", process.env.CLIENT_URL);
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(bodyParser.json())
app.use(
    session({
        store: redisStore,
        name: process.env.COOKIE_NAME,
        sameSite: "Strict",
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            path: "/",
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24,
        },

    } as any)
);
app.use(router);

// require("dotenv").config();
const entitiesPath = __dirname + process.env.PG_ENTITIES;
console.log("Entities path", entitiesPath);

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    username: process.env.PG_ACCOUNT,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    synchronize: Boolean(process.env.PG_SYNCHRONIZE),
    logging: Boolean(process.env.PG_LOGGING),
    entities: [entitiesPath]
});

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    });

const schema = makeExecutableSchema({ typeDefs, resolvers, });
const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({ req, res }),
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground(),
    ]
});
apolloServer.start().then(res => {
    apolloServer.applyMiddleware({ app, cors: false })
});


app.listen({ port: process.env.SERVER_PORT }, () => {
    console.log(`Server ready at http://localhost:${process.env.SERVER_PORT}${apolloServer.graphqlPath}`);
})
