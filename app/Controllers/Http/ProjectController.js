'use strict'

const Project = use('App/Models/Project')

class ProjectController {
  async index ({ request }) {
    const projects = await Project.query().fetch()
    return projects
  }

  async store ({ request, response, auth }) {
    const data = request.only([
      'title',
      'description',
      'icon_id',
      'long_description',
      'departament'
    ])
    const project = await Project.create({
      ...data,
      user_id: auth.user.id
    })
    return project
  }

  async show ({ params }) {
    const project = await Project.findOrFail(params.id)
    await project.load('user')
    await project.load('jobs')

    return project
  }

  async update ({ params, request }) {
    const project = await Project.findOrFail(params.id)
    const data = request.only([
      'title',
      'description',
      'icon_id',
      'long_description',
      'departament'
    ])
    project.merge(data)
    await project.save()
    return project
  }

  /**
   * Delete a project with id.
   * DELETE projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params }) {
    const project = await Project.findOrFail(params.id)
    await project.delete()
  }
}

module.exports = ProjectController
