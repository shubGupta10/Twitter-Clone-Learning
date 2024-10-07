import express from "express";
import {ApolloServer} from '@apollo/server'
import {expressMiddleware} from '@apollo/server/express4'
import bodyParser from "body-parser";
import {User} from './user'
import cors from 'cors'
import { GraphqlContext } from "../interfaces";
import JWTService from "../services/jwt";




export async function intiServer() {
   const app = express(); 

   app.use(bodyParser.json());
   app.use(cors())
   
   const graphqlServer = new ApolloServer<GraphqlContext>({
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

   app.use('/graphql', expressMiddleware(graphqlServer, {context: async ({req, res}) => {
      return {
        user: req.headers.authorization ? JWTService.decodeToken(req.headers.authorization.split('Bearer')[1]) : undefined
      }
   }}));

   return app
}