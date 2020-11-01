import {UPDATE_DEVICEINFO, UPDATE_DEVICEINFO_SUCCESS,UPDATE_DEVICEINFO_ERROR} from './constants';
import DeviceInfo from 'react-native-device-info';

export const updateDeviceInfo = (screenshotStatus, location) => async dispatch => {
    try{
        dispatch({type: UPDATE_DEVICEINFO});
        const deviceId = DeviceInfo.getUniqueId();
        const id = DeviceInfo.getDeviceId();
        const deviceName = await DeviceInfo.getDeviceName();
        const devicePlatform = DeviceInfo.getSystemName();
        const macAddress = await DeviceInfo.getMacAddress();
        const ipAddress = await DeviceInfo.getIpAddress();
        const data = {};
        data.id = id;
        data.name = deviceName;
        data.os = devicePlatform;
        data.macAddress = macAddress;
        data.ipAddress = ipAddress;
        data.imei = deviceId;
        data.location = location;
        data.screenshotStatus = screenshotStatus ? 'Activated' : 'Deactivated';
        
        fetch('https://5f9939be50d84900163b843e.mockapi.io/deviceinfo/device',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: data
                }
            )
            .then((response) => {
                console.log('response',response);
                response.json()
            })
            .then((json) => {
            })
            .catch((error) => console.error(error))
            .finally(() => {
                dispatch({type: UPDATE_DEVICEINFO_SUCCESS, payload: data});
            });
    } catch (error){
        alert("Something went wrong. Please try after sometime");
        dispatch({type: UPDATE_DEVICEINFO_ERROR})
    }
}