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
  cellLeft.innerHTML = `
  <center><h1 style="font-size:20px;">oHelper - Impostazioni</h1></center>
  <br><br>`;

  let dbgCheckBox = document.createElement('input');
  let dbgLabel = document.createElement('label');

  dbgCheckBox.setAttribute('type', 'checkbox');
  dbgCheckBox.setAttribute('id', 'debugChbx');
  dbgCheckBox.setAttribute('name', 'debugChbx');
  dbgCheckBox.addEventListener('click', setEnableDebugLog, false);
  // Getting SessionStorage Value for Debugging Status
  dbgCheckBox.checked = sessionStorage.getItem('debug') == 'true' ? true:false;

  dbgLabel.setAttribute('for', 'debug');
  dbgLabel.setAttribute('style', 'color: #9c0; font-size: 20px; position: relative; top: -3px; left: 5px;');
  dbgLabel.addEventListener('click', setEnableDebugLog, false);
  dbgLabel.innerHTML = 'Abilita Debug';
  cellLeft.appendChild(dbgCheckBox);
  cellLeft.appendChild(dbgLabel);

  /*********************************************/
  cellLeft.appendChild(document.createElement('p'));
  /*********************************************/

  dbgCheckBox = document.createElement('input');
  dbgLabel = document.createElement('label');
  dbgCheckBox.setAttribute('type', 'checkbox');
  dbgCheckBox.setAttribute('id', 'ohIncomingAttacksAlert');
  dbgCheckBox.setAttribute('name', 'ohIncomingAttacksAlert');
  //dbgCheckBox.addEventListener('click', setEnableDebugLog, false);
  // Getting SessionStorage Value for Debugging Status
  dbgCheckBox.checked = sessionStorage.getItem('ohIncomingAttacksAlert') == 'true' ? true:false;

  dbgLabel.setAttribute('style', 'color: #9c0; font-size: 20px; position: relative; top: -3px; left: 5px;');
  dbgLabel.addEventListener('click', setEnableDebugLog, false);
  dbgLabel.innerHTML = 'Abilita Alert degli attacchi';
  cellLeft.appendChild(dbgCheckBox);
  cellLeft.appendChild(dbgLabel);

  /*********************************************/
  cellLeft.appendChild(document.createElement('p'));
  /*********************************************/

  let oClearCache = document.createElement('a');
  oClearCache.setAttribute('href', '#');
  oClearCache.setAttribute('id', 'ohOverlayDialogClearCache');
  oClearCache.innerHTML = 'Resetta dati cache';
  //  oClearCache.addEventListener('click', closeSettingsDialog);
  cellLeft.appendChild(oClearCache);

  ohOverlayDialog.appendChild(oMainTB);
}
