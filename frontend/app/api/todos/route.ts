import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
  startTime: Date;
  endTime?: Date
};

let todosCache: Todo[] | null = null;

const loadInitialTodos = (): Todo[] => {
  if (todosCache) return todosCache;

  const filePath = path.resolve(process.cwd(), "public/mockData.json");

  try {
    const data = fs.readFileSync(filePath, "utf-8");
    todosCache = JSON.parse(data);
  } catch (error) {
    console.error("Error reading mock data:", error);
    todosCache = [];
  }

  return todosCache!;
};

const persistTodos = (todos: Todo[]) => {
  const filePath = path.resolve(process.cwd(), "public/mockData.json");
  try {
    fs.writeFileSync(filePath, JSON.stringify(todos, null, 4), "utf-8");
  } catch (error) {
    console.error("Error writing mock data:", error);
    throw error;
  }
};

export async function GET() {
  const todos = loadInitialTodos();
  return NextResponse.json(todos);
}

export async function POST(req: NextRequest) {
  const { text, completed = false } = await req.json();

  if (!text || typeof text !== "string") {
    return NextResponse.json(
      { error: "text 为必填字符串" },
      { status: 400 }
    );
  }

  const todos = loadInitialTodos();
  const newTodo: Todo = { id: Date.now(), text, completed: Boolean(completed), startTime: new Date() };

  todos.push(newTodo);
  todosCache = todos;
  persistTodos(todos);

  return NextResponse.json(newTodo, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const { id, text, completed } = await req.json();
  console.log("id is: ", id)
  if (typeof id !== "number") {
    return NextResponse.json(
      { error: "id 为必填数字" },
      { status: 400 }
    );
  }

  const todos = loadInitialTodos();
  const target = todos.find((t) => t.id === id);

  if (!target) {
    return NextResponse.json({ error: "未找到对应待办" }, { status: 404 });
  }

  if (text !== undefined) target.text = text;
  if (completed !== undefined) target.completed = Boolean(completed);

  todosCache = todos;
  persistTodos(todos);

  return NextResponse.json(target);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  if (typeof id !== "number") {
    return NextResponse.json(
      { error: "id 为必填数字" },
      { status: 400 }
    );
  }

  const todos = loadInitialTodos();
  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "未找到对应待办" }, { status: 404 });
  }

  const [deleted] = todos.splice(index, 1);
  todosCache = todos;
  persistTodos(todos);

  return NextResponse.json(deleted);
}
