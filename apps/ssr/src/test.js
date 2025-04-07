import axios from "axios";

const getPost = () => {
  return axios.get("https://jsonplaceholder.typicode.com/posts/1");
};

export async function getServerSideProps() {
  const { data } = await getPost();
  return data;
}

function App() {}

export default App;
