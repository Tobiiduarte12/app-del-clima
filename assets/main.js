// TRAEMOS LOS ELEMENTOS DEL DOM
const form = document.querySelector("#form");
const searchInput = document.querySelector(".input__search");
const cardContaier = document.querySelector(".card__container");
const searchMsg = document.querySelector(".enter__city");

const roundNumber = (number) => Math.round(number);

// Funcion para obtener los datos de la ciudad
const getCityData = (cityData) => ({
  cityName: cityData.name,
  imgName: cityData.weather[0].icon,
  cityWeatherInfo: cityData.weather[0].description,
  cityTemp: roundNumber(cityData.main.temp),
  cityST: roundNumber(cityData.main.feels_like),
  cityMaxTemp: roundNumber(cityData.main.temp_max),
  cityMinTemp: roundNumber(cityData.main.temp_min),
  cityHumidity: cityData.main.humidity,
});

// Funcion para crear el HTML de la card
const createCard = (cityData) => {
  const {
    cityName,
    imgName,
    cityWeatherInfo,
    cityTemp,
    cityST,
    cityMaxTemp,
    cityMinTemp,
    cityHumidity,
  } = getCityData(cityData);

  return `
  <div class="weather-card animate">
    <div class="weather-info-container">
      <h2 class="weather-title">${cityName}</h2>
      <p class="weather-description">${cityWeatherInfo}</p>
      <div class="weather-temp-container">  
          <span class="weather-temp">${cityTemp}°</span>
          <span class="weather-st">${cityST}° ST</span>
      </div>
      </div>
        <div class="weather-img-container">
          <img src="./assets/img/${imgName}.png" alt="weather image" />
        </div>
      <div class="weather-extra-container">
        <div class="weather-minmax-container">
          <span class="weather-span"><i class="fa-solid fa-arrow-up-long"></i> Max: ${cityMaxTemp}º</span>
          <span class="weather-span"><i class="fa-solid fa-arrow-down-long"></i> Min: ${cityMinTemp}º</span>
        </div>
      <span class="weather-humidity">${cityHumidity}% Humedad</span>
    </div>
  </div>
  `;
};

// Funcion para renderizar la card
const renderCitycard = (cityData) => {
  cardContaier.innerHTML = createCard(cityData);
};

// Funcion para validar que el input no este vacio
const ifEmptyInput = () => {
  return searchInput.value.trim() === "";
};

// Funcion si no existe la ciudad
const ifCityNotFound = (cityData) => {
  return !cityData.id;
};

// Funcion para cambiar el mensaje de "ingrese una ciudad"
const changeSearchMsg = (cityData) => {
  searchMsg.textContent = `Así está el clima en ${cityData.name}. ¿Quieres buscar otra ciudad?`;
};

const searchCity = async (e) => {
  e.preventDefault();

  // Validamos que el input no este vacio
  if (ifEmptyInput()) {
    alert("Ingrese una ciudad");
    return;
  }

  // Traemos la ciudad
  const fetchedCity = await requestCity(searchInput.value);

  // Validamos que la ciudad exista
  if (ifCityNotFound(fetchedCity)) {
    alert("Ciudad no encontrada");
    form.reset();
    return;
  }

  // Cambiamos el mensaje de "ingrese una ciudad"
  changeSearchMsg(fetchedCity);

  renderCitycard(fetchedCity);
  form.reset();
};

const init = () => {
  form.addEventListener("submit", searchCity);
};

init();
