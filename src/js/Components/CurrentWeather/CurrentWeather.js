import Component from "../../framework/Component";
import WeatherDataService from "../../Services/WeatherDataService";
import {moodImagery} from "../../../../src/assets/mood/imagery/moodimagery.js";
import ComponentFactory from "../../framework/ComponentFactory";
import {ICON_URL, ICON_EXT} from "../../config";
import { bindScope, toggleInStorage, pushToStorage, isInStorage} from "../../utils";
import AppState from "../../Services/AppState";


export default class CurrentWeather extends Component {
  constructor(host, props) {
    super(host, props);
  
    this.onServerResponse = this.onServerResponse.bind(this);

    if (props.query) {
        this.onServerResponse(WeatherDataService.getCurrentWeather(props.query));
    }
    
  }

  onServerResponse(callback) {
    callback.then( data => {

        let dataR = {
            city: data.name + ', ' + data.sys.country,
            lat: data.coord.lat,
            lon: data.coord.lon, 
             wind: { speed: Math.round(data.wind.speed), unit: this.props.unit =='metric'?'m/s':'yd/s'},
             hum: { value: data.main.humidity, unit: '%'},
             press: {value: Math.round(data.main.pressure), unit: this.props.unit =='metric'?'atm':'kip'},
             descr: data.weather[0].description,
             temp: {value: Math.round(data.main.temp), unit: this.props.unit},
             icon: ICON_URL + data.weather[0].icon + ICON_EXT,
             fav: this.props.fav,
             unit: this.props.unit,
             ready: true
        };
       

        this.updateState(dataR);

        //this._render(dataR);
        console.log(data);
    });

  }

  init() {

    this.state = {
        city: '',
        lat: '',
        lon: '', 
         wind: {},
         hum: {},
         press: {},
         descr: '',
         temp: {},
         icon: '',
         fav: false,
         unit: 'metric',
         ready: false,
    };
   
  }

  render() {

    const dataR = this.state;

    if (dataR.ready) { pushToStorage(dataR.city, 'historyStorage'); AppState.update('CITY', {});}

    console.log(dataR);

    return `<div id="weather-today-main" class="weather-today ${dataR.ready?'weather-visible':'weather'}">
    <div class="wt-row">
        <button id="favourite-no" class="favourite-no btn-frameless btn-round ${(!dataR.fav)?'': 'display-none'}" title="Add to favourites!"><i class="material-icons favourite-no">favorite_border</i></button>
        <button id="favourite-yes" class="favourite-yes btn-frameless btn-round ${(dataR.fav)?'': 'display-none'}" title="Remove from favourites"><i class="material-icons favourite-yes">favorite</i></button>
        <div class="wt-main-city" id="wt-cityFull">${dataR.city}</div>
       
        <div class="wt-main-geo" id="wt-geoFull">${dataR.ready ? dataR.lon + ', ' + dataR.lat: ''}</div>
    </div>
    <div class="wt-row">
        <div class="wt-column">
            <div class="weather-item">
                <div class="wt-header">
                <img class="wt-icon" src="${moodImagery.iWind}"></img>
                </div>
                <div class="wt-data" id="wt-windSpeed">${dataR.ready ? dataR.wind.speed: ''}</div>
                <div class="wt-data" id="wt-windSpeedUnits">${dataR.ready ? dataR.wind.unit: ''}</div>
                <div class="wt-windAzimuth" id="wt-windAzimuth"></div>
            </div>
            <div class="weather-item">
                
                <div class="wt-header">
                <img class="wt-icon" src="${moodImagery.iHum}"></img>
                </div>
                <div class="wt-data" id="wt-humidity">${dataR.ready ? dataR.hum.value: ''}</div>
                <div class="wt-data">${dataR ? dataR.hum.unit: ''}</div>
            </div>
            <div class="weather-item">
                <div class="wt-header">
                <img class="wt-icon" src="${moodImagery.iBar}"></img>
                </div>
                <div class="wt-data" id="wt-pressure">${dataR.ready ? dataR.press.value: ''}</div>
                <div class="wt-data">${dataR.ready ? dataR.press.unit: ''}</div>
            </div>
        </div>
        <div class="wt-row-nowrap">
            <div class="wt-main-item wt-descrIcon" id="wt-descrIcon">
            <img src=${dataR.ready ? dataR.icon: ''}  class ="wt-icon-img" />
            </div>
            <div class="wt-column">
                <div class="wt-row">
                    
                    <img class="wt-icon wt-icon-temp" src="${moodImagery.iTemp}"></img>
                    <div class="wt-temp" id="wt-temp">${dataR.ready ? dataR.temp.value: ''}</div>
                    <div id="unit-switch" class="unit-switch" title="Change unit!" >
                        <button data-unit="celsius" class="btn-frameless btn-unit-switch ${dataR.unit=='metric'?'unit-active':''}" type="button">
                            <i class="wi wi-celsius"></i>
                        </button>
                        <button data-unit="fahrenheit" class="btn-frameless btn-unit-switch ${dataR.unit!='metric'?'unit-active':''}" type="button">
                            <i class="wi wi-fahrenheit"></i>
                        </button>
                    </div>
                </div>
                <div class="wt-descr-main" id="wt-descr">${dataR.ready ? dataR.descr: ''}</div>
            </div>
        </div>
    </div>
</div>

`;
  }
}
 ComponentFactory.register(CurrentWeather);