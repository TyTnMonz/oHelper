//*** MAIN ***
    //Script runs only with ogame pages
    if (location.href.indexOf('.ogame.gameforge.com') != -1) {

        console.log('localstorage: ' + checkSupport());

        localStorage.setItem('myCat', 'Tom');
        localStorage['another-key'] = '42' ;
        console.log('m-key : ' + localStorage.getItem('myCat'));
        console.log('another-key : ' + localStorage['another-key']);

        // console.log('moment lcoale: ' + moment.locale());
        //console.log('moment : ' + moment('13.02.2020 14:19:35','DD.MM.YYYY hh:mm:ss').format('MMMM Do YYYY, h:mm:ss a'));

        // Adding CSS Resources for Script Implementations
        create_CSS_Style();

        // Start observing the target node for configured mutations
        mainObserver.observe(targetNodeToObserve, mainObserverConfig);

        // Setting Additional Clock on Current Local Time if needed
        oh_timeDiff = localTime.getHours() - serverTime.getHours();
        setLocaClock();

        // Kill Tooltips shown over Planets and Moons links
        killPlanetsMoon_Tooltip();

        // Show all the Custom Countdown
        showBuildingContdown();
        showResearchContdown();
        showShipyardContdown();
        refreshCurPlanetCookie();

        onFleetMovementsPage = false;
        // Looking @ Current Page
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
                        //Overview page - adding Resources Table above Planet Details
                        showResources();
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
