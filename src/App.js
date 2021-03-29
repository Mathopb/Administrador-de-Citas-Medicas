import React, { Fragment, useState, useEffect } from "react";
import Formulario from './componentes/Formulario';
import Cita from './componentes/Cita';

function App() {

  //Citas en local storage
  let citasIniciales = JSON.parse(sessionStorage.getItem('citas'));
  if(!citasIniciales) {
    citasIniciales = [];
  }

  //Arreglo de Citas
  const [citas, guardarCitas] = useState(citasIniciales);

  
  //Use Effect para realizar operaciones cuando el state cambia
  useEffect( () => {
    if(citasIniciales) {
      sessionStorage.setItem('citas', JSON.stringify(citas))
    } else {
      sessionStorage.setItem('citas', JSON.stringify ([]));
    };
  }, [citas, citasIniciales] );


  //Funcion que modifique las citas y agregue la nueva
  const crearCita = (cita) => {
    guardarCitas([
      ...citas,
      cita
    ]);
  }

  //Funcion que elimina una cita por su ID
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  }

  //Mensaje Condicional
  const titulo = citas.length === 0 ? 'No hay citas'  : 'Administra tus Citas';

  return (
    <Fragment>
      <h1> Administrador de Pacientes </h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2> {titulo} </h2>
            {citas.map(cita => (
              <Cita
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
