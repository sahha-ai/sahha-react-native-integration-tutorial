import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import Index from './screens/Index';
import Sahha, { SahhaEnvironment, SahhaSensor } from 'sahha-react-native';

const Stack = createNativeStackNavigator();

const screenOptions: NativeStackNavigationOptions = {
  headerTitleAlign: 'center',
  headerBackTitleVisible: false,
};

const sahhaSettings = {
  environment: SahhaEnvironment.sandbox, // Required -  .sandbox for testing
  // Optional - Android only
  // notificationSettings: {
  //   icon: 'ic_test',
  //   title: 'Test Title',
  //   shortDescription: 'Test description.',
  // },
  sensors: [SahhaSensor.pedometer], // Optional - defaults to all sensors
};

function App(): JSX.Element {
  const [sahhaConfigured, setSahhaConfigured] = useState(false);

  useEffect(() => {
    Sahha.configure(sahhaSettings, (error, success) => {
      console.log(`Sahha configuration success: ${success}`);
      setSahhaConfigured(success);

      if (error) {
        console.log(`Sahha configuration error: ${error}`);
      }
    });
  }, []);

  if (!sahhaConfigured) return <></>;

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="Index"
          component={Index}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
