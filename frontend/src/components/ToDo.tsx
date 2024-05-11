interface ToDoProps {
    title: string; // Aquí especificas el tipo de data, en este caso, como string
    id: string;
    description: string
}



export function ToDo({title, description}: ToDoProps) {
    return (
        <>
        <p>{title}</p>
        <div id="description"><p>{description}</p> </div>
        
        </>
    )
}