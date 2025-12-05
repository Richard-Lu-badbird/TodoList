import { Button } from "@/components/ui/button"
import { Todo } from "@/types"

interface TodoItemProps {
  todo: Todo
  toggleTodo: (id: number) => void
  deleteTodo: (id: number) => void
  onShowDetails: (todo: Todo) => void
}

function TodoItem({ todo, toggleTodo, deleteTodo, onShowDetails }: TodoItemProps) {
  return (
    <li className="flex items-center justify-between p-4 rounded-lg transition-all duration-200 hover:shadow-sm animate-in fade-in slide-in-from-bottom-1 group">
      <div className="flex items-center gap-3 flex-1">
        <button 
          onClick={() => toggleTodo(todo.id)}
          className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 
            ${todo.completed ? 'bg-primary border-primary text-white' : 'border-border hover:border-primary focus:ring-1 focus:ring-primary focus:ring-offset-1'}`}
          aria-label={todo.completed ? "标记为未完成" : "标记为已完成"}
        >
          {todo.completed && <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>}
        </button>
        <span className={`transition-all duration-200 ease-in-out ${todo.completed ? 'text-muted-foreground line-through opacity-70' : 'text-foreground font-medium'}`}>
          {todo.text}
        </span>
      </div>
      <Button
        onClick={() => onShowDetails(todo)}
        variant="outline"
        size="sm"
        className="opacity-70 transition-all duration-200 hover:opacity-100 hover:scale-105 hover:shadow-md active:scale-95 mr-2"
        >
        详情
      </Button>
      <Button 
        onClick={() => deleteTodo(todo.id)}
        variant="destructive" 
        size="sm"
        className="opacity-70 transition-all duration-200 hover:opacity-100 hover:scale-105 hover:shadow-md active:scale-95"
      >
        删除
      </Button>
      
    </li>
  )
}

export default TodoItem;
