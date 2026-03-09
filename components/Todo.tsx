import {Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import TodoType from '@/types/TodoType';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons'; // 1. Import icons
import { useTodos } from '@/context/TodoContext';

const Todo = (props: TodoType) => {
    const router = useRouter();
    const { updateTodo } = useTodos();

    const handlePress = () => {
        router.push({
            pathname: `/tasks/[id]`,
            params: {
                id: props.id,
                title: props.title,
                description: props.description,
                priority: props.priority,
                dueDate: props.dueDate ? props.dueDate.toISOString() : undefined
            }
        })
    };

    const toggleCompletion = async () => {
        await updateTodo(props.id, { isCompleted: !props.isCompleted });
    };

    return (
        <TouchableOpacity
            className='bg-accent rounded-xl p-4 mb-4 mx-2 shadow-sm border border-accent elevation-sm w-[90%] self-center'
            onPress={handlePress}>
            <View className="flex-row justify-between items-start mb-2">

                <View className="flex-row flex-1 items-start pr-3">
                    <TouchableOpacity onPress={toggleCompletion} className="mr-3">
                        <Feather
                            name={props.isCompleted ? "check-square" : "square"}
                            size={22}
                            color={props.isCompleted ? "#10b981" : "#9ca3af"}
                        />
                    </TouchableOpacity>

                    <Text
                        className={`text-lg font-bold flex-1 ${
                            props.isCompleted
                                ? 'text-gray-500 line-through'
                                : 'text-gray-800'
                        }`}
                    >
                        {props.title}
                    </Text>
                </View>

                <View className="bg-accent px-2 py-1 rounded-md">
                    <Text className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        {props.priority ? props.priority : 'low'}
                    </Text>
                </View>
            </View>

            {props.description ? (
                <Text className={`text-sm text-gray-500 leading-5 mb-3 ${props.isCompleted ? 'text-gray-400 line-through' : 'text-gray-500'}`}>
                    {props.description}
                </Text>
            ) : null}

            {props.dueDate ? (
                <View className="flex-row justify-between items-center mt-1 pt-3 border-t border-primary">
                    <Text className="text-xs font-medium text-gray-400">
                        Due: {props.dueDate.toLocaleDateString()}
                    </Text>
                </View>
            ) : null}
        </TouchableOpacity>
    )
}

export default Todo;