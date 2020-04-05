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
  oAnchor.addEventListener('click', openSettingsDialog);

  oLi.appendChild(oSpanR);
  oLi.appendChild(oAnchor);
  document.getElementById('menuTableTools').appendChild(oLi);

  //Appending DIV overlay to the bottom of the body
  let ohOverlayDialog = document.createElement('div');
  ohOverlayDialog.setAttribute('id', 'ohOverlayDialog');
  ohOverlayDialog.innerHTML = "";
  buildOverlayDialog(ohOverlayDialog);

  let ohOverlay = document.createElement('div');
  ohOverlay.setAttribute('id', 'ohOverlay');
  ohOverlay.appendChild(ohOverlayDialog);

  document.body.appendChild(ohOverlay);
}

function openSettingsDialog(){
  document.getElementById("ohOverlay").style.display = "block";
}

function closeSettingsDialog(){
  document.getElementById("ohOverlay").style.display = "none";
}

function buildOverlayDialog(ohOverlayDialog){
  let oCloseDialog = document.createElement('a');
  oCloseDialog.setAttribute('href', '#');
  oCloseDialog.setAttribute('id', 'ohOverlayDialogClose');
  oCloseDialog.innerHTML = 'X';
  oCloseDialog.addEventListener('click', closeSettingsDialog);

  let oMainTB = document.createElement('Table');
  oMainTB.setAttribute('width', '100% ');
  oMainTB.setAttribute('border', '1');
  let row = oMainTB.insertRow(0);
  let cellLeft = row.insertCell(0);
  let cellRight = row.insertCell(1);
  cellRight.appendChild(oCloseDialog);
  cellRight.setAttribute('valign', 'top');
  cellRight.addEventListener('click', closeSettingsDialog);

  cellLeft.setAttribute('width', '100% ');
  cellLeft.innerHTML = "ciao<br>ciao<br>ciao";

  ohOverlayDialog.appendChild(oMainTB);
}
