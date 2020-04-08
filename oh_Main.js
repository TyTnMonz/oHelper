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
// @require      file://C:\OGame\oHelper\oh_Css.js
// @require      file://C:\OGame\oHelper\oh_Cookies.js
// @require      file://C:\OGame\oHelper\oh_FlyingResources.js
// @require      file://C:\OGame\oHelper\oh_ManageFleet.js
// @require      file://C:\OGame\oHelper\oh_ChangeFleetTimers.js
// @require      file://C:\OGame\oHelper\oh_ChangeProductionCountdowns.js
// @require      file://C:\OGame\oHelper\oh_ProductionInfos.js
// @require      file://C:\OGame\oHelper\oh_IncomingAttacksAlert.js
// @require      file://C:\OGame\oHelper\oh_Settings.js

// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  //*** MAIN ***
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

  //Script runs only with ogame pages
  if (location.href.indexOf('.ogame.gameforge.com') != -1) {
    // Adding CSS Resources for Script Implementations
    create_CSS_Style();

    // Adding the button in the left buttons list menu
    addToLeftMenuButtons();

    // Setting Last Refresh Page Time
    lastRefresh = new Date();

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

    //Showing Depot time remainings before full
    showDepotTimeRemaining();

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
                    replaceContinueToFleet2Button();
                    changeFleet1ShipsStyle();
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
