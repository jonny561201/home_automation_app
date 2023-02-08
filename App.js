import "react-native-gesture-handler";
import Store from './src/state/store';
import Main from "./src/main";


export default function App() {
    return (
        <Store>
            <Main/>
        </Store>
    );
}