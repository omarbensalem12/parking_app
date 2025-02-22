import React, { useState, useEffect } from 'react';
import { View, Dimensions, StyleSheet, Text, Image, TextInput, Alert, Modal, Pressable, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import car1 from '../assets/car1.png';
import DateTimePicker from '@react-native-community/datetimepicker';
import config from '../config';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-native-paper';
import { ImageBackground } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Calendaricon = require('../assets/calendar.png');
const Clockicon = require('../assets/clock.png');
const Obteniricon = require('../assets/obtenir.png');
const blackcarIcon = require("../assets/blackcar.png");



export default function Places({ navigation, selectedparking, setNoParking }) {
    const { t } = useTranslation();
    function chunkArray(array, chunkSize) {
        // Validate input parameters
        if (!Array.isArray(array) || typeof chunkSize !== 'number' || chunkSize <= 0) {
            throw new Error('Invalid input parameters');
        }

        const result = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            result.push(array.slice(i, i + chunkSize));
        }
        return result;
    }

   
  
    const [reservedSpots, setReservedSpots] = useState([])
    const [currentStep, setCurrentStep] = useState("");

    const [showStartDate, setShowStartDate] = useState(false);
    const [showStarttime, setShowStarttime] = useState(false);
    const [showfinishDate, setShowfinishDate] = useState(false);
    const [showfinishTime, setShowfinishTime] = useState(false);

    const [StartDate, setStartDate] = useState(new Date());
    const [Starttime, setStarttime] = useState(new Date());
    const [finishDate, setfinishDate] = useState(new Date());
    const [finishTime, setfinishTime] = useState(new Date());
    const getStart = () => {
        const hour = Starttime.getHours() < 10 ? "0" + Starttime.getHours() : Starttime.getHours()
        const minute = Starttime.getMinutes() < 10 ? "0" + Starttime.getMinutes() : Starttime.getMinutes()
        const day = StartDate.getDate() < 10 ? "0" + StartDate.getDate() : StartDate.getDate()
        const month = (StartDate.getMonth() + 1) < 10 ? "0" + (StartDate.getMonth() + 1) : (StartDate.getMonth() + 1)
        const year = StartDate.getFullYear()

        return `${year}-${month}-${day}T${hour}:${minute}:00`
    }

    const getEnd = () => {
        const hour = finishTime.getHours() < 10 ? "0" + finishTime.getHours() : finishTime.getHours()
        const minute = finishTime.getMinutes() < 10 ? "0" + finishTime.getMinutes() : finishTime.getMinutes()
        const day = finishDate.getDate() < 10 ? "0" + finishDate.getDate() : finishDate.getDate()
        const month = (finishDate.getMonth() + 1) < 10 ? "0" + (finishDate.getMonth() + 1) : (finishDate.getMonth() + 1)
        const year = finishDate.getFullYear()

        return `${year}-${month}-${day}T${hour}:${minute}:00`
    }

    const getAvailableParkingSpots = () => {
        axios.get(`${config.api}/api/parking/getAvailableParkingSpots?startDate=${getStart()}&finishDate=${getEnd()}&parkingLotId=${selectedparking._id}`)
            .then(res => {
                setCurrentStep("search")
                setReservedSpots(res.data.occupiedParkingSpots)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (

        <View style={{ flex: 1, backgroundColor: "white" }}>
            {
                <View style={{ paddingTop: (Dimensions.get('window').height * 0.05) }}>
                    {currentStep == "" && <View>
                        <View style={{ display: "flex", flexDirection: "row", width: Dimensions.get('window').width * 0.95, justifyContent: "space-between", alignItems: "center" }}>
                            <View>
                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: Dimensions.get('window').width * 0.9 }}>
                                    <Pressable style={{ ...styles.button, padding: 10, backgroundColor: "#2828ff", borderRadius: 5, borderWidth: 1, width: Dimensions.get('window').width * 0.4 }} onPress={() => { setShowStartDate(true) }} >
                                        <Text style={{ color: "white" }}  > {t("Start date")}</Text>
                                    </Pressable>
                                    <Text style={{ fontWeight: 900, fontSize: 18 }}>
                                        <Image
                                            style={{
                                                width: 25,
                                                height: 25,
                                                resizeMode: "contain",
                                            }}
                                            source={Calendaricon}
                                        />
                                        {getStart().substring(0, 10)}  </Text>
                                </View>

                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: Dimensions.get('window').width * 0.9 }}>
                                    <Pressable style={{ ...styles.button, padding: 10, backgroundColor: "#2828ff", borderRadius: 5, borderWidth: 1, width: Dimensions.get('window').width * 0.4 }} onPress={() => { setShowStarttime(true) }} >
                                        <Text style={{ color: "white" }}  >{t("Start time")}</Text>
                                    </Pressable>
                                    <Text style={{ fontWeight: 900, fontSize: 18 }}>
                                        <Image
                                            style={{
                                                width: 25,
                                                height: 25,
                                                resizeMode: "contain",
                                            }}
                                            source={Clockicon}
                                        />
                                        {getStart().substring(11, 16)}  </Text>
                                </View>
                            </View>
                        </View>


                        <View style={{ display: "flex", flexDirection: "row", width: Dimensions.get('window').width * 0.95, justifyContent: "space-between", alignItems: "center" }}>
                            <View>
                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: Dimensions.get('window').width * 0.9 }}>
                                    <Pressable style={{ ...styles.button, padding: 10, backgroundColor: "#2828ff", borderRadius: 5, borderWidth: 1, width: Dimensions.get('window').width * 0.4 }} onPress={() => { setShowfinishDate(true) }} >
                                        <Text style={{ color: "white" }}  > {t("Finish date")}</Text>
                                    </Pressable>
                                    <Text style={{ fontWeight: 900, fontSize: 18 }}>
                                        <Image
                                            style={{
                                                width: 25,
                                                height: 25,
                                                resizeMode: "contain",
                                            }}
                                            source={Calendaricon}
                                        />
                                        {getEnd().substring(0, 10)}  </Text>
                                </View>

                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: Dimensions.get('window').width * 0.9 }}>
                                    <Pressable style={{ ...styles.button, padding: 10, backgroundColor: "#2828ff", borderRadius: 5, borderWidth: 1, width: Dimensions.get('window').width * 0.4 }} onPress={() => { setShowfinishTime(true) }} >
                                        <Text style={{ color: "white" }}  >{t("Finish time")}</Text>
                                    </Pressable>
                                    <Text style={{ fontWeight: 900, fontSize: 18 }}>
                                        <Image
                                            style={{
                                                width: 25,
                                                height: 25,
                                                resizeMode: "contain",
                                            }}
                                            source={Clockicon}
                                        />
                                        {getEnd().substring(11, 16)}  </Text>
                                </View>
                            </View>
                        </View>

                        {showStartDate && (
                            <DateTimePicker
                                value={StartDate}
                                mode="date"
                                is24Hour={true}
                                display="default"
                                onChange={(e) => {
                                    setStartDate(new Date(e.nativeEvent.timestamp))
                                    setShowStartDate(false);
                                }}
                            />
                        )}
                        {showStarttime && (
                            <DateTimePicker
                                value={Starttime}
                                mode="time"
                                is24Hour={true}
                                display="default"
                                onChange={(e) => {
                                    setStarttime(new Date(e.nativeEvent.timestamp))
                                    setShowStarttime(false);
                                }
                                }
                            />
                        )}
                        {showfinishDate && (
                            <DateTimePicker
                                value={finishDate}
                                mode="date"
                                is24Hour={true}
                                display="default"
                                onChange={(e) => { setfinishDate(new Date(e.nativeEvent.timestamp)); setShowfinishDate(false) }}
                            />
                        )}
                        {showfinishTime && (
                            <DateTimePicker
                                value={finishTime}
                                mode="time"
                                is24Hour={true}
                                display="default"
                                onChange={(e) => { setfinishTime(new Date(e.nativeEvent.timestamp)); setShowfinishTime(false) }}
                            />
                        )}

                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                            <Pressable style={{ ...styles.button, padding: 10, backgroundColor: "#f77474", margin: 10, borderRadius: 5, width: Dimensions.get('window').width * 0.9, borderWidth: 1 }} onPress={getAvailableParkingSpots}>
                                <Text style={{ textAlign: "center" }} >
                                    <Image
                                        style={{
                                            width: 25,
                                            height: 25,
                                            resizeMode: "contain",
                                        }}
                                        source={Obteniricon}
                                    />  {t("get available spots")} </Text>
                            </Pressable>


                        </View>






                    </View>}



                    <ScrollView style={{ height: Dimensions.get('window').height * 0.9 }}>


                        {currentStep === 'search' && (

                            <View style={{
                                width: '100%', padding: 10
                            }}>
                                <View style={{
                                    flex: 1, marginBottom: 10
                                }}>
                                    <View style={[styles.card, styles.shadowProp]}>
                                        <View style={{
                                            backgroundColor: 'white',
                                            borderRadius: 10,
                                            padding: 20,
                                            margin: 10,
                                        }}>
                                            <Button

                                                style={{
                                                    height: 30,
                                                    fontSize: 25,
                                                    position: 'absolute',
                                                    top: -10,
                                                    left: -170,

                                                }}
                                                onPress={() => setCurrentStep('')}


                                            >
                                                <View style={{
                                                    flex: 1,
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'flex-end',
                                                    marginTop: 50, // Marge pour décaler l'icône du haut de l'écran
                                                    marginRight: 20
                                                }}>
                                                    <View style={{ backgroundColor: 'white' }}>
                                                        <Ionicons name='arrow-back-sharp' style={{
                                                            height: 30,
                                                            fontSize: 25,
                                                            marginTop: -10
                                                        }} />
                                                    </View>
                                                </View>


                                            </Button>

                                        </View>
                                        <View>
                                            < Text style={{
                                                fontSize: 24,
                                                fontWeight: 'bold',
                                                textAlign: 'center',
                                                color: '#0C2D57'


                                            }}>Park Zone</Text>
                                        </View>
                                    </View>
                                </View>






                                {chunkArray(selectedparking.parkingSpots, 2).map((pair, pairIndex) => (
                                    <View
                                        key={pairIndex}
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >

                                        {pair.map((spot, spotIndex) => (
                                            <React.Fragment key={spot._id}>
                                                <View
                                                    style={{
                                                        width: '30%', // 30% for each spot
                                                        aspectRatio: 2 / 1,
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        borderWidth: 0.3,
                                                        borderColor: 'black',
                                                        overflow: 'hidden',
                                                        marginRight: spotIndex === 0 ? '20%' : 0, // Ajout de la marge à droite pour la première place
                                                        borderTopRightRadius: pairIndex === 0 && spotIndex === 0 ? 17 : 0, // Ajout du borderRadius top-right uniquement pour la première place à gauche
                                                        borderBottomRightRadius: (pairIndex === selectedparking.parkingSpots.length / 2 - 1 && spotIndex === 0) ? 17 : 0, // Ajout du borderRadius bottom-right uniquement pour la dernière place à gauche
                                                        borderTopLeftRadius: pairIndex === 0 && spotIndex === 1 ? 17 : 0, // Ajout du borderRadius top-left uniquement pour la première place à droite
                                                        borderBottomLeftRadius: (pairIndex === selectedparking.parkingSpots.length / 2 - 1 && spotIndex === 1) ? 17 : 0, // Ajout du borderRadius bottom-left uniquement pour la dernière place à droite
                                                    }}
                                                >
                                                    {reservedSpots.includes(spot._id) && (
                                                        <View
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                            }}
                                                        >
                                                            <View
                                                                style={{
                                                                    width: '60%', // Ajustez la taille de la place selon vos besoins
                                                                    aspectRatio: 1, // Assurez-vous que la place conserve son aspect carré
                                                                    overflow: 'hidden',

                                                                }}
                                                            >
                                                                <ImageBackground
                                                                    source={blackcarIcon}
                                                                    style={{
                                                                        width: '100%',
                                                                        height: '100%',
                                                                        resizeMode: 'contain', // Utilisez 'contain' pour garder l'image dans les limites tout en préservant les proportions
                                                                        justifyContent: 'center',
                                                                        alignItems: 'center',
                                                                    }}
                                                                >
                                                                    {/* Ajoutez du contenu supplémentaire au besoin */}
                                                                    {/* <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>
                      {spot.name}
                    </Text> */}
                                                                </ImageBackground>
                                                            </View>
                                                        </View>
                                                    )}

{
  !reservedSpots.includes(spot._id) && (
      <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 600, color: 'black' }}>
        {spot.name}
      </Text>
    
  )
}


                                                </View>

                                                {spotIndex === 0 && <View style={{ width: '20%' /* Adjusted space width */ }} />}
                                            </React.Fragment>
                                        ))}

                                    </View>

                                ))}
                                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }} >

                                </View>
                                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                                    <Text style={{
                                        color: '#B5C0D0',
                                        fontWeight: 'bold',
                                        fontSize: 30,
                                        textAlign: 'auto',
                                        transform: [{ rotate: '-90deg' }],
                                        marginBottom: 200,
                                        marginTop: -260
                                    }}> {`${selectedparking.parkingSpots.length - reservedSpots.length
                                        } SPOTS FREE `}</Text>
                                    <Image source={car1} style={{ width: 60, height: 60 }} />
                                    <AntDesign name='arrowup' style={{ fontSize: 20, marginBottom: 10 }} />
                                    <Text style={{ fontSize: 16, color: '#90EE90', fontWeight: 'bold', marginBottom: 20 }}>ENTRY</Text>

                                </View>
                                <View>
</View>


                            </View>

                        )}

                    </ScrollView>


                </View >}

        </View >
    )
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 13,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        margin: 10,



        // Ajoutez d'autres styles au besoin
    },
    shadowProp: {
        elevation: 15, // contrôle l'élévation de la boîte d'ombre sur Android
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        shadowOpacity: 0.3,
        borderTopWidth: 0,
        width: '300px',
    },
    continueBtn: {
        backgroundColor: '#800080',
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginHorizontal: 5,
        borderRadius: 10,

        alignItems: 'center',
    },
    continueTxt: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
    },
    searchInput: {
        paddingLeft: 5,
        borderRadius: 8,
        borderWidth: 2
    },
    mapContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 1,
    },

    changeDesignButton: {
        marginTop: 20,
        backgroundColor: '#0C2D57',
        padding: 15,
        borderRadius: 10,
    },
    changeDesignButtonText: {
        color: 'white',
        fontSize: 16,
        alignSelf: 'center',
    },

    searchZone: {
        position: 'absolute',
        bottom: 20,
        width: Dimensions.get('window').width,
        height: 100,
        padding: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        zIndex: 1,
    },
    cardImage: {
        width: 100, // Ajustez la largeur en fonction de vos besoins
        height: 100, // Ajustez la hauteur en fonction de vos besoins
        marginBottom: 5, // Ajustez la marge en fonction de vos besoins
        borderRadius: 10,
        margin: 10,
    },
    card: {
        width: '40%', // Ajustez la largeur en fonction de vos besoins
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        margin: 8,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 10,
    },
    cardImage: {
        width: 100, // Ajustez la largeur en fonction de vos besoins
        height: 100, // Ajustez la hauteur en fonction de vos besoins
        marginBottom: 5, // Ajustez la marge en fonction de vos besoins
        borderRadius: 10
    },
    cardLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },

    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 5,
        elevation: 2,
        margin: 5
    },
    buttonOpen: {
        backgroundColor: 'blue',
        width: 100,
        height: 30,
        borderRadius: 10,
    },
    buttonClose: {
        backgroundColor: "transparent",
        position: "absolute",
        top: -15,
        right: -15,
    },
    textStyle: {
        backgroundColor: 'red',
        width: 30,
        height: 30,
        borderRadius: 50,
        textAlign: "center",
        color: "white",
        fontSize: 20,
    },
    text: {
        textAlign: "center",
        color: "white",
        fontSize: 16,
    },
    markerImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    calloutContainer: {
        borderRadius: 8,
        width: 160,
    },
    calloutContent: {
        padding: 10,
        alignItems: 'center',
    },
    calloutText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    markerContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'white',
    },
});


   
