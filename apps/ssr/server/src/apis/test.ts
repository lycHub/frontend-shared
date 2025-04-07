import axios from "axios";

const url = "https://dogapi.dog/api/v2/breeds";
// const url = 'https://jsonplaceholder.typicode.com/posts/1';

const getPost = () => {
  return axios.get(url);
};

export async function getServerSideProps() {
  const { data } = await getPost();
  return data;
}

function App() {}

export default App;
