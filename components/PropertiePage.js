import React, { useState } from "react";
import { StyleSheet, Text, View, Modal, Pressable,StatusBar, ScrollView, SafeAreaView, Image } from 'react-native';
import moment from 'moment';
import { CheckBox } from "react-native-elements/dist/checkbox/CheckBox";


export default function PropertiePage(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false)

  const onPressCheckBox = () => {
    setIsChecked(!isChecked)
    console.log(isChecked);
  }
    return (
      <View >
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
        <SafeAreaView style={styles.container}>
          <ScrollView >
 
          <View style={styles.modalView}>

          {/* Header */}

          <View style={styles.header}>
            <Text style={{fontWeight: "bold", fontSize: 15}}>דירה להשכרה:</Text>
            <View>
            <CheckBox
              containerStyle ={{backgroundColor: 'transparent', borderColor:"#A6A9B6", marginRight: 50}}
              center
              title='Add to favorite'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checkedColor='grey'
              checked={isChecked}
              onPress={() => onPressCheckBox()}
            />
            </View>
          </View>
            <View style={{flex: 1}}>
              <Text>פורסם ב: {moment(props.propertie.createdAt.$date).format("DD.MM.YY")|| "Didn't mentioned"} </Text>
              <Text>תאריך כניסה: {props.propertie.entryDate !== null ? moment(props.propertie.entryDate.$date).format("DD.MM.YY"):  "Didn't mentioned"}. </Text>
              <Text>תיאור: { props.propertie.content || "Didn't mentioned"}. </Text>
            </View>

            {/* Deatails about the properie */}

            <View style={styles.propertieView}>
              <View style={styles.propertieTextLeft}>
                <Text>מספר חניות:   { props.propertie.parking || "Didn't mentioned"}. </Text>
                <Text>האם ניתן בעלי חיים?   { props.propertie.petsAllowed || "Didn't mentioned"}. </Text>
                <Text>דירה משופצת?   { props.propertie.isRenovated || "Didn't mentioned"}.</Text>
                <Text>יש מעלית?   { props.propertie.hasElevator || "Didn't mentioned"}. </Text> 
                <Text>כניסה מידית?   { props.propertie.immediateEntry || "Didn't mentioned"}. </Text>  
                <Text>טובה לשותפים?   { props.propertie.goodForRoommates || "Didn't mentioned"}. </Text> 
                <Text>מרוהטת?   { props.propertie.isFurnished || "Didn't mentioned"}. </Text> 
                <Text>רחוב רועש?   { props.propertie.address.isNoisyStreet === false ? 'No' : 'yes' || "Didn't mentioned"}. </Text>
                <Text>הדירה מוארת?   { props.propertie.hasNaturalLight || "Didn't mentioned"}. </Text> 
              </View>
              <View style={styles.propertieTextRight}>
                <Text>כתובת:   { props.propertie.address.street || "Didn't mentioned"}.</Text>
                <Text>שכר דירה:   { props.propertie.rentPrice || "Didn't mentioned"}.</Text>

                <Text>גודל הדירה:   { props.propertie.squareMeters || "Didn't mentioned"}.</Text>
                <Text>מתיווך?   {( props.propertie.isBroker === false ? 'No' : 'yes') || "Didn't mentioned"}. </Text>
                <Text>יש מרפסת?   {( props.propertie.hasBalcony === false ? 'No' : 'yes') || "Didn't mentioned"}. </Text>
                <Text>יש גינה?   {( props.propertie.hasGarden === false ? 'No' : 'yes') || "Didn't mentioned"}. </Text>
                <Text>יש גג?   {( props.propertie.hasRoof === false ? 'No' : 'yes') || "Didn't mentioned"}. </Text>
                <Text>דירת פרטר?   {( props.propertie.isParter === false ? 'No' : 'yes') || "Didn't mentioned"}. </Text>
              </View>
            </View>

            {/* Photos of the propertie */}
            <View style={styles.photos}>
              {props.propertie.photosCount !==0 && 
              props.propertie.photos.map((img, index) => {
                return <Image key={index} source={ {uri: img}} resizeMode="cover"/>
              })}
            </View>

            {/* Close button */}
              <Pressable
                style={styles.button}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
          </View>
          </ScrollView>
        </SafeAreaView>
        </Modal>

        {/* View more button */}

        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>
            View More Details
          </Text>
        </Pressable>
      </View>

    );      
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  header:{
    flex: 1,
    flexDirection: "row-reverse",
    alignItems: "center",
    
  },
    propertieView: {
      flex: 3,
      flexDirection:"row",
      justifyContent: "flex-end",
      marginTop: 22
    },
    propertieTextLeft: {
       margin: 10,
       marginLeft: 0,
       flexShrink: 1

    },
    propertieTextRight: {
      margin: 10,
      marginRight: 0,
      flexShrink: 1

    },
    modalView: {
      justifyContent: "center",
      alignItems: "center",
      margin: 10,
      backgroundColor: "#FEFBF3",
      borderRadius: 20,
      padding: 20,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
  
      borderRadius: 15,
      padding: 5,
      elevation: 2,
      backgroundColor: "#A6A9B6"
    },
    textStyle: {
      color: "black",
      fontWeight: "bold",
      textAlign: "center"
    },
    icon: {
      padding: 12,
    },
    iconContainer: {
      backgroundColor: "red",
    },
    photos: {
      flex: 3
    },
    img: {
      width: "100%",
      alignSelf: "center",
    },
  });