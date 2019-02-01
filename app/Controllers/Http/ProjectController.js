'use strict'

const Project = use('App/Models/Project');
const AuthService = use('App/Services/AuthService')

class ProjectController {

    // show all projects
    async show({ auth }) {
        const user = await auth.getUser();
        return await user.projects().fetch();
    }

    // create a new project
    async create({ auth, request }) {
        const user = await auth.getUser();
        const { name, description } = request.all();
        const project = new Project();
        project.fill({
            name,
            description
        });
        await user.projects().save(project);
        return project;
    }

    // delete a specific project
    async delete({ auth, request, params }) {
        const user = await auth.getUser();
        const { id } = params;
        const project = await Project.find(id);
        AuthService.verifyPermission(project, user);
        await project.delete();
        return project;
    }

    // update a specific project
    async update({ auth, request, params }) {
        const user = await auth.getUser();
        const { id } = params;
        const project = await Project.find(id);
        AuthService.verifyPermission(project, user);
        project.merge(request.only('name'));
        await project.save();
        return project;
    }
}

module.exports = ProjectController