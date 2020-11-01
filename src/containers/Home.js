import React, {Component} from 'react';
import {View, Text, Image, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import {CustomStatusBar} from '../components/customStatusBar';
import {LOGO} from '../common/constants';
import AnimateItem from '../components/AnimateItem';
import {updateDeviceInfo} from '../common/Actions';
import ScreenshotModule from '../common/Screenshot';
import ActivateButton from '../components/ActivateButton';

class Home extends Component {
    state = {
        isActive: false
    }

    componentDidMount(){
        ScreenshotModule.forbid();
    }

    updateInfo = (status) => {
        const {updateDeviceInfo} = this.props;
        if(status){
            ScreenshotModule.allow();
        } else {
            ScreenshotModule.forbid();
        }
        
        updateDeviceInfo(status);
        this.setState({isActive: status});
    }

    render(){
        const { isActive } = this.state;
        const { isLoading } = this.props;
        const color = (isActive && !isLoading) ? '#39D36C': '#4B22EB';
        return (<>
            <CustomStatusBar backgroundColor="#fff" barStyle="dark-content" />
            <View  style={{justifyContent: 'center', alignItems: 'center', backgroundColor:'#fff', flex: 1}}>
                <Image source={LOGO} style={{width: 150, height: 150}} />
                <View style={{backgroundColor: color,flexDirection: 'row', width: 125, padding: 10, marginTop: 20, borderRadius: 50}}>
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
                            status={true}
                            updateInfo={this.updateInfo}
                            label="Activated"
                            icon="check-circle"
                        />)
                    }
                    {isLoading &&
                        (<View style={{flexDirection: 'row'}}>
                            <ActivityIndicator color="#fff"  />
                            <AnimateItem index={2} renderContent={<Text style={{color: '#fff', textAlign: 'center', flex: 2, marginLeft: 15}}>{'Waiting'}</Text>} />
                        </View>)
                    }
                </View>
            </View>
        </>);
    }
}

function bindAction(dispatch) {
  return {
    updateDeviceInfo: value => dispatch(updateDeviceInfo(value)),
  };
}
function mapStateToProps(state) {
  return {
    isLoading: state.device.info.isUpdating
  };
}

export default connect(
  mapStateToProps,
  bindAction,
)(Home);