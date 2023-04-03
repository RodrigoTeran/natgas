import React from 'react'
import styles from "../style.module.css"
import { Line } from 'react-chartjs-2';
import { IMesaurements, IDataset } from "../Progress.types";

interface Props {
  data: IMesaurements;
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

export const Data = ({
  data
}: Props) => {

  const getArrayDates = (): Set<string> => {
    const arr: Set<string> = new Set();

    for (let i = 0; i < Object.keys(data).length; i++) {
      const key = Object.keys(data)[i];
      const value = data[key];

      for (let j = 0; j < value.dates.length; j++) {
        const date = new Date(value.dates[j]);
        arr.add(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
      }
    }

    return arr;
  };

  const getAllDatasets = (): Array<IDataset> => {
    const arr: Array<IDataset> = [];

    for (let i = 0; i < Object.keys(data).length; i++) {
      const key = Object.keys(data)[i];
      const value = data[key];

      arr.push({
        label: key,
        data: value.measurements,
        borderColor: mapBorderColor.get(key) || "#FFFFFF",
        backgroundColor: "#FFFFFF"
      })
    }

    return arr;
  }

  const getDatasets = (): any => {    
    return {
      labels: Array.from(getArrayDates()),
      datasets: getAllDatasets()
    }
  }

  return (
    <Line className={styles.inside_graph} options={options} data={getDatasets()}></Line>
  )
}
