import React, { useEffect } from "react";
import { View, StyleSheet, ToastAndroid, StatusBar } from "react-native";
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://192.168.1.118:8080';

const ReservationNotification = () => {
    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);

        socket.on('toastActivated', () => {
            console.log('Received toastActivated event from server.');
            showToast();
        });

     
        return () => {
          socket.disconnect();
        };
    }, []);

    const showToast = () => {
        console.log('Attempting to show toast.');
        ToastAndroid.show("Votre réservation va démarrer dans 30 minutes.", ToastAndroid.SHORT);
    };

    return (
        <View></View>
    );
};


export default ReservationNotification;
// import { setNotificationHandler } from 'expo-notifications';
// import * as Notifications from 'expo-notifications';
// import { useEffect } from 'react';
// // Demander l'autorisation d'envoyer des notifications
// Notifications.requestPermissionsAsync().then(status => {
//     if (status.granted) {
//         console.log('Permission accordée pour les notifications');
//     } else {
//         console.log('Permission refusée pour les notifications');
//     }
// });
// setNotificationHandler({
//     handleNotification: async () => ({
//       shouldShowAlert: true,
//       shouldPlaySound: false,
//       shouldSetBadge: false,
//     }),
//   });
// const sendNotification = async () => {
//     console.log("Sending notification...");
//     await Notifications.scheduleNotificationAsync({
//         content: {
//             title: 'Votre timer est lancé !',
//             body: 'Ne manquez pas votre réservation.',
//         },
//         trigger: null, // Envoie immédiat de la notification
//     });
// };
