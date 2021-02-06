const Instagram = require('instagram-web-api')
const dotenv = require('dotenv').config()

const { IG_USER: username , IG_PASS: password } = process.env
const jinxed = { id: 32576604, username: 'jinxedstore' }
const me = { id: 45729136975, username: 'zuul_1999' }

const client = new Instagram({
  username,
  password
})

;(async () => {
  await client.login()
  const response = await client.getPhotosByUsername({ username: jinxed.username, first: 5 })

  const posts = response.user.edge_owner_to_timeline_media.edges
  // CAPTION
  // edges[0].node.edge_media_to_caption.edges[0].node.text
  // COMMENTS
  // edges[0].node.edge_media_to_comment.edges[0].node.text
  // COMMENT AUTHOR SHOULD === edges[0].node.edge_media_to_comment.edges[0].node.owner.username aka 'jinxed store'
  console.log(posts)

  const results = posts.map(post => {
    return {
      postId: post.node.id,
      caption: post.node.edge_media_to_caption.edges[0].node.text,
      comments: post.node.edge_media_to_comment.edges.map(edge => ({ authorId: edge.node.owner.id, comment: edge.node.text }))
    }
  })

  const isSold = post => {
    // ARGUMENT: single post
    // RETURN: boolean
  }

  const postsWithChairs = results.filter(post => post.caption.toLowerCase().includes('chair'))

  const unsoldChairs = postsWithChairs.filter(post => post.comments.length === 0)
  console.log(results)
})()