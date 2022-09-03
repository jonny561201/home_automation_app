// import { useColorScheme } from "react-native";
import "react-native-gesture-handler";
import Store from './src/state/Store';
import Routes from "./src/routes/routes";


export default function App() {
    return (
        <Store>
            <Routes />
        </Store>
    );
}