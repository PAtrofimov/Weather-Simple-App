import Component from "../../framework/Component";
import { CurrentWeather} from "../CurrentWeather";
import { SearchBar} from "../SearchBar";
import { WeatherForecast} from "../WeatherForecast";
import ComponentFactory from "../../framework/ComponentFactory";
import { bindScope } from "../../utils";
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
    this._render({value: searchInput, unit: unit});

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

      this._render({value: searchInput, unit: 'imperial'});
      return;
    }

    if (activeBtn.classList.contains('wi-fahrenheit')) {
      activeBtn.classList.toggle('unit-active');
      
      const btn = document.querySelector('.wi-celsius');
      btn.classList.toggle('unit-active');

      this._render({value: searchInput, unit: 'metric'});
      return;
    }

    if (activeBtn.classList.contains('btn-search') || activeBtn.classList.contains('material-icons')) {
      this.onSearch();
    }
    
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
              value: 'weather-container',

            }, ],
            children: [

              {

                tag: CurrentWeather,
                props: {
                  query: data,
                  unit: data?data.unit:'metric', 
                  
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



      //{
      //   tag: 'div',

      //   attributes: [
      //     {
      //       id: 'search-bar',
      //       value: 'I have got children',
      //     },
      //   ],
      //   children: [

      //     {
      //       tag:'div',
      //       attributes: [
      //         {
      //           class: 'row',
      //         },
      //       ],

      //       children: [
      //         {
      //           //<input type="text" id="search-input" class="search" placeholder="E.g.: Kyiv, New York, 30.5 50.4, -74.0 40.7" title="Tap me and type!"/>
      //           tag: 'input',

      //           eventHandlers: [
      //             {
      //               eventType: 'change',

      //             },
      //           ],

      //           classList: ['search'],
      //           attributes: [
      //             { type: 'search',
      //               id: 'search-input',
      //               title: 'Please search city!',
      //               placeholder: 'E.g.: Kyiv, New York, 30.5 50.4, -74.0 40.7',
      //               value:'E.g.: Kyiv, New York, 30.5 50.4, -74.0 40.7',
      //             },
      //           ],
      //         },

      //         {

      //           tag: 'button',

      //           eventHandlers: [
      //             {
      //               eventType: 'click',

      //             },
      //           ],


      //         }

      //       ],


      //       // <button id="search-action" class="btn-frameless btn-search btn-round" title="Get weather info" type="button" disabled><i class="material-icons">search</i></button>
      //     },

      //   ],
      //},


      // {

      //  tag: Temperature,
      //   props: {
      //     temperature: 7,
      //     unit: 'C',
      //   },
      // },

      // {
      //   tag: 'div',
      //   content: 'Me div',
      //   classList: ['nice'],
      //   attributes: [
      //     {
      //       name: 'title',
      //       value: 'Me definitely nice div',
      //     },
      //   ],
      // },

      //     {
      //       tag: 'div',
      //       content: 'I am a parent div',
      //       attributes: [
      //         {
      //           name: 'title',
      //           value: 'I have got children',
      //         },
      //       ],
      //       children: [
      //         {tag:'div', content:'Child 1'},
      //         {
      //           tag:'div',
      //           content:'Child 2',
      //           children: [
      //             {tag:'div', content:'Child 2.1'},
      //             {tag:'div', content:'Child 2.2'},
      //             {tag:Temperature, props: {temperature:100, unit: 'K',}}
      //           ],
      //         },
      //         {tag:'div', content:'Child 3'},
      //         {
      //           tag: 'input',
      //           eventHandlers: [
      //             {
      //               eventType: 'change',
      //               // handler: this.handleChange, // bind(this): constructor(){this.method = this.method.bind(this);}
      //             },
      //           ],
      //         },
      //       ],
      //     }, // <div title="I have got children"><div>Child 1</dev><div>Child 2<d2.1/><d2.2/></dev><div>Child 2</dev> </div>
      //     {
      //       tag: Wind,
      //       props: {
      //         speed: 250,
      //         unit: 'mph',
      //       },
      //     },

    ];
  }
}

ComponentFactory.register(App);