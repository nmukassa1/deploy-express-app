import { useState } from "react";
import axios from "axios";
import { useTodos } from "../context/TodoProvider";
import api from "../lib/api";

function Form(){

    const [title, setTitle] = useState<string>('');
    const [errors, setErrors] = useState<object>({});
    const { setTodos } = useTodos();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await api.post('/todos', { title });
            console.log(result.data);
            
            setErrors({});
            setTodos((prevTodos) => [...prevTodos, result.data]);
            setTitle('');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.log(error.response);
                if (error.response.status === 400) {
                    setErrors(error.response.data.errors);
                } 
            } else {
                console.error('An unexpected error occurred:', error);
            }
        }
    };

    return ( 
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="What do you need to do?" value={title} onChange={(e) => setTitle(e.target.value)} className="input" />
            <button type="submit" className="button">Add</button>
            {Object.keys(errors).length > 0 && (
                <div className="text-red-500 mt-2">
                    {Object.values(errors).map((error: string) => (
                        <div key={error}>{error}</div>
                    ))}
                </div>
            )}
        </form>
     );
}

export default Form;