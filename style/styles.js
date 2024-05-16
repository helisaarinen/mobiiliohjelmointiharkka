import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //        backgroundColor:'#C1FFEC',
        //        backgroundColor:'#9AFCD4',
        backgroundColor: '#D1FFF0',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    frontpagetextbuttons: {
        backgroundColor: '#276CB1',
        padding: 10,
        fontSize: 30,
        borderRadius: 10,
        color: 'white',
        fontWeight: 'bold',
        letterSpacing: 2,
        textAlign: 'center',
        marginTop: 5,
        width: 320,
        fontSize: 24,
        /*
        textShadowColor: 'rgba(0, 0, 0, 0.75)', // Varjostuksen väri
        textShadowOffset: { width: 2, height: 2 }, // Varjostuksen siirtymä
        textShadowRadius: 5 // Varjostuksen säde
        */
    },

    timer: {
        backgroundColor: '#266BB1',
        backgroundColor: 'red',
        fontSize: 30,
        borderRadius: 10,
        color: 'white',
        fontWeight: 'bold',
        letterSpacing: 2,
        textAlign: 'center',
        width: '23%'
    },

    unit: {
        backgroundColor: '#266BB1',
        fontSize: 10,
        borderRadius: 10,
        color: 'white',
        fontWeight: 'bold',
        letterSpacing: 2,
        textAlign: 'center',
        width: '24%',
    },
    timerBox: {
        alignItems: 'center',
        //backgroundColor:'purple'
    },
    timerTime: {
        fontSize: 25,
        marginVertical: 1,
        color: 'green'
    },
    timerUnit: {
        fontSize: 14,
        color: 'gray',
        //marginBottom:1
    },

    ottelutFlatlist: {
        backgroundColor:'#CFEBFD',
//        backgroundColor: 'lightblue',
        width: '95%',
        marginTop: 5
    },

    ottelutFlatlistHeader: {
        flexDirection: 'row',
        borderBottomColor: '#35ADF7',
        borderBottomWidth: 2,
        borderColor: '#0991E5',
        alignItems: 'center',
       // backgroundColor:'#5ABCF8',
        paddingVertical:3
    },

    ottelutKlo: {
        width: '15%',
        //  borderRightWidth: 1,
        // borderRightColor: 'black' 
    },
    ottelutKentta: {
        width: '15%',
        alignItems: 'center',
        justifyContent:'center',
        paddingHorizontal: 2,
        //borderRightWidth: 1,
        // borderRightColor: 'black'
    },

    ottelutKoti: {
        width: '34%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 2,
        //borderRightWidth: 1,
        //borderRightColor: 'black',

    },
    ottelutVieras: {
        paddingHorizontal: 2,
        width: '34%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: 2
    },

    logoPieni: {
        width: 25,
        height: 25,
        margin: 2,
    },
    joukkueetName: {
        fontSize: 16,
        marginLeft: 10,
        //     backgroundColor:'blue',
        width: '65%'
      },

    tuloksetKlo: {
        width: '20%',
        //  borderRightWidth: 1,
        // borderRightColor: 'black' 
    },

    tuloksetKoti: {
        width: '30%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 2,
        textAlign: 'right',
        //borderRightWidth: 1,
        //borderRightColor: 'black',

    },
    tuloksetVieras: {
        paddingHorizontal: 2,
        width: '30%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: 2,
    },

    tuloksetTulos: {
        width: '20%',
        justifyContent: 'center'
    },

    listaccordion: {
        //         backgroundColor:'lightgreen',
        //      backgroundColor: '#A7E2FF',
        //backgroundColor:'pink',
        backgroundColor: '#6BD7FD',
        marginVertical: 0.5,
        border: 5,
        borderColor: 'black',
        borderRadius: 5,
        color: 'green',
        overflow: 'visible',
        textDecorationLine: 'line-through',
        textDecorationColor: 'purple', //MIKÄ TÄÄ ON?
    },
    openedPage: {
        flex: 1,
        //backgroundColor: '#B9FFE9',
        width: 280,
        marginVertical: 5
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 5,
        marginVertical: 5
    },
    h2: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop: 10
    },
    tekstisisalto: {
        fontSize: 16,
        marginBottom: 5
    },
    mapstyle: {
        width: '100%',
        height: 200
    },
    item: {
        //        backgroundColor: '#f9c2ff',
        marginVertical: 1,
        marginHorizontal: 15,
        flexDirection: 'column',
    },
});

export default styles;
