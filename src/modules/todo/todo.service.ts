import { Todos } from "@/db/models/Todo";
import { Todo } from "@/types/todo.type";
import { ObjectId, WithId } from "mongodb";

export async function getAll(): Promise<WithId<Todo>[]> {
    return Todos.find({}).toArray()
}

export async function getById(id: string): Promise<WithId<Todo> | null> {
    return Todos.findOne({ _id: new ObjectId(id) })
}

export async function create(label: string): Promise<string> {
    const inserted = await Todos.insertOne({
        label,
        done: false,
        createdAt: new Date()
    })
    if (inserted.insertedId) {
        return inserted.insertedId.toString()
    } else {
        throw new Error(`Document wasn't inserted.`)
    }
}

export async function replace(id: string, todo: Todo): Promise<number> {
    const todoWithId = { _id: new ObjectId(id), ...todo }
    const updated = await Todos.updateOne({ _id: new ObjectId(id) }, todoWithId)
    return updated.modifiedCount
}

export async function update(id: string, todo: Partial<Todo>): Promise<number> {
    const updated = await Todos.updateOne({ _id: new ObjectId(id) }, { $set: { ...todo }})
    return updated.modifiedCount
}

export async function remove(id: string): Promise<number> {
    const removed = await Todos.deleteOne({ _id: new ObjectId(id) })
    return removed.deletedCount;
}

