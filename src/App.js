import React, { Component } from "react";
import { Alert, SafeAreaView, StyleSheet, Text, View } from "react-native";

import paramns from "./paramns";
import Field from "./components/Field";
import MineField from "./components/MineField";
import { createMinedBoard, cloneBoard, showMines, wonGame, hadExplosion, openField, invertFlag, flagsUsed } from "./functions";
import Header from "./components/Header";
import LevelSelection from "./screens/LevelSelection";

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
            lost: false,
            showLevelSelect: false
        }
    }

    onOpenField = (row, column) => {
        const board = cloneBoard(this.state.board)
        openField(board, row, column)
        const lost = hadExplosion(board)
        const won = wonGame(board)

        if (lost) {
            showMines(board)
            Alert.alert('Perdeuu!', 'Que burro!!!!!')
        }

        if (won) {
            Alert.alert('Parabéns', 'you win!')
        }

        this.setState({ board, lost, won })
    }

    onSelectField = (row, column) => {
        const board = cloneBoard(this.state.board)
        invertFlag(board, row, column)
        const won = wonGame(board)

        if (won) {
            Alert.alert('Parabéns', 'you win!')
        }

        this.setState({ board, won })
    }

    onLevelSelect = level => {
        paramns.difficultLevel = level
        this.setState(this.createState())
    }

    render() {
        return (
            <SafeAreaView style={style.container}>
                <LevelSelection isVisible={this.state.showLevelSelect}
                    onLevelSelect={this.onLevelSelect}
                    onCancel={() => this.setState({ showLevelSelect: false })} />
                <Header flagsLeft={this.minesAmout() - flagsUsed(this.state.board)}
                    onNewGame={() => this.setState(this.createState())}
                    onFlagPress={() => this.setState({showLevelSelect: true})} />
                <View style={style.board}>
                    <MineField board={this.state.board}
                        onOpenField={this.onOpenField}
                        onSelectField={this.onSelectField} />
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
