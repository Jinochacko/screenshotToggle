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
                <TouchableOpacity style={styles.flexRow} onPress={()=>this.updateInfo()}>
                    <AnimateItem index={1} renderContent={<MaterialCommunityIcons name={icon} style={styles.buttonIcon} />} />
                    <AnimateItem index={2} renderContent={<Text style={styles.buttonText}>{label}</Text>} />
                </TouchableOpacity>
        );
    };
} 