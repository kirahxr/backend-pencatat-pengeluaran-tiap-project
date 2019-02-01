'use strict'

const Project = use('App/Models/Project');
const Cost = use('App/Models/Cost')
const AuthService = use('App/Services/AuthService')



class CostController {

    async show({ auth, request, params }) {
        const user = await auth.getUser();
        const { id } = params;
        const project = await Project.find(id);
        AuthService.verifyPermission(project, user);
        return await project.costs().with('project').fetch();
    }

    async create({ auth, request, params }) {
        const user = await auth.getUser();
        const { amount } = request.all();
        const { id } = params;
        const project = await Project.find(id);
        AuthService.verifyPermission(project, user);
        const cost = new Cost();
        cost.fill({
            amount,
        });
        await project.costs().save(cost);
        return cost;
    }

    async delete({ auth, request, params }) {
        const user = await auth.getUser()
        const { id } = params;
        const cost = await Cost.find(id);
        const project = await cost.project().fetch();
        AuthService.verifyPermission(project, user);
        await cost.delete();
        return cost;
    }

    async update({ auth, request, params }) {
        const user = await auth.getUser();
        const { id } = params;
        const cost = await Cost.find(id);
        const project = await cost.project().fetch();
        AuthService.verifyPermission(project, user);
        cost.merge(request.only([
            'amount',
            'completed',
        ]));
        await cost.save();
        return cost;
    }
}

module.exports = CostController
