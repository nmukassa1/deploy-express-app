import Form from '../components/Form'
import TodoList from "../components/TodoList";
import { TodosProvider } from '../context/TodoProvider';

function Dashboard() {
    return ( 
        <div className='container mx-auto'>
            <TodosProvider>
                <Form />
                <TodoList />
            </TodosProvider>
        </div>
     );
}

export default Dashboard;