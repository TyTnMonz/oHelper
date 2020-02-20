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
      callBackTimer[0].innerHTML = 'Return<br />' + get_FormattedDateTimeNoYear(oDate);
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

//***************************** Function to change Arrival DateTime of the [fleet Dispatch Page] ***************************

function get_DispatchDate(hours, minutes, seconds) {
  let dateTime = new Date();
  if ( parseInt(hours) > 0 ) { dateTime.setHours(dateTime.getHours() + parseInt(hours)); }
  if ( parseInt(minutes) > 0 ) { dateTime.setMinutes(dateTime.getMinutes() + parseInt(minutes)); }
  if ( parseInt(seconds) > 0 ) { dateTime.setSeconds(dateTime.getSeconds() + parseInt(seconds)); }
  return dateTime;
}

function changeFleetDispatchDateTime() {
  console.log('changeFleetDispatchDateTime');
  // Getting page Element to understand where we are
  const fleetDispatch_Page2 = document.getElementById('fleet2');
  if ( isNullOrEmpty(fleetDispatch_Page2) ) { return; }
  const fleetDispatch_Page3 = document.getElementById('fleet3');
  if ( isNullOrEmpty(fleetDispatch_Page3) ) { return; }
  // Looking the state of Page2
  const fleetDispatch_Page2_Style = fleetDispatch_Page2.getAttribute('style');
  const fleetDispatch_Page3_Style = fleetDispatch_Page3.getAttribute('style');
  if ( fleetDispatch_Page2_Style != 'display: none;' || fleetDispatch_Page3_Style != 'display: none;') {
    // Fleet Dispatch Page 2 or 3 is shown...which one?
    let tagList;
    // Flight duration...shared between the 2 pages but the one inside Page 2 is dinamic
    let flyghtDuration = document.getElementById('duration');
    if ( ! isNullOrEmpty(flyghtDuration) ) { flyghtDuration = flyghtDuration.innerHTML.replace(' h', '').split(':'); }
    if ( ! isNullOrEmpty(flyghtDuration) && flyghtDuration.length == 3 ) {
      // Calculating arrivalDateTime and returnDateTime
      let arrivalDateTime = get_FormattedDateTimeNoYear(get_DispatchDate(flyghtDuration[0], flyghtDuration[1], flyghtDuration[2]));
      let returnDateTime = get_FormattedDateTimeNoYear(get_DispatchDate(flyghtDuration[0] * 2, flyghtDuration[1] * 2, flyghtDuration[2] * 2));
      // Looking at which page we are in
      if ( fleetDispatch_Page2_Style != 'display: none;' ) {
          // We are in Fleet Dispatch Page 2 - Getting his List of [ Briefing Tag ] with class = 'value'
          tagList = fleetDispatch_Page2.getElementsByClassName('value');
      }
      if ( fleetDispatch_Page3_Style != 'display: none;' ) {
          // We are in Fleet Dispatch Page 3 - Getting his List of [ Briefing Tag ] with class = 'value'
          tagList = fleetDispatch_Page3.getElementsByClassName('value');
      }
      if ( ! isNullOrEmpty(tagList) ) {
        // Iterating on each Briefing Tag looking at their child to find what we need to change :
        // arrivalTime and returnTime span tag
        let childList;
        Array.from(tagList).forEach((el) => {
            childList = el.childNodes;
            if ( isNullOrEmpty(childList) ) { return; }
            Array.from(childList).forEach((child) => {
              // Iterating on children list
              if ( child.id == 'arrivalTime' || child.id == 'oh_arrivalTime' ) {
                // change ID to stop Ogame Original Auto Update
                child.id = 'oh_arrivalTime';
                // Overwriting the innerHTML whit formatted datetime
                child.innerHTML = arrivalDateTime;
              }
              if ( child.id == 'returnTime' || child.id == 'oh_returnTime' ) {
                // change ID to stop Ogame Original Auto Update
                child.id = 'oh_returnTime';
                // Overwriting the innerHTML whit formatted datetime
                child.innerHTML = returnDateTime;
              }
            });
        });
      }
    }
  }
}

//***************************** End of Function to change Arrival DateTime of the [fleet Dispatch Page] ***************************
