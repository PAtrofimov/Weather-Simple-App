import Component from "../../framework/Component";
import ComponentFactory from "../../framework/ComponentFactory";
 import WeatherDataService from "../../Services/WeatherDataService";
 import {ICON_URL, ICON_EXT} from "../../config";
 import {monthDay, hourMinute} from "../../utils";
 import {WeatherForecastItem} from "../WeatherForecastItem";


export default class WeatherForecast extends Component {
  constructor(host, props) {
    super(host, props);

    this.onServerResponse = this.onServerResponse.bind(this);
    if (props.query)  {
    this.onServerResponse(WeatherDataService.getWeatherForecast(props.query));
    }
  }

  onServerResponse(callback) {
    callback.then( data => {

      let query=this.props;

      let datalist = data.list.map( function(item) {

      return  {        
                dt: monthDay(item.dt),
                time: hourMinute(item.dt),
                descr: item.weather[0].description,
                temp: {value: Math.round(item.main.temp), unit: query.unit==='metric' ?'°C':'°F'},
                icon: ICON_URL + item.weather[0].icon + ICON_EXT,
                ready: true,

        
      };} );

   // this._render(datalist);
   this.updateState({datalist:datalist, ready: true});

    console.log(data);
    console.log(datalist);
  }
   
    
    );

  }

  init() {

    this.state = {
      datalist: [{
      dt: '',
      time: '',
      descr: '',
      temp: {},
      icon: '',
      ready: false,
    }], ready: false};
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    console.log('Wow! Me clicked!!!!!');
  }

  render() {

    let datalist = this.state.datalist;
    console.log(datalist);

    return  {
      tag: 'div',
      attributes: [{
          name: 'id',
          value: 'weather-forecast-main',
        },
       
      ],

      classList: [this.state.ready?'weather-visible':'weather', 'wt-row', 'wt-row-spread'],

      children: [
      
        ...datalist.map(data => ({
           tag: WeatherForecastItem,
           props: data,
         })), 
        ],
        };
          
  }
}

ComponentFactory.register(WeatherForecast);