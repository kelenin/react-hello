import React from "react";
import { Button, Card, Form } from 'react-bootstrap';
import { isEmpty, size } from 'lodash';

function Todo({ todo, index, removeTodo }) 
{
    return (
      <div className="todo">
        <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{todo.text}</span>
        <div>
        <Button variant="outline-danger" onClick={() => removeTodo(index)}>✕</Button>
        </div>
      </div> 
    );

}
  
  function FormTodo({ addTodo }) {
    const [value, setValue] = React.useState("");
  
    const handleSubmit = e => {
      e.preventDefault();

      if(value!="")
      {
        addTodo(value);
        setValue("");
      }
    };
  
    return (
      <Form onSubmit={handleSubmit}> 
      <Form.Group>
        <Form.Label><b>Tareas</b></Form.Label>
        <Form.Control type="text" className="input" id="list_tarea" value={value} onChange={e => setValue(e.target.value)} placeholder="Tareas" />
      </Form.Group>
      <Button variant="primary mb-3" type="submit">
        Agregar
      </Button>
    </Form>
    );
  }
  
  function App() {
    const [todos, setTodos] = React.useState("");
  
    const addTodo = text => {
      const newTodos = [...todos, { text }];
      setTodos(newTodos);
    };
  
    /*const markTodo = index => {
      const newTodos = [...todos];
      newTodos[index].isDone = true;
      setTodos(newTodos);
    };*/

      const removeTodo = index => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
      };
  
    return (
      <div className="app">
        <div className="container">
          <h1 className="text-center mb-4">Todo List</h1>
          <FormTodo addTodo={addTodo} />
          {
            size(todos) == 0 ? (
              <h5 className="text-center">No hay tareas, añadir tareas</h5>
            ) :
            (
              <div>
               {todos.map((todo, index) => (
                   <Card>
                     <Card.Body>
                       <Todo
                       key={index}
                       index={index}
                       todo={todo}
                       /*markTodo={markTodo}*/
                       removeTodo={removeTodo}
                       />
                     </Card.Body>
                   </Card>
               ))}
             </div>
            )

          }
        </div>
      </div>
    );
  }
  
  export default App;