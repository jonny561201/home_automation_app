import React, { createContext, useReducer } from 'react';
import Reducer from './Reducer'


const initialState = {
    activePage: null,
    auth: { bearer: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7InVzZXJfaWQiOiJlOTdmZWJjMC1mZDEwLTExZTktOGYwYi0zNjJiOWUxNTU2NjciLCJyb2xlcyI6W3siaXBfYWRkcmVzcyI6IjEuMS4xLjEiLCJyb2xlX25hbWUiOiJnYXJhZ2VfZG9vciIsImRldmljZV9pZCI6ImE3OWE4NTIwLTcxMjctNDgwMi1hODRhLTE2ZWMxOTQ1YWRjMyIsImRldmljZXMiOlt7Im5vZGVfZGV2aWNlIjoxLCJub2RlX25hbWUiOiJKb25zIn0seyJub2RlX2RldmljZSI6Miwibm9kZV9uYW1lIjoiS2FseW5ucyJ9XX0seyJyb2xlX25hbWUiOiJzdW1wX3B1bXAifSx7InJvbGVfbmFtZSI6InRoZXJtb3N0YXQifSx7InJvbGVfbmFtZSI6InNlY3VyaXR5In0seyJyb2xlX25hbWUiOiJsaWdodGluZyJ9XSwiZmlyc3RfbmFtZSI6IkpvbiIsImxhc3RfbmFtZSI6IlRlc3RlciJ9LCJyZWZyZXNoX3Rva2VuIjoiYzQzZjYzZmUtOWU3NC00MGJjLWI1NmYtZTQyNTFmMjUwN2RiIiwiZXhwIjoxNjU0ODY3MzQyfQ.TSterAOSrQIOPb5RyjxkK8Y3OuNLF-QWYwRj2BbLGac', refresh: null, isAuthenticated: false },
    user: { userId: 'e97febc0-fd10-11e9-8f0b-362b9e155667', firstName: 'Jon', lastName: 'Graf', roles: [] },
    deviceId: null,
    startedGarageRegistration: false,
    //TODO: make this an object with different device types!!!
    devicesToRegister: false,
    //TODO: no reason for the roles to return the device data.  Put it as seperate field in claim data
    garageRole: {
        "ip_address": "192.168.1.175",
        "role_name": "garage_door",
        "device_id": "fd8c245a-259b-47b3-be2d-ad33917c0c38",
        "devices": [
          {
            "node_device": 1,
            "node_name": "Jons"
          },
          {
            "node_device": 2,
            "node_name": "Kalynns"
          }]
        },
    addedGarageNode: false,
    garageCoords: null,
    garageDoors: [{doorId: 1, doorName: "Jons", isOpen: true }, {doorId: 2, doorName: "Kalynns", isOpen: true }],
    userCoords: null,
    lights: [],
    sumpData: {},
    tempData: { gaugeColor: '#A0A0A0', currentDesiredTemp: 0.0 },
    forecastData: { description: '' },
    preferences: {},
    tasks: [],
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