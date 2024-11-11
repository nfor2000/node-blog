import { connection } from "../lib/config.js";

export const getPosts = async () => {
     try {
          const result = await new Promise((resolve, reject) => {
               connection.query("SELECT * FROM posts", (error, result, fields) => {
                    if (error) {
                         reject(error);
                    }
                    resolve(result);
               });
          });

          const posts = result.map(row => {
               return {
                    id: row.id,
                    title: row.title,
                    body: row.body,
                    date: row.date
               };
          });

          return posts;
     } catch (error) {
          console.error("Error fetching posts:", error);
          return [];
     }
}

export const addPost = ({ title, body }) => {
     connection.query({ sql: "INSERT INTO posts (title, body) VALUES (?, ?)", values: [title, body] }, (error, result, fields) => {
          if (error) {
               console.log("Error:", error.stack)
               return;
          }
          console.log(result)
     });
}

export const removePostById = (id) => {
     connection.query({ sql: "DELETE FROM posts WHERE id = ?", values: [id] }, (error, result, fields) => {
          if (error) {
               console.log("Error:", error.stack)
               return;
          }
          console.log(result)
     });
}

export const getPostById = async (id) => {
     try {
          const result = await new Promise((resolve, reject) => {
               connection.query({ sql: "SELECT * FROM posts WHERE id=?", values: [id] }, (error, result, fields) => {
                    if (error) {
                         reject(error)
                    }
                    resolve(result)
               });
          })
          const post = {
               id: result[0].id,
               title: result[0].title,
               body: result[0].body,
               date: result[0].date
          }

          return post
     } catch (error) {
          console.log("Faild to find posts")
          return null
     }
}

