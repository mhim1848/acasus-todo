import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoType from '@/types/TodoType';

interface TodoContextType {
    todos: TodoType[];
    getTodo: (id: string) => boolean;
    addTodo: (todo: TodoType) => Promise<void>;
    updateTodo: (id: string, updatedTodo: Partial<TodoType>) => Promise<void>;
    deleteTodo: (id: string) => Promise<void>;
}

const TODOS_STORAGE_KEY = '@acasus_todos_list';

export const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
    const [todos, setTodos] = useState<TodoType[]>([]);

    useEffect(() => {
        const loadTodos = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem(TODOS_STORAGE_KEY);
                if (jsonValue != null) {
                    const parsed = JSON.parse(jsonValue);
                    const formatted = parsed.map((t: any) => ({
                        ...t,
                        dueDate: t.dueDate ? new Date(t.dueDate) : undefined
                    }));
                    setTodos(formatted);
                }
            } catch (error) {
                console.error("Failed to load todos", error);
            }
        };
        loadTodos();
    }, []);

    const saveAndSetTodos = async (newTodos: TodoType[]) => {
        setTodos(newTodos);
        await AsyncStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(newTodos));
    };

    const getTodo = (id: string) => {
        return !!todos.find(todo => todo.id === id);
    };

    const addTodo = async (todo: TodoType) => {
        const newTodos = [...todos, todo];
        await saveAndSetTodos(newTodos);
    };

    const updateTodo = async (id: string, updatedFields: Partial<TodoType>) => {
        const newTodos = todos.map(todo =>
            todo.id === id ? { ...todo, ...updatedFields } : todo
        );
        await saveAndSetTodos(newTodos);
    };

    const deleteTodo = async (id: string) => {
        const newTodos = todos.filter(todo => todo.id !== id);
        await saveAndSetTodos(newTodos);
    };

    return (
        <TodoContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo, getTodo }}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodos = () => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error("useTodos must be used within a TodoProvider");
    }
    return context;
};