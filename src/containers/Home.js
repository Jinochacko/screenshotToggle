import React, {Component} from 'react';
import {View, Text, Image, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import {CustomStatusBar} from '../components/customStatusBar';
import {LOGO} from '../common/constants';
import AnimateItem from '../components/AnimateItem';
import {updateDeviceInfo} from '../common/Actions';
import ScreenshotModule from '../common/Screenshot';
import ActivateButton from '../components/ActivateButton';
import Geolocation from '@react-native-community/geolocation';
import styles from '../common/Styles';

class Home extends Component {
    state = {
        isActive: false,
        initialPosition: null
    }

    componentDidMount(){
        ScreenshotModule.forbid();
        Geolocation.getCurrentPosition(
            position => {
                const initialPosition = position;
                this.setState({initialPosition});
            },
            // error => alert(JSON.stringify(error)),
        );
    }

    updateInfo = (status) => {
        const {initialPosition: {coords: {latitude, longitude}}} = this.state;
        const {updateDeviceInfo} = this.props;
        if(status){
            ScreenshotModule.allow();
        } else {
            ScreenshotModule.forbid();
        }
        
        updateDeviceInfo(status, {latitude, longitude});
        this.setState({isActive: status});
    }

    render(){
        const { isActive } = this.state;
        const { isLoading, sentData } = this.props;
        const color = (isActive && !isLoading) ? '#39D36C': '#4B22EB';
        return (<>
            <CustomStatusBar backgroundColor="#fff" barStyle="dark-content" />
            <View  style={styles.mainContent}>
                <Image source={LOGO} style={styles.logo} />
                <View style={[styles.buttonWrap, {backgroundColor: color}]}>
                    {(!isLoading && !isActive) &&
                        (<ActivateButton
                            status={true}
                            updateInfo={this.updateInfo}
                            label="Activate"
                            icon="arrow-up-circle"
                        />)
                    }
                    {(!isLoading && isActive) &&
                        (<ActivateButton
                            status={false}
                            updateInfo={this.updateInfo}
                            label="Activated"
                            icon="check-circle"
                        />)
                    }
                    {isLoading &&
                        (<View style={styles.flexRow}>
                            <ActivityIndicator color="#fff"  />
                            <AnimateItem index={2} renderContent={<Text style={styles.buttonText}>{'Waiting'}</Text>} />
                        </View>)
                    }
                </View>
                {(sentData && sentData.id) &&
                    (<View style={{padding: 30}}>
                        <Text>Sent Data: </Text>
                        <Text>id: {sentData.id}</Text>
                        <Text>name: {sentData.name}</Text>
                        <Text>os: {sentData.os}</Text>
                        <Text>macAddress: {sentData.macAddress}</Text>
                        <Text>ipAddress: {sentData.ipAddress}</Text>
                        <Text>imei: {sentData.imei}</Text>
                        <Text>location: {JSON.stringify(sentData.location)}</Text>
                        <Text>screenshotStatus: {sentData.screenshotStatus}</Text>
                    </View>)
                }
            </View>
        </>);
    }
}

function bindAction(dispatch) {
  return {
    updateDeviceInfo: (value, location) => dispatch(updateDeviceInfo(value, location)),
  };
}
function mapStateToProps(state) {
  return {
    isLoading: state.device.info.isUpdating,
    sentData: state.device.info.data
  };
}

export default connect(
  mapStateToProps,
  bindAction,
)(Home);