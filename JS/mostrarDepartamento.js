// import {buscarProductoId, deleteProduct,getCategoryName} from "./peticiones.js"

export default function showDepartament(data){
    const Departamento = document.querySelector('#Departamento');
    data.forEach(element => {
        //console.log(element);
        let opcion = document.createElement('option');opcion.setAttribute('value', element.id);
        opcion.setAttribute('style','background-color: rgb(193, 246, 253);');
        opcion.textContent = element.nomDepartamento;
        Departamento.appendChild(opcion);
    });
}