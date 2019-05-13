'use strict'

const Job = use('App/Models/Job')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with jobs
 */
class JobController {
  /**
   * Show a list of all jobs.
   * GET jobs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ params }) {
    const jobs = await Job.query()
      .where('project_id', params.projects_id)
      .with('user')
      .fetch()
    return jobs
  }

  /**
   * Render a form to be used for creating a new job.
   * GET jobs/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  async store ({ params, request }) {
    const data = request.only(['user_id', 'title', 'description', 'file_id'])
    const job = await Job.create({
      ...data,
      project_id: params.projects_id
    })
    return job
  }

  /**
   * Display a single job.
   * GET jobs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const job = await Job.findOrFail(params.id)
    return job
  }

  /**
   * Render a form to update an existing job.
   * GET jobs/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  /**
   * Update job details.
   * PUT or PATCH jobs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const job = await Job.findOrFail(params.id)
    const data = request.only(['user_id', 'title', 'description', 'file_id'])
    job.merge(data)
    await job.save()
    return job
  }

  /**
   * Delete a job with id.
   * DELETE jobs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params }) {
    const job = await Job.findOrFail(params.id)
    await job.delete()
  }
}

module.exports = JobController
