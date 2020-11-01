import {UPDATE_DEVICEINFO, UPDATE_DEVICEINFO_SUCCESS,UPDATE_DEVICEINFO_ERROR} from './constants';
import DeviceInfo from 'react-native-device-info';

export const updateDeviceInfo = (screenshotStatus) => async dispatch => {
    try{
        dispatch({type: UPDATE_DEVICEINFO});
        const deviceId = DeviceInfo.getUniqueId();
        const deviceName = `${await DeviceInfo.getManufacturer()} ${DeviceInfo.getModel()}`;
        const devicePlatform = await DeviceInfo.getDeviceName();
        const macAddress = await DeviceInfo.getMacAddress();
        const manufacturer = await DeviceInfo.getManufacturer();
        const ipAddress = await DeviceInfo.getIpAddress();
        const imei = await DeviceInfo.getSerialNumber();
        const data = {};
        data.id = deviceId;
        data.name = deviceName;
        data.os = devicePlatform;
        data.macAddress = macAddress;
        data.manufacturer = manufacturer;
        data.ipAddress = ipAddress;
        data.imei = imei;
        data.screenshotStatus = screenshotStatus;
        console.log(data);
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
                dispatch({type: UPDATE_DEVICEINFO_SUCCESS, payload: []});
            });
    } catch (error){
        alert("Something went wrong. Please try after sometime");
        dispatch({type: UPDATE_DEVICEINFO_ERROR})
    }
}