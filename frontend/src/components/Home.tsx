import { useGlobalContext } from "../context/globalAnimeList";
import { ToDoList } from "./ToDoList";


export default function Home(){
    const global = useGlobalContext()
    console.log(global)
    return (
        <div>
             <header>
                <h1>Practidario</h1>
                <nav>

                    <ul>
                        <li><a href="#">Inicio</a></li>
                        <li><a href="#">Tareas</a></li>
                        <li><a href="#">Proyectos</a></li>
                        <li><a href="#">Perfil</a></li>
                    </ul>
                </nav>
            </header>

            <main>
                <section>
                    <h2>¡Bienvenido!</h2>
                    <p>Esta es tu página de inicio. Aquí puedes comenzar a gestionar tu vida y proyectos.</p>
                </section>
            </main>
            <ToDoList/>
            <footer>
                <p>&copy; 2024 Mi Aplicación de Gestión de Vida</p>
            </footer>
        </div>
    )
}