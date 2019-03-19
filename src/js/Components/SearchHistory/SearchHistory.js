import Component from "../../framework/Component";
import ComponentFactory from "../../framework/ComponentFactory";
export default class SearchHistory extends Component {
  constructor(host, props) {
    super(host, props);
  }

  render() {
    let data = JSON.parse(localStorage.getItem('historyStorage'));
        let resultArr =[];
        if(data){resultArr = Object.values(data)}
        //resultArr.unshift(`Serch history`);
       
       return {
          tag: 'select',
          attributes: [{
              name: 'id',
              value: 'weather-history-main',
            },

            {
              name: 'size',
              value: '3',
            },
           
          ],
    
          children: [ {
           tag: 'optgroup',
           classList: ['liked-history', 'liked-history-item'],
          attributes: [{
              name: 'label',
              value: 'Serch history',
            },
            {
              name: 'selected',
              value: 'selected',
            },
          
          ],
          
          
          
          children: (data)?resultArr.map((item, ind)=>(
            {
                tag: 'option',
                classList: ['liked-history-item'],
                content: item,
                     
            }
            )):'',
          }]
          };
                    
      }
               
}

ComponentFactory.register(SearchHistory);
