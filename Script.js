// Seleccionamos elementos del DOM que necesitaremos
let titleLogo = document.querySelector(".title");
let bodyElem = document.querySelector("body");

// Cuando la página carga completamente, se ejecuta esta función
window.addEventListener("load", () => {
    // Genera un número aleatorio entre 1 y 5 para elegir una imagen de fondo
    let randNum = Math.ceil(Math.random() * 5);
    // Establece la imagen de fondo usando el número aleatorio
    bodyElem.style.backgroundImage = `url('images/bg${randNum}.jpg')`;
    // Si el número es 3, 4 o 5, cambia el color del título a blanco
    // (probablemente porque estas imágenes son más oscuras)
    if (randNum == 3 || randNum == 4 || randNum == 5) {
        titleLogo.style.color = "white";
    }
});

// Obtiene el input donde el usuario ingresa la ciudad
let cityInput = document.querySelector("#get-city");
// Añade un evento para detectar cuando el usuario presiona Enter
cityInput.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
        fetchDataFromApi();
    }
});

// Configuración de la API del clima
let apiData = {
    url: "https://api.openweathermap.org/data/2.5/weather?q=",
    key: "124b92a8dd9ec01ffb0dbf64bc44af3c",
};

// Establece New York como ciudad inicial y hace la primera búsqueda
cityInput.value = "new york";
fetchDataFromApi();
cityInput.value = ""; // Limpia el input

// Función para obtener datos del clima de la API
function fetchDataFromApi() {
    let insertedCity = cityInput.value;
    // Hace la petición a la API usando la ciudad ingresada
    fetch(`${apiData.url}${insertedCity}&&appid=${apiData.key}`)
        .then((res) => res.json())
        .then((data) => addDataToDom(data));
}

// Selecciona los elementos donde se mostrará la información del clima
let cityName = document.querySelector(".city-name");
let cityTemp = document.querySelector(".weather-deg");
let cityCond = document.querySelector(".weather-condition");
let cityHumidity = document.querySelector(".humidity");
let todayDate = document.querySelector(".date");

// Función para mostrar los datos del clima en el DOM
function addDataToDom(data) {
    // Muestra el nombre de la ciudad y el país
    cityName.innerHTML = `${data.name}, ${data.sys.country}`;
    // Convierte la temperatura de Kelvin a Celsius y la muestra
    cityTemp.innerHTML = `${Math.round(data.main.temp - 273.15)}°c`;
    // Muestra la descripción del clima
    cityCond.innerHTML = data.weather[0].description;
    // Muestra la humedad
    cityHumidity.innerHTML = `humedad: ${data.main.humidity}%`;
    // Muestra la fecha actual
    todayDate.innerHTML = getDate();
}

// Array con los nombres de los meses
let months = ["January", "February", "March", "April", "May", "June", "July", 
              "August", "September", "October", "November", "December"];

// Función para obtener la fecha actual formateada
function getDate() {
    let newTime = new Date();
    let month = months[newTime.getMonth()];
    return `${newTime.getDate()} ${month} ${newTime.getFullYear()}`;
}