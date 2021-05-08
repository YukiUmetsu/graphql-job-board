import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from 'apollo-boost';
import { isLoggedIn, getAccessToken } from './auth';
import { jobQuery, jobsQuery, createJobMutation } from './queries/jobQuery';
import { companyQuery } from './queries/companyQuery';

const endpointURL = 'http://localhost:9000/graphql';

const authLink = new ApolloLink((operation, forward) => {
  if (isLoggedIn()) {
    operation.setContext({
      headers: {
        'authorization': 'Bearer ' + getAccessToken()
      }
    });
  }
  return forward(operation);
});

const client = new ApolloClient({
  link: ApolloLink.from([
    authLink,
    new HttpLink({uri: endpointURL}),
  ]),
  cache: new InMemoryCache()
});

export async function loadJob(id) {
    const {data: {job}} = await client.query({query: jobQuery, variables: {id}})
    return job
}

export async function loadJobs(){
    const {data: {jobs}} = await client.query({query: jobsQuery, fetchPolicy: 'no-cache'});
    return jobs;
}

export async function createJob(input) {
    const {data: {job}} = await client.mutate({
      mutation: createJobMutation, 
      variables: {input},
      // after updating, update cache to avoid another fetch on getting this job.
      update: (cache, {data}) => {
        cache.writeQuery({
          query: jobQuery,
          variables: {id: data.job.id},
          data
        })
      }
    })
    return job
}

export async function loadCompany(id) {
    const {data: {company}} = await client.query({query: companyQuery, variables: {id}})
    return company
}