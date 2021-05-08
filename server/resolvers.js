const db = require('./db');
const Query = {
    job: (root, {id}) => db.jobs.get(id),
    jobs: () => db.jobs.list(),
    company: (root, {id}) => db.companies.get(id),
    companies: () => db.companies.list(),
};

const Company = {
    jobs: (company) => db.jobs.list().filter(job => job.companyId === company.id)
}

const Job = {
    company: (job) => db.companies.get(job.companyId)
};

module.exports = { Query, Job, Company };
