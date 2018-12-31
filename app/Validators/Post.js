'use strict'

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
}

module.exports = Post
