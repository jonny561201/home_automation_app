import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image } from 'react-native';
import { isDayLight } from '../../../utilities/services';
// import { useInterval } from '../../../utilities/UseInterval';
import { Context } from '../../../state/store';
import ClearIcon from '../../../resources/weatherIcons/sunny.png';
import DrizzleIcon from '../../../resources/weatherIcons/drizzle.png';
import CloudyIcon from '../../../resources/weatherIcons/cloudy.png';
import PartlyCloudyIcon from '../../../resources/weatherIcons/partly_cloudy.png';
import PartlyCloudNightIcon from '../../../resources/weatherIcons/partly_cloudy_night.png';
import MostlyCloudyIcon from '../../../resources/weatherIcons/mostly_cloudy.png';
import MostlyCloudyNightIcon from '../../../resources/weatherIcons/mostly_cloudy_night.png';
import SnowyIcon from '../../../resources/weatherIcons/heavy_snow.png';
import LightSnowIcon from '../../../resources/weatherIcons/light_snow.png';
import LightRainIcon from '../../../resources/weatherIcons/light_rain.png';
import HeavyRainIcon from '../../../resources/weatherIcons/heavy_rain.png';
import ThunderstormIcon from '../../../resources/weatherIcons/thunderstorm.png';
import HomeIcon from '../../../resources/weatherIcons/home.png';
import ClearNightIcon from '../../../resources/weatherIcons/clear_night.png';
import MistIcon from '../../../resources/weatherIcons/misty.png';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './temperature-image.styles';
import MaskedView from '@react-native-community/masked-view';


export default function TemperatureImage() {
    const [state,] = useContext(Context);
    const [isNight, setIsNight] = useState(false);
    const [weatherIcon, setWeatherIcon] = useState();
    // const [weatherDesc, setWeatherDesc] = useState("");

    useEffect(() => {
        setIsNight(!isDayLight(state.garageCoords, state.userCoords));
        getWeatherImage();
    });

    // useInterval(() => {
    //     setIsNight(!isDayLight(state.garageCoords, state.userCoords));
    //     getWeatherImage();
    // }, 20000);

    const weatherTypes = {
        "light intensity drizzle": DrizzleIcon, "drizzle": DrizzleIcon, "drizzle rain": DrizzleIcon, "heavy intensity drizzle": DrizzleIcon, "mist": MistIcon,
        "light intensity drizzle rain": DrizzleIcon, "shower drizzle": DrizzleIcon, "light rain": LightRainIcon, "moderate rain": LightRainIcon, "broken clouds": MostlyCloudyIcon,
        "heavy intensity rain": HeavyRainIcon, "very heavy rain": HeavyRainIcon, "extreme rain": HeavyRainIcon, "shower rain": HeavyRainIcon, "light snow": LightSnowIcon,
        "heavy intensity shower rain": HeavyRainIcon, "clear sky": ClearIcon, "few clouds": PartlyCloudyIcon, "scattered clouds": PartlyCloudyIcon, "snow": LightSnowIcon,
        "heavy snow": SnowyIcon, "sleet": SnowyIcon, "few clouds night": PartlyCloudNightIcon, "clear sky night": ClearNightIcon, "scattered clouds night": PartlyCloudNightIcon,
        "broken clouds night": MostlyCloudyNightIcon,
    };

    // const getWeatherLabel = (weather) => {
    //     console.log(`weather label: ${weather}`)
    //     return weather.replace(/_/g, " ").replace(".png", "");
    // }

    const getWeatherImage = () => {
        const weatherDesc = state.forecastData?.description?.toLowerCase();
        // console.log(`weather desc: ${weatherDesc}`)
        const weatherType = isNight ? `${weatherDesc} night` : weatherDesc;
        // console.log(`weather type: ${weatherType}`)
        if (weatherDesc.includes("thunderstorm")) {
            setWeatherIcon(ThunderstormIcon);
            // setWeatherDesc("thunderstorms");
        } else if (weatherType in weatherTypes) {
            setWeatherIcon(weatherTypes[weatherType]);
            // setWeatherDesc(getWeatherLabel(weatherTypes[weatherType]));
        } else {
            setWeatherIcon(CloudyIcon);
            // setWeatherDesc("cloudy");
        }
    }

    return (
        <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center', margin: 0 }}>
            <View style={styles.tempExternalContainer}>
                <Image style={styles.weatherIcon} alt="description" source={ClearIcon} />
                <View style={styles.externalTemp}>
                    {/* <MaskedView
                        style={{ height: 24 }}
                        maskElement={<Text>51</Text>}
                    >
                        <LinearGradient
                            colors={['red', 'blue']}
                            start={{ x: 1, y: 1 }}
                            end={{ x: 0, y: 0.33 }}
                            style={{ flex: 1 }}
                        />
                    </MaskedView> */}
                    <Text>51</Text>
                    <Text style={styles.external}>45&deg;</Text>
                    <Text>37</Text>
                    {/*<Text style={styles.minMax}>{state.forecastData.maxTemp}</Text>*/}
                    {/*<Text style={styles.external}>{state.forecastData.temp}&deg;</Text>*/}
                    {/*<Text style={styles.minMax}>{state.forecastData.minTemp}</Text>*/}
                </View>
            </View>
            <View style={styles.tempHomeContainer}>
                <Image style={styles.homeIcon} alt="home" source={HomeIcon} />
                <Text style={styles.internalTemp}>72&deg;</Text>
            </View>
        </View>
    );
}