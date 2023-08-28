import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const apiURL = "http://localhost:3000";
function App() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(apiURL)
      .then((resp) => {
        setData(resp.data.data.tours);
        console.log(resp.data.data.tours);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post(apiURL, {
      name: value,
    });
    getData();
    setValue("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
        />
      </form>
      {data.map((e) => {
        return (
          <div key={e.id}>
            <p>{e.name}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
