import {URL_API_CURRENT, URL_API_FORECAST} from "../config.js";

class WeatherDataService{

 apiPath(data={}) {
  let query = '';

  if (data) {
    const dataList = data.value.split(',');
      if (dataList.length >= 2 && data.value.search(/\d/) !==-1) 
      {query = `lon=${dataList[0].trim()}&lat=${dataList[1].trim()}&units=${data.unit}`;} 
      else
      {query = `q=${data.value}&units=${data.unit}`;}
  }

  return query;

 } 
    
  
getCurrentWeather(data={}) {

 let query =  this.apiPath(data);

  if (!query) return {};
     

let path = URL_API_CURRENT.replace(/#query/, query);

//api.openweathermap.org/data/2.5/weather?id=2172797
//api.openweathermap.org/data/2.5/weather?lat=35&lon=139
return fetch(path, {method: 'get'})
      .then(response => {
        if (response.ok)
          return response.json();
        throw response.status;
      })
      .then(data => {
               
       // console.log(data);
        return data;
      })
      .catch(error => {
         console.error(error);
        throw error;
      });

        

    }
    getWeatherForecast(data={}) {
      let query =  this.apiPath(data);
      
      if (!query) return {};
       
      let path = URL_API_FORECAST.replace(/#query/, query);

      console.log(path);
       
          return fetch(path, {method: 'get'})
              .then(response => {
                if (response.ok)
                  return response.json();
                throw response.status;
              })
              .then(data => {
                
              return data;
            })
              .catch(error => {
                 console.error(error);
                throw error;
              });

    }

}
  
   export default new WeatherDataService();
