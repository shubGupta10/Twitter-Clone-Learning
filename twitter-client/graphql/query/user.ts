import {graphql} from '../../ggl'

export const verifyUserGoogleTokenQuery = graphql(` 
    #graphql
    query verifyUserGoogleToken($token: String!){
        verifyGoogleToken(token: $token) 
    }
    `);

export const getCurrentUser = graphql(`
    query GetCurrentUser{
      id
      profileImageURL
      email
      firstName
      lastName
    }
    `)
