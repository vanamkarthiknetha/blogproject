import React, { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
const fs = require("node:fs");

const blogs = (props) => {
  const [blogs, setblogs] = useState(props.blogs);
  const [count, setcount] = useState(4);
  const fetchMoreData = async () => {
    setcount(count + 2);
    const res = await fetch(
      `http://localhost:3000/api/getblogs/?count=${count + 2}`
    );
    const data = await res.json();
    setblogs(data);
  };

  return (
    <div className={styles.home}>
      <InfiniteScroll
        dataLength={blogs.length}
        next={fetchMoreData}
        hasMore={props.length !== blogs.length}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {blogs.map((blog) => {
          return (
            <div key={blog.title}>
              <h1 style={{ color: "brown" }}>{blog.title}</h1>
              <p style={{ fontSize: "25px", width: "50vw" }}>
                {blog.desc.substr(0, 150)} ....
              </p>
              <Link
                href={`/blogposts/${blog.title}`}
                style={{ color: "white" }}
              >
                <button type="submit" className={styles.btn}>
                  read more
                </button>
              </Link>
            </div>
          );
        })}
      </InfiniteScroll>
    </div>
  );
};
export async function getStaticProps() {
  let blogs = [];
  let blogdata = await fs.promises.readdir("./blogsdata");
  for (let index = 0; index < blogdata.length; index++) {
    const blogname = blogdata[index];
    let blog = await fs.promises.readFile("./blogsdata/" + blogname, "utf-8");
    console.log(blog)
    blogs.push(JSON.parse(blog));
  }
  const length = blogdata.length;
  return {
    props: {
      blogs,
      length,
    },
  };
}
export default blogs;
