import Component from "../../framework/Component";
import ComponentFactory from "../../framework/ComponentFactory";
export default class WeatherForecastItem extends Component {
  constructor(host, props) {
    super(host, props);
  }

  render() {

    let dataR = this.props;

    return `<div class="wf-item">
    
    <div class="wf-icon">
    <img src=${dataR ? dataR.icon: ''}  class ="wt-fc-icon-img" />
    </div>
    <div class="wf-descr">${dataR?dataR.descr:''}</div>
    <div class="wf-temp">${dataR?dataR.temp.value + dataR.temp.unit:''}</div>
    <div class="wf-time">${dataR?dataR.time:''}</div>
    <div class="wf-date">${dataR?dataR.dt:''}</div></div>    
    `;
  }
}

ComponentFactory.register(WeatherForecastItem);
