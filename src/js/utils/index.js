
export const createDomFragment = string => {
    const template = document.createElement('template');
    template.innerHTML = string.trim();
    return template.content;
  };
  
  export const clearDomChildren = domElement => {
    domElement.innerHTML = '';
    return domElement;
  };
  
  export const appendDomFragment = (domElement, domFragment) => {
    if (Array.isArray(domFragment)) {
      domElement.append(...domFragment);
    } else {
      domElement.append(domFragment);
    }
    return domElement;
  };
  
  export const buildDomFragment = (host, elements) => {
    elements.forEach(elementSpec => {
      let element = document.createElement(typeof elementSpec.tag === 'string' ? elementSpec.tag : 'div');
      if (elementSpec.innerHTML) {
        element.innerHTML = elementSpec.innerHTML;
      }
      if (elementSpec.classList) {
        if (typeof elementSpec.classList === 'string') {
          elementSpec.classList = elementSpec.classList.split(' ');
        }
        element.classList.add(...elementSpec.classList);
      }
      if (!(typeof elementSpec.tag === 'string')) {
        new elementSpec.tag(element, elementSpec.props);
      }
      if (elementSpec.children) {
        buildDomFragment(element, elementSpec.children);
      }
      host.appendChild(element);
    });
    return host;
  };
  
  export const bindScope = (scope, ...names) => {
    names.forEach(name => {
      if (typeof scope[name] === 'function') {
        scope[name] = scope[name].bind(scope);
      } else {
        throw Error(
          `Expected ${name} to be a function. Instead ${name} is ${typeof scope[name]}`
        );
      }
    });
  };

  export const PushToStorage = (item, key)=>{
    const data = (localStorage[key]) ?
        JSON.parse(localStorage[key]) : [];
    let newData = data.slice();
    if(item){

        if(newData.contains(item)){newData.push(item)};
       
        if(newData.length===10){newData.shift()};
        
        localStorage[key] = JSON.stringify(newData);
    }

};
export const popFromStorage = (item, key)=>{
    const data = (localStorage[key]) ?
        JSON.parse(localStorage[key]) : [];
    let newData = data.slice();

    let ind = newData.indexOf(item);
    newData.splice(ind,1);
    localStorage[key] = JSON.stringify(newData);
};

export const monthDay = (timestamp)=>{
  let xx = new Date(timestamp*1000);
  let options = {day:'2-digit', month:'2-digit'};
  return new Intl.DateTimeFormat('en-US', options).format(xx);
};

export const hourMinute = (timestamp)=>{
  let xx = new Date(timestamp*1000);
  let options = {hour:'2-digit', minute:'2-digit'};
  return new Intl.DateTimeFormat('en-US', options).format(xx);
};
  