import { useState } from "react";
import { VStack, Checkbox, Text, Button, Input } from "@chakra-ui/react";

const TodoItem = ({ todo, onChange, onRemove }) => {
    const handleOnChange = () => {
        onChange(todo.id);
    };

    const handleRemoveClick = () => {
        onRemove(todo.id);
    };

    return (
        <Checkbox isChecked={todo.completed} onChange={handleOnChange}>
            <Text as={todo.completed ? "s" : ""}>{todo.title}</Text>
            <Button variant="ghost" size="sm" onClick={handleRemoveClick}>
                Remove
            </Button>
        </Checkbox>
    );
};

const TodoList = ({ todos, onChange, onAdd, onRemove }) => {
    const [newTodo, setNewTodo] = useState("");

    const handleAddClick = () => {
        console.log("Adding new todo:", newTodo);
        if (newTodo.trim()) {
            console.log("New todo is not empty, adding to list...");
            onAdd(newTodo);
            setNewTodo("");
        }
        console.log("Current todos:", todos);
    };


    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleAddClick();
        }
    };

    return (
        <VStack spacing={2} align="stretch">
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onChange={onChange}
                    onRemove={onRemove}
                />
            ))}
            <Input
                placeholder="Add a new todo"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={handleKeyPress}
            />
            <Button size="sm" onClick={handleAddClick}>
                Add
            </Button>
        </VStack>
    );
};

export default TodoList;
