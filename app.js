const { guardarDB, leerDb } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput,listadoTareasBorrar, confirmar, mostrarListadoCheckList } = require('./helpers/inquirer');
const {Tareas } = require('./models/tareas');


require('colors');

const main = async () => {
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDb();
    if (tareasDB){
        // establecer tareas
        tareas.cargarTareasFromArr(tareasDB);
    }
    
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);
                break;
            case '2':
                // console.log(tareas.listadoArr);
                tareas.listadoCompleto();
                break;
            case '3':
                // console.log(tareas.listadoArr);
                tareas.listarPendientesCompletadas(true);
                break;
            case '4':
                // console.log(tareas.listadoArr);
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                // console.log(tareas.listadoArr);
                const ids = await mostrarListadoCheckList( tareas.listadoArr );
                tareas.toggleCompletadas( ids )
                break;
            case '6':
                // console.log(tareas.listadoArr);
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id === '0'){ continue; }
                const ok = await confirmar('¿Está seguro?');
                if (ok){
                    tareas.borrarTarea(id);
                    console.log('Tarea borrada');
                }
                break;    
            default:
                break;
        }
        
        
        guardarDB( tareas.listadoArr );
        await pausa();
    } while (opt !== '0');

}

main();