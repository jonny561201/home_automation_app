import { useContext, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { Context } from '../state/store';
import { useInterval } from './use-interval';
import {
    getGarageStatus, getSumpLevels, getCurrentTemperature, getUserPreferences,
    getScheduledTasks, getRefreshedBearerToken, getLightGroups, getUserForecast
} from './rest-api';



export default function StateUtil() {
    const [state, dispatch] = useContext(Context);

    useInterval(async () => {
        await getGarageData();
        // await refreshBearerToken();
    }, 20000);

    useInterval(async () => {
        getTempData();
        getForecastData();
        // getLights();
    }, 60000);

    useInterval(async () => {
        await getSumpData();
        await getPreferences();
    //     await getActivities();
    }, 120000);

    useEffect(() => {
        if (!state.loadedUtils) {
            // getLights();
            getGarageData();
            getSumpData();
            getTempData();
            getForecastData();
            getPreferences();
            // getActivities();
            dispatch({ type: 'SET_LOADED_UTILS', payload: true });
        }
    }, []);

    const getGarageData = async () => {
        const doors = state.garageDoors;
        if (doors) {
            doors.forEach(async (door) => {
                const status = await getGarageStatus(state.user.userId, state.auth.bearer, door.doorId);
                dispatch({ type: 'SET_GARAGE_COORDS', payload: status.coordinates });
                dispatch({ type: 'UPDATE_GARAGE_DOORS', payload: { doorName: door.doorName, doorId: door.doorId, isOpen: status.isGarageOpen, duration: status.statusDuration } });
            });
        }
    };

    const getSumpData = async () => {
        const sump = await getSumpLevels(state.user.userId, state.auth.bearer);
        dispatch({ type: 'SET_SUMP_DATA', payload: { ...sump, currentDepth: sump.currentDepth.toFixed(1), averageDepth: sump.averageDepth.toFixed(1) } });
    }

    const getTempData = async () => {
        const temp = await getCurrentTemperature(state.user.userId, state.auth.bearer);
        const updatedTemp = {
            ...temp,
            desiredTemp: Math.round(temp.desiredTemp),
            currentTemp: Math.round(temp.currentTemp),
        };
        dispatch({ type: 'SET_TEMP_DATA', payload: updatedTemp });
    }

    const getForecastData = async () => {
        const forecast = await getUserForecast(state.user.userId, state.auth.bearer);
        const updatedForecast = {
            ...forecast,
            temp: Math.round(forecast.temp),
            minTemp: Math.round(forecast.minTemp),
            maxTemp: Math.round(forecast.maxTemp),
        };
        dispatch({ type: 'SET_FORECAST_DATA', payload: updatedForecast });
    }

    const getPreferences = async () => {
        const preferences = await getUserPreferences(state.user.userId, state.auth.bearer);
        dispatch({ type: 'SET_USER_PREFERENCES', payload: preferences })
    }

    // const getActivities = async () => {
    //     const activities = await getScheduledTasks(state.user.userId, state.auth.bearer);
    //     dispatch({ type: 'SET_SCHEDULED_TASK', payload: activities });
    // }

    const getLights = async () => {
        const groups = await getLightGroups(state.auth.bearer);
        dispatch({ type: 'SET_LIGHTS', payload: groups });
    }

    // const refreshBearerToken = async () => {
    //     const fiveMinutes = 300000;
    //     const refreshInterval = Date.now() + fiveMinutes;
    //     const newDate = state.auth.exp * 1000
    //     if (newDate <= refreshInterval) {
    //         const response = await getRefreshedBearerToken(state.auth.refresh);
    //         if (response.ok) {
    //             const bearer = await response.json()
    //             const decodedToken = jwt_decode(bearer.bearerToken);
    //             dispatch({ type: 'SET_AUTH_DATA', payload: { bearer: bearer.bearerToken, refresh: decodedToken.refresh_token, isAuthenticated: true, exp: decodedToken.exp } });
    //         } else {
    //             dispatch({ type: 'SET_AUTH_DATA', payload: { isAuthenticated: false } });
    //         }
    //     }
    // }
}
