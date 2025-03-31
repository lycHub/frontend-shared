import axios from "axios";

function AutoDts() {
  const onClick = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts/1")
      .then(({ data }) => {
        console.log("onClick :>> ", data);
      });
  };
  return (
    <div className="dts-page">
      <h3>AutoDts here</h3>
      <button onClick={onClick}>send request</button>
    </div>
  );
}

AutoDts.displayName = "AutoDts";
export default AutoDts;
