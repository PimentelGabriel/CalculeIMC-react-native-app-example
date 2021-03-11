import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import {Alert} from 'react-native'; 
import styles from 'styled-components/native';
import Theme from './assets/colorTheme/Colors';

console.log(Theme);

const Pagina = styles.View`
  flex: 1;
  padding: 30px 10px 0;
  align-items: center;

  background-color: ${Theme.CorA[2]}
`; 

const Texto = styles.Text`
  font-size: 40px;
  font-weight: bold;
  margin: 10px 10px 20px;
  color: ${Theme.CorD[3]};
`;

const Input = styles.TextInput`
  width: 85%;
  font-size: 25px;
  padding:  3px 10px;
  border: 2px solid ${Theme.CorA[1]};
  border-radius: 7px;
  margin: 10px 0;
`;

const Butao = styles.TouchableOpacity`
  margin: 30px;
  background-color: ${Theme.CorC[3]};
  
  border-radius: 10px;
  width: 50%;
  padding: 10px;
  align-items: center;
`;

const TextoBtn = styles.Text`
  font-size: 25px;
  color: ${Theme.CorB[3]}
`;

export default function App() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');

  function AvaliacaoIMC(IMCaux){
    var result;
    if(IMCaux<18.5){
      result = 'abaixo do peso';
    }else if(IMCaux>=18.5 && IMCaux<24.9){
      result = 'com o peso normal';
    }else if(IMCaux>=24.9 && IMCaux<29.9){
      result = 'com sobrepeso';
    }else if(IMCaux>=29.9 && IMCaux<34.9){
      result = 'com obesidade grau 1';
    }else if(IMCaux>=34.9 && IMCaux<40){
      result = 'com obesidade grau 2';
    }else if(IMCaux>=40){
      result = 'com obesidade grau 3';      
    }

    return 'Seu IMC é '+IMCaux+' você está '+result;
  }

  function formulaIMC(pesoAux=1, alturaAux){
    var IMC = -1;
    IMC = parseFloat(pesoAux) / parseFloat(Math.pow(alturaAux,2));
    IMC = +IMC.toFixed(2);

    console.log(typeof IMC, IMC);
    if(typeof(IMC) === 'number'
      && !isNaN(IMC) 
      && !(IMC === Number.NEGATIVE_INFINITY || IMC === Number.POSITIVE_INFINITY)
    ){
      return IMC;
    }else{
      return -1;
    }
  }

  function ShowResultAlert(result){
    Alert.alert(
      "Resultado",
      result
      [
        { text: "OK"}
      ]
    );
  }

  function Calcular(){
    var IMC = formulaIMC(peso, altura);

    if(IMC !== -1){
      setAltura('');
      setPeso('');
  
      Alert.alert(
        "Resultado",
        AvaliacaoIMC(IMC),
        [
          { text: "OK"}
        ],
        { cancelable: false }
      );
    }
  }

  return (
    <Pagina>
      <StatusBar
        barStyle = "dark-content"
        animated = {true}
        hidden = {true}
        backgroundColor = {Theme.CorA[1]}
        translucent = {true}
        networkActivityIndicatorVisible = {false}
      />

      <Texto>Calcule seu IMC</Texto>
      <Input
        placeholder="Peso (Kl)"
        value={peso}
        onChangeText={peso => {
          setPeso(peso);
        }}
      
        keyboardType='numeric'
      />

      <Input
        placeholder="Altura (cm)"
        value={altura}
        onChangeText={altura => {
          setAltura(altura);
        }}

        keyboardType='numeric'
      />

      <Butao onPress={Calcular}>
        <TextoBtn>
          Calcular
        </TextoBtn>
      </Butao>
      <StatusBar style="auto" />
    </Pagina>
  );
}