import React, { useEffect,useState } from "react";
import axios from 'axios'

const Todos = () => {


  const [newTodo, setnewTodo] = useState("")
  const [todos, setTodos] = useState([]);
  const [page, setpage] = useState(1)
  const [limit, setlimit] = useState(5)
  const [count, setcount] = useState(0)



  const saveInfo=()=>{
    setnewTodo()
    fetch("http://localhost:8080/todos",{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify({
        value:newTodo,
        isCompleted:false
      }),
    })
    .then((r)=>r.json())
    .then((d)=>{
      setTodos([...todos,d])
      setnewTodo("")
      console.log(d)
    })
  }

  useEffect(() => {
    let gettodo=async()=>{
      const r=await axios.get(`http://localhost:8080/todos?_page=${page}&_limit=${limit}`)
      // .then((r) => r.json())
      // .then((d) => {
        
        setTodos(r.data)
        console.log(r)
        setcount(Number(r.headers["x-total-count"]))
    }
    gettodo()
      
  }, [page,limit]);



  // const patch=()=>{
  //   fetch("http://localhost:8080/todos",{
  //     method:"PATCH",
  //     headers:{
  //       "content-type":"application/json"
  //     },
  //   })
  // }

  const Delete=(x)=>{
      fetch(`http://localhost:8080/todos/${x}`,{
        method:"DELETE",
        headers:{
          "content-type":"application/json"
        } 
      })
      .then((r)=>{
        r.json()
      })
      .then((d)=>{
        console.log(d)
        setTodos(todos)
      })
    }



  return (
    
      <div>Todos
      <div>
      <div>
      <input value={newTodo} onChange={({target})=>setnewTodo(target.value)}/>
      <button onClick={saveInfo}>SAVE</button>
      </div>
      {todos.map((todo) => (
        <div key={todo.id}>{todo.id }{` : `}{todo.value}
           <button>Edit</button>
           <button onClick={()=>Delete(todo.id)  }>Delete</button>
        </div>
      ))}
    </div>

    <button disabled={page*limit>=count} onClick={()=>setpage(page+1)}>{`>`}</button>
    <button disabled={page<=1}  onClick={()=>setpage(page-1)}>{`<`}</button>

    </div>
  );
};

export default Todos;
