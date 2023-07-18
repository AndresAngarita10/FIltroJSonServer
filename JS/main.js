
/* import fetchLatLonCiudad from "./apiClima.js"; */
import {getDepartamentos, selectCiudad, postDepartamentosYCiudades, postCiudad, updateDepartamento, updateCiudad, fetchLatLonCiudad} from "./peticiones.js"

getDepartamentos()

const seleccionarDep = document.querySelector('#seleccionarDep');
const guardarDepartamento = document.querySelector('#guardarDepartamento');
const cerrarModalRutas = document.querySelector('#cerrarModalRutas');
const activarAgregarDepartamento = document.querySelector('#activarAgregarDepartamento');
const guardarCiudad = document.querySelector('#guardarCiudad');
const containerOpcionesDep = document.querySelector('#containerOpcionesDep');
const botonEdicionDep = document.querySelector('#botonEdicionDep');
let ciudades = [];

seleccionarDep.addEventListener('click', function (e){
    const Departamento = document.querySelector('#Departamento');
    const containerAgregarDep = document.querySelector('#containerAgregarDep');
    containerAgregarDep.setAttribute('class','container visually-hidden');
    containerOpcionesDep.setAttribute('class','container visually');
    //console.log(Departamento);
    selectCiudad(Departamento.value);
});


activarAgregarDepartamento.addEventListener('click', function (e){
    e.preventDefault();
    const containerAgregarDep = document.querySelector('#containerAgregarDep');
    containerAgregarDep.setAttribute('class','container visually');
    const containerOpcionesDep = document.querySelector('#containerOpcionesDep');
    containerOpcionesDep.setAttribute('class','container visually-hidden');
    const NombreSeleccion = document.querySelector('#NombreSeleccion');
    NombreSeleccion.innerHTML="";
    const verBotonesCiudades = document.querySelector('#verBotonesCiudades');
    verBotonesCiudades.innerHTML="";
    document.querySelector('#nomDepartamento').value = "";
    document.querySelector('#agregarPuntoDesdeFormCiudad').setAttribute('disabled', 'disabled');
    document.querySelector('#botonTerminarDeAgregar').setAttribute('disabled', 'disabled');
    let carAutomatica = document.createElement('div');
    const verDescripcionCiudad = document.querySelector('#verDescripcionCiudad');
    verDescripcionCiudad.innerHTML="";
    carAutomatica.innerHTML= `
        <div class="container">
            <div class="card" aria-hidden="true">
            <div class="card-body">
                <h5 class="card-title placeholder-glow">
                <span class="placeholder col-6"></span>
                </h5>
                <p class="card-text placeholder-glow">
                <span class="placeholder col-7"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-6"></span>
                <span class="placeholder col-8"></span>
                </p>
                <a class="btn btn-primary disabled placeholder col-6"></a>
            </div>
                
        </div>
    </div>
    `;
    verDescripcionCiudad.appendChild(carAutomatica);
});

guardarDepartamento.addEventListener('click', function(e) {
    e.preventDefault(); // Evita la recarga de la página
    const agregarPuntoDesdeFormCiudad = document.querySelector('#agregarPuntoDesdeFormCiudad');//seleccionarDep
    agregarPuntoDesdeFormCiudad.setAttribute('disabled', 'disabled');//activarAgregarDepartamento
    const nomDepartamento = document.querySelector('#nomDepartamento');
    const caja = nomDepartamento.value;
    
    if (caja.length > 0) {
        console.log("Estamos aca");
        document.querySelector('#seleccionarDep').setAttribute('disabled', 'disabled');
        document.querySelector('#activarAgregarDepartamento').setAttribute('disabled', 'disabled');
        //document.querySelector('#nomCiudad').setAttribute('disabled', 'disabled');
        guardarDepartamento.setAttribute('disabled', 'disabled');
        nomDepartamento.setAttribute('disabled', 'disabled');
        agregarPuntoDesdeFormCiudad.removeAttribute('disabled');
        botonTerminarDeAgregar.removeAttribute('disabled');
        //postRutas(caja);
        agregarPuntoDesdeFormCiudad.addEventListener('click', function (e){
            e.preventDefault();// cajaAgregarlat
            document.querySelector('#nomCiudad').value = '';
            document.querySelector('#imagen').value = '';
            document.querySelector('#guardarCiudad').setAttribute('value','1');

        });
        botonTerminarDeAgregar.addEventListener('click', function (e){
            e.preventDefault();
            document.querySelector('#seleccionarDep').removeAttribute('disabled');
            document.querySelector('#activarAgregarDepartamento').removeAttribute('disabled');
            document.querySelector('#nomDepartamento').removeAttribute('disabled');
            document.querySelector('#containerAgregarDep').setAttribute('class','container visually-hidden');
            const nomDepartamento = document.querySelector('#nomDepartamento').value;
            postDepartamentosYCiudades(nomDepartamento,ciudades);
        });
    }
});

guardarCiudad.addEventListener('click', function (e) {
    e.preventDefault();
    const nomCiudad = document.querySelector('#nomCiudad').value; // cajaAgregarlat cajaAgregarlon
    //let latlon = fetchLatLonCiudad(nomCiudad.toLowerCase(),"colombia");
    let latlon;
    fetchLatLonCiudad(nomCiudad.toLowerCase(),"colombia")
        .then((res) => {
            latlon=res;
            console.log(res);
            const imagen = document.querySelector('#imagen').value;
            console.log(latlon);
            const ciudad = {
                "nomCiudad": nomCiudad,
                "coordenadas": {
                    "lat": latlon.latitude,
                    "lon": latlon.longitude
                  },
                "imagen":imagen,
                "departamentoId":0
            }
            console.log(ciudad);
        
            if(guardarCiudad.value == 1){ // guardando primera vez con ruta
                ciudades.push(ciudad);
                contadorPuntos();
            }else if (guardarCiudad.value == 2){ // guardando boton + al lado de nombre
                //console.log("entro al 2");
                const idDepartamento = document.querySelector('#idDepartamento').value;
                ciudad.departamentoId = idDepartamento;
                //console.log(ciudad);
                postCiudad(ciudad)
            }else if (guardarCiudad.value == 3){//guardando edicion 
                console.log("entro a 3");
                const idCiudad = document.querySelector('#idCiudad').value
                const idDepartamento = document.querySelector('#idDepartamento').value;
                ciudad.departamentoId = idDepartamento;
                updateCiudad(ciudad, idCiudad);
            }
        })
        .catch((err) => {
            console.error(err);
        });
});

function contadorPuntos(){
    let cantidad = ciudades.length;
    const numeroDeAgregados = document.querySelector('#numeroDeAgregados');
    numeroDeAgregados.innerHTML=cantidad
}

botonEdicionDep.addEventListener('click', function(e) {
        const editDep = document.querySelector('#editDep').value;
        const data = {
            "nomDepartamento": editDep
        }
        //console.log(botonEdicionDep.value);
        updateDepartamento(data,botonEdicionDep.value)

});
/* document.querySelector('#formNuevaRuta').addEventListener('submit', (evento) => {
    evento.preventDefault();
    console.log("Holi");
    const data = Object.fromEntries(new FormData(evento.target))
    console.log(data);
    postRutas(data)
}); */

/* 
cerrarModalRutas.addEventListener('click', function (e){
    e.preventDefault();
    document.querySelector('#nomCiudad').value="";
    const nomCiudad = document.querySelector('#nomCiudad');
    nomCiudad.removeAttribute('disabled');
    guardarDepartamento.removeAttribute('disabled');
    agregarPuntoDesdeFormCiudad.setAttribute('disabled','disabled');
})
 */
