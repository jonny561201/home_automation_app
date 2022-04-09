import { View, Text } from 'react-native';
import Accordian from '../../components/Accordion';
import styles from './Home.styles';
import Header from '../../header/Header';


export default function Home(props) {
    return (
        <>
            <View style={styles.pageContainer} >
                <Header toggleMenu={props.navigation.toggleDrawer}></Header>
            </View>
            <View>
                <Accordian>
                    <Text>This fucking sucks</Text>
                    <Text>really big piece of shit</Text>
                </Accordian>
            </View>
        </>
    )
}