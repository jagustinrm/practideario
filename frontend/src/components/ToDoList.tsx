// import { AllToDo } from "./AllToDo";
import { useState } from "react";
import { ToDo } from "./ToDo";

export function ToDoList() {

    interface Task {
        id: string;
        title: string;
        description: string;
    }
    // const [inputValue, setInputValue] = useState("");
    const [tasks, setTasks] = useState<Task[]>([]);


    function generateRandomId(): string {
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
    }


    function handleDelete(id: string) {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    }
    
function handleClick() {
    const inputElement = document.getElementById("textAdd") as HTMLInputElement;
    const title = inputElement.value;
    const inputElementTwo = document.getElementById("descriptionAdd") as HTMLInputElement;
    const desc = inputElementTwo.value;

    // Creamos la nueva tarea con la estructura adecuada
    const newTask: Task = {
        id: generateRandomId(),
        title: title,
        description: desc
    };

    // Agregamos la nueva tarea al objeto de tareas
    setTasks(prevTasks => [...prevTasks, newTask]);
    // console.log(tasks)
}

return (
    <>
        <div id="toDoList">
            <input type="text" id="textAdd"></input>
            <input type="text" id="descriptionAdd" placeholder="Agregá una descripción"></input>
            <button onClick={() => handleClick()}> Agregar</button>
                {tasks.length ? (
                    tasks.map((task) => (
                            <>
                            <ToDo id={task.id} title={task.title} description={task.description}  />
                            <button onClick={() => handleDelete(task.id)}>X</button>
                            </>
                        ))
                    ) : (
                        <p>No hay tareas</p>
                    )}
            {/* <AllToDo 
                tasks = {tasks}
            /> */}
        </div>
    </>
)
}