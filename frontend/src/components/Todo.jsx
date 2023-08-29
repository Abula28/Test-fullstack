import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Todo.scss";

const apiURL = "http://localhost:3000";
export const Todo = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [editingId, setEditingId] = useState();
  const [editingName, setEditingName] = useState("");
  const [number, setNubmer] = useState(0);
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
    if (value.trim() !== "") {
      try {
        await axios.post(apiURL, {
          name: value,
        });
        await getData();
        setValue("");
      } catch (error) {
        console.log(error);
      }
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
    <div className="todo">
      <form onSubmit={handleSubmit}>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="Enter Task..."
        />
        <button>Add Task</button>
      </form>
      <div className="todo-list">
        {data.map((e) => (
          <div className="todos-parent" key={e.id}>
            {editingId === e.id ? (
              <div className="update-todo">
                <input
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  type="text"
                  placeholder="Enter task to update"
                />
                <button onClick={() => handleUpdate(e.id)}>Update</button>
              </div>
            ) : (
              <div className="todos">
                <p>
                  {e.id}. {e.name}
                </p>
                <div className="todos-btn">
                  <button onClick={() => setEditingId(e.id)}>Edit</button>
                  <button onClick={() => handleDelete(e.id)}>Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
