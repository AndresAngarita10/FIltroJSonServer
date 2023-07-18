
async function fetchDataClima(latitud, longitud) {
    try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${parseInt(latitud)}&lon=${parseInt(longitud)}&lang=sp&units=metric&appid=9561e815716716a006f5b4421cc5d2c2`);
    const data = await response.json();
    return data;
    } catch (error) {
        throw 'Error al obtener los datos';
    }
}
export  async function displayDataClima(lat, lon) {
    try {
        const dataClima = await fetchDataClima(lat, lon);

        const infoApiClima = document.getElementById('infoApiClima');
        console.log(dataClima);
        const contenedor = document.createElement('div');
        contenedor.innerHTML = `
                    <div class="row">
                        <div class="col-6">
                            <p><strong>Nubes: ${dataClima.clouds.all}</strong></p>
                            <p><strong>Viento: ${dataClima.wind.speed}</strong></p>
                            <p><strong>Humedad: ${dataClima.main.humidity}</strong></p>
                        </div>
                        <div class="col-6">
                            <p><strong>Temperatura: ${dataClima.main.temp}°</strong></p>
                            <p><strong>Temp Min: ${dataClima.main.temp_min}°</strong></p>
                            <p><strong>Temp Max: ${dataClima.main.temp_max}° </strong></p>
                        </div>
                    </div>

        `
        infoApiClima.appendChild(contenedor);

    } catch (error) {
        console.error(error);
    }
}

/* 

https://api.openweathermap.org/data/2.5/weather?lat=4&lon=72&appid=9561e815716716a006f5b4421cc5d2c2

{"datetime":"2023-07-07 21:48:21",
"timezone_name":"British Summer Time",
"timezone_location":"Europe/London",
"timezone_abbreviation":"BST",
"gmt_offset":1,
"is_dst":true,
"requested_location":"Oxford, United Kingdom",
"latitude":51.7520131,
"longitude":-1.2578499} 
*/ 