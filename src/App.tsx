import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import Index from './screens/Index';
import Sahha, { SahhaEnvironment, SahhaSensor } from 'sahha-react-native';
import Analyze from './screens/Analyze';

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
  useEffect(() => {
    Sahha.configure(sahhaSettings, (error, success) => {
      console.log(`Sahha configuration success: ${success}`);

      if (error) {
        console.log(`Sahha configuration error: ${error}`);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="Index"
          component={Index}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Analyze" component={Analyze} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
