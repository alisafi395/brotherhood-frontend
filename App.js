import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./navigation/AuthStack";
import { UserProvider } from "./context/UserContext";

export default function App() {
  return (
     <UserProvider>
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
    </UserProvider>
  );
}
