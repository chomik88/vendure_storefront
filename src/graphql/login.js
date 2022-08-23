import gql from 'graphql-tag';

export const LOGIN_CUSTOMER = gql`
    mutation Login($username: String! $password: String! $rememberMe: Boolean!){
        login(username: $username password: $password rememberMe: $rememberMe){
            ... on CurrentUser {
                id
                identifier
                channels {
                    token
                    permissions
                }
            }
            ... on InvalidCredentialsError {
                errorCode
                message
                authenticationError
            }
        }
    }
`