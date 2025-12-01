import { useState } from "react";
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
interface AddTodoProps {
    addTodo: (text: string) => void
}

function AddTodo({ addTodo }: AddTodoProps) {
  const [text, setText] = useState('');
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (text.trim() === '') {
        return 
    }
    addTodo(text)
    setText('')
  };
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        className="flex-1"
        placeholder="添加新的待办事项……"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button
      className="transition-all hover:scale-105 active:scale-95 duration-200">新建事项</Button>
    </form>
  )
}

export default AddTodo;
