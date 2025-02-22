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
  // state variable here
  const [count, setCount] = useState<number>(10);
  const [results, setResults] = useState<unknown[]>([]);

  useEffect(() => {
    getRandomUsers();
  }), [];
  
  // handlers
  const getRandomUsers = async () => {
    // making request here.
    const res: AxiosResponse = await randomUsersApi.get('/', {
      params: {
        results: count,
      },
    });
    // picking off the results key from the response
    const randomUsersResults = res.data?.results ?? [];

    // adding on the new results ( random users array ) to the previous results
    setResults([...results, ...randomUsersResults]);
    setCount(10);
  };
  
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
      <p>results: {results.length}</p>
      {/* <pre>{results.length !== 0 && JSON.stringify(results, null, 2)}</pre> */}
      <div className="random-users-container">

      </div>
      {results.length !== 0 && (
        results.map((result: any, index: number) => {
          return (
            <div key={`random-user-card-${index}-${result.email}`} style={{
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: 'black'
            }}>
              {JSON.stringify(result, null, 2)}
            </div>
          )
        })
      )}
    </div>
  );
};

type ContactInfo = {
  email: string // email
  cell: string  // cell
};

//type Gender = 'male' | 'female' | 'trans' | 'not-answered'

interface IRandomUserCard {
  gender: string   // gender
  fullName: string // name.title + name.first + name.last
  address: string  // location.street.number + location.street.name, location.city + location.state + location.country
  email: string
  age: number // dob.age
  contactInfo: ContactInfo
  picture: string // picture.medium
};

const RandomUserCard = ({
  gender,
  fullName,
  address,
  email,
  age,
  contactInfo,
  picture
}: IRandomUserCard) => {
  return (
    <div>
      <p>{gender}</p>
      <p>{fullName}</p>
      <p>{address}</p>
      <p>{email}</p>
      <p>{age}</p>
      <p>{JSON.stringify(contactInfo)}</p>
      <p>{picture}</p>
    </div>
  )
};

export default App;