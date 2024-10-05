import express from "express";
import {ApolloServer} from '@apollo/server'
import {expressMiddleware} from '@apollo/server/express4'
import bodyParser from "body-parser";



export async function intiServer() {
   const app = express(); 

   app.use(bodyParser.json());
   
   const graphqlServer = new ApolloServer({
    //typedef is schema
    typeDefs: `
    type Query {
       sayHello: String
    }
    `  ,
    //based on schema, define resolvers
    resolvers: {
        Query: {
            sayHello: () => `Hello from graphql server`
        },
    },
   });

   await graphqlServer.start();

   app.use('/graphql', expressMiddleware(graphqlServer));

   return app
}