// Class to create Dedicated Object for Fleet Movement
class clsFleetMov {
    constructor(id) {
      this._id = id;
    }

    // Origin Coords
    get start_coords() { return this._start_coords; }
    set start_coords(x) { this._start_coords = x; }

    // Final Coords
    get final_coords() { return this._final_coords; }
    set final_coords(x) { this._final_coords = x; }

    // Data about Mission :
    // x = 0 --> fleet is on his way out
    // x = 1 --> fleet is on his way back
    set data_return(x) { this._data_return = x; }
    get isOnWayBack() {   return ( this._data_return == '1' ) ? true:false; }

    // Starting DateTime fronm Origin Coords
    get starting_datetime() { return this._starting_datetime; }
    set starting_datetime(x) { this._starting_datetime = get_Local_DateTime_From_DOM_String(x); }

    // Landing DateTime @ ACTUAL Destination
    get arrival_datetime() { return this._arrival_datetime; }
    set arrival_datetime(x) { this._arrival_datetime = get_Local_DateTime_From_DOM_String(x); }

    // Mission End DateTime
    get mission_end_datetime() { return this._mission_end_datetime; }
    set mission_end_datetime(x) { this._mission_end_datetime = get_Local_DateTime_From_DOM_String(x); }

    // Recall Landing DateTime
    get recall_datetime() {
      let rDate = new Date();
      let rDateTime = rDate.getTime();
      rDate.setTime(rDateTime + (rDateTime - this._starting_datetime));
      return rDate;
    }

}
//************************************************************************************************************

//***************************** Functions to change DateTime inside INAHLT of Page [page=ingame&component=movement] ***************************

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

//***************************** End of Functions to change DateTime inside INAHLT of Page [page=ingame&component=movement] ***************************

//***************************** Function to change Arrival DateTime of the [eventboxContent] ***************************

function changeEventBoxTimers() {
  const eventBox = document.getElementById('eventboxContent');
  if ( isNullOrEmpty(eventBox) ) { return; }
  const eventFleetList = eventBox.getElementsByClassName('eventFleet');
  if ( isNullOrEmpty(eventFleetList) ) { return; }
  // For Each Fleet Movement
  let fleetEvent;
  let fleetEventCountdown;
  let fleetEventArrivalDateTime;
  Array.from(eventFleetList).forEach((el) => {
    fleetEventCountdown = el.getElementsByClassName('textBeefy');
    if ( isOne(fleetEventCountdown) ) { fleetEventCountdown = fleetEventCountdown[0].innerHTML; }
    const fleetEventArrivalDateTime = get_DateTimeAfterCountdown(fleetEventCountdown);
    fleetEvent = el.getElementsByClassName('arrivalTime');
    if ( isOne(fleetEvent) ) {
      fleetEvent[0].setAttribute('original', fleetEvent[0].innerHTML);
      fleetEvent[0].innerHTML = get_FormattedTime(fleetEventArrivalDateTime);
    }
  });
}

//***************************** End of Function to change Arrival DateTime of the [eventboxContent] ***************************
