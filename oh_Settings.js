const oh_saveSettingLocation = { local: 'l', session: 's' };

function get_OptionValue(pKey, pLocal = oh_saveSettingLocation.local) {
  pKey = `${universe}.${pKey}`;
  //console.log(`Getting Option Key [${pKey}]`);
  if ( pLocal == oh_saveSettingLocation.local ) {
    //console.log(`Key Value [${localStorage.getItem(pKey)}]`);
    return localStorage.getItem(pKey);
  } else {
    //console.log(`Key Value [${sessionStorage.getItem(pKey)}]`);
    return sessionStorage.getItem(pKey);
  }
}

function set_OptionValue(pOption, pKey, pLocal = oh_saveSettingLocation.local) {
    pKey = `${universe}.${pKey}`;
    //console.log(`Setting Option [${pOption}] with Key [${pKey}]`);
    let oOption = document.getElementById(pOption);
    if ( ! isNullOrEmpty(oOption) ) {
      if ( pLocal == oh_saveSettingLocation.local ) {
        localStorage.setItem(pKey, oOption.checked);
      } else {
        sessionStorage.setItem(pKey, oOption.checked);
      }
      //console.log(`Key [${pKey}] for Option [${pOption}] set to ${ pLocal == oh_saveSettingLocation.local ? 'localStorage':'sessionStorage' } with value [${oOption.checked}]`);
    }
}

function set_SimpleValue(pValue, pKey, pLocal = oh_saveSettingLocation.local){
  pKey = `${universe}.${pKey}`;
  console.log(`Setting Value [${pValue}] with Key [${pKey}]`);
  if ( ! isNullOrEmpty(pValue) ) {
    if ( pLocal == oh_saveSettingLocation.local ) {
      localStorage.setItem(pKey, pValue);
    } else {
      sessionStorage.setItem(pKey, pValue);
    }
    console.log(`Key [${pKey}] for Value [${pValue}] set to ${ pLocal == oh_saveSettingLocation.local ? 'localStorage':'sessionStorage' } with value [${pValue}]`);
  }
}

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
  dbgCheckBox.addEventListener('click', function(){ set_OptionValue('debugChbx', 'ohDebug', oh_saveSettingLocation.session); }, false);
  // Getting SessionStorage Value for Debugging Status
  dbgCheckBox.checked = get_OptionValue('ohDebug', oh_saveSettingLocation.session) == 'true' ? true:false;

  dbgLabel.setAttribute('for', 'debugChbx');
  dbgLabel.setAttribute('style', 'color: #9c0; font-size: 18px; position: relative; top: -3px; left: 5px;');
  dbgLabel.addEventListener('click', function(){ set_OptionValue('debugChbx', 'ohDebug', oh_saveSettingLocation.session); }, false);
  dbgLabel.innerHTML = 'Abilita Debug';
  cellLeft.appendChild(dbgCheckBox);
  cellLeft.appendChild(dbgLabel);

  /*********************************************/
  cellLeft.appendChild(document.createElement('p'));
  /*********************************************/

  dbgCheckBox = document.createElement('input');
  dbgLabel = document.createElement('label');
  dbgCheckBox.setAttribute('type', 'checkbox');
  dbgCheckBox.setAttribute('id', 'ohIAAChbx');
  dbgCheckBox.setAttribute('name', 'ohIAAChbx');
  dbgCheckBox.addEventListener('click', function(){ set_OptionValue('ohIAAChbx', 'ohIncomingAttacksAlert'); }, false);
  // Getting SessionStorage Value for Debugging Status
  dbgCheckBox.checked = get_OptionValue('ohIncomingAttacksAlert') == 'true' ? true:false;

  dbgLabel.setAttribute('for', 'ohIAAChbx');
  dbgLabel.setAttribute('style', 'color: #9c0; font-size: 18px; position: relative; top: -3px; left: 5px;');
  dbgLabel.addEventListener('click', function(){ set_OptionValue('ohIAAChbx', 'ohIncomingAttacksAlert'); }, false);
  dbgLabel.innerHTML = 'Abilita Alert degli attacchi';
  cellLeft.appendChild(dbgCheckBox);
  cellLeft.appendChild(dbgLabel);

  /*********************************************/
  cellLeft.appendChild(document.createElement('p'));
  /*********************************************/

  dbgCheckBox = document.createElement('input');
  dbgLabel = document.createElement('label');
  dbgCheckBox.setAttribute('type', 'checkbox');
  dbgCheckBox.setAttribute('id', 'ohShowDepotTimeChbx');
  dbgCheckBox.setAttribute('name', 'ohShowDepotTimeChbx');
  dbgCheckBox.addEventListener('click', function(){ set_OptionValue('ohShowDepotTimeChbx', 'ohShowDepotTimeChbx'); }, false);
  // Getting SessionStorage Value for Debugging Status
  dbgCheckBox.checked = get_OptionValue('ohShowDepotTimeChbx') == 'true' ? true:false;

  dbgLabel.setAttribute('for', 'ohShowDepotTimeChbx');
  dbgLabel.setAttribute('style', 'color: #9c0; font-size: 18px; position: relative; top: -3px; left: 5px;');
  dbgLabel.innerHTML = 'Mostra % riempimento depositi invece del tempo rimanente';
  cellLeft.appendChild(dbgCheckBox);
  cellLeft.appendChild(dbgLabel);

  /*********************************************/
  cellLeft.appendChild(document.createElement('p'));
  /*********************************************/

  dbgCheckBox = document.createElement('input');
  dbgLabel = document.createElement('label');
  dbgCheckBox.setAttribute('type', 'checkbox');
  dbgCheckBox.setAttribute('id', 'ohChangeTimers');
  dbgCheckBox.setAttribute('name', 'ohChangeTimers');
  dbgCheckBox.addEventListener('click', function(){ set_OptionValue('ohChangeTimers', 'ohChangeTimers'); }, false);
  // Getting SessionStorage Value for Debugging Status
  dbgCheckBox.checked = get_OptionValue('ohChangeTimers') == 'true' ? true:false;

  dbgLabel.setAttribute('for', 'ohChangeTimers');
  dbgLabel.setAttribute('style', 'color: #9c0; font-size: 18px; position: relative; top: -3px; left: 5px;');
  dbgLabel.addEventListener('click', function(){ set_OptionValue('ohChangeTimers', 'ohChangeTimers'); }, false);
  dbgLabel.innerHTML = 'Abilita Modifica Timer sul Fuso Orario locale';
  cellLeft.appendChild(dbgCheckBox);
  cellLeft.appendChild(dbgLabel);

  /*********************************************/
  cellLeft.appendChild(document.createElement('p'));
  /*********************************************/

  dbgCheckBox = document.createElement('input');
  dbgLabel = document.createElement('label');
  dbgCheckBox.setAttribute('type', 'checkbox');
  dbgCheckBox.setAttribute('id', 'ohApplyCSS');
  dbgCheckBox.setAttribute('name', 'ohApplyCSS');
  dbgCheckBox.addEventListener('click', function(){ set_OptionValue('ohApplyCSS', 'ohApplyCSS'); }, false);
  // Getting SessionStorage Value for Debugging Status
  dbgCheckBox.checked = get_OptionValue('ohApplyCSS') == 'true' ? true:false;

  dbgLabel.setAttribute('for', 'ohApplyCSS');
  dbgLabel.setAttribute('style', 'color: #9c0; font-size: 18px; position: relative; top: -3px; left: 5px;');
  dbgLabel.addEventListener('click', function(){ set_OptionValue('ohApplyCSS', 'ohApplyCSS'); }, false);
  dbgLabel.innerHTML = 'Abilita CSS Custom per Lista Pianeti';
  cellLeft.appendChild(dbgCheckBox);
  cellLeft.appendChild(dbgLabel);

  /*********************************************/
  let p = document.createElement('p');
  p.innerHTML = "<br><br>";
  cellLeft.appendChild(p);
  /*********************************************/

  let oClearCache = document.createElement('a');
  oClearCache.setAttribute('href', '#');
  oClearCache.setAttribute('id', 'ohOverlayDialogClearCache');
  oClearCache.innerHTML = 'Resetta dati cache';
  //  oClearCache.addEventListener('click', closeSettingsDialog);
  cellLeft.appendChild(oClearCache);

  ohOverlayDialog.appendChild(oMainTB);
}
