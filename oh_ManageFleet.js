function clicResetallFleet(){
  ContinueToFleet2Clicks = 0;
  document.getElementById('oh_ContinueToFleet2').setAttribute('class', 'continue off');
  document.getElementById('oh_ContinueToFleet2').focus();
}

function clicNewContinueToFleet2Btn(evt){
  let oMainButton = document.getElementById('continueToFleet2');
  let str = oMainButton.getAttribute('class');

  if(str == 'continue off'){
    document.getElementById('sendall').click();
    document.getElementById('oh_ContinueToFleet2').setAttribute('class', 'continue on');
  }
  else{
    oMainButton.click();
  }
}

function replaceContinueToFleet2Button(){
  let oNewBtn = document.createElement('a');
  oNewBtn.setAttribute('id', 'oh_ContinueToFleet2');
  oNewBtn.setAttribute('class', 'continue off');
  oNewBtn.setAttribute('href', 'javascript:void(0)');
  oNewBtn.innerHTML = "<span>Avanti</span>";
  oNewBtn.addEventListener('click', clicNewContinueToFleet2Btn);

  let oMainButton = document.getElementById('continueToFleet2');
  oMainButton.parentNode.insertBefore(oNewBtn, oMainButton);
  oMainButton.style.display='none';
  oNewBtn.focus();

  let oResetAll = document.getElementById('resetall');
  oResetAll.addEventListener('click', clicResetallFleet);
}

function _changeShipsStyle(ulName){
  let ul = document.getElementById(ulName);
  Array.from(ul.childNodes).forEach((el) => {
    if(el.nodeName.toUpperCase() == "LI"){
      el.style.width = '78px';
      el.style.height = '81px';

      //SPAN
      el.childNodes[1].style.display = 'inline-block';
      el.childNodes[1].style.width = '78px';
      el.childNodes[1].style.height = '78px';
      el.childNodes[1].setAttribute('onclick', 'javascript:document.getElementById(\'oh_ContinueToFleet2\').focus();');

      //Input
      el.childNodes[3].style.width = '71.75px';
      el.childNodes[3].style.height = '21px';
    }
  });
}

function changeFleet1ShipsStyle(){
  //return;
  document.getElementById('military').style.width ='420px';
  document.getElementById('military').style.height ='227px';
  document.getElementById('battleships').style.width ='420px';
  document.getElementById('battleships').style.height ='255px';
  document.getElementById('battleships').style.marginLeft ='-10px';

  document.getElementById('civil').style.width ='270px';
  document.getElementById('civil').style.height ='227px';
  document.getElementById('civil').style.marginLeft ='0px';
  document.getElementById('civil').style.marginRight ='20px';
  document.getElementById('civilships').style.width ='270px';
  document.getElementById('civilships').style.height ='255px';
  document.getElementById('civilships').style.paddingLeft ='0px';
  document.getElementById('civilships').style.marginLeft ='0px';
  document.getElementById('civilships').style.marginRight ='20px';

  _changeShipsStyle('military');
  _changeShipsStyle('civil');
}

function manageFleet(){
  var target1 = document.getElementById('continueToFleet2');
  var target2 = document.getElementById('fleet2');
  var target3 = document.getElementById('fleet3');

  var observer0 = new MutationObserver(function(mutations) {  //fleet1 Next buttpm style change
      mutations.forEach(function(mutationRecord) {
        var metaOPT = _getMeta('ogame-planet-type');
        if(metaOPT != ''){
          var oNewBtn = document.getElementById('oh_ContinueToFleet2');
          oNewBtn.setAttribute('class', target1.getAttribute('class'));
          //oNewBtn.focus();
        }
        //observer0.disconnect();
      });
  });

  var observer1 = new MutationObserver(function(mutations) {  //fleet2 div style change
      mutations.forEach(function(mutationRecord) {
        var metaOPT = _getMeta('ogame-planet-type');
        if(metaOPT != ''){
            var ownCoords = _getMeta('ogame-planet-coordinates');
            var selCoords = document.getElementById('galaxy').getAttribute('value');
            selCoords += ':' + document.getElementById('system').getAttribute('value');
            selCoords += ':' + document.getElementById('position').getAttribute('value');
            if(selCoords == ownCoords){
                if(metaOPT=='planet'){
                    document.getElementById('mbutton').click();
                }
                else{
                    document.getElementById('pbutton').click();
                }
            }
        }
        observer1.disconnect();
      });
  });

  var observer2 = new MutationObserver(function(mutations) {  //fleet3 div style change
      mutations.forEach(function(mutationRecord) {
        var divStatBarFleet = document.getElementById('statusBarFleet');
        var destCoords = divStatBarFleet.getElementsByClassName("targetName")[0].firstChild.nodeValue.trim();
        var ownCoords = '';
        var planetList = document.getElementById('planetList').getElementsByClassName('planet-koords');
        var index=0;
        for(index=0;index<planetList.length;index++){
            ownCoords += planetList[index].innerHTML;
        }
        if(ownCoords.indexOf(destCoords) != -1){
            document.getElementById('missionButton4').click();
        }
        observer2.disconnect();
      });
  });


  observer0.observe(target1, { attributes : true, attributeFilter : ['class'] });
  observer1.observe(target2, { attributes : true, attributeFilter : ['style'] });
  observer2.observe(target3, { attributes : true, attributeFilter : ['style'] });
}

function createResAndNavToolbar(){
  /*let oDivTB = document.createElement('div');
  oDivTB.setAttribute('id', 'oh_ResAndNavToolbar');*/
  let strDivTB =`
  <div id='oh_ResAndNavToolbar'>
  aa
    <table border="0" width="100%" cellpadding="0px" cellspacing="0px">
      <tr>
        <td>
          <a href='#'><img src="https://gf2.geo.gfsrv.net/cdndf/3e567d6f16d040326c7a0ea29a4f41.gif" width="22" height="22"></a>
        </td>
      </tr>
      <tr>
        <td align="center">
          <table>
            <tr>
              <td><div class='resourceIcon metal'></div></td>
              <td>&nbsp;</td>
              <td><div class='resourceIcon crystal'></div></td>
              <td>&nbsp;</td>
              <td><div class='resourceIcon deuterium'></div></td>
            </tr>
            <tr>
              <td><br><input type="text" id="ohTBMetal"></td>
              <td>&nbsp;</td>
              <td><br><input type="text" id="ohTBCrystal"></td>
              <td>&nbsp;</td>
              <td><br><input type="text" id="ohTBDeuterium"></td>
            </tr>
        </td>
      </tr>
    </table>
  </div>
  <!--div id='oh_ResAndNavToolbar' class="fleetStatus" align="center">
    <div>
      <div class='resourceIcon metal'></div>
      <div class='resourceIcon crystal'></div>
      <div class='resourceIcon deuterium'></div>
    </div>
  </div-->
  `;
  let oDivTB = htmlToElement(strDivTB);

  let oDivInhalt = document.getElementById('inhalt');
  oDivInhalt.insertBefore(oDivTB, document.getElementById('buttonz'));
}

function modifyFleet1Layer(){
  //createResAndNavToolbar();
  replaceContinueToFleet2Button();
  changeFleet1ShipsStyle();
}
