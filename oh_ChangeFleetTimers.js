function set_absTime(el, oDate) {
    // Get the child <span> for Arrival Time to modify
    let absTime = el.getElementsByClassName('absTime');
    absTime[0].setAttribute('original', absTime[0].innerHTML.split(' ')[0]);
    absTime[0].innerHTML = oDate.toLocaleTimeString();
}

function set_nextAbsTime(el, oDate) {
    let missionEnd = el.getElementsByClassName('nextTimer tooltip');
    if (typeof missionEnd !== 'undefined' && missionEnd !== null && missionEnd.length == 1 ) {
        missionEnd = missionEnd[0].getAttribute('title');
        let nextAbsTime = el.getElementsByClassName('nextabsTime');
        if (typeof nextAbsTime !== 'undefined' && nextAbsTime !== null && nextAbsTime.length == 1 ) {
            nextAbsTime[0].setAttribute('original', missionEnd);
            nextAbsTime[0].innerHTML = oDate.toLocaleTimeString();
        }
    }
}

function set_callBackTime(el, oData) {
    let callBackTime = el.getElementsByClassName('icon_link');
    if (typeof callBackTime !== 'undefined' && callBackTime !== null && callBackTime.length == 1 ) {
        // Adding Time to nextMission TAG
        let nextMission = el.getElementsByClassName('nextMission');
        nextMission[0].setAttribute('style', 'font-size: 8px;');
        nextMission[0].innerHTML = 'Return ' + oData.toLocaleDateTimeString();
    }
}

function changeFleetMovementsTimers(doEverythings = true) {
    // Getting mainDiv for Fleet Movements
    let mainDiv = document.getElementById('inhalt');
    // Getting all the Fleet Movement lines
    let fleetDetails = mainDiv.getElementsByClassName('fleetDetails');
    let fleetMov;
    // For Each Fleet Movement
    Array.from(fleetDetails).forEach((el) => {
        // Creating the Object to manage the single Fleet Movement
        fleetMov = new cslFleetMov(el.getAttribute('id'));
        // Settings all the Datas inside the Object
        fleetMov.data_return = get_DateFromDOM_Stirng(el.getAttribute('data-return-flight'));

        if ( fleetMov.isOnWayBack == true ) {

            // Fleet is on his way back, only ont DateTime to grab
            fleetMov.arrival_datetime = get_TitleAttributeFromDOM(el.getElementsByClassName('origin fixed'));

        } else {

            // Fleet is on his way out
            fleetMov.starting_datetime = get_TitleAttributeFromDOM(el.getElementsByClassName('origin fixed'));
            fleetMov.arrival_datetime = get_TitleAttributeFromDOM(el.getElementsByClassName('destination fixed'));
            fleetMov.mission_end_datetime = get_TitleAttributeFromDOM(el.getElementsByClassName('nextTimer tooltip'));

        }

        // Only if changeTime is needed
        if ( oh_timeDiff != 0 && doEverythings == true ) {

            // Setting Converted ARRIVAL Time inside the DOM
            set_absTime(el, fleetMov.arrival_datetime);
            if ( fleetMov.isOnWayBack == false ) {
                // Set Converted END OF MISSION Time
                set_nextAbsTime(el, fleetMov.mission_end_datetime);
            }
        }

        // Always when not Flett isOnWayBack
        if ( fleetMov.isOnWayBack == false ) {
            // Set Converted CALL BACK Time
            set_callBackTime(el, fleetMov.recall_datetime);
        }

    });
}
