import {deleteCiudad, deleteDepartamento} from "./peticiones.js"
import {displayDataClima} from "./apiClima.js"

export default function showCiudades(data,ciudades){
    const NombreSeleccion = document.querySelector('#NombreSeleccion');
    NombreSeleccion.textContent= data.nomDepartamento
    
    document.querySelector('#labelOpcionesRuta').textContent = data.nomDepartamento
    const botonEditarDep = document.querySelector('#botonEditarDep');
    botonEditarDep.value = data.id
    const botonEliminarDep = document.querySelector('#botonEliminarDep');
    botonEliminarDep.value = data.id


    const botonAñadirCiudad = document.createElement('button');botonAñadirCiudad.setAttribute('id','botonAñadirCiudad')
    botonAñadirCiudad.setAttribute('value',data.id); botonAñadirCiudad.textContent="+";
    //disabled data-bs-toggle="modal" data-bs-target="#staticBackdrop"
    botonAñadirCiudad.setAttribute('data-bs-toggle','modal');
    botonAñadirCiudad.setAttribute('data-bs-target','#staticBackdrop');
    botonAñadirCiudad.setAttribute('class','btn btn-success ms-5')
    NombreSeleccion.appendChild(botonAñadirCiudad);

    botonAñadirCiudad.addEventListener('click', function (e){
        document.querySelector('#guardarCiudad').setAttribute('value','2');
        document.querySelector('#idDepartamento').setAttribute('value',botonAñadirCiudad.value);
        document.querySelector('#nomCiudad').value = '';
        document.querySelector('#imagen').value = '';
    });
    // <button class="btn btn-outline-info" type="button">Manizales</button>
    const verBotonesCiudades = document.querySelector('#verBotonesCiudades');
    verBotonesCiudades.innerHTML="";
    if(ciudades.length > 0){
        ciudades.forEach(element => {
            //console.log(element.id);
            const boton = document.createElement('button');boton.setAttribute('value',element.id);
            boton.setAttribute('id',"botonVerCiudad");
            boton.setAttribute('class','btn btn-outline-info');boton.setAttribute('type','button');
            boton.textContent= element.nomCiudad;
            verBotonesCiudades.appendChild(boton);

            /* const botonVerCiudad = document.querySelector('#botonVerCiudad');
            botonVerCiudad.addEventListener('click', function (e) {
                    e.preventDefault();
                    mostrarCiudad(element);
            }); */
        });
        const botonVerCiudad = document.querySelectorAll('#botonVerCiudad');
        botonVerCiudad.forEach(element => {
            element.addEventListener('click', function (e) {
                e.preventDefault();
                //console.log(element);
                ciudades.forEach(elementoP => {
                    if (elementoP.id == element.value) {
                        //console.log("Si hay uno igual");
                        mostrarCiudad(elementoP);
                        displayDataClima(elementoP.coordenadas.lat, elementoP.coordenadas.lon)
                    }
                })
            })
        });


        botonEditarDep.addEventListener('click', function (e) {// botonEliminarDep
            document.querySelector('#seleccionarDep').setAttribute('disabled', 'disabled');// nomDepartamento activarAgregarDepartamento botonAñadirCiudad
            document.querySelector('#nomDepartamento').setAttribute('disabled', 'disabled'); // botonEdicionDep data.nomDepartamento
            document.querySelector('#activarAgregarDepartamento').setAttribute('disabled', 'disabled');
            document.querySelector('#botonAñadirCiudad').setAttribute('disabled', 'disabled');
            document.querySelector('#botonEliminarDep').setAttribute('disabled', 'disabled');
            document.querySelector('#editDep').value = data.nomDepartamento;
            document.querySelector('#botonEdicionDep').setAttribute('value', botonEditarDep.value);
            const icono = document.querySelector('#icono');
            const containerEdicionDep = document.querySelector('#containerEdicionDep');
            icono.setAttribute('class','container visually-hidden');
            containerEdicionDep.setAttribute('class','container visually');
        });

        botonEliminarDep.addEventListener('click', function (e) {
            deleteDepartamento(botonEditarDep.value);
        });
    }

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

    //console.log("len "+ciudades.length);
    //console.log(ciudades);
    //console.log(data);
}

function mostrarCiudad(element){
    console.log(element);
    const verDescripcionCiudad = document.querySelector('#verDescripcionCiudad');
    verDescripcionCiudad.innerHTML="";
    let elementoCiudad = document.createElement('div');elementoCiudad.setAttribute('class','container');
    elementoCiudad.innerHTML = `
        <img src="${element.imagen}" class="img-fluid" alt="Turbo">
        <div style="margin-top: -5px;" class="card">
            <div class="card-header">
                <div class="row">
                    <div class="col-4">
                        <label > <strong>Ciudad: </strong> ${element.nomCiudad} </label> 
                    </div>
                    <div class="col-8">
                    <div class="row">
                        <div class="col">
                            <button class="btn btn-dark" id="botonEdicionCiudad" value="${element.id}">Editar</button>
                        </div>
                        <div class="col">
                            <button class="btn btn-danger" id="botonEliminarCiudad" value="${element.id}">Eliminar</button>
                        </div>
                    </div>
                        
                    </div>
                </div>
            </div>
            <div class="card-body">
                <h5 class="card-title">coordenadas</h5>
                <p class="card-text">Latitud: ${element.coordenadas.lat}, Longitud: ${element.coordenadas.lon}</p>
                <hr>
                <div id="infoApiClima">
                </div>
            </div>
        </div>  
    `;
    verDescripcionCiudad.appendChild(elementoCiudad);
    
    const botonEdicionCiudad = document.querySelector('#botonEdicionCiudad');
    botonEdicionCiudad.setAttribute('data-bs-toggle','modal');
    botonEdicionCiudad.setAttribute('data-bs-target','#staticBackdrop');
    botonEdicionCiudad.addEventListener('click', function (e){
        e.preventDefault();// nomCiudad coordenadas imagen idCiudad
        //console.log("hi");
        document.querySelector('#nomCiudad').value = element.nomCiudad
        document.querySelector('#imagen').value = element.imagen
        document.querySelector('#idCiudad').value = element.id
        document.querySelector('#idDepartamento').value = element.departamentoId;
        document.querySelector('#guardarCiudad').setAttribute('value', 3)
    });

    
    const botonEliminarCiudad = document.querySelector('#botonEliminarCiudad');
    botonEliminarCiudad.addEventListener('click', function (e){
        e.preventDefault();
       // console.log(botonEliminarCiudad.value);
       deleteCiudad(botonEliminarCiudad.value);
    })
}
