import {FlatList, Text, TouchableOpacity, View} from "react-native";
import React from 'react';
import Todo from '@/components/Todo';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import {useTodos} from '@/context/TodoContext';

export default function Index() {
    const router = useRouter();
    const {todos} = useTodos();

    const handleAddTodo = () => {
        router.push({
            pathname: '/tasks/[id]',
            params: {
                id: Date.now().toString(),
            }
        });
    }

  return (
    <View className="bg-dark flex-1 w-full">
        <View className="px-5 pb-10">
            <View className="flex-row justify-between items-center">
                <Text className="text-5xl text-primary font-bold mt-24">Welcome!</Text>
                <TouchableOpacity className="absolute top-20 right-0 bg-primary w-14 h-14 rounded-full items-center justify-center shadow-md elevation-md" onPress={handleAddTodo}>
                    <Feather name="plus" size={30} color="white" />
                </TouchableOpacity>
            </View>
        </View>

        {todos ?
            <FlatList className='w-full' data={todos} renderItem={({item}) => (
                <Todo {...item} />
            )} /> :
            null
        }
    </View>
  );
}
