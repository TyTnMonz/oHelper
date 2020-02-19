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

`

        document.head.appendChild(css);
    }
    // ******************************* End of Functions to Custom CSS Generation *******************************

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
