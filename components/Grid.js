import React, { useState, useReducer, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import MMTile from './Tile';
import { colorPicker, shuffle } from '../scripts/mods';

//Creates a set of tiles {2.color, 2.match, 1.id, isOpen}
function tileSetSetter(size = 14) {
    let arr = [];

    for (let i = 0; i < size; i++) {
        arr.push({
            color: { backgroundColor: colorPicker() },
            match: Math.random().toString(36).substring(7)
        })

    }

    let clone = JSON.parse(JSON.stringify(arr));
    let teat = [1, 2, 3]
    let arrc = arr.concat(clone);

    arrc.map(obj => {
        let id = Math.random().toString(36).substring(7);
        obj.id = id;
        obj.isOpen = false;
        obj.isPaired = false;
    });

    return shuffle(arrc);
};

function reducer(state, action) {
    switch (action.type) {
        case 'open':
            return state.map((tile) => {
                if (tile.id == action.id)
                    return { ...tile, isOpen: true }
                else
                    return tile;
            })
            break;
        case 'close':
            return state.map((tile) => {
                if (tile.id == action.id)
                    return { ...tile, isOpen: false }
                else
                    return tile;
            })
            break;
        case 'pair':
            return state.map((tile) => {
                if (tile.match == action.match)
                    return { ...tile, isPaired: true }
                else
                    return tile;
            })
            break;
        case 'reset':
            return tileSetSetter();
            break;
        default:
            return state;
            break;
    }
};

export default function MMGrid(props) {
    const [tiles, dispatch] = useReducer(reducer, tileSetSetter());//Generate Tiles.
    const [tileOne, setTileOne] = useState(null);
    const [tileTwo, setTileTwo] = useState(null);

    //const [numMatches, setNumMatches] = useState(0);//Number of Matched Pair.
    //const [numMoves, setNumMoves] = useState(0);//Number total moves.

    function resetTiles() { setTileOne(null); setTileTwo(null); dispatch({ type: "reset" }) };
    useEffect(() => {

        tiles.map(e => { dispatch({ type: 'open', id: e.id }) })
        setTimeout(() => { tiles.map(e => { dispatch({ type: 'close', id: e.id }) }); }, 3000)

        return () => {

        }
    }, [])

    useEffect(() => {

        if (tileTwo !== null) {

            if (tileOne.match == tileTwo.match) {
                dispatch({ type: 'pair', match: tileOne.match });

                setTileOne(null);
                setTileTwo(null);

            } else if (tileOne.match !== tileTwo.match) {
                setTimeout(() => {
                    dispatch({ type: 'close', id: tileTwo.id });
                    dispatch({ type: 'close', id: tileOne.id });
                }, 1000)

                setTileOne(null);
                setTileTwo(null);

            }
        }
        let pairsCheck = tiles.every(tile => tile.isPaired === true);
        
        tiles.map(tile => {
            if (tile.isPaired === true) {
                dispatch({ type: 'open', id: tile.id });
            }
        });
        
        if (pairsCheck) { resetTiles() }
        return () => {

        }
    }, [tileTwo])

    function clickTile(id) {

        let index = tiles.findIndex((tile) => {
            return tile.id == id
        })

        let tile = tiles[index]
        let selectTile = { id, match: tiles[index].match, isPaired: tiles[index].isPaired };

        if (selectTile.isPaired == false) {
            if (tileOne !== null && tileOne.id !== selectTile.id) {
                console.log('Tile1')
                setTileTwo(selectTile);
                dispatch({ type: 'open', id });

            } else if (tileOne == null) {
                console.log('Tile0')
                setTileOne(selectTile);
                dispatch({ type: 'open', id });
                return;
            }
        }

    }


    return (
        <View style={styles.body}>

            {/* <MMTile clickTile={resetTiles} /> */}
            {tiles.map((tile, index) => {
                return (
                    <MMTile
                        key={index}
                        id={tile.id}
                        tileColor={tile.color}
                        match={tile.match}
                        isOpen={tile.isOpen}
                        clickTile={clickTile}
                    />)
            })
            }
        </View>
    )

};

const styles = StyleSheet.create({
    body: {
        flexShrink: 1,
        flexWrap: "wrap",
        justifyContent: 'center',
        //alignContent: 'center',
        marginTop: 50,
        marginBottom: 50,
        marginLeft: 5,
        marginRight: 5
    }
})