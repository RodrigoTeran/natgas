import React from 'react'
import styles from "../style.module.css"
import { Line } from 'react-chartjs-2';
import { IMeasurements, IDataset } from "../Progress.types";

interface Props {
  data: IMeasurements;
}

const mapBorderColor: Map<string, string> = new Map();
mapBorderColor.set("weight", "#FF6159");
mapBorderColor.set("neck", "#50514F");
mapBorderColor.set("chest", "#B63D96");
mapBorderColor.set("leftarm", "#68954F");
mapBorderColor.set("rightarm", "#54B399");
mapBorderColor.set("leftforearm", "#FF6159");
mapBorderColor.set("rightforearm", "#805EA5");
mapBorderColor.set("waist", "#BF2727");
mapBorderColor.set("hip", "#322F87");
mapBorderColor.set("leftleg", '#247BA0');
mapBorderColor.set("rightleg", '#5B1B18');
mapBorderColor.set("leftcalve", '#292828');
mapBorderColor.set("rightcalve", '#DDBB21');

const dictionary = new Map<string, string>();
dictionary.set('chest', 'Pecho');
dictionary.set('hip', 'Cadera');
dictionary.set('leftarm', 'Brazo izq');
dictionary.set('leftcalve', 'Pantorrilla izq');
dictionary.set('leftforearm', 'Antebrazo izq');
dictionary.set('leftleg', 'Pierna izq');
dictionary.set('neck', 'Cuello');
dictionary.set('rightarm', 'Brazo der');
dictionary.set('rightcalve', 'Pantorrilla der');
dictionary.set('rightforearm', 'Antebrazo izq');
dictionary.set('rightleg', 'Pierna der');
dictionary.set('waist', 'Cintura');
dictionary.set('weight', 'Peso');

const options = {
  responsive: true,

  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: true,
        color: "rgba(255, 255, 255, 0.2)",
      }
    },
    y: {
      grid: {
        display: true,
        color: "rgba(255, 255, 255, 0.2)",
      }
    }
  }

};

/*const compare = (a: string, b: string) => { // DD/MM/AA
  const fechaA = a.split('/'), fechaB = b.split('/');

  if (fechaA[2] < fechaB[2]) return -1; else if (fechaA[2] > fechaB[2]) return 1;
  if (fechaA[1] < fechaB[1]) return -1; else if (fechaA[1] > fechaB[1]) return 1;
  if (fechaA[0] < fechaB[0]) return -1; else return 0;
}*/

export const Data = ({
  data
}: Props) => {

  const getArrayMax = (): number[] => {
    //const arr: Set<number> = new Set();
    const arr: number[] = [];
    let max = 0;

    for (let i = 0; i < Object.keys(data).length; i++) {
      const key = Object.keys(data)[i];
      const value = data[key];

      if(value.measurements.length > max) max = value.measurements.length;

      /*for (let j = 0; j < value.dates.length; j++) {
        const date = new Date(value.dates[j]);
        arr.add(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
      }*/
    }

    for(let i = 0; i < max; i++){
      arr.push(i + 1);
    }

    return arr;
  };

  const getAllDatasets = (): Array<IDataset> => {
    const arr: Array<IDataset> = [];

    for (let i = 0; i < Object.keys(data).length; i++) {
      const key = Object.keys(data)[i];
      const value = data[key];

      arr.push({
        label: dictionary.get(key) || "",
        data: value.measurements,
        borderColor: mapBorderColor.get(key) || "#FFFFFF",
        backgroundColor: "#FFFFFF"
      })
    }

    return arr;
  }

  const getDatasets = (): any => {      
    return { 
      labels: getArrayMax(),     
      //labels: Array.from(getArrayDates()).sort(compare),
      datasets: getAllDatasets(),
    }
  }

  return (
    <Line className={styles.inside_graph} options={options} data={getDatasets()}></Line>
  )
}
