import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/BlogPost.module.css";
import fs from 'node:fs';

const slug = (props) => {
  const [blog, setblog] = useState(props.blog);
  const markup = { __html: blog.desc };
  return (
    <>
      {blog && (
        <div className={styles.con}>
          <h1 style={{ color: "brown", textAlign: "center" }}>{blog.title}</h1>
          <hr />
          <div style={{ fontSize: "25px" }} dangerouslySetInnerHTML={markup} ></div>
        </div>
      )}
    </>
  );
};
export async function getStaticPaths() {

  let blogdata=await fs.promises.readdir('./blogsdata')

  const paths = blogdata.map((blog) => ({
    params: { slug: blog.replace('.json','') },
  }))
  return { paths, fallback: false }
}
export async function getStaticProps(context) {
  console.log("slug")
  const slug=context.params.slug
  const response = await fs.promises.readFile(`./blogsdata/${slug}.json`,'utf-8');
  const blog = JSON.parse(response); 
  return {
    props: {
      blog,
    },
  }
}
export default slug;
