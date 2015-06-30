Posts = Graviton.define('posts', {
  hasMany: {
    comments: {
      collection: 'comments',
      foreignKey: 'postId'
    }
  }
});

Comments = Graviton.define('comments', {
  belongsTo: {
    post: {
      collection: 'posts',
      field: 'postId'
    }
  }
})
