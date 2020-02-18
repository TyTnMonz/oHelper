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
