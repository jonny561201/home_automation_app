import { View } from 'react-native';
import Header from '../../header/Header';
import styles from './Home.styles';
import BasementPanel from './panels/BasementPanel';
import GaragePanel from './panels/GaragePanel';


export default function Home(props) {
    return (
        <>
            <View style={styles.pageContainer} >
                <Header toggleMenu={props.navigation.toggleDrawer}></Header>
            </View>
            <View>
                <GaragePanel/>
                <BasementPanel/>
            </View>
        </>
    )
}