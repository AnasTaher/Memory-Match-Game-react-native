import React from 'react';
import { StyleSheet, Text, View , TouchableOpacity, ScrollView} from 'react-native';

export default function MMTile(props) {
    const {color, match, id, isOpen, clickTile} = props;

    function openCheck(){
        if (props.isOpen) {
            return props.tileColor
        } else {return null}
    }
    return (
        <TouchableOpacity style={styles.tile} onPress={()=>props.clickTile(props.id)}>
           <View style={[styles.tilecenter, openCheck()]} >
               
           </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
	tile: {
        justifyContent: 'center',
		alignItems: 'center',
        backgroundColor: "grey" ,
        //flexWrap: "wrap",
        height: 90,
        width: 90,
        elevation: 8,
        borderWidth: .5,
	},
    tilecenter: {
        height: '95%',
        width: '95%',
    }
})