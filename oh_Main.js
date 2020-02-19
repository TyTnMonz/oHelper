//*** MAIN ***

function set_MainObserver() {
  // Options for the observer (which mutations to observe)
  const mainObserverConfig = { attributes: true, childList: true, subtree: true };
  const targetNodeToObserve = document.getElementsByClassName('OGameClock')[0];

  // Callback function to execute when mutations are observed
  const mainObserverCallback = function(mutationsList, observer) {
      if ( oh_timeDiff_h != 0 ) { localClock.innerHTML = get_FormattedDateTime(get_Local_DateTime_From_DOM_String(targetNodeToObserve.innerHTML)); }
      if ( onFleetMovementsPage == true ) { changeFleetMovementsTimers(false); }
  };
  // Initializing mainObserver
  mainObserver = new MutationObserver(mainObserverCallback)
  // Start observing the target node for configured mutations
  mainObserver.observe(targetNodeToObserve, mainObserverConfig);
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

    // Setting up Main Observer to
    set_MainObserver();

    // Kill Tooltips shown over Planets and Moons links
    killPlanetsMoon_Tooltip();

    // Refresh Cookies
    refreshCurPlanetCookie();

    // Looking @ Current Page
    onFleetMovementsPage = false;
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
                    break;
                case 'shipyard':
                    break;
                case 'defenses':
                    break;
                case 'fleetdispatch':
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
