import { MessageCircle, ThumbsUp } from "lucide-react";
import "./popularBlog.scss";

const PopularBlogs = () => {
  const blogs = [
    {
      title: "My Amazing Blog Title 1",
      author: "Jordan",
      likes: 142,
      comments: 44,
    },
    {
      title: "My Amazing Blog Title 2",
      author: "John",
      likes: 153,
      comments: 25,
    },
    {
      title: "My Amazing Blog Title 4",
      author: "HuXn",
      likes: 50,
      comments: 14,
    },
  ];

  return (
    <div className="popular-blogs">
      <h2>Popular Blogs</h2>
      <ul>
        {blogs.map((blog, index) => (
          <li key={index}>
            <span className="blog-title">{blog.title}</span>
            <span className="blog-author">Published by {blog.author}</span>
            <div className="blog-stats">
              <MessageCircle size={16} />
              <span>{blog.likes}</span>

              <ThumbsUp size={16} />
              <span>{blog.comments}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularBlogs;
