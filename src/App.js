import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

import paramns from "./paramns";
import Field from "./components/Field";


 export default () =>{

    return(
        <SafeAreaView style={style.container}>
            <Text>Iniciando o Campo Minado!</Text>
            <Text>
                Tamanho da Grade:
                {paramns.getColumnsAmout()}x{paramns.getRowsAmout()}
            </Text>
            <Field />
            <Field opened/>
            <Field opened  nearMines={1}/>
            <Field opened nearMines={3}/>
            <Field opened nearMines={6}/>
            <Field mined/>
            <Field mined opened/>
            <Field mined opened exploded/>
            <Field flagged/>
            <Field flagged opened/>
            
        </SafeAreaView>

    )

}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems:"center",
    
    }
})
