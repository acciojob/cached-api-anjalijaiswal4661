import React, { useState, useEffect, useMemo } from "react";

function PostsViewer() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(1);

  // Fetch data whenever the input changes
  useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
        );

        const data = await response.json();

        if (isMounted) {
          setPosts(data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPosts();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  // Memoize processed data
  const memoizedPosts = useMemo(() => {
    console.log("Memoizing posts...");

    return posts.map((post) => ({
      id: post.id,
      title: post.title.toUpperCase(),
      body: post.body,
    }));
  }, [posts]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Posts Viewer</h1>

      {/* Input that affects the API call */}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="userId">Select User: </label>
        <select
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        >
          <option value={1}>User 1</option>
          <option value={2}>User 2</option>
          <option value={3}>User 3</option>
        </select>
      </div>

      {/* Loading state */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Fetched Posts</h2>
          {memoizedPosts.map((post) => (
            <div
              key={post.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "12px",
                marginBottom: "12px",
              }}
            >
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PostsViewer;