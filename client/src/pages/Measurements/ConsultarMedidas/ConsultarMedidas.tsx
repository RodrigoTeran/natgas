import React from 'react';
import Dashboard from "../../../layouts/Dashboard/Dashboard";
import styles from "./styles.module.css";
import pencil from "./../images/pencil.png"
import trash from "./../images/trash.png"
import Dropdown from "../../../components/Dropdown/Dropdown";
import { fetchOne } from '../../../routes/medidas/medidas.routes';
import { MessagesContext } from "../../../layouts/Messages/Messages";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { EliminarMedida } from "../EliminarMedidas/EliminarMedida";
import { EditarMedida } from "../EditarMedidas/EditarMedida";

export interface IBody {
    id: string;
    measurement: number;
    date: string;
}

export const ConsultarMedidas = () => {
    const navigate = useNavigate();
    const { addStaticMsg } = useContext(MessagesContext);

    let body_init:string[] = ["Pecho", "Cadera", "Brazo izq", "Pantorrilla izq", "Antebrazo izq", "Pierna izq", "Cuello", "Brazo der", "Pantorrilla der", "Antebrazo der", "Pierna der", "Cintura", "Peso"];

    const [isOpenDrop, setIsOpenDrop] = useState(false);
    const [tableFilter, setTableFilter] = useState<string>("");
    const [bodyParts, setBodyParts] = useState<string[]>(body_init);
    const [measures, setMeasures] = useState<IBody[]>([]);
    const [isOpenDel, setIsOpenDel] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [id, setId] = useState("");
    const [measure, setMeasure] = useState<number>(5464);

    const [start, setStart] = useState<any>("0000-01-01 00:00:00");
	const [end, setEnd] = useState<any>("9999-12-31 23:59:59");

    const filterTable = (filter: string) => {
        setIsOpenDrop(false);
        setTableFilter(filter);
    };

    function update(element: string) {
        filterTable(element);
        setBodyParts(body_init.filter(elem => elem != element));
    }
    
    function del(idM:string) {
        setId(idM);
        setIsOpenDel(true);
    }

    function edit(idM:string, m:number) {
        console.log(m)
        setId(idM);
        setMeasure(m);
        
        console.log('Measure', measure);
        setIsOpenEdit(true);
    }
    
	const dictionary = new Map<any, any>();
	dictionary.set('Pecho', 'chest');
	dictionary.set('Cadera', 'hip');
	dictionary.set('Brazo izq', 'leftarm');
	dictionary.set('Pantorrilla izq', 'leftcalve');
	dictionary.set('Antebrazo izq', 'leftforearm');
	dictionary.set('Pierna izq', 'leftleg');
	dictionary.set('Cuello', 'neck');
	dictionary.set('Brazo der', 'rightarm');
	dictionary.set('Pantorrilla der', 'rightcalve');
	dictionary.set('Antebrazo der', 'rightforearm');
	dictionary.set('Pierna der', 'rightleg');
	dictionary.set('Cintura', 'waist');
	dictionary.set('Peso', 'weight');

    const fetchOneController = (): void => {
        const doFetch = async (): Promise<void> => {
            if(tableFilter === "" || tableFilter === undefined){
                return;
            }
            
            const resData = await fetchOne(dictionary.get(tableFilter), start, end);

            if (resData === null) {
                addStaticMsg("Error al obtener las medidas", "danger");
                return;
            }

            if (resData.msg !== "") {
                addStaticMsg(resData.msg, "danger");
                return;
            }

            const data = resData.data;

            setMeasures(data);
        }

        void doFetch();
    }

    useEffect(() => {
        fetchOneController()
    }, [start, end, tableFilter, isOpenDel, isOpenEdit]); 
  
    return (
    <>
        <EliminarMedida isOpen={isOpenDel} setIsOpen={setIsOpenDel} table={dictionary.get(tableFilter)} measureId={id}></EliminarMedida>

        <EditarMedida isOpen={isOpenEdit} setIsOpen={setIsOpenEdit} measureId={id} measure={measure} setMeasure={setMeasure} table={tableFilter}></EditarMedida>

        <Dashboard>
            <div className={styles.layout}>
                <h1> Tus medidas corporales </h1>

                <div className={styles.filters}>
                    <Dropdown text={tableFilter === "" ? ("Medida") : (tableFilter)} isOpen={isOpenDrop} setIsOpen={setIsOpenDrop}>
                        <div>
                            {bodyParts.map((element: string, key: number) => {
                                return (
                                    <div onClick={() => { update(element) }} key={key}>{element}</div>
                                )
                            })}
                        </div>
                    </Dropdown>
                    
                    <div className={styles.names}>
                        <label htmlFor="fecha">Desde</label>
                        <input type="date"
                        name="inicio"
                        id="inicio"
                        onChange={(e) => {(e.target.value === "")?setStart("0000-01-01 00:00:00"):setStart(e.target.value+" 00:00:00")}}/>
                    </div>

                    <div className={styles.names}>
                        <label htmlFor="fecha">Hasta</label>
                        <input type="date"
                        name="fin"
                        id="fin"
                        onChange={(e) => {(e.target.value === "")?setEnd("9999-12-31 23:59:59"):setEnd(e.target.value+" 23:59:59")}}/>
                    </div>

                </div>

                <div className={styles.tablediv}>
                    <table className={styles.table}>
                        {measures.length === 0 && tableFilter === "" && (<h2>Selecciona una medida</h2>)}
                        
                        {measures.length === 0 && tableFilter !== "" && (<h2>No se encontraron registros</h2>)}

                        {measures.length > 0 && (
                            <>
                                <thead>
                                    <tr>
                                        <th>Fecha</th>
                                        <th>Medida</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {measures.map((element, key) => {
                                        const date = new Date(element.date);
                                        const name = date.toLocaleString('default', {
                                            month: 'short',
                                            });
                                        return (
                                            <tr key={key}>
                                            <td>{`${date.getDate()}/` + `${name}/` + `${date.getFullYear()}`}</td>
                                            <td>{element.measurement}</td>
                                            <td>
                                                <div className={styles.img}>
                                                    <img src={pencil} onClick={(e) => edit(element.id, element.measurement)}/>
                                                    <img src={trash} onClick={(e) => del(element.id)}/>
                                                </div>
                                            </td>
                                        </tr>
                                        );
                                    })}
                                    
                                </tbody>
                            </>
                        )}
                    </table>
                </div>
            </div>
        </Dashboard>
    </>
  )
}
