const dotenv = require('dotenv')
dotenv.config({ path: __dirname + "/../.env"})
const Instagram = require('instagram-web-api')

const { IG_USER: username , IG_PASS: password } = process.env
const jinxed = { id: 32576604, username: 'jinxedstore' }

const client = new Instagram({
  username,
  password
})

const getUnsoldChairs = async () => {
  await client.login()
  const response = await client.getPhotosByUsername({ username: jinxed.username, first: 100 })

  const posts = response.user.edge_owner_to_timeline_media.edges

  const results = posts.map(post => {
    return {
      postId: post.node.id,
      caption: post.node.edge_media_to_caption.edges[0].node.text,
      comments: post.node.edge_media_to_comment.edges.map(edge => ({ authorId: edge.node.owner.id, text: edge.node.text })),
      url: `https://www.instagram.com/p/${post.node.shortcode}`,
      thumbnail: post.node.display_resources[1].src
    }
  })

  const isSold = post => {
    if (!post.comments.length) return false

    const soldItems = post.comments.filter(comment => comment.text.toLowerCase().includes('sold'))

    if (soldItems.length) return true
  }

  const postsWithChairs = results.filter(post => post.caption.toLowerCase().includes('chair'))

  const unsoldChairs = postsWithChairs.filter(post => !isSold(post))

  const generateURL = post => `https://www.instagram.com/p/${post.shortcode}`

  if (unsoldChairs.length) {
    const chairs = unsoldChairs.map(chair => generateURL(chair))
    console.log(chairs)
    return chairs
  }
}

module.exports = getUnsoldChairs