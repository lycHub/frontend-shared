import { useCallback, useEffect, useState } from "react";
import { Post, postDetail } from "../../apis";
import "./style.scss";

const width = "100px";
const height = "100px";

const x = 210.66;
const y = 300;

if (Math.random() > 0.5) {
  console.log("large");
} else {
  console.log("small");
}

function Ast() {
  const onClick = () => {
    const num = Math.random();
    if (num > 0.4) console.log("large");
    else console.log("small");
  };

  const boxStyle = useCallback(() => {
    return {
      width,
      height,
      transform: `translate(${x}px, ${y}px)`,
      fontSize: "30px",
      border: "1px solid",
    };
  }, []);

  const [data, setData] = useState<Post>();

  useEffect(() => {
    postDetail(1).then(({ data }) => {
      console.log("data", data);
      setData(data);
    });
  }, []);

  return (
    <div className="ast-page">
      <h3>Ast here</h3>
      <div className="box" style={boxStyle()}>
        box
      </div>
      {data && (
        <div className="info">
          <p>title: {data.title}</p>
          <p>body: {data.body}</p>
        </div>
      )}

      <button onClick={onClick}>click</button>

      <div>
        {data ? (
          <div className="info">
            <p>title: {data.title}</p>
            <p>body: {data.body}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

Ast.displayName = "Ast";
export default Ast;
