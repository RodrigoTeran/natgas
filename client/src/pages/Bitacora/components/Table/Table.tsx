import React, { useState } from 'react';
import style from './Table.module.css';

// Define la interfaz para los datos de la fila
interface Fila {
  columna1: string;
  columna2: string;
  columna3: string;
  columna4: string;
}

const Table = () => {
  // Especifica el tipo de datos en useState
  const [datos, setDatos] = useState<Fila[]>([]);

  const agregarFila = () => {
    const nuevaFila: Fila = {
      columna1: 'Valor 1',
      columna2: 'Valor 2',
      columna3: 'Valor 3',
      columna4: 'Valor 4',
    };
    setDatos([...datos, nuevaFila]);
  };

  return (
    <div>
      <table>
      <button onClick={agregarFila}>Agregar Fila</button>
        <thead className={style.table_header}>
          <tr>
            <th>Columna 1</th>
            <th>Columna 2</th>
            <th>Columna 3</th>
            <th>Columna 4</th>
          </tr>
        </thead>
        <tbody className={style.content}>
          {datos.map((fila, index) => (
            <tr key={index}>
              <td className={style.table_cell_day}>{fila.columna1}</td>
              <td className={style.table_cell_date}>{fila.columna2}</td>
              <td className={style.table_cell_workout}>{fila.columna3}</td>
              <td className={style.table_cell_comments}>{fila.columna4}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;