"use client"
import AddTodo from "@/components/AddTodo";
import TodoFilter from "@/components/TodoFilter";
import TodoList from "@/components/TodoList";
import {Card} from "@/components/ui/card"
import { Todo, Filter } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";


export default function Home() {

  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<Filter>('all')
  const [loading, setLoading] = useState<boolean>(false)

  const orderTodos = () => {
    
  }
  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/todos")
        if (!res.ok) throw new Error("加载待办失败")
        const data: Todo[] = await res.json()
        setTodos(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchTodos()
  }, [])


  const addTodo = async (text: string) => {
    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      })

      if (!res.ok) throw new Error("新增待办失败")

      const newTodo: Todo = await res.json()
      setTodos((prev) => [...prev, newTodo])
    } catch (err) {
      console.error(err)
    }
  }

  const deleteTodo = async (id: number) => {
    try {
      const res = await fetch("/api/todos", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      if (!res.ok) throw new Error("删除待办失败")

      setTodos((prev) => prev.filter((todo) => todo.id !== id))
    } catch (err) {
      console.error(err)
    }
  }
  const toggleTodo = async (id: number) => {
    try {
      const target = todos.find((t) => t.id === id)
      if (!target) return

      const res = await fetch("/api/todos", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, completed: !target.completed }),
      })

      if (!res.ok) throw new Error("更新待办失败")

      const updated: Todo = await res.json()
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updated : todo))
      )
    } catch (err) {
      console.error(err)
    }
  }

  // const getFilteredTodos = () => {
  //   const sorted = [...todos].sort((a, b) => b.id - a.id) // 按创建时间（id 越大越新）从新到旧
  //   switch (filter) {
  //     case 'completed':
  //       return sorted.filter(todo => todo.completed)
  //     case 'active':
  //       return sorted.filter(todo => !todo.completed)
  //     default:
  //       return sorted
  //   }
  // }
  const getFilteredTodos = () => {
    //按照创建时间（id越大越新），从新到旧
    const sorted = [...todos].sort((a, b) => b.id - a.id)
    switch (filter) {
      case 'completed':
        return sorted.filter(todo => todo.completed)
      case 'active':
        return sorted.filter(todo => !todo.completed)
      default:
        return sorted
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
