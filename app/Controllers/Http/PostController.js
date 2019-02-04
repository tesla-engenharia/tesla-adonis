'use strict'

const Post = use('App/Models/Post')

class PostController {
  /**
   * Show a list of all posts.
   * GET posts
   */
  async index ({ request }) {
    const { page } = request.get()

    const posts = await Post.query()
      .orderBy('created_at', 'desc')
      .with('user')
      .with('file')
      .paginate(page || 1, 10)

    return posts
  }

  /**
   * Create/save a new post.
   * POST posts
   */
  async store ({ request, auth }) {
    const data = request.only(['file_id', 'title', 'content'])

    const post = await Post.create({ ...data, user_id: auth.user.id })

    return post
  }

  /**
   * Display a single post.
   * GET posts/:id
   */
  async show ({ params }) {
    const post = await Post.findOrFail(params.id)

    await post.load('user')
    await post.load('file')

    return post
  }

  /**
   * Update post details.
   * PUT or PATCH posts/:id
   */
  async update ({ params, request }) {
    const post = await Post.findOrFail(params.id)

    const data = request.only([
      'file_id',
      'title',
      'content',
      'user_id',
      'created_at'
    ])

    post.merge(data)

    await post.save()

    await post.load('user')
    await post.load('file')

    return post
  }

  /**
   * Delete a post with id.
   * DELETE posts/:id
   */
  async destroy ({ params }) {
    const post = await Post.findOrFail(params.id)

    await post.delete()
  }
}

module.exports = PostController
