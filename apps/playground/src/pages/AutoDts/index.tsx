function AutoDts() {
  const onClick = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((res) => {
        fetch("/gen-dts", {
          method: "POST",
          body: JSON.stringify(res),
        });
      });
  };

  return (
    <div className="play-page">
      <h3>Auto dts</h3>
      <button onClick={onClick}>send request</button>
    </div>
  );
}

AutoDts.displayName = "AutoDts";
export default AutoDts;
