import { MessageCircle, ThumbsUp } from "lucide-react";
import "./popularBlog.scss";

const PopularBlogs = () => {
  const blogs = [
    {
      id: 1,
      title: "Top 10 Must-Have Books for Summer 2025",
      author: "Jordan Smith",
      likes: 142,
      comments: 44,
    },
    {
      id: 2,
      title: "How to Choose the Perfect Laptop for Students",
      author: "John Doe",
      likes: 153,
      comments: 25,
    },
    {
      id: 3,
      title: "5 Kitchen Gadgets That Make Cooking a Breeze",
      author: "HuXn Lee",
      likes: 98,
      comments: 14,
    },
    {
      id: 4,
      title: "The Ultimate Guide to Home Office Setup",
      author: "Emily Chen",
      likes: 210,
      comments: 37,
    },
    {
      id: 5,
      title: "Latest Trends in Smart Home Technology",
      author: "Alex Johnson",
      likes: 178,
      comments: 42,
    },
    {
      id: 6,
      title: "How to Care for Your New Leather Shoes",
      author: "Sophia Martinez",
      likes: 120,
      comments: 18,
    },
    {
      id: 7,
      title: "Top 7 Eco-Friendly Products to Reduce Waste",
      author: "Liam Brown",
      likes: 95,
      comments: 22,
    },
  ];

  return (
    <div className="popular-blogs">
      <h2>Popular Blogs</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id} className="blog-item">
            <article>
              {/* Blog title */}
              <h3 className="blog-title">{blog.title}</h3>

              {/* Author and date */}
              <div className="blog-meta">
                <span className="blog-author">By {blog.author}</span>
              </div>

              {/* Stats */}
              <div className="blog-stats">
                <span className="likes">
                  <ThumbsUp size={16} /> {blog.likes}
                </span>
                <span className="comments">
                  <MessageCircle size={16} /> {blog.comments}
                </span>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularBlogs;
