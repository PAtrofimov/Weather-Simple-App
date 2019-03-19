import Component from "../../framework/Component";
import { CurrentWeather} from "../CurrentWeather";
import { SearchBar} from "../SearchBar";
import { WeatherForecast} from "../WeatherForecast";
import ComponentFactory from "../../framework/ComponentFactory";
import {FavouriteLocations} from "../FavouriteLocations";
import {SearchHistory} from "../SearchHistory";
import { bindScope, toggleInStorage, pushToStorage, isInStorage} from "../../utils";
import { normalize } from "path";
 

export default class App extends Component {
  constructor(host, props={}) {
    super(host);
    // bindScope(this, 'updateCount');
    // this.updateState({
    //   count: 5,
    // });
  }

  // updateCount(newValue) {
  //   this.updateState({
  //     count: newValue,
  //   });
  // }

  onSearch() {

    const searchInput = document.querySelector('#search-input').value;
    const btnUnit = document.querySelector('.unit-active .wi-fahrenheit');
    const unit = (btnUnit)?'imperial':'metric'; 
    pushToStorage(searchInput, 'historyStorage');
    this._render({value: searchInput, unit: unit, fav: isInStorage(searchInput, 'likedStorage')});
    

  }

  onSubmit() {

    event.preventDefault();

    event.stopPropagation();

    this.onSearch();
   

    console.log('Событие Submit сработало!');
  }

  onClick(e) {

    const activeBtn = e.target;

    const searchInput = document.querySelector('#search-input').value;

    if (activeBtn.classList.contains('wi-celsius'))  {
      activeBtn.classList.toggle('unit-active');

      const btn = document.querySelector('.wi-fahrenheit');
      btn.classList.toggle('unit-active');

      

      this._render({value: searchInput, unit: 'imperial', fav: isInStorage(searchInput, 'likedStorage')});
      return;
    }

    if (activeBtn.classList.contains('wi-fahrenheit')) {
      activeBtn.classList.toggle('unit-active');
      
      const btn = document.querySelector('.wi-celsius');
      btn.classList.toggle('unit-active');

      this._render({value: searchInput, unit: 'metric', fav: isInStorage(searchInput, 'likedStorage')});
      return;
    }

    if (activeBtn.classList.contains('favourite-no') || activeBtn.classList.contains('favourite-yes')) {

      const btnFavNo = document.querySelector('#favourite-no');
      btnFavNo.classList.toggle('display-none');

      const btnFavYes = document.querySelector('#favourite-yes');
      btnFavYes.classList.toggle('display-none');

      toggleInStorage(searchInput, 'likedStorage');

      e.preventDefault();
      
      this._render({value: searchInput, unit: 'metric', fav: isInStorage(searchInput, 'likedStorage')});
      return;
    }

    console.log('On click !!');
        
  }

  bindEverything() {
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  render(data) {

    return [

      {
        tag: 'form',

        eventHandlers: 
          {
            submit: this.onSubmit,
            click: this.onClick,
          
          },
        
        attributes: [{
            name: 'autocomplete',
            value: 'off',
          },
          {
            name: 'target',
            value: '#',
          },

        ],
        children: [{

            tag: SearchBar,
            eventHandlers: 
          {
            click: this.onClick,
                      
          },
            props: {
              query: data ?data.value:'',
            },
          },

          {
            tag: 'div',

            attributes: [{
              name: 'id',
              value: 'favourite-container',
            }, ],
            children: [

          {
            tag: FavouriteLocations,
            props: {
              query: data,
             },
          },

          {
            tag: SearchHistory,
            props: {
              query: data,
             },
          },
        ],
      },
          {
            tag: 'div',

            attributes: [{
              name: 'id',
              value: 'weather-container',

            }, ],
            children: [

              {
                tag: CurrentWeather,
                props: {
                  query: data,
                  unit: data?data.unit:'metric', 
                  fav: data?data.fav:'no',
                },
              },
              
              {
                tag: WeatherForecast,
                props: {
                  query: data,
                  unit: data?data.unit:'metric',
                },
              },
            ]
          }
        ],
      },
    ];
  }
}

ComponentFactory.register(App);