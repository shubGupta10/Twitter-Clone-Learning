import {graphql} from '../../ggl'

export const verifyUserGoogleTokenQuery = graphql(` 
    #graphql
    query verifyUserGoogleToken($token: String!){
        verifyGoogleToken(token: $token) 
    }
    `);
