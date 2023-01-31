import { useState, Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const App = () => {
  const [tasks, setTasks] = useState<Array<{ todo: string, category: string, isCompleted: boolean}>>([]);
  const [taskInput, setTaskInput] = useState('');
  const [category, setCategory] = useState('yellow');

  const submitHandler = () => {    
    if(!taskInput) {
      alert('To-Do field cannot be empty');
    }
    const obj = { todo: taskInput, category, isCompleted: false };

    setTasks([...tasks, obj]);
    setTaskInput('');
    setCategory('yellow')
  }

  const handleCheck = (checkStatusFlag: boolean, idx: number) => {
    const tempState = [...tasks];
    tempState[idx].isCompleted = checkStatusFlag;
    
    setTasks(tempState);
  }

  const taskItem = () => {
    return (
      <Fragment>
      {tasks.map((task, idx) => (
        <div className='task-card' key={idx}>
          <input type='checkbox' className='checkbox' onChange={(e) => {handleCheck(e.target.checked, idx)}}/>
          <div className="vl" style={{ borderLeft: `6px solid ${task.category}` }}></div>
          {!task.isCompleted && <p>{task.todo}</p>}
          {task.isCompleted && <del>{task.todo}</del>}
        </div>
      ))}
      </Fragment>
    )
  }

  return (
    <div className='main'>
      <h1>Task Details</h1>
      <div className='container'>
        <div className='card'>
          <div className='input-card'>
            <label>Task To-Do</label>
            <input type='text' value={taskInput} onChange={(e) => setTaskInput(e.target.value)} />
          </div>
          <div className='input-card'>
            <label>Select Task Category</label>
            <select onChange={(e) => {setCategory(e.target.value)}}>
              <option value="yellow">Yellow</option>
              <option value="red">Red</option>
              <option value="green">Green</option>
            </select>
          </div>
        </div>
        <button onClick={submitHandler}>Submit Task</button>
      </div>
      <div>
          <h1>Your Tasks</h1>
          <div className='task'>
            {taskItem()}
          </div>
        </div>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
