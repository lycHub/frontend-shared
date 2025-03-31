import axios from "axios";
function AutoDts() {
  const onClick = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts/1")
      .then(({ data }) => {
        console.log("data", data);
        if (import.meta.env.DEV) {
          axios.post("/gen-dts", { posts: data });
        }
      });
  };

  return (
    <div className="dts-page">
      <h3>Auto dts</h3>
      <button onClick={onClick}>send request</button>
    </div>
  );
}

AutoDts.displayName = "AutoDts";
export default AutoDts;
