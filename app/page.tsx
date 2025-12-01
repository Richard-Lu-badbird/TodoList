"use client"
import AddTodo from "@/components/AddTodo";
import TodoFilter from "@/components/TodoFilter";
import TodoList from "@/components/TodoList";
import {Card} from "@/components/ui/card"
import { Todo, Filter } from "@/types";
import Image from "next/image";
import { useState } from "react";


export default function Home() {

  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<Filter>('all')
  const addTodo = (text: string) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false
    }
    setTodos([...todos, newTodo])
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    }))
  }

  const getFilteredTodos = () => {
    switch (filter) {
      case 'completed':
        return todos.filter(todo => todo.completed)
      case 'active':
        return todos.filter(todo => !todo.completed)
      default:
        return todos
    }
  }

  const completedCount = todos.filter(todo => todo.completed).length
  const activeCount = todos.length - completedCount
  const counts = {
    all: todos.length,
    active: activeCount,
    completed: completedCount
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <Card className="w-full max-w-4xl p-6 space-y-4 rounded-xl shadow-lg bg-white">
        {/* <div className="flex justify-between item-center">
          <div className="flex-1 text-center ">
            <h1 className="textt-2xl font-semibold">TodoList</h1>
          </div>
          <h2 className="text-sm text-muted-foreground whitespace-nowrap">
            Made by Richard
          </h2>
        </div> */}
        <div className="relative flex items-center" >
          <h1 className="absolute inset-x-0 text-center text-2xl font-semibold">
            TodoList

          </h1>
          <div className=" flex ml-auto whitespace-nowrap items-center">
            <h2 className="text-sm text-muted-foreground whitespace-nowrap inline">
              Made by @Richard
            </h2>
            <Image
              src="/richardLOGO.JPG"
              alt="Auther Logo"
              width={20}
              height={20}
              className="ml-2"
            />
            </div>
        </div>
        <AddTodo addTodo={addTodo}></AddTodo>
        <TodoList todos={getFilteredTodos()} deleteTodo={deleteTodo} toggleTodo={toggleTodo} ></TodoList>
        <TodoFilter counts={counts} filter={filter} setFilter={setFilter}></TodoFilter>
      </Card>
    </div>
  );
}
