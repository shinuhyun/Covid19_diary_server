const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const userRouter = require("./routes/user");
// const mypageRouter = require("./routes/mypage");
// const contentRouter = require("./routes/content");
// const commentRouter = require("./routes/comment");
// const contentListRouter = require("./routes/contentList");

app.use(express.json());

app.use("/user", userRouter);
// app.use("/mypage", mypageRouter);
// app.use("/content", contentRouter);
// app.use("/comment", commentRouter);
// app.use("/contentList", contentListRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
