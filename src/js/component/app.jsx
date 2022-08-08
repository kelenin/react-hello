import React, {useEffect} from "react";
import { Button, Card, Form } from 'react-bootstrap';
import { isEmpty, size } from 'lodash';

function Todo({ todo, index, removeTodo }) 
{
  return (
    <div className="todo">
      <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{todo.text}</span>
      <div>
      <Button variant="outline-danger" onClick={() => removeTodo(index,todo)}>✕</Button>
      </div>
    </div> 
  );
}
  
function FormTodo({ addTodo }) {
  const [value, setValue] = React.useState([]);

  const requestOptionsput = {
    method: "PUT",
    body: JSON.stringify([{
      "label": value,
      "done": false,
    }]),
    headers: {
      "Content-Type": "application/json"
    }
  };
  

  const handleSubmit = e => 
  {
    e.preventDefault();

    if(value!="")
    {
      addTodo(value);
      setValue("");
    }

    fetch('https://assets.breatheco.de/apis/fake/todos/user/alesanchezr',requestOptionsput)
      .then(resp => {
            console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
            console.log(resp.status); // el código de estado = 200 o código = 400 etc.
            /*console.log(resp.text()); */// Intentará devolver el resultado exacto como cadena (string)
            return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
      })
      .then(data => {
            //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
            console.log('Esto es el body', data); //esto imprimirá en la consola el objeto exacto recibido del servidor
      })
      .catch(error => {
            //manejo de errores
            console.log(error);
      });
      
  };
  
  /*useEffect(() => {
    handleSubmit(event)
  });*/

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
  
function App() 
{
  const [todos, setTodos] = React.useState("");
  
  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    const todoss = [...todos,{ index }];

    /*useEffect(() => 
    {*/
        // DELETE request using fetch with set headers
        const requestOptions = {
            method: 'DELETE',
            headers: { 
                'Authorization': 'Bearer my-token',
                'My-Custom-Header': 'foobar'
            }
        };
        fetch(`https://assets.breatheco.de/apis/fake/todos/user/alesanchezr`, requestOptions)
            .then(() => setStatus('Delete successful'));
    /*}, []);*/
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
  //export default class App extends Component