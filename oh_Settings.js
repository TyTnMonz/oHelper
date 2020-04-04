function addToLeftMenuButtons(){
  let oLi = document.createElement('li');
  let oSpanL = document.createElement('span');
  let oSpanR = document.createElement('span');
  let oAnchor = document.createElement('a');

  oSpanL.setAttribute('class', 'textlabel');
  oSpanL.innerHTML = 'oHelper';

  oSpanR.setAttribute('class', 'menu_icon');

  oAnchor.setAttribute('class', 'menubutton');
  oAnchor.setAttribute('href', 'javascript:void(0);');
  oAnchor.setAttribute('target', '_self');
  oAnchor.setAttribute('id', 'oHelper');
  oAnchor.appendChild(oSpanL);

  oLi.appendChild(oSpanR);
  oLi.appendChild(oAnchor);
  document.getElementById('menuTableTools').appendChild(oLi);
}
