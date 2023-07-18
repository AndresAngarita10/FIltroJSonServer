import showDepartament from "./mostrarDepartamento.js";
import showCiudades from "./mostrarCiudades.js";
/* import fetchLatLonCiudad from "./apiClima.js"; */

const URL = "http://localhost:3000";
const headers = new Headers({ 'Content-Type': 'application/json' });

export async function fetchLatLonCiudad(ciudad, pais) { //Con el nombre de la ciudad  nos devuelve Informacion
  //como la latitud y la longitud de la ciudad
  try {
      const response = await fetch(`https://timezone.abstractapi.com/v1/current_time/?api_key=0fe1fcf82b804174ac5910fbf34bcdfa&location=${ciudad},colombia`);
      const data = await response.json();
      return data;
  } catch (error) {
      throw 'Error al obtener los datos';
  }
}

export async function getDepartamentos() {
  try {
    let data = await (await fetch(`${URL}/Departamentos`)).json();
/*     let response2 = await (await fetch(`${URL}/Departamentos?nomDepartamento=Cartago`)).json();
    console.log(response2[0].id); */
    showDepartament(data);
  } catch (error) {
    console.error(error);
  }
}

export async function selectCiudad(id) {
  try {
    let data = await (await fetch(`${URL}/Departamentos/${id}`)).json();
    let ciudades = await (await fetch(`${URL}/Ciudades?departamentoId=${id}`)).json();
    showCiudades(data, ciudades);
  } catch (error) {
    console.error(error);
  }
}

export async function postDepartamentosYCiudades(departamento, ciudades) {
  try {
    let objeto = {
      "nomDepartamento": departamento
    };

    let config = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(objeto),
      redirect: 'manual'
    };
    let response = await fetch(`${URL}/Departamentos`, config);
    let response2 = await (await fetch(`${URL}/Departamentos?nomDepartamento=${departamento}`)).json();

    for (let j = 0; j < ciudades.length; j++) {

      /* const lat = data.latitude
      const lon = data.longitude */
      let latlon = fetchLatLonCiudad(ciudades[j].nomCiudad,"colombia");
      console.log(latlon);
      let ciudad = {
        "nomCiudad": ciudades[j].nomCiudad,
        "coordenadas": {
          "lat": latlon.latitude,
          "lon": latlon.longitude
        },
        "imagen": ciudades[j].imagen,
        "departamentoId": response2[0].id
      };

      let config2 = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(ciudad),
        redirect: 'manual'
      };

      await guardarCiudad(ciudad, config2);
    }
  } catch (error) {
    console.error(error);
  }
}

async function guardarCiudad(ciudad, config) {
  try {
    let responseCiudades = await (await fetch(`${URL}/Ciudades`, config)).json();
  } catch (error) {
    console.error(error);
  }
}

export async function verDepartamento(departamento, ciudades) {
  try {
    let response2 = await (await fetch(`${URL}/Departamentos?nomDepartamento=${departamento}`)).json();
    console.log(response2);
    alert(response2);
  } catch (error) {
    console.error(error);
  }
}

export async function postCiudad(ciudad) {
  try {
    const idDepartamento = ciudad.departamentoId;
    let config = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(ciudad),
      redirect: 'manual'
    };
    let response = await fetch(`${URL}/Ciudades`, config);
    
  } catch (error) {
    console.error(error);
  }
}


export async function updateDepartamento(data,id) {

  let config = {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(data)
  }
  console.log(data);
  let act = await (await fetch(`${URL}/Departamentos/${id}`,config)).json();
}


export async function updateCiudad(data,id) {

  let config = {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(data)
  }
  console.log(data);
  let act = await (await fetch(`${URL}/Ciudades/${id}`,config)).json();
}

export async function buscarCiudadXId(id){
  let data = await (await fetch(`${URL}/Ciudades/${id}`)).json();
  //console.log(data);
  return data
}


export async function buscarDepXId(id){
  let data = await (await fetch(`${URL}/Departamentos/${id}`)).json();
  //console.log(data);
  return data
}


export async function deleteCiudad(id){

  let data = buscarCiudadXId(id);
  //console.log(data);
  let config = {
      method: 'DELETE',
      headers: headers,
      body: JSON.stringify(data)
  };
  console.log(config);
  let del = await(await fetch(`${URL}/Ciudades/${id}`,config)).json();
}


export async function deleteDepartamento(id){

  let data = buscarDepXId(id);
  //console.log(data);
  let config = {
      method: 'DELETE',
      headers: headers,
      body: JSON.stringify(data)
  };
  console.log(config);

  let ciudadesRelacionadas = await(await fetch(`${URL}/Ciudades?departamentoId=${id}`)).json();
  console.log(ciudadesRelacionadas);
  ciudadesRelacionadas.forEach(element => {
    deleteCiudad(element.id)
  });
  let del = await(await fetch(`${URL}/Departamentos/${id}`,config)).json();

}
