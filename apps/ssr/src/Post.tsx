"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const getPost = () => {
  console.log("getPosts run");
  return axios
    .get("https://dogapi.dog/api/v2/breeds")
    .then((res) => res.data);
};

function Post({ loadedData }) {
  const [data, setData] = useState(loadedData?.data || []);
  // console.log('data', data);

  useEffect(() => {
    if (!data) {
      getPost().then((data) => setData(data));
    }
  }, []);

  return (
    <dl>
      <dt onClick={() => {
        console.log("aaa");
        alert("aa");
      }}>birds</dt>
      {
        data.map((item) => (
          <dd key={item.id}>{item.attributes.name}</dd>
        ))
      }
    </dl>
  );
}

export default Post;
