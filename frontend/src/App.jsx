import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const apiURL = "http://localhost:3000";

function App() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [editingId, setEditingId] = useState();
  const [editingName, setEditingName] = useState("");
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(apiURL);
      setData(response.data.data.tours);
      console.log(response.data.data.tours);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`${apiURL}/${id}`, {
        name: editingName,
      });
      await getData();
      setEditingId(null);
      setEditingName("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(apiURL, {
        name: value,
      });
      await getData();
      setValue("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiURL}/${id}`);
      await getData();
    } catch (error) {
      console.log(error);
    }
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
      {data.map((e) => (
        <div key={e.id}>
          {editingId === e.id ? (
            <>
              <input
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                type="text"
              />
              <button onClick={(event) => handleUpdate(e.id)}>Update</button>
            </>
          ) : (
            <>
              <p>{e.name}</p>
              <button onClick={() => setEditingId(e.id)}>Edit</button>
              <button onClick={() => handleDelete(e.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
