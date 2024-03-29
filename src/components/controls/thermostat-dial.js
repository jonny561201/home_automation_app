import React, { useState, useEffect } from 'react';
import { RadialSlider } from 'react-native-radial-slider';


export default function ThermostatDial(props) {
    const [color, setColor] = useState('#db5127');
    const [desiredTemp, setDesiredTemp] = useState(props.desiredTemp);

    useEffect(() => {
        calculateColor(props.desiredTemp);
    }, []);

    const calculateColor = (value) => {
        //55 = #3DA3C5
        //60 = #5497AE
        //65 = #6A8B98
        //70 = #817F81
        //75 = #97746B
        //80 = #AE6854
        //85 = #C45D3E

        if (value < 53)
            setColor('#27AEDB');
        else if (value <= 57)
            setColor('#3DA3C5');
        else if (value <= 60)
            setColor('#5497AE');
        else if (value <= 63)
            setColor('#6A8B98');
        else if (value <= 66)
            setColor('#817F81');
        else if (value <= 69)
            setColor('#97746B');
        else if (value <= 74)
            setColor('#AE6854');
        else if (value <= 78)
            setColor('#C45D3E');
        else if (value >= 82)
            setColor('#db5127');
    }

    const updateChange = (value) => {
        props.onChange(value);
        setDesiredTemp(value);
        calculateColor(value);
    }

    return (
        <RadialSlider
            value={desiredTemp}
            min={50}
            max={90}
            // disabled={props.disabled}
            onChange={updateChange}
            // onComplete={knobChange}
            unit="&deg;"
            sliderWidth={30}
            lineSpace={3}
            thumbColor='white'
            markerLineSize={20}
            isHideSubtitle={true}
            isHideButtons={true}
            valueStyle={{ fontSize: 70, paddingLeft: 20, color: props.color }}
            unitStyle={{ fontSize: 40 }}
            linearGradient={[{ offset: '0%', color: '#27aedb' }, { offset: '100%', color: color }]}
        />
    )
}