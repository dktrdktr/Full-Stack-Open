const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blogpost");
const api = supertest(app);

const initialBlogs = [
  {
    title: "Last Bicycle",
    author: "Alain Dunkirk",
    url: "www.google.lt",
    likes: 12,
  },
  {
    title: "First Drum",
    author: "Timothy Leningrad",
    url: "www.google.lt",
    likes: 10,
  },
];
beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test("there are two blogposts", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(2);
});

test("unique identifier property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");
  response.body.map((item) => expect(item.id).toBeDefined());
});

test("POST: a valid blogpost can be added", async () => {
  const newBlogpost = {
    title: "Limits of Life",
    author: "Moby Dick",
    url: "www.wikipedia.com",
    likes: 5,
  };

  await api
    .post("/api/blogs")
    .send(newBlogpost)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const contents = response.body.map((r) => r.title);

  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(contents).toContain("Limits of Life");
});

test("POST: likes defaults to 0", async () => {
  const newPost = {
    title: "Edites Thoughts",
    author: "Oliver Lamarck",
    url: "www.google.ru",
  };

  await api
    .post("/api/blogs")
    .send(newPost)
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
