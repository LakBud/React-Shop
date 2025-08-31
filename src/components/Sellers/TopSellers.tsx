import { useEffect, useState } from "react";
import "./topSellers.scss";

interface Author {
  name: string;
  isFollowing: boolean;
  image: string;
}

const TopSellers = () => {
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://randomuser.me/api/?results=10");
        const data = await res.json();

        const authorsData: Author[] = data.results.map((user: any) => ({
          name: `${user.name.first} ${user.name.last}`,
          isFollowing: false,
          image: user.picture.medium,
        }));

        setAuthors(authorsData);
      } catch (error) {
        console.error(`Error fetching authors: ${error}`);
      }
    };

    fetchData(); // call fetchData once here
  }, []); // empty dependency array ensures it runs only once

  const handleFollowClick = (index: number) => {
    setAuthors((prevAuthors) =>
      prevAuthors.map((author, i) => (i === index ? { ...author, isFollowing: !author.isFollowing } : author))
    );
  };

  return (
    <div className="top-sellers">
      <h2>Top Sellers</h2>
      <ul>
        {authors.map((author, index) => (
          <li key={index}>
            <div className="author-info">
              <img src={author.image} alt={author.name} />
              <span>{author.name}</span>
            </div>

            <button onClick={() => handleFollowClick(index)} className={author.isFollowing ? "following" : "not-following"}>
              {author.isFollowing ? "Unfollow" : "Follow"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopSellers;
