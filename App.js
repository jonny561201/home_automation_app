// import { useColorScheme } from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import "react-native-gesture-handler";
import Home from "./src/pages/home/Home";
import Settings from "./src/pages/settings/settings";
import Store from './src/state/Store';


const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Store>
      <NavigationContainer>
        <Drawer.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Settings" component={Settings} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Store>
  );
}