import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Alert} from 'react-native';
import { Card, Icon, Button } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Animatable from 'react-native-animatable';

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
                    onPress: () => this.resetForm(),
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