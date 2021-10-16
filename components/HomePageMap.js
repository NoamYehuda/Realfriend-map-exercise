import React from "react";
import { StyleSheet, Text, View,Dimensions, Animated, Image, Platform } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import propertiesData from '../properties.json'
import moment from 'moment';
import PropertiePage from "./PropertiePage";

const { width } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

export default function HomePageMap() {
    const map = React.useRef(null)
    const scrollView = React.useRef(null)

    // On Marker press function
    const onMarkerPress = (data) => {
        const markerId = data._targetInst.return.key
        let x = (markerId * CARD_WIDTH) + (markerId * 20)
        if(Platform.OS === 'ios') {
            x = x- SPACING_FOR_CARD_INSET
        }
        scrollView.current.scrollTo({x, y: 0, animated: true})
    }

    
    return (
        <View style={styles.container}>
            <MapView
                ref={map}
                style={styles.map}
                provider={MapView.PROVIDER_GOOGLE}
                initialRegion={{
                latitude: 32.0629308,
                longitude: 34.7697372,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}
            >
                {propertiesData.map((marker, index) => {
                    if(marker.coords && marker.coords.lng !== null ) {
                        return(
                            <Marker
                                onPress={(e) => onMarkerPress(e)}
                                style={styles.marker}
                                key={index}
                                title={marker.address.street || 'No name'}
                                description={marker.content}
                                coordinate={{
                                    latitude: marker.coords.lat,
                                    longitude: marker.coords.lng
                                }}
                            >
                                <Callout style={styles.marker}>
                                    <View style={styles.markerBubble} >
                                        <Text>Address: {marker.address.street || "Didn't mentioned"}</Text>
                                        <Text>Rent Price: {marker.rentPrice || "Didn't mentioned"}</Text>
                                        <Text>Entry Date: {moment(marker.entryDate.$date).format("DD.MM.YY")|| "Didn't mentioned"} </Text>
                                    </View>
                                </Callout>
                            </Marker>
                    )}
                })}
            </MapView> 

            <Animated.ScrollView
                ref={scrollView}
                horizontal
                pagingEnabled
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                style={styles.scrollView}
                snapToInterval={CARD_WIDTH + 20}
                snapToAlignment="center"
                contentInset={{
                    top: 0,
                    left: SPACING_FOR_CARD_INSET,
                    bottom: 0,
                    right: SPACING_FOR_CARD_INSET
                }}
                contentContainerStyle={{
                    paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
                }}               
            >
                {propertiesData.map((marker, index) =>(
                <View style={styles.card} key={index}>
                {marker.photosCount !==0 ?
                    <Image 
                    source={{uri: marker.photos[0]}}
                    style={styles.cardImage}
                    resizeMode="cover"
                    /> :
                    <Image 
                    source={{uri: 'data:image/png;base64,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'}}
                    style={styles.cardImage}
                    resizeMode="cover"
                    />

                }
                <View style={styles.cardContent}>
                    <View style={styles.textContent} >
                    <Text style={styles.cardtitle} >כתובת: {marker.address.street || "Didn't mentioned"}</Text>
                    <Text style={styles.cardDescription}>שכר דירה: {marker.rentPrice || "Didn't mentioned"}</Text>
                    <Text style={styles.cardDescription}>גודל הדירה: {marker.squareMeters || "Didn't mentioned"}</Text>
                    </View>
                    <View>
                        <PropertiePage propertie={marker}/>
                    </View> 
                </View>
            </View>
            ))}
    </Animated.ScrollView>
    </View>
    )
}


// Style
const styles = StyleSheet.create({
    container: {
     ...StyleSheet.absoluteFillObject
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    marker: {
        margin:10, 
    },
    markerBubble: {
        flexDirection: "column",
        alignSelf:'flex-start',
        justifyContent: 'space-evenly',
        margin: 5,
        fontSize: 20

    },
    scrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
      },
      card: {
        backgroundColor: "#FEFBF3",
        elevation: 2,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",

      },
      cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
      },
      cardContent: {
          flex: 2,
          flexDirection: "row-reverse",
          alignItems: 'center',
          justifyContent: "center"
      },
      textContent: {
        padding: 20,
        flexShrink: 1
      },
      cardtitle: {
        fontSize: 12,
        fontWeight: "bold",
      },
      cardDescription: {
        fontSize: 12,
        color: "#444",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      }
})
