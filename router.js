const express = require("express");
const router = express.Router();
const fire = require("firebase");
const { v4: uuiV4 } = require("uuid");
const firebase = require("./firebase");
router.post("/", (req, res) => {
  const credentials = req.body;
  firebase.module.auth
    .createUserWithEmailAndPassword(
      credentials["email"],
      credentials["password"]
    )
    .then((newUser) => {
      newUser.user.updateProfile({
        displayName: credentials["name"],
      });
    }).then(final => {
      console.log("Sucess");
      return res.status(201).send("ok")
    })
    .catch((e) =>{
      console.log("Error in creatinh user",e);
      return  res.status(400).send(e)
    });
});

router.post("/signIn", (req, res) => {
  const user = req.body;

  firebase.module.auth
    .signInWithEmailAndPassword(user["email"], user["password"])
    .then((user) => {
      res.status(200).send({
        userName: user.user.displayName,
        uuid: user.user.uid,
        email: user.user.email,
        emailVerified: user.user.emailVerified,
        photo: user.user.photoURL,
      });
    })
    .catch((e) => res.status(500).send({ message: e }));
});

router.get("/posts", (req, res) => {
  firebase.module.database
    .collection("posts")
    .orderBy("ts", "desc")
    .onSnapshot((snap) => {
      res.status(200).send(snap.docs.map((post) => post.data()));
    });
});

router.post("/addComment", (req, resp) => {
  const details = req.body;

  firebase.module.database
    .collection("posts")
    .doc(details["id"])
    .update({
      comments: fire.default.firestore.FieldValue.arrayUnion({
        comment: details["comment"],
        id: details["id"],
        user: details["user"]["userName"],
        email: details["user"]["email"],
        ts: new Date().toUTCString(),
      }),
    })
    .then((res) => resp.status(201).send({ message: "Added Successfully" }))
    .catch((e) => resp.status(500).send({ message: "Server Error" }));
});

const saveBlog = async ({ id, post, req, res }) => {
  post["uuid"] = id;

  post["ts"] = new Date().toUTCString();
  delete post["user"]["uuid"];
  delete post["user"]["photo"];
  delete post["user"]["emailVerified"];
  await firebase.module.database.collection("posts").doc(id).set(post);
};

router.post("/publish", async (req, res) => {
  const postBody = req.body;

 await saveBlog({ id: uuiV4(), post: postBody, req: req, res: res });
});

router.get("/post/:id", async (req, resp) => {
  const id = req.params.id;

  let post = await firebase.module.database
    .collection("posts")
    .doc(id)
    .get()
    .then((res) => res.data())
    .catch((e) => null);
  if (post != null) {
    resp.status(200).send(post);
  } else {
    resp.status(500).send(post);
  }
});

module.exports = router;
