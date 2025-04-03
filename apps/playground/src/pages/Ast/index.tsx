import { useCallback } from "react";
import "./style.scss";

const width = "100px";
const height = "100px";

const x = 210.66;
const y = 300;

if (Math.random() > 0.5) {
  console.log("large");
} else if (y > 20) {
  console.log("yy");
} else {
  console.log("small");
}

function Ast() {
  const boxStyle = useCallback(() => {
    return {
      width,
      height,
      transform: `translate(${x}px, ${y}px)`,
      fontSize: "30px",
      border: "1px solid",
    };
  }, []);

  const onClick = () => {
    const num = Math.random();

    if (num > 0.4) {
      console.log("large");
    } else if (x > 20) {
      console.log("aa");
    } else if (x < 20) {
      console.log("bb");
    } else {
      console.log("small");
    }
  };

  return (
    <div className="ast-page">
      <h3>Ast here</h3>
      <div className="box" style={boxStyle()}>
        box
      </div>
      <button onClick={onClick}>click</button>
    </div>
  );
}

Ast.displayName = "Ast";
export default Ast;
