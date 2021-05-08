const endpointURL = 'http://localhost:9000/graphql';

export async function loadJob(id) {
    const query = `query JobQuary($id: ID!) {
                        job(id: $id) {
                          id
                          title
                          description
                          company {
                            id
                            name
                          }
                        }
                      }`;
    return await makeRequest(endpointURL, query, {id}, 'job')
}

export async function loadJobs(){
    const query = `{
        jobs {
            id
            title
            company {
                id
                name
            }
        }
    }`
    return await makeRequest(endpointURL, query, {}, 'jobs');
}

export async function loadCompany(id) {
    const query = `query CompanyQuery($id: ID!) {
                        company(id: $id) {
                          id
                          name
                          description
                        }
                      }`;
    return await makeRequest(endpointURL, query, {id}, 'company')
}

export async function makeRequest(endpointURL = '', query = '', variables = [], dataKey = ''){
    if (!endpointURL || !query) {
        return null;
    }
    const response = await fetch(endpointURL, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
            query,
            variables,
        })
    });
    const responseBody = await response.json();
    if (responseBody.errors) {
        const message = responseBody.errors.map(err => err.message).join('\n');
        throw new Error(message);
    }
    return responseBody.data[dataKey];
}
