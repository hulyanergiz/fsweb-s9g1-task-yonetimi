import { useState } from "react";
import "./app.css";
import Task from "./Task";
import TaskForm from "./TaskForm";
import TaskHookForm from "./TaskHookForm";
import PeopleForm from "./PeopleForm";
import { initialTasks, initialTeam } from "./data";
import { Zoom, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [team, setTeam] = useState(initialTeam);

  function handleTaskSubmit(yeniTask) {
    setTasks([yeniTask, ...tasks]);
  }

  function handlePeopleSubmit(yeniKisi) {
    setTeam([...team, yeniKisi]);
  }

  function handleComplete(id) {
    const guncelTasks = tasks.map((item) => {
      if (item.id === id) {
        return { ...item, status: "yapıldı" };
      }
      return item;
    });
    setTasks(guncelTasks);
    toast.success("Task tamamlandı");
  }

  return (
    <div className="app">
      <div className="formColumn">
        <div className="form-container">
          <h2>Yeni Task</h2>
          {/* <TaskForm kisiler={team} submitFn={handleTaskSubmit} /> */}
          <TaskHookForm kisiler={team} submitFn={handleTaskSubmit} />
        </div>

        <div className="form-container">
          <h2>Yeni Kişi</h2>
          <PeopleForm kisiler={team} submitFn={handlePeopleSubmit} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <h2 className="column-title">Yapılacaklar</h2>
          <div className="column-list">
            {tasks
              .filter((item) => item.status === "yapılacak")
              .map((item) => (
                <Task
                  key={item.id}
                  taskObj={item}
                  onComplete={handleComplete}
                />
              ))}
          </div>
        </div>
        <div className="column">
          <h2 className="column-title">Tamamlananlar</h2>
          <div className="column-list">
            {tasks
              .filter((item) => item.status === "yapıldı")
              .map((item) => (
                <Task key={item.id} taskObj={item} />
              ))}
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-left"
        theme="dark"
        autoClose={3000}
        transition={Zoom}
        newestOnTop={false}
      />
    </div>
  );
}

export default App;
