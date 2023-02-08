import { useContext } from 'react';
import { Context } from './state/store'
import { Provider } from "react-native-paper";
import { DarkTheme, DefaultTheme } from 'react-native-paper';
import Routes from "./routes/routes";


export default function Main() {
    const [state, _] = useContext(Context);

    return (
        <Provider theme={state.isDarkMode ? DarkTheme : DefaultTheme}>
            <Routes />
        </Provider>
    )
}