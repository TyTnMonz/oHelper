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
  oAnchor.addEventListener('click', openSettingDialog);

  oLi.appendChild(oSpanR);
  oLi.appendChild(oAnchor);
  document.getElementById('menuTableTools').appendChild(oLi);

  //Appending DIV overlay to the bottom of the body
  let ohOverlayDialog = document.createElement('div');
  ohOverlayDialog.setAttribute('id', 'ohOverlayDialog');
  ohOverlayDialog.innerHTML = 'Ciao';

  let ohOverlay = document.createElement('div');
  ohOverlay.setAttribute('id', 'ohOverlay');
  ohOverlay.addEventListener('click', closeSettingDialog);
  ohOverlay.appendChild(ohOverlayDialog);

  document.body.appendChild(ohOverlay);
}

function openSettingDialog(){
  document.getElementById("ohOverlay").style.display = "block";
}

function closeSettingDialog(){
  document.getElementById("ohOverlay").style.display = "none";
}
