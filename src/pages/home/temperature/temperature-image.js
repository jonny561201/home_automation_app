import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image } from 'react-native';
import { useTheme } from 'react-native-paper';
import { isDayLight } from '../../../utilities/services';
import { useInterval } from '../../../utilities/use-interval';
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
import styles from './temperature-image.styles';


export default function TemperatureImage() {
    const theme = useTheme();
    const [state,] = useContext(Context);
    const [isNight, setIsNight] = useState(false);
    const [weatherIcon, setWeatherIcon] = useState();

    useEffect(() => {
        setIsNight(!isDayLight(state.garageCoords, state.userCoords));
        getWeatherImage();
    });

    useInterval(() => {
        setIsNight(!isDayLight(state.garageCoords, state.userCoords));
        getWeatherImage();
    }, 20000);

    const weatherTypes = {
        "light intensity drizzle": DrizzleIcon, "drizzle": DrizzleIcon, "drizzle rain": DrizzleIcon, "heavy intensity drizzle": DrizzleIcon, "mist": MistIcon,
        "light intensity drizzle rain": DrizzleIcon, "shower drizzle": DrizzleIcon, "light rain": LightRainIcon, "moderate rain": LightRainIcon, "broken clouds": MostlyCloudyIcon,
        "heavy intensity rain": HeavyRainIcon, "very heavy rain": HeavyRainIcon, "extreme rain": HeavyRainIcon, "shower rain": HeavyRainIcon, "light snow": LightSnowIcon,
        "heavy intensity shower rain": HeavyRainIcon, "clear sky": ClearIcon, "few clouds": PartlyCloudyIcon, "scattered clouds": PartlyCloudyIcon, "snow": LightSnowIcon,
        "heavy snow": SnowyIcon, "sleet": SnowyIcon, "few clouds night": PartlyCloudNightIcon, "clear sky night": ClearNightIcon, "scattered clouds night": PartlyCloudNightIcon,
        "broken clouds night": MostlyCloudyNightIcon,
    };

    const getWeatherImage = () => {
        const weatherDesc = state.forecastData?.description?.toLowerCase();
        const weatherType = isNight ? `${weatherDesc} night` : weatherDesc;
        if (weatherDesc.includes("thunderstorm")) {
            setWeatherIcon(ThunderstormIcon);
        } else if (weatherType in weatherTypes) {
            setWeatherIcon(weatherTypes[weatherType]);
        } else {
            setWeatherIcon(CloudyIcon);
        }
    }

    return (
        <View style={styles.tempContainer}>
            <View style={styles.tempExternalContainer}>
                <Image style={styles.weatherIcon} alt="description" source={weatherIcon} />
                <View style={styles.externalTemp}>
                    <Text style={{color: theme.colors.secondaryFont}}>{state.forecastData.maxTemp}</Text>
                    <Text style={[styles.external, {color: theme.colors.primaryFont}]}>{state.forecastData.temp}&deg;</Text>
                    <Text style={{color: theme.colors.secondaryFont}}>{state.forecastData.minTemp}</Text>
                </View>
            </View>
            <View style={styles.tempHomeContainer}>
                <Image style={styles.homeIcon} alt="home" source={HomeIcon} />
                <Text style={[styles.internalTemp, {color: theme.colors.primaryFont}]}>72&deg;</Text>
            </View>
        </View>
    );
}