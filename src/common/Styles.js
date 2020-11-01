import { StyleSheet, Platform, StatusBar } from 'react-native';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const styles = StyleSheet.create({
    statusBar: {
      height: STATUSBAR_HEIGHT,
    },
    mainContent: {justifyContent: 'center', alignItems: 'center', backgroundColor:'#fff', flex: 1},
    logo: {width: 150, height: 150},
    buttonWrap: {flexDirection: 'row', width: 125, padding: 10, marginTop: 20, borderRadius: 50},
    flexRow: {flexDirection: 'row'},
    buttonText: {color: '#fff', textAlign: 'center', flex: 2, marginLeft: 15},
    buttonIcon: {fontSize: 20, color: '#fff'}
});

export default styles;