'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store').validator('User')
Route.post('sessions', 'SessionController.store')

Route.post('passwords', 'ForgotPasswordController.store')
Route.put('passwords', 'ForgotPasswordController.update')

Route.get('files/:id', 'FileController.show')

Route.get('posts', 'PostController.index')
Route.get('posts/:id', 'PostController.show')

Route.group(() => {
  Route.post('files', 'FileController.store')

  Route.post('posts', 'PostController.store')
  Route.put('posts/:id', 'PostController.update')
  Route.delete('posts/:id', 'PostController.destroy')
}).middleware(['auth'])
