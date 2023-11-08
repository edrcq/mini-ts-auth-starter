import { Todo } from "@/types/todo.type";
import { db } from "../mongo";

export const Todos = db!.collection<Todo>('todos')
