"use strict";

//* Localizador GPS del usuario - Longitud y Latitud */
const localizardor = document.getElementById("localizador");
localizardor.onclick = function(){
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
    const latitud = position.coords.latitude;
    const longitud = position.coords.longitude;
    /* Verificar Latitud / Logingitud del usuario */ 
    /* console.log("Latitud: " + latitud);
       console.log("Longitud: " + longitud); */

    // Realizar una solicitud a la API de OpenWeatherMap
    const apiKey = 'bf0f7462e38b30a828833d931c572f61';
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitud}&lon=${longitud}&appid=${apiKey}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        // Analizar los datos para determinar si hay pronóstico de lluvia en las próximas 8 horas
        const forecast = data.list.slice(0, 8); // Obtener los datos de las próximas 8 horas

        const willRain = forecast.some(hour => {
        return hour.weather.some(weather => {
            return weather.main.toLowerCase().includes('rain');
        });
        });

        // Mostrar un alert si hay pronóstico de lluvia
        if (willRain) {
        alert('¡Va a llover en las próximas 8 horas!');
        } else {
        alert('¡No va llover las próximas 8 horas!');
        }
    })
    .catch(error => {
        console.error('Error al obtener los datos del pronóstico del tiempo:', error);
    });
});
}
}