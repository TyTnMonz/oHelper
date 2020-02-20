// ==UserScript==
// @name         oGame Helper
// @namespace    http://tampermonkey.net/
// @version      0.7
// @description  try to take over the world!
// @author       Dilder Inuyasha, TyTnMonz
// @include      http://*/game/index.php?page=*
// @include      https://*/game/index.php?page=*

// @match        *://*/*
// @require      file://C:\OGame\oHelper\oh_Utils.js
// @require      file://C:\OGame\oHelper\oh_ChangeFleetTimers.js
// @require      file://C:\OGame\oHelper\oh_ChangeProductionCountdowns.js
// @require      file://C:\OGame\oHelper\oh_ProductionInfos.js

// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // ******************************* Function to kill the ToolTips *******************************
    function killPlanetsMoon_Tooltip() {
        // Get root element for Planets by ID
        let divPlanets = document.getElementById('planetList');
        // Get all PLANETS by Class
        let aPlanets = divPlanets.getElementsByClassName('planetlink');
        // For Each Planets in aPlanets sets the Attribute Title to ''
        Array.from(aPlanets).forEach((el) => el.setAttribute('title', ''));
        // Get all PLANETS by Class
        let sPlanets = divPlanets.getElementsByClassName('smallplanet');
        // For Each Planets in aPlanets sets the with of content to 110px
        Array.from(sPlanets).forEach((el) => { el.style.width = '110px' });
        // Get all MOONS by Class
        let aMoons = divPlanets.getElementsByClassName('moonlink');
        // For Each Moons in aMoons sets the Attribute Title to '' and move them to the right of the Planets
        Array.from(aMoons).forEach((el) => {
            el.setAttribute('title', '');
            el.style = 'left: 110px; top: 10px; position: absolute;';
        });
        // Get all MOON Icons by Class
        let icnMoons = divPlanets.getElementsByClassName('icon-moon');
        // For Each Moons in icnMoons sets the Attribute width & height to 18 to make them bigger
        Array.from(icnMoons).forEach((el) => {
            el.style.width = '18px';
            el.style.height = '18px';
        });
    }
    // ******************************* End of Function to kill the ToolTips *******************************



    // ******************************* Functions to show Resorces on Overview Page *******************************

    function _getMeta(metaName) {
        const metas = document.getElementsByTagName('meta');
        for (let i = 0; i < metas.length; i++) {
            if (metas[i].getAttribute('name') === metaName) {
                return metas[i].getAttribute('content');
            }
        }
        return '';
    }

    function _setCookie(cname, cvalue, exdays) {
        let d1 = new Date();
        d1.setHours(d1.getHours() + (23 - d1.getHours()));
        d1.setMinutes(d1.getMinutes() + (59 - d1.getMinutes()));
        d1.setSeconds(d1.getSeconds() + (59 - d1.getSeconds()));
        let expires = "expires="+d1.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function _getCookie(cname) {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function _formatNumber(amount, decimalCount = 2, decimal = ".", thousands = ",") {
        try {
            decimalCount = Math.abs(decimalCount);
            decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

            const negativeSign = amount < 0 ? "-" : "";

            let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
            let j = (i.length > 3) ? i.length % 3 : 0;

            return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
        } catch (e) {
            console.log(e)
        }
    }

    function _removeNumberPoints(str){
        while(str.indexOf('.') != -1){
            str = str.replace('.', '');
        }
        return str;
    }

    function _showFlyingRes(oCell){

        // Creating Child Table for Flying Res
        let tblRSS_Fly = document.createElement('table');
        tblRSS_Fly.setAttribute('class', 'customRSS_tableMain');

        // Creating Row & Cells for RSS Name
        let row = tblRSS_Fly.insertRow(0);
        let cell = row.insertCell(0);
        cell.setAttribute('class', 'customRSS_tableRes_resName');
        cell.innerHTML = 'Metallo';
        cell = row.insertCell(1);
        cell.setAttribute('class', 'customRSS_tableRes_resName');
        cell.innerHTML = 'Cristallo';
        cell = row.insertCell(2);
        cell.setAttribute('class', 'customRSS_tableRes_resName');
        cell.innerHTML = 'Deuterio';

        // Calculating RSS Amount
        let tbEvents = document.getElementById('eventContent');
        let rowLength = tbEvents.rows.length;
        let missionsCount=0;
        let metalSum = 0;
        let crystalSum = 0;
        let deuteriumSum=0;
        let iRow=0;
        while(iRow < rowLength){    //Ciclo sul contenuto della tabella evenContent
            let trMissionType = tbEvents.rows[iRow].getAttribute("data-mission-type");
            if(trMissionType!=null && trMissionType!=''){
                let returnFlight = tbEvents.rows[iRow].getAttribute("data-return-flight");

                if(trMissionType!='16'){ //market missions
                    if(
                        (trMissionType=='4') ||                           //Market deployment missions
                        (trMissionType=='1' && returnFlight == "true") ||     //Attack missions
                        (trMissionType=='3' && returnFlight == "true") ||     //Transport missions
                        (trMissionType=='6' && returnFlight == "true") ||     //????????
                        (trMissionType=='7' && returnFlight == "true") ||     //Colonization missions
                        (trMissionType=='8' && returnFlight == "true") || //Recycle debris field missions
                        (trMissionType=='15' && returnFlight == "true")       //Expeditions missions
                    ){
                        let icon_movement_index = tbEvents.rows[iRow].getElementsByTagName("TD").length;
                        let sTitle = tbEvents.rows[iRow].getElementsByTagName("TD")[icon_movement_index-5].getElementsByTagName("SPAN")[0].getAttribute("title").trim();
                        let start = sTitle.indexOf('<table');
                        let end = sTitle.indexOf('</table>', start);
                        sTitle = sTitle.slice(start, end) + '</table>';

                        let table = document.createElement('table');
                        table.innerHTML = sTitle;
                        let metIdx = table.rows.length - 3;
                        let cryIdx = table.rows.length - 2;
                        let deuIdx = table.rows.length - 1;

                        let sMetallo = _removeNumberPoints(table.rows[metIdx].getElementsByTagName("TD")[1].innerText);
                        let sCristallo = _removeNumberPoints(table.rows[cryIdx].getElementsByTagName("TD")[1].innerText);
                        let sDeuterio = _removeNumberPoints(table.rows[deuIdx].getElementsByTagName("TD")[1].innerText);

                        metalSum += parseInt(sMetallo);
                        crystalSum += parseInt(sCristallo);
                        deuteriumSum += parseInt(sDeuterio);

                        missionsCount++;
                    }
                }
            }
            iRow++;
        }

        _setCookie("fr_metal", metalSum, 1);
        _setCookie("fr_crystal", crystalSum, 1);
        _setCookie("fr_deuterium", deuteriumSum, 1);


        // Creating Row & Cells for RSS Value
        row = tblRSS_Fly.insertRow(1);
        cell = row.insertCell(0);
        cell.setAttribute('class', 'customRSS_tableRes_resValue');
        cell.innerHTML = _formatNumber(metalSum, 0, ',', '.');
        cell = row.insertCell(1);
        cell.setAttribute('class', 'customRSS_tableRes_resValue');
        cell.innerHTML = _formatNumber(crystalSum, 0, ',', '.');
        cell = row.insertCell(2);
        cell.setAttribute('class', 'customRSS_tableRes_resValue');
        cell.innerHTML = _formatNumber(deuteriumSum, 0, ',', '.');

        // Adding Table to the Row
        oCell.appendChild(tblRSS_Fly);
    }

    function _showTotRes(oCell){

        // Creating Child Table for Res Tot
        let tblRSS_Tot = document.createElement('table');
        tblRSS_Tot.setAttribute('class', 'customRSS_tableMain');

        // Creating Row & Cells for RSS Name
        let row = tblRSS_Tot.insertRow(0);
        let cell = row.insertCell(0);
        cell.setAttribute('class', 'customRSS_tableRes_resName');
        cell.innerHTML = 'Metallo';
        cell = row.insertCell(1);
        cell.setAttribute('class', 'customRSS_tableRes_resName');
        cell.innerHTML = 'Cristallo';
        cell = row.insertCell(2);
        cell.setAttribute('class', 'customRSS_tableRes_resName');
        cell.innerHTML = 'Deuterio';

        // Calculating RSS Total amount
        let metalSum = parseInt(_getCookie('fr_metal'));
        let crystalSum = parseInt(_getCookie('fr_crystal'));
        let deuteriumSum = parseInt(_getCookie('fr_deuterium'));
        let ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if((c.indexOf("_planet") != -1) || (c.indexOf("_moon") != -1)){
                let cv = c.substring(c.indexOf("=")+1).split("_");
                metalSum += parseInt(cv[0]);
                crystalSum += parseInt(cv[1]);
                deuteriumSum += parseInt(cv[2]);
            }
        }

        // Creating Row & Cells for RSS Value
        row = tblRSS_Tot.insertRow(1);
        cell = row.insertCell(0);
        cell.setAttribute('class', 'customRSS_tableRes_resValue');
        cell.innerHTML = _formatNumber(metalSum, 0, ',', '.');
        cell = row.insertCell(1);
        cell.setAttribute('class', 'customRSS_tableRes_resValue');
        cell.innerHTML = _formatNumber(crystalSum, 0, ',', '.');
        cell = row.insertCell(2);
        cell.setAttribute('class', 'customRSS_tableRes_resValue');
        cell.innerHTML = _formatNumber(deuteriumSum, 0, ',', '.');

        // Adding Table to the Row
        oCell.appendChild(tblRSS_Tot);
    }

    function showResources(){

        // Root Element for Overview Page
        let pageOverview = document.getElementById('middle');

        // Creating Main DIV for RSS Content
        let divResources = document.createElement('div');
        divResources.setAttribute('class', 'customRSS_divMain');

        // Creating Main Table for RSS
        let tblResources = document.createElement('table');
        tblResources.setAttribute('class', 'customRSS_tableMain');

        // Creating first Row for Main Table
        let row = tblResources.insertRow(0);

        // Creating Cell for 'Risorse in volo'
        let cell = row.insertCell(0);
        cell.setAttribute('class', 'customRSS_tableRes_Header');
        cell.innerHTML = "<span class='customRSS_tableRes_Header'>Risorse in volo</span>";

        // Creating Cell for 'Risorse Totali'
        cell = row.insertCell(1)
        cell.setAttribute('class', 'customRSS_tableRes_Header');
        cell.setAttribute('id', 'rCornersTL');
        cell.innerHTML = "<span class='customRSS_tableRes_Header'>Risorse Totali</span>";

        // Creating Row and RowCell for 'Risorse in volo'
        row = tblResources.insertRow(1);
        cell = row.insertCell(0);
        cell.setAttribute('class', 'customRSS_tableRes_rowCell');
        _showFlyingRes(cell);

        // Creating Row and RowCell for 'Risorse Totali'
        cell = row.insertCell(1);
        cell.setAttribute('class', 'customRSS_tableRes_rowCell');
        _showTotRes(cell);

        // Appending Main Table to Main DIV for RSS
        divResources.appendChild(tblResources);
        // Appending Main DIV for RSS above Planets Details
        pageOverview.insertBefore(divResources, document.getElementById('overviewcomponent'));
    }

    // ******************************* End of Functions to show Resorces on Overview Page *******************************




    function manageFleet(){
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

        var observer3 = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutationRecord) {
            });
        });

        var target2 = document.getElementById('fleet2');
        var target3 = document.getElementById('fleet3');
        var target4 = document.getElementById('errorBoxDecisionContent');
        observer1.observe(target2, { attributes : true, attributeFilter : ['style'] });
        observer2.observe(target3, { attributes : true, attributeFilter : ['style'] });
    }

    function refreshCurPlanetCookie(){
        var metal = _removeNumberPoints(document.getElementById('resources_metal').innerHTML);
        var crystal = _removeNumberPoints(document.getElementById('resources_crystal').innerHTML);
        var deuterium = _removeNumberPoints(document.getElementById('resources_deuterium').innerHTML);
        var ck = _getMeta('ogame-planet-id') + "_" + _getMeta('ogame-planet-type');

        //document.cookie = ck + "; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; //reset cookie befere update
        _setCookie(ck, metal+"_"+crystal+"_"+deuterium, 1);
    }

    // ******************************* End of Functions for Countdowns *******************************


    //*** MAIN ***


    // ******************************* Functions to Custom CSS Generation *******************************
    function create_CSS_Style(){

        let css = document.createElement('style');
        css.setAttribute('type','text/css');
        css.innerHTML = `
/* Custom CSS Styles for OGame Helper */

.oh_Countdown_desc {
  margin-left: 54px;
  color: #6f9fc8;
}

.oh_Countdown_time {
  margin-left: 54px;
  color: #9c0!important;
}

.customMoonLink {
  left: 110px;
  top: 10px;
  position: absolute;
}

div.customRSS_divMain {
  width: 95%;
  margin-left: 12px;
}

table.customRSS_tableMain {
  width: 100%;
  border: 0px;
  margin-top: 3px;
  margin-bottom: 3px;
}

table.customRSS_tableRes {
  width: 50%;
  cellspacing: 0px;
  cellpadding: 0px;
  border: 0px;
}

table td.customRSS_tableRes_Header {
  text-align: center;
  width: 50%;
  padding: 2px 0px 2px 0px;
  border: 1px solid #6f9fc8;
  border-bottom: 0px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
}

span.customRSS_tableRes_Header {
  font-size: 18px;
  font-weight: bolder;
  color: #ffffff;
}

table td.customRSS_tableRes_resName {
  font-size: 12px;
  text-align: center;
  width: 33%;
  font-weight: normal;
  color: #6f9fc8;
  padding: 2px 0px 2px 0px;
  border-left: 1px solid #6f9fc8;
  border-right: 1px solid #6f9fc8;
}

table td.customRSS_tableRes_resValue {
  font-size: 11px;
  text-align: center;
  width: 33%;
  font-weight: normal;
  color: #9c0!important;
  padding: 2px 0px 2px 0px;
  border-left: 1px solid #6f9fc8;
  border-right: 1px solid #6f9fc8;
}

div.localClock {
  width: 100%;
  text-align: right;
  display: block;
  color: #848484;
  font-weight: 700;
  font-size: 11px;
}

`;

        document.head.appendChild(css);
    }
    // ******************************* End of Functions to Custom CSS Generation *******************************

    function set_MainObserver() {
        // Options for the observer (which mutations to observe)
        const mainObserverConfig = { attributes: true, childList: true, subtree: true };
        const targetNodeToObserve = document.getElementsByClassName('OGameClock')[0];

        // Callback function to execute when mutations are observed
        const mainObserverCallback = function(mutationsList, observer) {
            if ( oh_timeDiff_h != 0 ) {
                localClock.innerHTML = get_FormattedDateTime(get_Local_DateTime_From_DOM_String(targetNodeToObserve.innerHTML));
                if ( onFleetMovementsPage == true ) { changeFleetMovementsTimers(false); }
                if ( onFleetDispatchPage == true ) { changeFleetDispatchDateTime(); }
            }
        };
        // Initializing mainObserver
        mainObserver = new MutationObserver(mainObserverCallback);
        // Start observing the target node for configured mutations
        mainObserver.observe(targetNodeToObserve, mainObserverConfig);
    }

    let eventBoxEvents = 0;
    function set_eventBoxObserver() {
        // Options for the observer (which mutations to observe)
        const eventBoxObserverConfig = { attributes: false, childList: true  };
        const targetNodeToObserve = document.getElementById('eventboxContent');

        // Callback function to execute when mutations are observed
        const eventBoxObserverCallback = function(mutationsList, observer) {
          Array.from(mutationsList).forEach((oMutation) => {
            if ( oMutation.type == 'childList' && targetNodeToObserve.childNodes.length == 5 ) {
              eventBoxEvents = eventBoxEvents + 1;
              if ( oh_timeDiff_h != 0 && eventBoxEvents == 2 ) {
                changeEventBoxTimers();
                eventBoxEvents = 0;
              }
            }
          });
        };
        // Initializing mainObserver
        eventBoxObserver = new MutationObserver(eventBoxObserverCallback);
        // Start observing the target node for configured mutations
        eventBoxObserver.observe(targetNodeToObserve, eventBoxObserverConfig);
    }

    function set_technologydetailsObserver() {
        // Options for the observer (which mutations to observe)
        const technologydetailsObserverConfig = { attributes: true, childList: false  };
        const targetNodeToObserve = document.getElementById('technologydetails_wrapper');

        // Callback function to execute when mutations are observed
        const technologydetailsObserverCallback = function(mutationsList, observer) {
          console.log('technologydetails_wrapper : ' + targetNodeToObserve.getAttribute('class'));
          if ( targetNodeToObserve.getAttribute('class') == 'slide-up' ) {
            console.log('technologydetails_wrapper slide-up...aspetto technologydetails');
            waitForElement("#technologydetails").then(function(element) {
                set_InproveBuildingInfos(element);
            });
          } else {
            console.log('technologydetails_wrapper NON slide-up');
            let childList = targetNodeToObserve.childNodes;
            Array.from(childList).forEach((element) => {
              console.log('rimuovo child...');
              targetNodeToObserve.removeChild(element);
            });
          }

        };
        // Initializing mainObserver
        technologydetailsObserver = new MutationObserver(technologydetailsObserverCallback);
        // Start observing the target node for configured mutations
        technologydetailsObserver.observe(targetNodeToObserve, technologydetailsObserverConfig);
    }


   function elementReady(selector) {
     console.log('elementReady.....');
      return new Promise((resolve, reject) => {
        let el = document.querySelector(selector);
        if (el) {resolve(el);}
        new MutationObserver((mutationRecords, observer) => {
          // Query for elements matching the specified selector
          Array.from(document.querySelectorAll(selector)).forEach((element) => {
            resolve(element);
            //Once we have resolved we don't need the observer anymore.
            //observer.disconnect();
            //set_InproveBuildingInfos();
          });
        })
          .observe(document.documentElement, {
            childList: true,
            subtree: true
          });
      });
    }

    //Script runs only with ogame pages
    if (location.href.indexOf('.ogame.gameforge.com') != -1) {

        // Adding CSS Resources for Script Implementations
        create_CSS_Style();

        // Getting Universe Language
        get_UniverseLanguage();

        // Setting Additional Clock on Current Local Time if needed
        oh_timeDiff_h = localTime.getHours() - serverTime.getHours();
        if ( oh_timeDiff_h != 0 ) { add_LocalClock(); }

        // Setting up Main Observer
        set_MainObserver();

        // Setting up EventBox Observer
        set_eventBoxObserver();

        // Kill Tooltips shown over Planets and Moons links
        killPlanetsMoon_Tooltip();

        // Refresh Cookies
        refreshCurPlanetCookie();

        // Looking @ Current Page
        onFleetMovementsPage = false;
        onFleetDispatchPage = false;
        let currentPage = getUrlParam('page', 'empty');
        switch(currentPage) {
            case 'empty': break;
            case 'ingame' :
                // Looking @ Current Component
                var currentComponent = getUrlParam('component', 'empty');
                switch(currentComponent) {
                    case 'empty': /* Failed to retrieve Component */ break;
                    case 'overview':
                    case 'overview&relogin=1':
                        //Overview page
                        // Adding Resources Table above Planet Details
                        showResources();
                        // Adding Timers to Production Boxes if active
                        set_ProductionBox_All();
                        break;
                    case 'supplies':
                        break;
                    case 'facilities':
                        break;
                    case 'marketplace':
                        break;
                    case 'traderoverview':
                        break;
                    case 'alliance':
                        break;
                    case 'research':
                        set_technologydetailsObserver();
                        //elementReady(document.getElementById('technologydetails_wrapper'));
                        break;
                    case 'shipyard':
                        break;
                    case 'defenses':
                        break;
                    case 'fleetdispatch':
                        // Enabling Fleet Dispatch Timers changes
                        onFleetDispatchPage = true;
                        break;
                    case 'galaxy':
                        break;
                    case 'movement':
                        //Movements page - adding bottom margin to the end of Fleet Movements list
                        document.getElementById('movement').setAttribute('style','margin-bottom: 50px;');
                        changeFleetMovementsTimers();
                        onFleetMovementsPage = true;
                        break;
                    default:
                        // none
                        break;
                }
                break;
            case 'resourceSettings':
                break;
            case 'traderOverview':
                break;
            case 'messages' :
                break;
            case 'rewards':
                break;
            case 'alliance':
                break;
            case 'shop':
                break;
            default:
                // none
                break;
        }
    }

})();
