const blogRouter = require("express").Router();
const Blog = require("../models/blogpost");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const blog = await Blog(request.body);
  if (blog.title === undefined || blog.url === undefined) {
    response.status(400).end();
  } else {
    const result = await blog.save();
    response.status(201).json(result);
  }
});

blogRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const blogpost = {
    likes: body.likes,
  };
  const opts = { new: true, runValidators: true };

  const updatedPerson = await Blog.findByIdAndUpdate(
    request.params.id,
    blogpost,
    opts
  );
  response.json(updatedPerson);
});

module.exports = blogRouter;
