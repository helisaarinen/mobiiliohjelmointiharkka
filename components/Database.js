import { useEffect, useState } from 'react';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAO9fCYc1WRekqoFXCfThNXQUc4RGGyLdw",
  authDomain: "harkka-d0123.firebaseapp.com",
  databaseURL: "https://harkka-d0123-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "harkka-d0123",
  storageBucket: "harkka-d0123.appspot.com",
  messagingSenderId: "328663011614",
  appId: "1:328663011614:web:3069ba8fb3c4893c52390f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//postgres://postgres.ulpvgmbqdveehyrvivgk:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:5432/postgres


export default function Database() {

    const [turnaus, setTurnaus] = useState({
        turnaus_id: '',
        nimi: '',
        alkuaika: '',
        loppuaika:'',
        yhteyshenkiloEtunimi: '',
        yhteyshenkiloSukunimi: '',
        email: '',
        puh: ''
    });

    const [joukkue, setJoukkue] = useState({
        joukkue_id: '',
        seura_id:'', //fk
        nimi:'',
        yhteyshenkiloEtunimi: '',
        yhteyshenkiloSukunimi: '',
        email:'',
        puh:'',
        suosikki: false
    })

    const [seura, setSeura] = useState({
        seura_id:'',
        nimi:'',
        kunta:'',
        verkkosivu:'',
        logo:''
    })

    const [ottelu, setOttelu] = useState({
        ottelu_id:'',
        turnaus_id: '', // fk lisätty 26.4.24 
        alkaa:'',
        loppuu:'',
        kotijoukkue:'', // fk joukkue_id
        vierasjoukkue:'', // fk joukkue_id
        kenttä_id:'',
        sarja_id:'',
        kotimaalit:'',
        vierasmaalit:''
    })

    const [kentta, setKentta] = useState({
        kentta_id:'',
        kentta:''
    })

    const [sarja, setSarja] =useState({
        sarja_id: '',
        sarja:''
    })

    const [sarjat, setSarjat] = useState([]);
    const [turnaukset, setTurnaukset] = useState([]);
    const [joukkueet, setJoukkueet] =useState([]);
    const [seurat, setSeurat] =useState([]);
    const [ottelut, setOttelut] = useState([]);
    const [kentat, setKentat] = useState([]);
/*
    useEffect(() => {

        onValue(ref(database, 'kentat/'), (snapshot) => {
            const data = snapshot.val();
            if(data){
                const kenttalist = Object.keys(data).map(key => ({...data[key], key}));
                setKentat(kenttalist);
            }else{
                setKentat([]);
                console.log('Ei löytynyt kenttiä');
            }
            console.log('Kentät: ' + data);
        })
        
        onValue(ref(database, 'seurat/'), (snapshot) => {
            const data = snapshot.val();
            if(data){
                const seuralist = Object.keys(data).map(key => ({...data[key], key}));
                setSeurat(seuralist);
            }else{
                setSeurat([]);
                console.log('Ei löytynyt seuroja');
            }
            console.log('Seurat: ' + data);
        })

        onValue(ref(database, 'kentat/'), (snapshot) => {
            const data = snapshot.val();
            if(data){
                const kenttalist = Object.keys(data).map(key => ({...data[key], key}));
                setKentat(kenttalist);
            }else{
                setKentat([]);
                console.log('Ei löytynyt kenttiä');
            }
            console.log('Kentät: ' + data);
        })

        
        onValue(ref(database, 'joukkueet/'), (snapshot) => {
            const data = snapshot.val();
            if(data){
                const joukkuelist = Object.keys(data).map(key => ({...data[key], key}));
                setJoukkueet(joukkuelist);
            }else{
                setJoukkueet([]);
                console.log('Ei löytynyt joukkueita');
            }
            console.log('Joukkueet: ' + data);
        })

        
        onValue(ref(database, 'turnaukset/'), (snapshot) => {
            const data = snapshot.val();
            if(data){
                const turnauslist = Object.keys(data).map(key => ({...data[key], key}));
                setTurnaukset(turnauslist);
            }else{
                setTurnaukset([]);
                console.log('Ei löytynyt turnauksia');
            }
            console.log('Turnaukset: ' + data);
        })

        onValue(ref(database, 'ottelut/'), (snapshot) => {
            const data = snapshot.val();
            if(data){
                const ottelulist = Object.keys(data).map(key => ({...data[key], key}));
                setOttelut(ottelulist);
            }else{
                setOttelut([]);
                console.log('Ei löytynyt otteluita');
            }
            console.log('Ottelut: ' + data);
        })
    })*/
/*
    return(
        <DatabaseContext.Provider value={{joukkueet}}>
            {children}
        </DatabaseContext.Provider>

    )
*/


};


