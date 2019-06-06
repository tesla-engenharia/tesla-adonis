'use strict'

const Job = use('App/Models/Job')
class JobController {
  async index ({ params }) {
    const jobs = await Job.query()
      .where('project_id', parseInt(params.projects_id))
      .fetch()
    console.log(params.projects_id)
    return jobs
  }

  async store ({ params, request, auth }) {
    const data = request.only(['title', 'description', 'file_id'])
    const job = await Job.create({
      ...data,
      project_id: parseInt(params.projects_id),
      user_id: auth.user.id
    })
    return job
  }

  async show ({ params }) {
    const job = await Job.findOrFail(params.id)
    return job
  }

  async update ({ params, request, response }) {
    const job = await Job.findOrFail(params.id)
    const data = request.only(['user_id', 'title', 'description', 'file_id'])
    job.merge(data)
    await job.save()
    return job
  }

  async destroy ({ params }) {
    const job = await Job.findOrFail(params.id)
    await job.delete()
  }
}

module.exports = JobController
