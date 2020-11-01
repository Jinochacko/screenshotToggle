import * as React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from '../common/Styles';
import AnimateItem from '../components/AnimateItem';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class ActivateButton extends React.Component{

    updateInfo = () => {
        const {status, updateInfo} = this.props;
        updateInfo(status);
    };

    render(){
        const {label, icon} = this.props;
        return (
                <TouchableOpacity style={{flexDirection: 'row'}} onPress={()=>this.updateInfo()}>
                    <AnimateItem index={1} renderContent={<MaterialCommunityIcons name={icon} style={{fontSize: 20, color: '#fff'}} />} />
                    <AnimateItem index={2} renderContent={<Text style={{color: '#fff', textAlign: 'center', flex: 2, marginLeft: 15}}>{label}</Text>} />
                </TouchableOpacity>
        );
    };
}