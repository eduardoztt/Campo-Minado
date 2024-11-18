import React from "react";
import { Dimensions } from "react-native";

const params = {
    blockSize: 30,
    borderSize: 5,
    fontSize: 15,
    hearderRatio: 0.15, //proporção do painel superior na tela
    difficultLevel: 0.1,
    getColumnsAmout(){
        const width = Dimensions.get("window").width
        return Math.floor(width / this.blockSize)
    },
    getRowsAmout(){
        const totalHeight = Dimensions.get("window").height
        const boardHeight = totalHeight * (1 - this.hearderRatio)
        return Math.floor(boardHeight / this.blockSize)
    }
}


export default params 