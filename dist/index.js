"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const ioredis_1 = __importDefault(require("ioredis"));
const body_parser_1 = __importDefault(require("body-parser"));
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = require("@graphql-tools/schema");
const typeDefs_1 = __importDefault(require("./gql/typeDefs"));
const resolvers_1 = __importDefault(require("./gql/resolvers"));
const apollo_server_core_1 = require("apollo-server-core");
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
require("dotenv").config();
const app = (0, express_1.default)();
const router = express_1.default.Router();
const redis = new ioredis_1.default({
    port: Number(process.env.REDIS_PORT),
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
    username: process.env.REDIS_USERNAME,
    tls: {
        rejectUnauthorized: false
    }
});
const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
const redisStore = new RedisStore({
    client: redis
});
console.log("client url", process.env.CLIENT_URL);
app.use((0, cors_1.default)({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(body_parser_1.default.json());
app.use((0, express_session_1.default)({
    store: redisStore,
    name: process.env.COOKIE_NAME,
    sameSite: "Strict",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        path: "/",
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24,
    }
}));
app.use(router);
const entitiesPath = __dirname + process.env.PG_ENTITIES;
console.log("Entities path", entitiesPath);
exports.AppDataSource = new typeorm_1.DataSource({
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
exports.AppDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization", err);
});
const schema = (0, schema_1.makeExecutableSchema)({ typeDefs: typeDefs_1.default, resolvers: resolvers_1.default, });
const apolloServer = new apollo_server_express_1.ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
    plugins: [
        (0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)(),
    ],
    cache: 'bounded'
});
apolloServer.start().then(res => {
    apolloServer.applyMiddleware({ app, cors: { credentials: true, origin: [`${process.env.CLIENT_URL}`] } });
});
app.listen({ port: process.env.PORT || 8080 }, () => {
    console.log(`Server ready at https://forum-app-server.onrender.com/${apolloServer.graphqlPath}`);
});
//# sourceMappingURL=index.js.map