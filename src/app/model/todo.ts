
export class Todo {
    id: number;
    title: string;
    goal_id: number;
    goal_title: string;
    duration: number;
    deadline: Date;
    history: string;
    completed: boolean;
    eliminated: boolean;
    _simplifyingTodo: boolean;
    _automatingTodo: boolean;
    _editText: string;
    _open = false;
    _options = false;
    _sedaMessage: string;
    _sedaMessageType: string;
}
