import Main from "./pages/Main/Main";
import Map from "./pages/Map/Map";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Start from "./pages/Start/Start";

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Start"
                    component={Start}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen name="Main" component={Main} />
                <Stack.Screen name="Map" component={Map} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
