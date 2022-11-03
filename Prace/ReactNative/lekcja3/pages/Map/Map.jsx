import { useRoute } from "@react-navigation/native";
import MapView from "react-native-maps";

function Map() {
    const route = useRoute();
    return (
        <MapView
            style={{ flex: 1 }}
            initialRegion={{
                latitude: 50.111,
                longitude: 20.111,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
            }}
        >
            {route.params.checked.map((e, i) => (
                <MapView.Marker
                    key={i}
                    coordinate={{
                        latitude: e.latitude,
                        longitude: e.longitude,
                    }}
                />
            ))}
        </MapView>
    );
}
export default Map;
