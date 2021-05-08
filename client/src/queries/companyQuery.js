import gql from 'graphql-tag'

export const companyQuery = gql`query CompanyQuery($id: ID!) {
    company(id: $id) {
      id
      name
      description
    }
  }`;