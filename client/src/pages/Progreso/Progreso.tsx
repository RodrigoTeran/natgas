import React from 'react'
import styles from "./style.module.css";
import Dashboard from '../../layouts/Dashboard/Dashboard';
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
      
      const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display:false,
          },
        },
      };
      
      const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
      
      const data = {
        labels,
        datasets: [
          {
            //label: 'Dataset 1',
            data: [333, 778, 999, 656 ,3443 ,565, 989],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            //label: 'Dataset 2',
            data: [2141, 4656, 352, 352, 78, 987, 147],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };

  return (
    <Dashboard>
    <div className={styles.layout}>
            <div className={styles.update}>
                <button>Actualizar medidas</button>
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
                        <div className={styles.peso}>
                            <p>Peso</p>
                            <a href="#">&times;</a>
                        </div>
                        <div className={styles.cuello}>
                            <p>Cuello</p>
                            <a href="#">&times;</a>
                        </div>
                        <div className={styles.pecho}>
                            <p>Pecho</p>
                            <a href="#">&times;</a>
                        </div>
                        <div className={styles.brazo_derecho}>
                            <p>Brazo der.</p>
                            <a href="#">&times;</a>
                        </div>
                        <div className={styles.brazo_izquierdo}>
                            <p>Brazo izq.</p>
                            <a href="#">&times;</a>
                        </div>
                        <div className={styles.antebrazo_derecho}>
                            <p>Antebrazo der.</p>
                            <a href="#">&times;</a>
                        </div>
                        <div className={styles.antebrazo_izquierdo}>
                            <p>Antebrazo izq.</p>
                            <a href="#">&times;</a>
                        </div>
                        <div className={styles.cintura}>
                            <p>Cintura</p>
                            <a href="#">&times;</a>
                        </div>
                        <div className={styles.cadera}>
                            <p>Cadera</p>
                            <a href="#">&times;</a>
                        </div>
                        <div className={styles.pierna_izquierda}>
                            <p>Pierna izq.</p>
                            <a href="#">&times;</a>
                        </div>
                        <div className={styles.pierna_derecha}>
                            <p>Pierna der.</p>
                            <a href="#">&times;</a>
                        </div>
                        <div className={styles.pantorrila_izquierda}>
                            <p>Pantorrila izq.</p>
                            <a href="#">&times;</a>
                        </div>
                        <div className={styles.pantorrila_derecha}>
                            <p>Pantorrila der.</p>
                            <a href="#">&times;</a>
                        </div>
                    </div>
                </article>

                <div className={styles.general_graph}>
                    <Line className={styles.inside_graph} options={options} data={data}></Line>
                </div>
            </section>
            
            <section className={styles.detailed}>
                <h2>Vistas Detalladas</h2>
                <div className={styles.detailed_info}>
                    <article>  
                        <div className={styles.aux}>
                            <a className={styles.remove} href="">&times;</a>
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
                            <a href="">&times;</a>
                            <div className={styles.tags}>
                                <div className={styles.antebrazo_derecho}>
                                    <p>Antebrazo der.</p>
                                    <a href="#">&times;</a>
                                </div>
                                <div className={styles.antebrazo_izquierdo}>
                                    <p>Antebrazo izq.</p>
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
                            <a href="">&times;</a>
                            <div className={styles.tags}>
                                <div className={styles.pierna_derecha}>
                                    <p>Pierna der.</p>
                                    <a href="#">&times;</a>
                                </div>
                                <div className={styles.pierna_izquierda}>
                                    <p>Pierna izq.</p>
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
                            <a href="">&times;</a>
                            <div className={styles.tags}>
                                <div className={styles.peso}>
                                    <p>Peso</p>
                                    <a href="#">&times;</a>
                                </div>
                                <div className={styles.cuello}>
                                    <p>Cuello</p>
                                    <a href="#">&times;</a>
                                </div>
                                <div className={styles.cintura}>
                                    <p>Cintura</p>
                                    <a href="#">&times;</a>
                                </div>
                                <div className={styles.cadera}>
                                    <p>Cadera</p>
                                    <a href="#">&times;</a>
                                </div>
                            </div>
                            
                            <div className={styles.graph}>
                                <Line className={styles.inside_graph} options={options} data={data}></Line>
                            </div>
                        </div>
                    </article>

                    
                    <div className={styles.add}>
                        <button>+</button>
                    </div>
                </div>
            </section>
        </div>

    </Dashboard>
  )
}
