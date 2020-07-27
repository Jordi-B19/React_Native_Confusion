import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Alert} from 'react-native';
import { Card, Icon, Button } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Animatable from 'react-native-animatable';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import * as Calendar from 'expo-calendar';

class Reservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            guests: 1,
            smoking: false,
            date: new Date(),
            visible: false,
            mode: 'date'
        }
    }

    dateChange = (event, selectedDate) => {
        const currentDate = selectedDate || this.state.date
        this.setState({date: currentDate, visible: false })
    }

    handleReservation() {
        Alert.alert(
            'Is your reservation OK?',
            'Number of Guests: '+ this.state.guests +
            '\nSmoking? ' + this.state.smoking +
            '\nDate and Time: ' + this.state.date,
            [
                { 
                    text: 'Cancel', 
                    onPress: () => this.resetForm(),
                    style: ' cancel'
                },
                {
                    text: 'OK',
                    onPress: () => {
                        this.presentLocalNotification(this.state.date);
                        this.addReservationToCalendar(this.state.date);
                        this.resetForm();
                    },
                }
            ],
            { cancelable: false }
        );
    }

    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: new Date(),
            visible: false,
            mode: 'date'
        });
    }

    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;}
    
    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
        Notifications.presentNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for '+ date + ' requested',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            }
        });
    }


    async obtainCalendarPermission() {
        let permission = await Permissions.getAsync(Permissions.CALENDAR);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.Permissions.CALENDAR);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;}

    async addReservationToCalendar(date) {

        const details = {
            title : 'ConFusion Table Reservation',
            startDate : date,
            endDate : new Date(date + 2*60*60*1000),
            timeZone : 'Asia/Hong_Kong',
            location : '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
        }

        this.obtainCalendarPermission()
            .then(Calendar.createEventAsync(Calendar.DEFAULT, details))



    }
    
    
    render() {
        return(
            <Animatable.View animation="zoomIn" duration={2000}
                useNativeDriver={true}>
            <ScrollView>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Number of Guests</Text>
                <Picker
                    style={styles.formItem}
                    selectedValue={this.state.guests}
                    onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}>
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                </Picker>
                </View>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                <Switch
                    style={styles.formItem}
                    value={this.state.smoking}
                    trackColor='#512DA8'
                    onValueChange={(value) => this.setState({smoking: value})}>
                </Switch>
                </View>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Date</Text>
                <Button icon=
                    {<Icon
                        name='calendar'
                        type='font-awesome-5'
                        size={14}
                        color='white'
                    />}
                    title= {` ${('0' + this.state.date.getDate()).slice(-2)}/${('0' + this.state.date.getMonth()).slice(-2)}/${this.state.date.getFullYear()}`}
                    onPress={() => {this.setState({visible: true, mode: 'date'})}} 
                    containerStyle={styles.formItem}
                    buttonStyle={{backgroundColor: "#512DA8"}}
                />
                </View>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Time</Text>
                <Button
                    icon=
                    {<Icon
                        name='clock'
                        type='font-awesome-5'
                        size={14}
                        color='white'
                    />}
                    title= {` ${('0' + this.state.date.getHours()).slice(-2)}:${('0' + this.state.date.getMinutes()).slice(-2)}`}
                    onPress={() => {this.setState({visible: true, mode: 'time'})}} 
                    containerStyle={styles.formItem}
                    buttonStyle={{backgroundColor: "#512DA8", fontSize: 14, elevation:5}}
                />
                </View>
                {this.state.visible &&
                <DateTimePicker
                    value={this.state.date}
                    mode={this.state.mode}
                    onChange={this.dateChange}
                    minimumDate={new Date()}
                />}
                <View style={styles.formRow}>
                <Button
                    onPress={() => this.handleReservation()}
                    title="Reserve"
                    containerStyle={styles.formItem}
                    buttonStyle={{backgroundColor: "#512DA8", fontSize: 14, elevation:5}}
                    accessibilityLabel="Learn more about this purple button"
                    />
                </View>
            </ScrollView>
            </Animatable.View>
        );
    }

};

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1,
    },
    modal: {
        justifyContent: 'center',
        margin: 20
     },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default Reservation;