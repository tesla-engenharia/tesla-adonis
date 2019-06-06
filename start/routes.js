'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store').validator('User')
Route.post('sessions', 'SessionController.store').validator('Session')

Route.post('passwords', 'ForgotPasswordController.store').validator(
  'ForgotPassword'
)
Route.put('passwords', 'ForgotPasswordController.update').validator(
  'ResetPassword'
)

Route.get('files/:id', 'FileController.show')

Route.get('posts', 'PostController.index')
Route.get('posts/:id', 'PostController.show')

Route.get('projects', 'ProjectController.index')
Route.get('projects/:id', 'ProjectController.show')

Route.get('projects/:projects_id/jobs', 'JobController.index')
Route.get('projects/:projects_id/jobs/:id', 'JobController.show')

Route.group(() => {
  Route.post('files', 'FileController.store')

  Route.post('posts', 'PostController.store').validator('Post')
  Route.put('posts/:id', 'PostController.update')
  Route.delete('posts/:id', 'PostController.destroy')
  Route.resource('projects', 'ProjectController')
    .apiOnly()
    .except(['index', 'show'])
  Route.resource('projects.jobs', 'JobController')
    .apiOnly()
    .except(['index', 'show'])
}).middleware(['auth'])
