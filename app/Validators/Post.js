'use strict'

const Antl = use('Antl')

class Post {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      file_id: 'required|number',
      title: 'required',
      content: 'required'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Post
