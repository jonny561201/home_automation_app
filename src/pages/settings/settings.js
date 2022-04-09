import { Text } from 'react-native';
import Header from '../../header/Header';


export default function Settings(props) {
    return (
        <>
            <Header toggleMenu={props.navigation.toggleDrawer}></Header>
            <Text>Settings</Text>
            <Text>Isnt it beautiful?</Text>
        </>
    )
}