import { Stack } from 'expo-router'
import React from 'react'

const _Layout = () => {
  return (
        <Stack>
          <Stack.Screen name="[id]" options={{
            headerShown: false,
            title: 'Tasks'
          }} />
        </Stack>
  )
}

export default _Layout