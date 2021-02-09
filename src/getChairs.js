const dotenv = require('dotenv')
dotenv.config({ path: __dirname + "/../.env"})
const Instagram = require('instagram-web-api')

const { IG_USER: username , IG_PASS: password } = process.env
const jinxed = { id: 32576604, username: 'jinxedstore' }

const client = new Instagram({
  username,
  password
})

const getChairs = async soldIds => {

  await client.login()
  const response = await client.getPhotosByUsername({ username: jinxed.username, first: 10 })

  const posts = response.user.edge_owner_to_timeline_media.edges
  console.log(`Parsing through ${posts.length} posts`)
  const formatTimestamp = timestamp => new Date(timestamp * 1000).toLocaleString()

  const results = 
    posts.reduce((newObj, eleObj) => {
      newObj[eleObj.node.id] = {
        postId: eleObj.node.id,
        caption: eleObj.node.edge_media_to_caption.edges[0].node.text,
        comments: eleObj.node.edge_media_to_comment.edges.map(edge => ({ authorId: edge.node.owner.id, text: edge.node.text, commentId: edge.node.id })),
        commentIds: eleObj.node.edge_media_to_comment.edges.map(edge => edge.node.id),
        url: `https://www.instagram.com/p/${eleObj.node.shortcode}`,
        thumbnail: eleObj.node.display_resources[1].src,
        takenAt: formatTimestamp(eleObj.node.taken_at_timestamp)
      }
      return newObj
    }, {})

  const isSold = post => {
    if (!post.comments.length) return false

    const soldComments = post.comments.filter(comment => comment.text.toLowerCase().includes('sold'))

    if (soldComments.length) return true
  }

  const postsWithChairs = Object.keys(results).filter(postId => results[postId].caption.toLowerCase().includes('chair'))

  const unsoldChairs = postsWithChairs.filter(postId => !isSold(results[postId]))
  const soldChairs = postsWithChairs.filter(postId => isSold(results[postId]))
  
  return {
    unsold: unsoldChairs.map(chair => results[chair]),
    sold: soldChairs.map(chair => results[chair]),
  }
}

module.exports = getChairs