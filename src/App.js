import {useState} from "react";
import AddTaskForm from './components/AddTaskForm.jsx';
import UpdateForm from './components/UpdateForm.jsx';
import ToDo from './components/ToDo.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';


import './App.css';
function App(){
  // Tasks To-do list
  const [toDo , setToDo] = useState([
   //{"id":1,"title":"task1","status":false},
  // {"id":2,"title":"task2","status":false},
  ]);
  // Temp state
  const [newTask,setNewTask] = useState('');
  //newTask will be used to hold temporarly data that will be be added as new task in task list 
  const [updateData, setUpdateData] = useState('');
  //updatedata will hold task that is being edited
  //use ' ' to avoid error > A component is changing an uncontrolled input to be controlled

  // Add task 
  const addTask = () => {
    if(newTask) {
       let num = toDo.length +1;
       let newEntry = { id: num, title: newTask, status:false }
       setToDo([...toDo, newEntry])
       setNewTask('');
  }
  }
  // Delete task
  const deleteTask = (id) => {
    let newTask= toDo.filter(task => task.id!==id)
    setToDo(newTask);

  
    
  }
  // Mark task is done or completed
  const markDone = (id) => {
    let newTask = toDo.map( task => {
      if(task.id === id){
        return({...task,status:!task.status})
      }
      return task;
    })
    setToDo(newTask);
}
  //cancle task
  const cancelUpdate =() => {
    setUpdateData('');

}
// change task for update
const changeTask = (e) => {
  let newEntry = {
    id : updateData.id,
    title: e.target.value ,
    status: updateData.status ? true : false
  }
  setUpdateData(newEntry);
}
 //update task 
 const updateTask = () => {
  let fliterRecords = [...toDo].filter(task => task.id !==updateData.id);
  let updatedObject = [...fliterRecords,updateData]
  setToDo(updatedObject);
  setUpdateData('');
 }
  return (
    <div className="container App">
      <br/><br/>
      <h2>To - Do list App(React js)</h2>
      <br/><br/>


      {/* update task */}
      {updateData && updateData.title ? (
        <UpdateForm
        updateData={updateData}
        changeTask={changeTask}
        updateTask={updateTask}
        cancelUpdate={cancelUpdate}
        />
      
      ) : ( 
        <AddTaskForm
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
        />
      )}
      
     
    
      {toDo && toDo.length ? '' : 'No task....'}
      <ToDo
      toDo={toDo}
      markDone={markDone}
      setUpdateData={setUpdateData}
      deleteTask={deleteTask}
      

      />
      
    
      </div>
  );
}
export default App;
