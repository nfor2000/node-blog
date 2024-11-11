const postsContainer = document.getElementById("post-container")
const loader = document.getElementById("loader")

fetch('/getposts')
     .then(res => res.json())
     .then(data => {
          if (data.length > 0) {
               data.forEach(post => {
                    const postElem = document.createElement("article")
                    postElem.className = "text-center mb-3"
                    postElem.innerHTML = `<h2 class="text-xl font-bold"><a href="/post?id=${post.id}" class="hover:underline">${post.title}</a></h2>
                                   <p class="text-sm max-w-sm  mx-auto whitespace-nowrap overflow-ellipsis overflow-hidden"> ${post.body}</p>
                                   <span class="text-xs text-gray-500">${formatDate(post.date)}</span>
                                            `
                    postsContainer.append(postElem)
               })
          } else {
               const noPostsFound = document.createElement("p")
               noPostsFound.className = "text-sm p-5 text-center"
               noPostsFound.innerHTML = "No post found!"
               postsContainer.append(noPostsFound)
          }
     })
     .catch(error => console.log(error))
     .finally(() => loader.classList.add("hidden"))


function formatDate(date) {
     return new Date(date).toLocaleDateString("en-us", { year: "numeric", day: "2-digit", month: "2-digit" })
}