import express from "express";
import {ApolloServer} from '@apollo/server'
import {expressMiddleware} from '@apollo/server/express4'
import bodyParser from "body-parser";
import {User} from './user'


export async function intiServer() {
   const app = express(); 

   app.use(bodyParser.json());
   
   const graphqlServer = new ApolloServer({
    //typedef is schema
    typeDefs: `
    ${User.types}

    type Query {
       ${User.queries}
    }
    `  ,
    //based on schema, define resolvers
    resolvers: {
        Query: {
            ...User.resolvers.queries
        },
    },
   });

   await graphqlServer.start();

   app.use('/graphql', expressMiddleware(graphqlServer));

   return app
}