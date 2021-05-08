import gql from 'graphql-tag'

const jobDetailFragment = gql`
  fragment JobDetail on Job {
    id
    title
    description
    company {
        id
        name
    }
}`;


export const jobQuery = gql`
  query JobQuary($id: ID!) {
    job(id: $id) {
      ...JobDetail
    }
  }
  ${jobDetailFragment}
`;

export const jobsQuery = gql`
  query JobsQuery {
    jobs {
      ...JobDetail
   }
  }
  ${jobDetailFragment}
`;

export const createJobMutation = gql`
  mutation CreateJob($input: CreateJobInput){
    job: createJob(input: $input) {
      ...JobDetail
    }
  }
  ${jobDetailFragment}
`;