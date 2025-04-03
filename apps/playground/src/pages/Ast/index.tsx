import { useCallback } from "react";
import "./style.scss";

const width = "100px";
const height = "100px";

const x = 210.66;
const y = 300;

const foo = "bar";
console.log(foo);

function Ast() {
  const foo = "bar";
  console.log(foo);

  const boxStyle = useCallback(() => {
    return {
      width,
      height,
      transform: `translate(${x}px, ${y}px)`,
      fontSize: "30px",
      border: "1px solid",
    };
  }, []);

  return (
    <div className="ast-page">
      <h3>Ast here</h3>
      <div className="box" style={boxStyle()}>
        box
      </div>
    </div>
  );
}

Ast.displayName = "Ast";
export default Ast;
