import { useContext } from 'react';
import { Context } from './state/store'
import { Provider } from "react-native-paper";
import { DarkTheme, DefaultTheme } from 'react-native-paper';
import { darkTheme } from '../constants/Colors';
import Routes from "./routes/routes";


export default function Main() {
    const [state, _] = useContext(Context);

    return (
        <Provider theme={state.isDarkMode ? darkTheme : DefaultTheme}>
            <Routes />
        </Provider>
    )
}