import Main from "./pages/Main/Main";
import Photo from "./pages/Photo/Photo";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Start from "./pages/Start/Start";
import Camera from "./pages/Camera/Camera";

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
                <Stack.Screen name="Photo" component={Photo} />
                <Stack.Screen name="Camera" component={Camera} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
