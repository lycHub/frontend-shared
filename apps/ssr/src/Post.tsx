"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const getPost = () => {
  console.log("getPosts run");
  return axios
    .get("https://jsonplaceholder.typicode.com/posts/1")
    .then((res) => res.data);
};

function Post({ loadedData }) {
  const [data, setData] = useState(loadedData);

  useEffect(() => {
    if (!data) {
      getPost().then((data) => setData(data));
    }
  }, []);

  return (
    <p
      onClick={() => {
        console.log("aaa");
        alert("aa");
      }}
    >
      postData-ss: {data?.title}
    </p>
  );
}

export default Post;
