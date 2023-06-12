//https:api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=62be6b38aa2551b04e80565795a97ee0

const KEY = "62be6b38aa2551b04e80565795a97ee0";

const requestCity = async (city) => {
  try {
    const respose = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&uk&APPID=${KEY}`
    );

    const data = await respose.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
