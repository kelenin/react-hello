import React, {useEffect} from "react";
import { Button, Card } from 'react-bootstrap';
import { isEmpty, size } from 'lodash';

function Todo({ todo, index, removeTodo }) 
{
  return (
    <div className="todo">
      <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{todo}</span>
      <div>
      <Button variant="outline-danger" onClick={() => removeTodo(index)}>✕</Button>
      </div>
    </div> 
  );
}
  
/*function FormTodo({ addTodo }) {
  const [value, setValue] = React.useState([]);

  const handleSubmit = e => 
  {
    e.preventDefault();

    if(value!="")
    {
      addTodo(value);
      setValue("");
    }

    const requestOptionsput = {
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
            console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
            return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
      })
      .then(data => {
            //Aquí es donde debe comenzar tu código del body
            console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
      })
      .catch(error => {
            //manejo de errores
            console.log(error);
      });
      
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
}*/
  
function App() 
{
  const [todos, setTodos] = React.useState([]);
  
  useEffect(() => {
    //handleSubmit(event)
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

  /*const addTodo = todo => {
    const newTodos = [...todos, { todo }];
    setTodos(newTodos);
  };*/

  const removeTodo = (index,todo) => {
    const newTodos = todos.filter((todo,todoindex) => index!=todoindex);
    const newTodoss = [...todos, { todo }];

        // DELETE request using fetch with set headers
        const requestOptions = {
            method: 'PUT',
            body: JSON.stringify([{
              "label": todo,
              "done": false,
            }]),
            headers: {
              "Content-Type": "application/json"
            }
        };
        fetch('https://assets.breatheco.de/apis/fake/todos/user/ksalom', requestOptions)
          .then(data => {
            //Aquí es donde debe comenzar tu código del body
            //setTodos(data)
            console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
          })
          //.then(() => setStatus('Delete successful'));
  
    //newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  
  /*return (
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
                      todo={todo.label}
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
  );*/


}
  
  export default App;
  //export default class App extends Component