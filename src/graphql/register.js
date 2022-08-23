import gql from 'graphql-tag';

export const REGISTER_CUSTOMER_ACCOUNT = gql`
    mutation createCustomer($input: RegisterCustomerInput!){
        registerCustomerAccount(input: $input){
            ... on Success {
                success
            }
        }
    }
`