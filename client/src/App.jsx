import "./App.css";
import TaskList from "./components/Tasks";
import AddTask from './components/AddTask'

function App() {
  return (
    <>
      <div className="">
        <TaskList />
        <br />
        <AddTask />
      </div>
    </>
  );
}

export default App;
