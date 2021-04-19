const { Tarea } = require("./tarea");

/*
    _listado:
        { 'uuid-2345q3-asd23': { id:12, desc: asd , completadoEn:230423 } },
        { 'uuid-2345q3-asd23': { id:12, desc: asd , completadoEn:230423 } },
        { 'uuid-2345q3-asd23': { id:12, desc: asd , completadoEn:230423 } },
*/
class Tareas {
    _listado = {};
    
    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push(tarea)
        } )
        return listado;
    }
    
    constructor(){
        this._listado = {};
    }
    
    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }
    
    cargarTareasFromArr( tareas = [] ){
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        } )
    }
    listadoCompleto() {
        console.log();
        this.listadoArr.forEach( (tarea, indice) => {
            console.log(`${ (indice + 1).toString().yellow }. ${tarea.desc} :: ${ tarea.completadoEn ? 'Completada'.green: 'Pendiente'.gray }`);
        } )
    }
    listarPendientesCompletadas(completadas = true){
        console.log();
        this.listadoArr.forEach( (tarea, indice) => {
            if((completadas && tarea.completadoEn) || (!completadas && !tarea.completadoEn)){
                console.log(`${ (indice + 1).toString().yellow }. ${tarea.desc} :: ${ tarea.completadoEn ? 'Completada'.green: 'Pendiente'.gray }`);
            }
        } )
    
    }
    borrarTarea( id = '' ){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }  
    
    toggleCompletadas( ids = [] ){
        ids.forEach( id => {
            const tarea = this._listado[id];
            if( !tarea.completadoEn ){
                tarea.completadoEn = new Date().toISOString()
            }
        } );
        this.listadoArr.forEach( tarea => {
            if (!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        } )
    }
}

module.exports = {Tareas};