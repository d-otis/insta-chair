const Instagram = require('instagram-web-api')
const dotenv = require('dotenv').config()

const { IG_USER: username , IG_PASS: password } = process.env
const jinxed = { id: 32576604, username: 'jinxedstore' }

const client = new Instagram({
  username,
  password
})

;(async () => {
  await client.login()
  const response = await client.getPhotosByUsername({ username: jinxed.username, first: 20 })

  const posts = response.user.edge_owner_to_timeline_media.edges

  const results = posts.map(post => {
    return {
      postId: post.node.id,
      caption: post.node.edge_media_to_caption.edges[0].node.text,
      comments: post.node.edge_media_to_comment.edges.map(edge => ({ authorId: edge.node.owner.id, text: edge.node.text })),
      shortcode: post.node.shortcode
    }
  })

  const isSold = post => {
    const soldItems = post.comments.filter(comment => comment.text.toLowerCase().includes('sold'))

    if (soldItems.length) return true
  }

  const postsWithChairs = results.filter(post => post.caption.toLowerCase().includes('chair'))

  const unsoldChairs = postsWithChairs.filter(post => !isSold(post))

  if (unsoldChairs.length) console.log(unsoldChairs)
})()