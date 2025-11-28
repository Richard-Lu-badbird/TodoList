"use client"
import AddTodo from "@/components/AddTodo";
import TodoFilter from "@/components/TodoFilter";
import TodoList from "@/components/TodoList";
import {Card} from "@/components/ui/card"
import { Todo } from "@/types";
import Image from "next/image";
import { useState } from "react";


export default function Home() {

  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState('all')
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

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <Card className="w-full max-w-2xl p-6 space-y-4 rounded-xl shadow-lg bg-white">
        <h1 className="text-center text-2xl font-semibold">TodoList</h1>
        <AddTodo addTodo={addTodo}></AddTodo>
        <TodoList todos={getFilteredTodos()} deleteTodo={deleteTodo} toggleTodo={toggleTodo} ></TodoList>
        <TodoFilter setFilter={setFilter}></TodoFilter>
      </Card>
    </div>
  );
}