import React, {useEffect} from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import { isEmpty, size } from 'lodash';
/*function Todo({ todo, index }) 
{
  return (
    <div className="todo">
      <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{todo}</span>
      <div>
      <Button variant="outline-danger" onClick={() => removeTodo(index)}>✕</Button>
      </div>
    </div> 
  );
}*/

function FormTodo() 
{
  const [todos, setTodos] = React.useState([]);

  useEffect(() => {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/ksalom')
      .then(resp => {
            console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
            console.log(resp.status); // el código de estado = 200 o código = 400 etc.
            /*console.log(resp.text()); */// Intentará devolver el resultado exacto como cadena (string)
            return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
      })
      .then(data => {
            //Aquí es donde debe comenzar tu código del body
            setTodos(data)
            console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
      })
      .catch(error => {
            //manejo de errores
            console.log(error);
      });
  },[]);

  const [value, setValue] = React.useState("");
  
  const handleSubmit = e => 
  {
    e.preventDefault();

    if(value!="")
    {
      setValue("");
    }
  
    const requestOptionsput = 
    {
        method: "PUT",
        body: JSON.stringify([
          ...todos,
          {
          "label": value,
          "done": false,
        }]),
        headers: {
          "Content-Type": "application/json"
        }
    };
  
    fetch('https://assets.breatheco.de/apis/fake/todos/user/ksalom',requestOptionsput)
      .then(resp => {
            console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
            console.log(resp.status); // el código de estado = 200 o código = 400 etc.
            /*console.log(resp.text()); */// Intentará devolver el resultado exacto como cadena (string)
            return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
      })
      .then(data => {
            //Aquí es donde debe comenzar tu código del body
            setTodos([
              ...todos,
              {
              "label": value,
              "done": false,
            }]);
            console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
      })
      .catch(error => {
            //manejo de errores
            console.log(error);
      });
        
  };

  const removeTodo = (index) => 
  {
    const newTodos = todos.filter((todo,todoindex) => index!=todoindex);
  
    // DELETE request using fetch with set headers
    const requestOptions = {
        method: 'PUT',
        body: JSON.stringify(newTodos),
        headers: {
          "Content-Type": "application/json"
        }
    };
    fetch('https://assets.breatheco.de/apis/fake/todos/user/ksalom', requestOptions)
      .then(data => {
        //Aquí es donde debe comenzar tu código del body
        setTodos(newTodos);
        console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
      })
  };  
  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">Todo List</h1>
          <Form onSubmit={handleSubmit}> 
            <Form.Group>
              <Form.Label><b>Tareas</b></Form.Label>
              <Form.Control type="text" className="input" id="list_tarea" value={value} onChange={e => setValue(e.target.value)} placeholder="Tareas" />
            </Form.Group>
            <Button variant="primary mb-3" type="submit">
              Agregar
            </Button>
        </Form>
        {
          size(todos) == 0 ? (
              <h5 className="text-center">No hay tareas, añadir tareas</h5>
          ) :
          (
            <div>
                  {todos.map((todo, index) => (
                    <div className="todo">
                      <span>{todo.label}</span>
                      <div>
                        <Button variant="outline-danger" onClick={() => removeTodo(index)}>✕</Button>
                      </div>
                    </div> 
                  ))}
            </div>
          )
        }
      </div>
    </div>
       
  );
}

  export default FormTodo;