const url = new URL(window.location.toString())
const id = url.searchParams.get("id")
const postsContainer = document.getElementById("post-container")
const loader = document.getElementById("loader")

fetch(`/posts/${id}`)
     .then(res => res.json())
     .then(post => {
          const postElem = document.createElement("article")
          postElem.className = "text-start mb-3"
          postElem.innerHTML = ` <h2 class="text-xl font-bold underline">${post.title}</h2>
                                   <p class="text-sm"> ${post.body}</p>
                                   <span class="text-xs text-gray-500">${formatDate(post.date)}</span>
                                  `
          postsContainer.append(postElem)
     }).catch((error) => console.log(error))
     .finally(() => loader.classList.add("hidden"))

function formatDate(date) {
     return new Date(date).toLocaleDateString("en-us", { year: "numeric", day: "2-digit", month: "2-digit" })
}