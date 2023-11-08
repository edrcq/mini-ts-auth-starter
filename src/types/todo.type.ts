export interface Todo {
    label: string
    createdAt: Date
    done: boolean
}

export interface BodyCreateTodo {
    label: string
}
