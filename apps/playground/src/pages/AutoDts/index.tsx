function AutoDts() {
  const onClick = () => {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((res) => res.json())
      .then((res) => {
        console.log("onClick :>> ", res);
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
