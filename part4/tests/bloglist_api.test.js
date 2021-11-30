const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blogpost");
const User = require("../models/user");
const api = supertest(app);
const helper = require("./test_helper");
const bcrypt = require("bcrypt");

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test("there are two blogposts", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(2);
});

test("unique identifier property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");
  response.body.map((item) => expect(item.id).toBeDefined());
});

test("POST: cannot add a blogpost without a valid token", async () => {
  const newBlogpost = {
    title: "Limits of Life",
    author: "Moby Dick",
    url: "www.wikipedia.com",
    likes: 5,
  };

  await api
    .post("/api/blogs")
    .send(newBlogpost)
    .expect(401)
    .expect("Content-Type", /application\/json/);
});

test("POST: a valid blogpost can be added", async () => {
  const newBlogpost = {
    title: "Limits of Life",
    author: "Moby Dick",
    url: "www.wikipedia.com",
    likes: 5,
  };

  await User.deleteMany({});

  let newUser = {
    username: "Zazu",
    password: "abrakadabra",
  };

  const passwordHash = await bcrypt.hash(newUser.password, 10);
  const user = new User({ username: newUser.username, passwordHash });
  await user.save();

  const loginResponse = await api.post("/api/login").send(newUser);

  await api
    .post("/api/blogs")
    .set("Authorization", `bearer ${loginResponse.body.token}`)
    .send(newBlogpost)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const contents = response.body.map((r) => r.title);

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
  expect(contents).toContain("Limits of Life");
});

test("POST: likes defaults to 0", async () => {
  const newBlogpost = {
    title: "Edites Thoughts",
    author: "Oliver Lamarck",
    url: "www.google.lt",
  };

  await User.deleteMany({});

  let newUser = {
    username: "Zazu",
    password: "abrakadabra",
  };

  const passwordHash = await bcrypt.hash(newUser.password, 10);
  const user = new User({ username: newUser.username, passwordHash });
  await user.save();

  const loginResponse = await api.post("/api/login").send(newUser);

  await api
    .post("/api/blogs")
    .set("Authorization", `bearer ${loginResponse.body.token}`)
    .send(newBlogpost)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blog = await Blog.find({ title: "Edites Thoughts" });

  expect(blog[0].likes).toBe(0);
});

test("POST: if the title and url are missing, the backend responds with 400 Bad Request", async () => {
  const newPost = {
    author: "Ronald Duck",
  };

  await api.post("/api/blogs").send(newPost).expect(400);
});

afterAll(() => {
  mongoose.connection.close();
});
