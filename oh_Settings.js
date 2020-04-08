const oh_saveSettingLocation = { local: 'l', session: 's' };

function get_OptionValue(pKey, pLocal = oh_saveSettingLocation.local) {
  //console.log(`Getting pKey [${pKey}]`);
  if ( pLocal == oh_saveSettingLocation.local ) {
    return localStorage.getItem(pKey);
  } else {
    return sessionStorage.getItem(pKey);
  }
}

function set_OptionValue(pOption, pKey, pLocal = oh_saveSettingLocation.local) {
    getPrintDebugLog(`Setting Option [${pOption}]`);
    let oOption = document.getElementById(pOption);
    if ( ! isNullOrEmpty(oOption) ) {
      if ( pLocal == oh_saveSettingLocation.local ) {
        localStorage.setItem(pKey, oOption.checked);
      } else {
        sessionStorage.setItem(pKey, oOption.checked);
      }
      getPrintDebugLog(`Key [${pKey}] for Option [${pOption}] set to ${ pLocal == oh_saveSettingLocation.local ? 'localStorage':'sessionStorage' } with value [${oOption.checked}]`);
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
  dbgCheckBox.addEventListener('click', function(){ set_OptionValue('debugChbx', 'ohDebug'); }, false);
  // Getting SessionStorage Value for Debugging Status
  dbgCheckBox.checked = get_OptionValue('ohDebug') == 'true' ? true:false;

  dbgLabel.setAttribute('for', 'debugChbx');
  dbgLabel.setAttribute('style', 'color: #9c0; font-size: 20px; position: relative; top: -3px; left: 5px;');
  dbgLabel.addEventListener('click', function(){ set_OptionValue('debugChbx', 'ohDebug'); }, false);
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
  dbgCheckBox.addEventListener('click', function(){ set_OptionValue('ohIAAChbx', 'ohIncomingAttacksAlert', oh_saveSettingLocation.session); }, false);
  // Getting SessionStorage Value for Debugging Status
  dbgCheckBox.checked = get_OptionValue('ohIncomingAttacksAlert', oh_saveSettingLocation.session) == 'true' ? true:false;

  dbgLabel.setAttribute('for', 'ohIAAChbx');
  dbgLabel.setAttribute('style', 'color: #9c0; font-size: 20px; position: relative; top: -3px; left: 5px;');
  dbgLabel.addEventListener('click', function(){ set_OptionValue('ohIAAChbx', 'ohIncomingAttacksAlert', oh_saveSettingLocation.session); }, false);
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
