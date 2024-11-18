// import React, { useState, useEffect } from 'react';
// import { View, Image, StyleSheet, Text } from 'react-native';
// import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
// import car1 from '../assets/car1.png';
// import AsyncStorage from '@react-native-community/async-storage';

// const TimerPage = ({ route }) => {
//     const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(route.params.finishDate));
//     const [tempsRestantFixe, setTempsRestantFixe] = useState(calculateTimeRemaining(route.params.finishDate));
//     const [tempsTotalFixe, setTempsTotalFixe] = useState(calculateTempsTotalFixe(route.params.startDate, route.params.finishDate));

//     // Fonction pour calculer le temps restant jusqu'à la fin de la réservation
//     function calculateTimeRemaining(finishDate) {
//         const currentTime = new Date();
//         const endTime = new Date(finishDate);
//         const difference = endTime.getTime() - currentTime.getTime();
//         return difference > 0 ? Math.floor(difference / 1000) : 0;
//     }

//     function calculateTempsTotalFixe(startDate, finishDate) {
//         const startTime = new Date(startDate);
//         const endTime = new Date(finishDate);
//         const difference = endTime.getTime() - startTime.getTime();
//         return difference > 0 ? Math.floor(difference / 1000) : 0;
//     }

//     const [userData, setUserData] = useState({
//         username: "",
//         email: "",
//         firstName: "",
//         lastName: "",
//         phone: "",
//         address: {
//             country: "",
//             state: "",
//             city: "",
//             street: "",
//             areaCode: ""
//         },
//         gender: ""
//     });

//     // Mettre à jour le temps restant toutes les secondes
//     useEffect(() => {
//         const timer = setInterval(() => {
//             setTimeRemaining(prevTime => prevTime - 1);
//         }, 1000);
//         return () => clearInterval(timer);
//     }, []);

//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 // Récupérer l'objet user à partir d'AsyncStorage
//                 const storedUserData = await AsyncStorage.getItem("updatedUser");

//                 // Vérifier si des données utilisateur existent dans AsyncStorage
//                 if (storedUserData) {
//                     // Si des données utilisateur existent, les convertir en objet JavaScript
//                     const parsedUserData = JSON.parse(storedUserData);

//                     // Mettre à jour les états avec les données récupérées
//                     setUserData(parsedUserData);
//                 }
//             } catch (error) {
//                 console.error("Error fetching user data from AsyncStorage:", error);
//             }
//         };

//         fetchUserData();
//     }, []);

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Réservation en cours</Text>
//             <View style={styles.timerContainer}>
//                 <CountdownCircleTimer
//                     isPlaying
//                     duration={tempsTotalFixe}
//                     initialRemainingTime={tempsRestantFixe}
//                     colors={['#004777', '#F7B801', '#A30000']}
//                     onComplete={() => {
//                         // Action à effectuer lorsque le compte à rebours est terminé
//                         console.log('Countdown completed');
//                     }}
//                 >
//                     {({ remainingTime, animatedColor }) => (
//                         <View style={[styles.circle, { borderColor: animatedColor }]}>
//                             <Image source={car1} style={styles.carImage} />
//                         </View>
//                     )}
//                 </CountdownCircleTimer>
//                 {/* Afficher le chrono qui diminue avec le temps */}
//                 <Text style={styles.countdown}>{`${Math.floor(timeRemaining / 3600)}h ${Math.floor((timeRemaining % 3600) / 60)}m ${timeRemaining % 60}s`}</Text>
//             </View>
//             <View style={styles.userInfoContainer}>
//                 <Text style={styles.sectionTitle}>Informations utilisateur</Text>
//                 <View style={styles.userInfo}>
//                     <Text style={styles.label}>Nom d'utilisateur:</Text>
//                     <Text style={styles.info}>{userData.username}</Text>
//                 </View>
//                 <View style={styles.userInfo}>
//                     <Text style={styles.label}>Adresse e-mail:</Text>
//                     <Text style={styles.info}>{userData.email}</Text>
//                 </View>
//                 <View style={styles.userInfo}>
//                     <Text style={styles.label}>Adresse:</Text>
//                     <Text style={styles.info}>{`${userData.address.street}, ${userData.address.city}, ${userData.address.state}, ${userData.address.country} ${userData.address.areaCode}`}</Text>
//                 </View>
//                 <View style={styles.userInfo}>
//                     <Text style={styles.label}>Téléphone:</Text>
//                     <Text style={styles.info}>{userData.phone}</Text>
//                 </View>
//                 <View style={styles.userInfo}>
//                     <Text style={styles.label}>Genre:</Text>
//                     <Text style={styles.info}>{userData.gender}</Text>
//                 </View>
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#f0f0f0', // Couleur de fond
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//     },
//     timerContainer: {
//         alignItems: 'center',
//     },
//     carImage: {
//         width: 150,
//         height: 150,
//         borderRadius: 75,
//     },
//     circle: {
//         width: 150,
//         height: 150,
//         borderRadius: 75,
//         borderWidth: 5,
//         justifyContent: 'center',
//         alignItems: 'center',
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//         elevation: 5,
//     },
//     countdown: {
//         fontSize: 20,
//         marginTop: 10,
//         fontWeight: 'bold', // Police en gras
//     },
//     userInfoContainer: {
//         marginTop: 20,
//         paddingHorizontal: 20,
//         width: '100%',
//     },
//     sectionTitle: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     userInfo: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginBottom: 10,
//     },
//     label: {
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     info: {
//         fontSize: 16,
//     },
// });

// export default TimerPage;

import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { Card, Title, Subheading, Divider } from 'react-native-paper'; // Importer des composants de react-native-paper
import car1 from '../assets/car1.png';
import AsyncStorage from '@react-native-community/async-storage';

const TimerPage = ({ route }) => {
    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(route.params.finishDate));
    const [tempsRestantFixe, setTempsRestantFixe] = useState(calculateTimeRemaining(route.params.finishDate));
    const [tempsTotalFixe, setTempsTotalFixe] = useState(calculateTempsTotalFixe(route.params.startDate, route.params.finishDate));

    function calculateTimeRemaining(finishDate) {
        const currentTime = new Date();
        const endTime = new Date(finishDate);
        const difference = endTime.getTime() - currentTime.getTime();
        return difference > 0 ? Math.floor(difference / 1000) : 0;
    }

    function calculateTempsTotalFixe(startDate, finishDate) {
        const startTime = new Date(startDate);
        const endTime = new Date(finishDate);
        const difference = endTime.getTime() - startTime.getTime();
        return difference > 0 ? Math.floor(difference / 1000) : 0;
    }

    const [userData, setUserData] = useState({
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        address: {
            country: "",
            state: "",
            city: "",
            street: "",
            areaCode: ""
        },
        gender: ""
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(prevTime => prevTime - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedUserData = await AsyncStorage.getItem("updatedUser");
                if (storedUserData) {
                    const parsedUserData = JSON.parse(storedUserData);
                    setUserData(parsedUserData);
                }
            } catch (error) {
                console.error("Error fetching user data from AsyncStorage:", error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <Title style={styles.title}>Réservation en cours</Title>
                    <View style={styles.timerContainer}>
                        <CountdownCircleTimer
                            isPlaying
                            duration={tempsTotalFixe}
                            initialRemainingTime={tempsRestantFixe}
                            colors={['#9370DB', '#9370DB']}
                            onComplete={() => {
                                console.log('Countdown completed');
                            }}
                        >
                            {({ remainingTime, animatedColor }) => (
                                <View style={[styles.circle, { backgroundColor: animatedColor }]}>
                                    <Image source={car1} style={styles.car1} />
                                </View>
                            )}
                        </CountdownCircleTimer>
                        <Text style={styles.countdown}>{`${Math.floor(timeRemaining / 3600)}h ${Math.floor((timeRemaining % 3600) / 60)}m ${timeRemaining % 60}s`}</Text>
                    </View>
                </Card.Content>
            </Card>
            <View style={styles.userInfoContainer}>
                <Title style={styles.sectionTitle}>Informations utilisateur</Title>
                <Divider />
                <View style={styles.userInfo}>
                    <Subheading style={styles.label}>Nom d'utilisateur:</Subheading>
                    <Subheading style={styles.info}>{userData.username}</Subheading>
                </View>
                <Divider />
                <View style={styles.userInfo}>
                    <Subheading style={styles.label}>Adresse e-mail:</Subheading>
                    <Subheading style={styles.info}>{userData.email}</Subheading>
                </View>
                <Divider />
                <View style={styles.userInfo}>
                    <Subheading style={styles.label}>Adresse:</Subheading>
                    <Subheading style={styles.info}>{`${userData.address.street}, ${userData.address.city}, ${userData.address.state}, ${userData.address.country} ${userData.address.areaCode}`}</Subheading>
                </View>
                <Divider />
                <View style={styles.userInfo}>
                    <Subheading style={styles.label}>Téléphone:</Subheading>
                    <Subheading style={styles.info}>{userData.phone}</Subheading>
                </View>
                <Divider />
                <View style={styles.userInfo}>
                    <Subheading style={styles.label}>Genre:</Subheading>
                    <Subheading style={styles.info}>{userData.gender}</Subheading>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
    },
    card: {
        width: '90%',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#9370DB',
    },
    timerContainer: {
        alignItems: 'center',
    },
    circle: {
        width: 150,
        height: 150,
        borderRadius: 75,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    car1: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    countdown: {
        fontSize: 20,
        marginTop: 10,
        fontWeight: 'bold',
        color: '#4B0082',
    },
    userInfoContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
        width: '100%',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#9370DB',
    },
    userInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4B0082',
    },
    info: {
        fontSize: 16,
        flex: 1,
        textAlign: 'right',
    },
});

export default TimerPage;

