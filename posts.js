// Initialize the 'posts' array with the posts
const posts = [
     {
          id: 1,
          title: "Exploring the Universe",
          body: "In this post, we delve into the mysteries of the universe, discussing everything from the Big Bang theory to black holes and dark matter.",
          date: "November 10, 2024"
     },
     {
          id: 2,
          title: "The Art of Cooking",
          body: "Step into the culinary world with this post that explores the art of cooking. From mastering basic techniques to experimenting with exotic ingredients.",
          date: "November 11, 2024"
     },
     {
          id: 3,
          title: "The Future of Technology",
          body: "Discover the latest trends and innovations in the world of technology. From artificial intelligence to virtual reality, this post provides a glimpse into the future of technology.",
          date: "November 12, 2024"
     }
];


const addPost = ({ title, body }) => {
     const post = { id: Date.now(), title, body, date: Date.now() }
     posts.push(post)
}
const removePost = (id) => {
     const index = posts.findIndex(post => String(post.id) === id)
     posts.splice(index, 1)
     return posts
}

const getAllPost = () => posts

const getPost = (id) => {
     const post = posts.find(post => String(post.id) === id)
     if (!post) return null
     return post
}

export { getAllPost, getPost, removePost, addPost }