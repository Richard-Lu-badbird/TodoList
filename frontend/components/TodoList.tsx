import { useEffect, useMemo, useState } from "react"
import { Todo } from "@/types";
import TodoItem from "./TodoItem";
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import TodoDetailsDialog from "./TodoDetailsDialog"

interface TodoListProps {
  todos: Array<Todo>;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (payload: {
    id: number;
    text?: string;
    completed?: boolean;
    startTime?: Date | null;
    endTime?: Date | null;
  }) => void;
}

function TodoList({ todos, toggleTodo, deleteTodo, updateTodo }: TodoListProps) {
  const RESET_DIALOG_DELAY = 200 // wait for close animation
  const PAGE_SIZE = 5
  const ITEM_SLOT_HEIGHT = 72
  const [currentPage, setCurrentPage] = useState(1)
  const [detailTodo, setDetailTodo] = useState<Todo | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  const totalPages = Math.max(1, Math.ceil(todos.length / PAGE_SIZE))
  const paginatedTodos = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return todos.slice(start, start + PAGE_SIZE)
  }, [todos, currentPage])

  useEffect(() => {
    // 当 todos 变化（新增/删除/切换过滤）时，如果当前页超出范围，回退到最后一页
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  const handlePrev = () => setCurrentPage((p) => Math.max(1, p - 1))
  const handleNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1))
  const openDetails = (todo: Todo) => {
    setDetailTodo(todo)
    setDetailOpen(true)
  }


  return (
    <div className="w-full">
      <Card className="w-full">
        <ul
          className="flex flex-col gap-2"
          style={{ minHeight: PAGE_SIZE * ITEM_SLOT_HEIGHT }}
        >
          {paginatedTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              onShowDetails={openDetails}
            ></TodoItem>
          ))}
        </ul>
        <TodoDetailsDialog
          detailOpen={detailOpen}
          detailTodo={detailTodo}
          updateTodo={updateTodo}
          onOpenChange={(open) => {
            setDetailOpen(open)
            if (!open) {
              setTimeout(() => setDetailTodo(null), RESET_DIALOG_DELAY)
            }
          }}
        />
        
          <div className="flex w-full justify-end items-center gap-4 px-4 pb-4 pt-2 text-sm text-muted-foreground">
            <div className="text-xs md:text-sm">
              第 {currentPage} / {totalPages} 页
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="px-3 bg-slate-300 text-slate-800 hover:bg-slate-200 disabled:opacity-20"
                onClick={handlePrev}
                disabled={currentPage === 1}
              >
                上一页
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="px-3 bg-slate-300 text-slate-800 hover:bg-slate-200 disabled:opacity-20"
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                下一页
              </Button>
            </div>
          </div>
      </Card>
    </div>
  );
}
export default TodoList;
