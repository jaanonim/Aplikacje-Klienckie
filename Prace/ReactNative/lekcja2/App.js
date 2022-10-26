import AdminList from "./pages/AdminList/AdminList";
import Register from "./pages/Register/Register";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Theme from "./Theme";
import AdminDetail from "./pages/AdminDetail/AdminDetail";

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="AdminList"
                    component={AdminList}
                    options={{
                        headerStyle: {
                            backgroundColor: Theme.darkPrimary,
                        },
                        headerTintColor: Theme.text,
                    }}
                />
                <Stack.Screen
                    name="AdminDetail"
                    component={AdminDetail}
                    options={{
                        headerStyle: {
                            backgroundColor: Theme.darkPrimary,
                        },
                        headerTintColor: Theme.text,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
