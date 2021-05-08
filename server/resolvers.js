const db = require('./db');
const Query = {
    job: (root, {id}) => db.jobs.get(id),
    jobs: () => db.jobs.list(),
    company: (root, {id}) => db.companies.get(id),
    companies: () => db.companies.list(),
};

const Mutation = {
    createJob: (root, {input}) => {
        const id = db.jobs.create(input);
        return db.jobs.get(id);
    }
};

const Company = {
    jobs: (company) => db.jobs.list().filter(job => job.companyId === company.id)
}

const Job = {
    company: (job) => db.companies.get(job.companyId)
};

module.exports = { Query, Mutation, Job, Company };

