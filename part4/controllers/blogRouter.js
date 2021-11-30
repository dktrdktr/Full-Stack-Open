const blogRouter = require("express").Router();
const Blog = require("../models/blogpost");
const User = require("../models/user");

blogRouter.get("/", async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate("user");
    response.json(blogs);
  } catch (exception) {
    next(exception);
  }
});

blogRouter.get("/:id", async (request, response) => {
  try {
    const blogs = await Blog.findById(request.params.id).populate("user");
    response.json(blogs);
  } catch (exception) {
    next(exception);
  }
});

blogRouter.post("/", async (request, response, next) => {
  const body = request.body;

  if (body.title === undefined || body.url === undefined) {
    return response.status(400).json({ error: "Title or URL missing" });
  }

  try {
    if (!request.token || !request.user) {
      return response.status(401).json({ error: "token missing or invalid" });
    }
    const user = await User.findById(request.user);

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog.id);
    await user.save();
    response.status(201).json(savedBlog);
  } catch (exception) {
    next(exception);
  }
});

blogRouter.delete("/:id", async (request, response, next) => {
  if (!request.token || !request.user) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  try {
    const blog = await Blog.findById(request.params.id);
    if (blog.user.toString() === request.user) {
      await Blog.findByIdAndRemove(request.params.id);
      response.status(204).end();
    } else {
      response.status(401).end();
    }
  } catch (exception) {
    next(exception);
  }
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
