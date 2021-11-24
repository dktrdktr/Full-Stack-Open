const dummy = (blogs) => {
  // ...
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((result, item) => result + item.likes, 0);
};

const favoriteBlog = (blogs) => {
  return [...blogs].sort((a, b) => b.likes - a.likes)[0];
};

const mostBlogs = (blogs) => {
  return blogs
    .reduce((result, item) => {
      let found = result.find((obj) => obj.author === item.author);
      if (!found) {
        result.push({ author: item.author, blogs: 1 });
        return result;
      }
      found.blogs++;
      return result;
    }, [])
    .sort((a, b) => b.blogs - a.blogs)[0];
};

const mostLikes = (blogs) => {
  return blogs
    .reduce((result, item) => {
      let found = result.find((obj) => obj.author === item.author);
      if (!found) {
        result.push({ author: item.author, likes: item.likes });
        return result;
      }
      found.likes += item.likes;
      return result;
    }, [])
    .sort((a, b) => b.likes - a.likes)[0]; // mostLikes
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
