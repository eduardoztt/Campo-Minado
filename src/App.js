import React, { Component } from "react";
import { Alert, SafeAreaView, StyleSheet, Text, View } from "react-native";

import paramns from "./paramns";
import Field from "./components/Field";
import MineField from "./components/MineField";
import { createMinedBoard, cloneBoard, showMines, wonGame, hadExplosion, openField } from "./functions";

export default class App extends Component {

    constructor(props) {
        super(props)
        this.state = this.createState()
    }

    minesAmout = () => {
        const cols = paramns.getColumnsAmout()
        const rows = paramns.getRowsAmout()
        return Math.ceil(cols * rows * paramns.difficultLevel)
    }

    createState = () => {
        const cols = paramns.getColumnsAmout()
        const rows = paramns.getRowsAmout()
        return {
            board: createMinedBoard(rows, cols, this.minesAmout()),
            won: false, 
            lost: false
        }
    }

    onOpenField = (row,column) => {
        const board =  cloneBoard(this.state.board)
        openField(board,row,column)
        const lost = hadExplosion(board)
        const won = wonGame(board)

        if(lost){
            showMines(board)
            Alert.alert('Perdeuu!','Que burro!!!!!')
        }

        if(won){
            Alert.alert('Parabéns','you win!')
        }

        this.setState({board,lost,won})
    }

    render() {
        return (
            <SafeAreaView style={style.container}>
                <Text>Iniciando o Campo Minado!</Text>
                <Text>
                    Tamanho da Grade:
                    {paramns.getColumnsAmout()}x{paramns.getRowsAmout()}
                </Text>
                <View style={style.board}>
                    <MineField board={this.state.board} 
                    onOpenField={this.onOpenField}/>
                </View>

            </SafeAreaView>

        )
    }

}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
    },
    board: {
        alignItems: "center",
        backgroundColor: '#AAA',
    }
})
