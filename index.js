const express = require("express");
const routes = require("./router");
const { v4: uuiV4 } = require("uuid");
const { json } = require("body-parser");
const firebase = require("./firebase");
const app = express();
const posts = require("./dummy");
let port = process.env.PORT || 3030;

app.use(json());
app.use((req, res, next) => {
  res.setHeader("Accept", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*"),
    res.setHeader("Access-Control-Allow-Headers", "*"),
    next();
});
app.use(routes);

function saveBlog(id, post) {
  post["uuid"] = id;
  post["ts"] = new Date().toUTCString();
  firebase.module.database.collection("posts").doc(id).set(post);
}

function populate() {
  posts.module.post.map((post,index) => {
    if(index<2){
        saveBlog(uuiV4(), post);
    }
  });
}
// populate()

app.listen(port, console.log(`Server is runing in port ==>> ${port}`));
