import React from 'react'
import styles from "./style.module.css";
import Dashboard from '../../layouts/Dashboard/Dashboard';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext} from "react";
import { MessagesContext } from "../../layouts/Messages/Messages";
import { getAll } from '../../routes/progreso/progress.routes';
import { Line } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';


  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

export const Progreso = () => {
    
    const { addStaticMsg } = useContext(MessagesContext);
    const [measures, setMeasures] = useState<any>([]);
    const [bodyParts, setBodyParts] = useState<any>([]);

    
    const navigate = useNavigate();
    const dictionary = {
        "chest": "Pecho",
        "hip": "Cadera",
        "leftarm": "Brazo izq-",
        "leftcalve": "Pantorrilla izq",
        "leftforearm": "Antebrazo izq.",
        "leftleg": "Pierna izq",
        "neck": "Cuello",
        "rightarm": "Brazo der",
        "rightcalve": "Pantorrilla der",
        "rightforearm": "Pantorrilla izq",
        "rightleg": "Pierna der",
        "waist": "Cintura",
        "weight": "Peso",
    }
    const body = 
        ['chest', 'hip', 'leftarm', 'leftcalve', 
        'leftforearm', 'leftleg', 'neck', 'rightarm', 'rightcalve', 
        'rightforearm', 'rightleg', 'waist', 'weight'];
    

    const peso = '#FF6159';
    const cuello= '#50514F';
    const pecho= '#B63D96';
    const brazo_i = '#68954F';
    const brazo_d = '#54B399';
    const antebrazo_i = '#FF6159';
    const antebrazo_d = '#805EA5';
    const cintura = '#BF2727';
    const cadera = '#322F87';
    const pierna_i = '#247BA0';
    const pierna_d = '#5B1B18';
    const pantorrila_i = '#292828';
    const pantorrila_d = '#DDBB21';

      const getAllController = (): void => {
        const doFetch =async () => {
            const fetchAll = await getAll();

            if (fetchAll === null) {
                addStaticMsg("Error al obtener el progreso", "danger");
                return;
            }

            if (fetchAll.msg !== "") {
                addStaticMsg(fetchAll.msg, "danger");
                return;
            }
            setMeasures(fetchAll.data.data);   
        }

        void doFetch();
      }



      const options = {
        responsive: true,
       
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display:false,
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
      
      const labels = ['1', '2'];
      //const labels = Array.from({length: 10}, (_, i) => i + 0.5);
      //const labels = Array.from(Array(7).keys()); 
      const data = {

        labels,
        /*datasets: [
            {
            data: [0, 1],
            borderColor: pecho,
            backgroundColor: 'rgba(255, 255, 255, 1)',
        }]*/
       datasets: [
          {
            //label: 'Dataset chest',
            data: [1, 2],
            borderColor: pecho,
            backgroundColor: 'rgba(255, 255, 255, 1)',
          },
          /*{
            //label: 'Dataset hip',
            data: measures.hip.measurements || [0],
            borderColor: cadera,
            backgroundColor: 'rgba(28, 87, 100, 1)',
          },
          {
            //label: 'Dataset leftarm',
            data: measures.leftar.measurements || [0],
            borderColor: brazo_i,
            backgroundColor: 'rgba(255, 255, 255, 1)',
          },
          {
            //label: 'Dataset leftcalve',
            data: measures.leftcalve.measurements || [0],
            borderColor: pantorrila_i,
            backgroundColor: 'rgba(255, 255, 255, 1)',
          },
          {
            //label: 'Dataset leftforearm',
            data: measures.leftforearm.measurements || [0],
            borderColor: antebrazo_i,
            backgroundColor: 'rgba(28, 87, 100, 1)',
          },
          {
            //label: 'Dataset leftleg',
            data: measures.leftleg.measurements || [0],
            borderColor: pierna_i,
            backgroundColor: 'rgba(255, 255, 255, 1)',
          },
          {
            //label: 'Dataset neck',
            data: measures.neck.measurements || [0],
            borderColor: cuello,
            backgroundColor: 'rgba(255, 255, 255, 1)',
          },
          {
            //label: 'Dataset rightarm',
            data: measures.rightarm.measurements  || [0],
            borderColor: brazo_d,
            backgroundColor: 'rgba(28, 87, 100, 1)',
          },
          {
            //label: 'Dataset rightcalve',
            data: measures.rightcalve.measurements || [0],
            borderColor: pantorrila_d,
            backgroundColor: 'rgba(255, 255, 255, 1)',
          },
          {
            //label: 'Dataset rightforearm',
            data: measures.rightforearm.measurements || [0],
            borderColor: antebrazo_d,
            backgroundColor: 'rgba(255, 255, 255, 1)',
          },
          {
            //label: 'Dataset rightleg',
            data: measures.rightleg.measurements || [0],
            borderColor: pierna_d,
            backgroundColor: 'rgba(28, 87, 100, 1)',
          },
          {
            //label: 'Dataset waist',
            data: measures.waist.measurements || [0],
            borderColor: cintura,
            backgroundColor: 'rgba(28, 87, 100, 1)',
          },
          {
            //label: 'Dataset weight',
            data: measures.weight.measurements || [0],
            borderColor: peso,
            backgroundColor: 'rgba(28, 87, 100, 1)',
          },*/
        ]
      };

      useEffect(() => {
        getAllController();
      }, []);

  return (
    <Dashboard>
    <div className={styles.layout}>
            <div className={styles.update}>
                <button onClick={() => {navigate('/actualizar-medidas')}}>Actualizar medidas</button>
            </div>
            
            <section className={styles.general_info}>
                <div className={styles.calendar}>
                    <div className={styles.calendar_info}>
                        <div className={styles.calendar_item}>
                            <label htmlFor="inicio">Desde</label>
                            <input type="date" name="inicio" id="inicio"/>
                        </div>

                        <div className={styles.calendar_item}>
                            <label htmlFor="inicio">Hasta </label>
                            <input type="date" name="fin" id="fin"/>
                        </div>
                    </div>

                    <h2>Información General</h2>

                    <div></div>
                </div>
                
                <article className={styles.general_info_card}>
                    <div className={styles.tags}>
                        {body.map((element: string, key: number) => {
                            return (
                                <div className={styles.element} key={key}>
                                    <p>{dictionary[element]}</p>"[ola" "ola"
                                    <a href="#">&times;</a>
                                </div>);
                        })}
                        
                    </div>

                    <div className={styles.general_graph}>
                        <Line className={styles.inside_graph} options={options} data={data}></Line>
                    </div>
                </article>
            </section>
            
            <section className={styles.detailed}>
                <h2>Vistas Detalladas</h2>
                <div className={styles.detailed_info}>
                    <article>  
                        <div className={styles.aux}>
                            <div className={styles.calendar_info}>
                                <div className={styles.calendar_item}>
                                    <label htmlFor="inicio">Desde</label>
                                    <input type="date" name="inicio" id="inicio"/>
                                </div>

                                <div className={styles.calendar_item}>
                                    <label htmlFor="inicio">Hasta </label>
                                    <input type="date" name="fin" id="fin"/>
                                </div>
                            </div>
                            {/*<a className={styles.remove} href="">&times;</a>*/}
                            <div className={styles.tags}>
                                <div className={styles.peso}>
                                    <p>Peso</p>
                                    <a href="#">&times;</a>
                                </div>
                                <div className={styles.pecho}>
                                    <p>Pecho</p>
                                    <a href="#">&times;</a>
                                </div>

                                <div className={styles.cuello}>
                                    <p>Cuello</p>
                                    <a href="#">&times;</a>
                                </div>
                                
                                <select className={styles.more} name="medida" id="medida">
                                    <option value="add" disabled selected hidden>+</option>
                                    <option value="cintura">Cintura</option>
                                    <option value="cadera">Cadera</option>
                                    <option value="cuello">Cuello</option>
                                    <option value="pierna_izquierda">Pierna izq.</option>
                                </select>
                            </div>

                            <div className={styles.graph}>
                                <Line className={styles.inside_graph} options={options} data={data}></Line>
                            </div>
                        </div>
                    </article>

                    <article>  
                        <div className={styles.aux}>
                            <div className={styles.calendar_info}>
                                    <div className={styles.calendar_item}>
                                        <label htmlFor="inicio">Desde</label>
                                        <input type="date" name="inicio" id="inicio"/>
                                    </div>

                                    <div className={styles.calendar_item}>
                                        <label htmlFor="inicio">Hasta </label>
                                        <input type="date" name="fin" id="fin"/>
                                    </div>
                                </div>
                            {/*<a className={styles.remove} href="">&times;</a>*/}
                            <div className={styles.tags}>
                                <div className={styles.peso}>
                                    <p>Peso</p>
                                    <a href="#">&times;</a>
                                </div>
                                
                                <select className={styles.more} name="medida" id="medida">
                                    <option value="add" disabled selected hidden>+</option>
                                    <option value="cintura">Cintura</option>
                                    <option value="cadera">Cadera</option>
                                    <option value="cuello">Cuello</option>
                                    <option value="pierna_izquierda">Pierna izq.</option>
                                </select>
                            </div>

                            <div className={styles.graph}>
                                <Line className={styles.inside_graph} options={options} data={data}></Line>
                            </div>
                        </div>
                    </article>

                    <article>  
                        <div className={styles.aux}>
                            <div className={styles.calendar_info}>
                                    <div className={styles.calendar_item}>
                                        <label htmlFor="inicio">Desde</label>
                                        <input type="date" name="inicio" id="inicio"/>
                                    </div>

                                    <div className={styles.calendar_item}>
                                        <label htmlFor="inicio">Hasta </label>
                                        <input type="date" name="fin" id="fin"/>
                                    </div>
                                </div>
                            {/*<a className={styles.remove} href="">&times;</a>*/}
                            <div className={styles.tags}>
                                <div className={styles.peso}>
                                    <p>Peso</p>
                                    <a href="#">&times;</a>
                                </div>
                                
                                <select className={styles.more} name="medida" id="medida">
                                    <option value="add" disabled selected hidden>+</option>
                                    <option value="cintura">Cintura</option>
                                    <option value="cadera">Cadera</option>
                                    <option value="cuello">Cuello</option>
                                    <option value="pierna_izquierda">Pierna izq.</option>
                                </select>
                            </div>

                            <div className={styles.graph}>
                                <Line className={styles.inside_graph} options={options} data={data}></Line>
                            </div>
                        </div>
                    </article>

                    <article>  
                        <div className={styles.aux}>
                            <div className={styles.calendar_info}>
                                <div className={styles.calendar_item}>
                                    <label htmlFor="inicio">Desde</label>
                                    <input type="date" name="inicio" id="inicio"/>
                                </div>

                                <div className={styles.calendar_item}>
                                    <label htmlFor="inicio">Hasta </label>
                                    <input type="date" name="fin" id="fin"/>
                                </div>
                                    </div>
                            {/*<a className={styles.remove} href="">&times;</a>*/}
                            <div className={styles.tags}>
                                <div className={styles.peso}>
                                    <p>Peso</p>
                                    <a href="#">&times;</a>
                                </div>
                                
                                <select className={styles.more} name="medida" id="medida">
                                    <option value="add" disabled selected hidden>+</option>
                                    <option value="cintura">Cintura</option>
                                    <option value="cadera">Cadera</option>
                                    <option value="cuello">Cuello</option>
                                    <option value="pierna_izquierda">Pierna izq.</option>
                                </select>
                            </div>

                            <div className={styles.graph}>
                                <Line className={styles.inside_graph} options={options} data={data}></Line>
                            </div>
                        </div>
                    </article>

                    
                    {/*<div className={styles.add}>
                        <button>+</button>
                    </div>*/}
                </div>
            </section>
        </div>

    </Dashboard>
  )
}
