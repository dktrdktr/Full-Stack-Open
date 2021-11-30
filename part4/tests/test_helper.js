const User = require("../models/user");

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

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  usersInDb,
  initialBlogs,
};
