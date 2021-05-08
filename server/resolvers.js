const db = require('./db');
const Query = {
    job: (root, {id}) => db.jobs.get(id),
    jobs: () => db.jobs.list(),
    company: (root, {id}) => db.companies.get(id),
    companies: () => db.companies.list(),
    user: (root, {id}) => db.users.get(id),
};

const Mutation = {
    createJob: (root, {input}, context) => {
        if (!context.user) {
            return new Error('Unarthorized')
        }
        const id = db.jobs.create({...input, companyId: context.user.companyId});
        return db.jobs.get(id);
    }
};

const Company = {
    jobs: (company) => db.jobs.list().filter(job => job.companyId === company.id)
}

const Job = {
    company: (job) => db.companies.get(job.companyId)
};

const User = {
    company: (user) => db.companies.list().filter(company => company.id === user.companyId)
}

module.exports = { Query, Mutation, Job, Company, User };

