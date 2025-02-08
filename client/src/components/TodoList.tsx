import { useTodos } from "../context/TodoProvider";
import {Trash2} from 'lucide-react'
import api from "../lib/api";

function TodoList() {
    const {todos} = useTodos();
    if(todos.length === 0) {
        return 
    }
    return ( 
        <ul>
            {todos.map(todo => (
                <li key={todo.id} className="flex gap-4">
                    <p> {todo.title}</p>
                    <form onSubmit={async () => {
                        await api.delete(`/delete/${todo.id}`);
                    }}>
                        <button className="cursor-pointer"><Trash2 /></button>
                    </form>
                </li>
            ))}
        </ul>
     );
}

export default TodoList;