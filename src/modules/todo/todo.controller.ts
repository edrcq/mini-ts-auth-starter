import { BodyCreateTodo, Todo } from "@/types/todo.type";
import { Express, Request, Response } from "express";
import { create, getAll, getById, replace, update } from "./todo.service";

export function registerTodoRoutes(app: Express) {
    
    // .                                        TypeParams, TypeQuery, TypeBody
    app.post('/todo', async (req: Request<unknown, unknown, BodyCreateTodo>, res: Response) => {
        const todoId = await create(req.body.label)
        const todo = await getById(todoId)
        res.json({ todo })
    })
    
    app.get('/todos', async (req: Request, res: Response) => {
        const todos = await getAll()
        res.json(todos)
    })
    
    app.get('/todo/:id', async (req: Request<{ id: string }>, res: Response) => {
        const todo = await getById(req.params.id)
        res.json({ todo })
    })
    
    app.put('/todo/:id', async (req: Request<{ id: string }, unknown, Todo>, res: Response) => {
        const replaced = await replace(req.params.id, req.body)
        res.json({ replaced })
    })
    
    app.patch('/todo/:id', async (req: Request<{ id: string }, unknown, Partial<Todo>>, res: Response) => {
        const updated = await update(req.params.id, req.body)
        res.json({ updated })
    })
}
