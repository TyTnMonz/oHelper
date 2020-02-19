function set_absTime(el, oDate) {
  if ( ! isNullOrEmpty(oDate) ) {
    // Get the child <span> for Arrival Time to modify
    let absTime = el.getElementsByClassName('absTime');
    if ( isOne(absTime) ) {
      absTime[0].setAttribute('original', absTime[0].innerHTML.split(' ')[0]);
      absTime[0].innerHTML = get_FormattedTime(oDate);
    }
  }
}

function set_nextAbsTime(el, oDate) {
  if ( ! isNullOrEmpty(oDate) ) {
    let missionEnd = el.getElementsByClassName('nextTimer tooltip');
    let nextAbsTime = el.getElementsByClassName('nextabsTime');
    if ( isOne(missionEnd) && isOne(nextAbsTime) ) {
      nextAbsTime[0].setAttribute('original', get_AttributeFromDOM(missionEnd, 'Title'));
      nextAbsTime[0].innerHTML = get_FormattedTime(oDate);
    }
  }
}

function set_callBackTime(el, oDate) {
  if ( ! isNullOrEmpty(oDate) ) {
    // Adding Time to nextMission TAG
    let callBackTimer = el.getElementsByClassName('nextMission');
    if ( isOne(callBackTimer) ) {
      callBackTimer[0].innerHTML = 'Return ' + get_FormattedTime(oDate);
    }
  }
}

function changeFleetMovementsTimers(doEverythings = true) {
  // Getting mainDiv for Fleet Movements
  let mainDiv = document.getElementById('inhalt');
  if ( ! isNullOrEmpty(mainDiv) ) {
    // Getting all the Fleet Movement lines
    let fleetDetails = mainDiv.getElementsByClassName('fleetDetails');
    if ( ! isNullOrEmpty(fleetDetails) ) {
      let fleetMov;
      let timerElement;
      // For Each Fleet Movement
      Array.from(fleetDetails).forEach((el) => {
        // Creating the Object to manage the single Fleet Movement
        fleetMov = new clsFleetMov(get_AttributeFromDOM(el, 'id'));
        // Settings all the Datas inside the Object
        fleetMov.data_return = get_AttributeFromDOM(timerElement, 'data-return-flight');

        if ( fleetMov.isOnWayBack == true ) {

          // Fleet is on his way back, only ont DateTime to grab
          timerElement = el.getElementsByClassName('origin fixed');
          if ( isOne(timerElement) ) { timerElement = timerElement[0].getElementsByClassName('tooltipHTML'); }
          fleetMov.arrival_datetime = get_AttributeFromDOM(timerElement, 'Title');

        } else {

          // Fleet is on his way out
          timerElement = el.getElementsByClassName('origin fixed');
          if ( isOne(timerElement) ) { timerElement = timerElement[0].getElementsByClassName('tooltipHTML'); }
          fleetMov.starting_datetime = get_AttributeFromDOM(timerElement, 'Title');

          timerElement = el.getElementsByClassName('destination fixed');
          if ( isOne(timerElement) ) { timerElement = timerElement[0].getElementsByClassName('tooltipHTML'); }
          fleetMov.arrival_datetime = get_AttributeFromDOM(timerElement, 'Title');

          fleetMov.mission_end_datetime = get_AttributeFromDOM(el.getElementsByClassName('nextTimer tooltip'), 'Title');

        }

        // Only if changeTime is needed
        if ( oh_timeDiff_h != 0 && doEverythings == true ) {

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
  }
}
