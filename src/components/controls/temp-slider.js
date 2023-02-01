import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import styles from './temp-slider.sytles';


export default function TempSlider(props) {
    const [value, setValue] = useState(props.value);

    const onSlideComplete = (item) => {
        setValue(item[0]);
        props.slideComplete();
    }

    const trackMark = () => {
        return (
            <View style={{ backgroundColor: '#5e5d5d', width: 1, height: 20, marginLeft: 27.5 }}>
                <View></View>
            </View>
        )
    }

    return (
        <>
            {
                props.hasHvac
                    ? <View>
                        <View style={styles.textContainerFour}>
                            <Text style={[styles.sliderText, { paddingLeft: 20 }]}>Off</Text>
                            <Text style={[styles.sliderText, { paddingLeft: 6 }]}>Heat</Text>
                            <Text style={[styles.sliderText]}>Cool</Text>
                            <Text style={[styles.sliderText, { paddingRight: 20 }]}>Auto</Text>
                        </View>
                        <Slider
                            animateTransitions={true}
                            minimumValue={0}
                            maximumValue={3}
                            minimumTrackTintColor={'#00c774'}
                            step={1}
                            thumbStyle={{ height: 40, width: 60, backgroundColor: 'white', elevation: 5 }}
                            trackStyle={{ height: 40, borderRadius: 10 }}
                            trackMarks={[0, 1, 2, 3]}
                            value={value}
                            onSlidingComplete={onSlideComplete}
                            renderTrackMarkComponent={trackMark}
                        />
                    </View>
                    : <View>
                        <View style={styles.textContainerThree}>
                            <Text style={[styles.sliderText]}>Off</Text>
                            <Text style={[styles.sliderText, {paddingLeft: 10}]}>Heat</Text>
                            <Text style={[styles.sliderText, {paddingLeft: 10}]}>Cool</Text>
                        </View>
                        <Slider
                            animateTransitions={true}
                            minimumValue={0}
                            maximumValue={2}
                            minimumTrackTintColor={'#00c774'}
                            step={1}
                            thumbStyle={{ height: 40, width: 60, backgroundColor: 'white', elevation: 5 }}
                            trackStyle={{ height: 40, borderRadius: 10 }}
                            trackMarks={[0, 1, 2]}
                            value={value}
                            onSlidingComplete={onSlideComplete}
                            renderTrackMarkComponent={trackMark}
                        />
                    </View>
            }

        </>

    )
}