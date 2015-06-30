# MeteorのORM,gravitonを使ってみるサンプル
meteorでちょっと困ることがあるんです。hasMany,belongsTo。Railsから流れ着いた者としては、その辺をしっかり組んでからプログラミング開始したいと常々思ってました。

これまではhasMany,BelongsToを実現するためにtransformを使ってきました。まぁぶっちゃけ、transformさえあれは大抵のリレーションはサクッと作れちゃうんですがw

今回はMeteorのORMライブラリ、gravitonを使ってそれらを実現したいと思います。
https://github.com/emmerge/graviton/

まずは環境構築

```terminal.osx
meteor create gravition-example
cd g*
rm *
touch model.js
atom .
```

## hasManyを定義
###投稿は、複数のコメントを持つ

```model.js
Posts = Graviton.define('posts', {
  hasMany: {
    comments: {
      collection: 'comments',
      foreignKey: 'postId'
    }
  }
})

Comments = new Meteor.Collection('comments')
```

```js
//browser console
post = Posts.findOne();
comment = Comments.build();
comment.set({author:'たかし', body:'あのですね・・'})
post.comments.add(comment);

post.comments.all()
// ポストが持つ、すべてのコメントを返します。
```

#belongsToを定義
##コメントは、一つの投稿を持つ

```model.js
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

```

```js

//browser console
post = Posts.findOne();
comment = Comments.build();
comment.set({author:'たかし', body:'またですか；'})

comment.post()
// ポストオブジェクトを返します。
console.log('同じ_idになるでしょう :',post._id,comment.post()._id)
```
