import {Button} from "@/components/ui/button"
function TodoItem({todo, toggleTodo, deleteTodo}:any) {
    return (
        <li style={{ textDecoration: todo.completed ? 'line-through' : 'none'}}>
            {todo.text}
            <Button onClick={() => toggleTodo(todo.id)}>切换</Button>
            <Button onClick={() => deleteTodo(todo.id)}>删除</Button>
        </li>
    )
}

export default TodoItem;