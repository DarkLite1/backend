import {
  ApolloServerPlugin,
  GraphQLRequestContext,
} from 'apollo-server-plugin-base'

export class plugin implements ApolloServerPlugin {
  requestDidStart(requestContext: GraphQLRequestContext) {
    // Fires whenever a GraphQL request is received from a client.
    console.log('Request started! Query:\n' + requestContext.request.query)

    return {
      // Fires whenever Apollo Server will parse a GraphQL
      // request to create its associated document AST.
      parsingDidStart() {
        console.log('Parsing started!')
      },
      validationDidStart() {
        // This end hook is unique in that it can receive an array of errors,
        // which will contain every validation error that occurred.
        return (errs: any) => {
          if (errs) {
            errs.forEach((err: any) => console.error(err))
          }
        }
      },
    }
  }
  serverWillStart() {
    console.log('Server starting up!')
  }
}

// export const myPlugin = {
//   requestDidStart(requestContext: GraphQLRequestContext) {
//     console.log('Request started! Query:\n' + requestContext.request.query)

//     return {
//       // Fires whenever Apollo Server will parse a GraphQL
//       // request to create its associated document AST.
//       parsingDidStart() {
//         console.log('Parsing started!')
//       },
//       validationDidStart() {
//         // This end hook is unique in that it can receive an array of errors,
//         // which will contain every validation error that occurred.

//         return (errs: any) => {
//           if (errs) {
//             errs.forEach((err: any) => console.error(err))
//           }
//         }
//       },
//     }
//   },
// }
