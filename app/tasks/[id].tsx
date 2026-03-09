import {router, useLocalSearchParams} from 'expo-router';
import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import TodoType from '@/types/TodoType';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useTodos} from '@/context/TodoContext';

const TaskManager = () => {
    const { id, title, description, priority, dueDate } = useLocalSearchParams() as unknown as TodoType; // Ugly fix for expo type issue
    const [titleState, setTitle] = useState(title);
    const [descriptionState, setDescription] = useState(description);
    const [priorityState, setPriority] = useState(priority ?? 'low');
    const initialDate = dueDate
        ? new Date(dueDate)
        : new Date();
    const [dueDateState, setDueDate] = useState(initialDate);
    const { addTodo, updateTodo, getTodo, deleteTodo } = useTodos();

    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleDateChange = (event: any, selectedDate?: Date) => {
        if (Platform.OS === 'android') {
            setShowDatePicker(false);
        }

        if (selectedDate) {
            setDueDate(selectedDate);
        }
    };

    const handleSave = async () => {
        if (getTodo(id)) {
            await updateTodo(id, {
                title: titleState,
                description: descriptionState,
                priority: priorityState,
                dueDate: dueDateState
            })
        } else {
            await addTodo({id, title: titleState, description: descriptionState, priority: priorityState, dueDate: dueDateState });
        }
        router.back();
    };

    const handleDelete = async () => {
        await deleteTodo(id);
        router.back();
    }

  return (
      <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1 bg-dark"
      >
          <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40, marginTop: 50 }}>

              <Text className="text-3xl font-bold text-zinc-100 mb-6 mt-4">Edit Task</Text>

              <View className="mb-5">
                  <Text className="text-sm font-semibold text-zinc-300 mb-2">Title</Text>
                  <TextInput
                      className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-base text-zinc-100"
                      value={titleState}
                      onChangeText={setTitle}
                      placeholder="What needs to be done?"
                      placeholderTextColor="#71717a" // Tailwind zinc-500
                  />
              </View>

              <View className="mb-6">
                  <Text className="text-sm font-semibold text-zinc-300 mb-2">Description</Text>
                  <TextInput
                      className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-base text-zinc-100 min-h-[120px]"
                      value={descriptionState}
                      onChangeText={setDescription}
                      placeholder="Add some details..."
                      placeholderTextColor="#71717a"
                      multiline={true}
                      textAlignVertical="top" // Keeps text at the top on Android
                  />
              </View>

              <View className="mb-8">
                  <Text className="text-sm font-semibold text-zinc-300 mb-2">Priority</Text>
                  <View className="flex-row gap-3">
                      {['low', 'standard', 'high'].map((level) => {
                          const isActive = priorityState === level;
                          return (
                              <TouchableOpacity
                                  key={level}
                                  onPress={() => setPriority(level as 'low' | 'standard' | 'high')}
                                  className={`flex-1 py-3 rounded-xl border items-center transition-colors 
                                        ${isActive ? 'bg-primary border-primary' : 'bg-zinc-800 border-zinc-700'}`}
                              >
                                  <Text className={`font-bold uppercase text-xs tracking-wider 
                                        ${isActive ? 'text-white' : 'text-zinc-400'}`}
                                  >
                                      {level}
                                  </Text>
                              </TouchableOpacity>
                          );
                      })}
                  </View>
              </View>

              <View className="mb-8 flex-row justify-between items-center bg-zinc-800/50 p-4 rounded-xl border border-zinc-800">
                  <Text className="text-sm font-semibold text-zinc-300">Due Date</Text>

                  {Platform.OS === 'ios' ? (
                      <View className="flex-row justify-start">
                          <DateTimePicker
                              value={dueDateState}
                              mode="date"
                              display="default"
                              onChange={handleDateChange}
                              themeVariant="dark" // Forces dark mode text for iOS
                          />
                      </View>
                  ) : (
                      // Android: A custom button is needed to show the date picker. I used AI for this, didn't have the means to test on Android.
                      <>
                          <TouchableOpacity
                              onPress={() => setShowDatePicker(true)}
                              className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 items-start"
                          >
                              <Text className="text-zinc-100 text-base">
                                  {dueDateState.toLocaleDateString()}
                              </Text>
                          </TouchableOpacity>

                          {/* The actual Android modal pop-up */}
                          {showDatePicker && (
                              <DateTimePicker
                                  value={dueDateState}
                                  mode="date"
                                  display="default"
                                  onChange={handleDateChange}
                              />
                          )}
                      </>
                  )}
              </View>

              <TouchableOpacity
                  onPress={handleSave}
                  className="bg-primary rounded-xl py-4 items-center shadow-sm"
              >
                  <Text className="text-white font-bold text-lg">Save Changes</Text>
              </TouchableOpacity>

              <TouchableOpacity
                  onPress={handleDelete}
                  className="bg-red-500/10 border border-red-500 rounded-xl py-4 items-center mt-5"
              >
                  <Text className="text-red-500 font-bold text-lg">Delete Task</Text>
              </TouchableOpacity>

          </ScrollView>
      </KeyboardAvoidingView>
  )
}

export default TaskManager;