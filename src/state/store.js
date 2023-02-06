import React, { createContext, useReducer } from 'react';
import Reducer from './reducer'


const initialState = {
    activePage: null,
    auth: {
        bearer: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7InVzZXJfaWQiOiJlOTdmZWJjMC1mZDEwLTExZTktOGYwYi0zNjJiOWUxNTU2NjciLCJyb2xlcyI6W3siaXBfYWRkcmVzcyI6IjEuMS4xLjEiLCJyb2xlX25hbWUiOiJnYXJhZ2VfZG9vciIsImRldmljZV9pZCI6IjlkNDkxY2EwLTY5OWUtNGQ0Mi1iYjliLTc3YTdkNTE1YTRhOSIsImRldmljZXMiOlt7Im5vZGVfZGV2aWNlIjoxLCJub2RlX25hbWUiOiJKb24ncyBEb29yICJ9LHsibm9kZV9kZXZpY2UiOjIsIm5vZGVfbmFtZSI6IkthbHlubidzIERvb3IgIn1dfSx7InJvbGVfbmFtZSI6InRoZXJtb3N0YXQifSx7InJvbGVfbmFtZSI6InN1bXBfcHVtcCJ9LHsicm9sZV9uYW1lIjoic2VjdXJpdHkifSx7InJvbGVfbmFtZSI6ImxpZ2h0aW5nIn1dLCJmaXJzdF9uYW1lIjoiSm9uIiwibGFzdF9uYW1lIjoiVGVzdGVyIn0sInJlZnJlc2hfdG9rZW4iOiIxYjg1YTA1OC0wMzQzLTRkZGItOGU2YS03NDFkNzZmZTI4NTMiLCJleHAiOjE2NTY5OTI2NTF9.6d7SxPKe2N-vJDbiwxy-J8323_78V0KqmhyRvQH3rLs',
        refresh: null,
        isAuthenticated: false
    },
    user: { 
        userId: 'e97febc0-fd10-11e9-8f0b-362b9e155667', 
        firstName: 'Jon', 
        lastName: 'Graf', 
        roles: [] 
    },
    // deviceId: 'a79a8520-7127-4802-a84a-16ec1945adc3',
    devicesToRegister: {
        garage: {
            newDevice: false,
            started: false,
            deviceId: 'a79a8520-7127-4802-a84a-16ec1945adc3',
        }
    },
    garageCoords: null,
    //TODO: !!!!! need login to return this separate from garage role !!!!!
    garageDoors: [
        {doorId: 1, doorName: "Jons", isOpen: true }, {doorId: 2, doorName: "Kalynns", isOpen: true }
    ],
    userCoords: null,
    lights: [],
    sumpData: {
        warningLevel: 0,
        currentDepth: 0.0,
        averageDepth: 0.0,
        depthUnit: 'in',
    },
    tempData: { currentDesiredTemp: 70.0, modeValue: 0, mode: 'off' },
    forecastData: { description: '' },
    preferences: {},
    tasks: [
        { task_type: 'light', alarm_days: 'TueWedThu', alarm_time: '08:00:00', enabled: true },
        { task_type: 'hvac', alarm_days: 'FriSatSunMon', enabled: false, hvac_stop: '22:00:00', hvac_start: '07:30:00', hvac_start_temp: 72, hvac_stop_temp: 68 },
    ],
    loadedUtils: false,
    taskTypes: ['sunrise alarm', 'turn on', 'turn off', 'hvac']
};

const Store = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default Store;