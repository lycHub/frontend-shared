"use client";

import { useState } from "react";

function Post({ loadedData }) {
  const [data] = useState(loadedData?.data || []);
  // console.log('data', data);

  return (
    <dl>
      <dt onClick={() => {
        console.log("aaa");
        alert("aa");
      }}>birds-ss</dt>
      {
        data.map((item) => (
          <dd key={item.id}>{item.attributes.name}</dd>
        ))
      }
    </dl>
  );
}

export default Post;
