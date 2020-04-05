// ==UserScript==
// @name         oGame Helper
// @namespace    http://tampermonkey.net/
// @version      0.7
// @description  try to take over the world!
// @author       Dilder Inuyasha, TyTnMonz
// @include      http://*/game/index.php?page=*
// @include      https://*/game/index.php?page=*

// @match        *://*/*
// @require      file://C:\OGame\oHelper\oh_Cookies.js
// @require      file://C:\OGame\oHelper\oh_FlyingResources.js
// @require      file://C:\OGame\oHelper\oh_ManageFleet.js
// @require      file://C:\OGame\oHelper\oh_Utils.js
// @require      file://C:\OGame\oHelper\oh_ChangeFleetTimers.js
// @require      file://C:\OGame\oHelper\oh_ChangeProductionCountdowns.js
// @require      file://C:\OGame\oHelper\oh_ProductionInfos.js
// @require      file://C:\OGame\oHelper\oh_IncomingAttacksAlert.js
// @require      file://C:\OGame\oHelper\oh_Settings.js

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






    //*** MAIN ***

    // ******************************* Functions to Custom CSS Generation *******************************
    function create_CSS_Style(){
        /*
        let css = document.createElement('link');
        css.setAttribute('type','text/css');
        css.setAttribute('rel','stylesheet');
        css.setAttribute('href','file://C:\OGame\oHelper\oh_style.css');
        document.head.appendChild(css);
        */
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

#rechts #myPlanets div.smallplanet a.moonlink .icon-moon {
    width: 20px;
    height: 20px;
    position: relative;
    left: 0;
    top: 10px;
}

#ohOverlay {
    position: fixed;
    display: none;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.8);
    z-index: 2;
}

#ohOverlayDialog{
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 14px;
  color: white;
  transform: translate(-50%,-50%);
  background-color: rgba(0,0,0,1);
  width: 600px;
}

#ohOverlayDialogClose:link, #ohOverlayDialogClose:visited {
  background-color: #f44336;
  color: white;
  padding: 14px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
}

#ohOverlayDialogClose:hover, #ohOverlayDialogClose:active {
  background-color: red;
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
              }
            if ( onFleetMovementsPage == true ) { changeFleetMovementsTimers(false); }
            if ( onFleetDispatchPage == true ) { changeFleetDispatchDateTime(); }
            // Verify if an Auto Refresh is needed
            verifyLastRefresh();
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

    function set_PlanetListStyle() {
        const oPlanetList = document.getElementsByClassName('icon-moon');
        Array.from(oPlanetList).forEach((element) => {
          element.setAttribute('style', 'left: 0px !important; top: 0px !important; position: absolute;');
        });

    }

    function addDebugControl() {
        const rightPanel = document.getElementById('rechts');
        if ( ! isNullOrEmpty(rightPanel) ) {
          let dbgDiv = document.createElement('div');
          let dbgCheckBox = document.createElement('input');
          let dbgLabel = document.createElement('label');

          dbgDiv.setAttribute('id', 'debugDiv');

          dbgCheckBox.setAttribute('type', 'checkbox');
          dbgCheckBox.setAttribute('id', 'debugChbx');
          dbgCheckBox.setAttribute('name', 'debugChbx');
          dbgCheckBox.addEventListener('click', setEnableDebugLog, false);
          // Getting SessionStorage Value for Debugging Status
          dbgCheckBox.checked = sessionStorage.getItem('debug') == 'true' ? true:false;

          dbgLabel.setAttribute('for', 'debug');
          dbgLabel.setAttribute('style', 'color: #9c0; font-size: 10px; position: relative; top: -3px; left: 5px;');
          dbgLabel.addEventListener('click', setEnableDebugLog, false);
          dbgLabel.innerHTML = 'Abilita Debug';

          dbgDiv.appendChild(dbgCheckBox);
          dbgDiv.appendChild(dbgLabel);

          rightPanel.insertBefore(dbgDiv, document.getElementById('cutty'));
        }
    }

    //Script runs only with ogame pages
    if (location.href.indexOf('.ogame.gameforge.com') != -1) {
        // Adding the button in the left buttons list menu
        addToLeftMenuButtons();

        // Setting Last Refresh Page Time
        lastRefresh = new Date();

        // Adding CSS Resources for Script Implementations
        create_CSS_Style();

        // Adding CheckBox to Enable Debugging
        addDebugControl();

        // Setting Planet List Style
        set_PlanetListStyle();

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

        // Checking Any Incoming Attacks
        checkIncomingAttack();

        // Looking @ Current Page
        onFleetMovementsPage = false;
        onFleetDispatchPage = false;
        let currentPage = getUrlParam('page', 'empty');
        switch(currentPage) {
            case 'empty': /* Failed to retrieve Page */ break;
            case 'ingame' :
                // Looking @ Current Component
                var currentComponent = getUrlParam('component', 'empty');
                switch(currentComponent) {
                    case 'empty': /* Failed to retrieve Component */ break;
                    case 'overview':
                    case 'overview&relogin=1':
                        //Overview Page
                        // Adding Resources Table above Planet Details
                        showResources();
                        // Adding Timers to Production Boxes if active
                        set_ProductionBox_All();
                        break;
                    case 'supplies':
                        // Adding Timers to Production Boxes if active
                        set_productionBox('building');
                        set_productionBox('shipyard');
                        break;
                    case 'facilities':
                        // Adding Timers to Production Boxes if active
                        set_productionBox('building');
                        break;
                    case 'marketplace':
                        break;
                    case 'research':
                        // Adding Timers to Production Boxes if active
                        set_productionBox('research');
                        break;
                    case 'shipyard':
                        // Adding Timers to Production Boxes if active
                        set_productionBox('shipyard');
                        break;
                    case 'defenses':
                        // Adding Timers to Production Boxes if active
                        set_productionBox('shipyard');
                        break;
                    case 'fleetdispatch':
                        // Enabling Fleet Dispatch Timers changes
                        onFleetDispatchPage = true;
                        manageFleet();
                        break;
                    case 'galaxy':
                        break;
                    case 'movement':
                        //Movements page - adding bottom margin to the end of Fleet Movements list
                        document.getElementById('movement').setAttribute('style','margin-bottom: 50px;');
                        // Chang Timers for Fleet Movements
                        onFleetMovementsPage = true;
                        changeFleetMovementsTimers(onFleetMovementsPage);
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
