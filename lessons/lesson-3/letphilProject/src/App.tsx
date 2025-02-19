import { useEffect, useState } from "react";
import axios, {AxiosResponse} from "axios";

const RANDOM_USER_EP = "https://randomuser.me/api";

//axios.defaults.baseURL = RANDOM_USER_EP;
const randomUsersApi = axios.create({
  baseURL: RANDOM_USER_EP,
  headers: {
    'Content-Type': "application/json"
  }
})

const App = () => {
  const [count, setCount] = useState<number>(10);

  const getRandomUsers = async () => {
    const res: AxiosResponse = await randomUsersApi.get('/', {
      params: {
        results: count,
      },
    });    
    // const { data: { results } } = res
    // console.log('results =', results);
    const randomUsersResults = res.data?.results ?? [];
    console.log("randomUsersResults =", randomUsersResults);
  }
  
  return (
    <div>
      {/* This will control how many random users get from random users api */}
      <span>
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
        <button onClick={getRandomUsers}>get</button>
      </span>

      <h2>count: {count}</h2>
      <h1>Hello World!</h1>
    </div>
  );
};

export default App;