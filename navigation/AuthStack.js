import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignupScreen from "../screens/SignUpScreen";
import LoginScreen from "../screens/LoginScreen";
import StepScreen1 from "../screens/StepScreen1";
import StepScreen2 from "../screens/StepScreen2";
import StepScreen3 from "../screens/StepScreen3";
import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import StepScreen4 from "../screens/StepScreen4";


const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Step1" component={StepScreen1} />
      <Stack.Screen name="Step2" component={StepScreen2} />
      <Stack.Screen name="Step3" component={StepScreen3} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
