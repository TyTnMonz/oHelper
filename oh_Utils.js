// Const for Date Format
const oh_dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
const oh_timeOptions = { hours : '2-digit', minutes : '2-digit', seconds : '2-digit' };
const oh_dateTimeOptions = { year: 'numeric', month: '2-digit', day: '2-digit', hours : '2-digit', minutes : '2-digit', seconds : '2-digit' };
let mainObserver;

let lang;
let dateFormatString;
let localClock;
let oh_timeDiff_h;
let onFleetMovementsPage = false;

// ******************************* Functions for Object managing *******************************

function isNullOrEmpty(oObj) {
    // Check if oObj is Undefined, Null or Empty
    return ( typeof oObj !== 'undefined' && oObj !== null && oObj.trim != '' ) ? false:true;
}

function isOne(oObj) {
    // Verify that oObj is NOT Undefined, NOT Null, NOT Empty and is Unique
    return ( ! isNullOrEmpty(oObj) && oObj.length == 1 ) ? true:false;
}

// ******************************* Functions for Object managing *******************************


// ******************************* Functions for getting Attribute from Dome Object *******************************

function get_AttributeFromDOM(oTag, oAttribute) {
    // Extracts the [oAttribute] Attribute from the [oTag] DOM Object
    if ( isOne(oTag) ) {
          let attributeValue = oTag[0].getAttribute(oAttribute);
          if ( ! isNullOrEmpty(attributeValue) ) { return attributeValue; }
    }
    return '';
}

// ******************************* End Functions for getting Attribute from Dome Object *******************************

// ******************************* Functions for document.location managing *******************************

function getUrlVars() {
    let vars = {};
    let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function getUrlParam(parameter, defaultvalue) {
    let urlparameter = defaultvalue;
    if(window.location.href.indexOf(parameter) > -1) {
        urlparameter = getUrlVars()[parameter];
    }
    return urlparameter;
}

// Gets the Universe Language
function get_UniverseLanguage() {
  const metas = document.getElementsByTagName('meta');
  if ( ! isNullOrEmpty(metas) ) {
    Array.from(metas).forEach((el) => {
      if ( el.getAttribute('name') === 'ogame-language' ) { lang = el.getAttribute('content'); }
    });
    if ( lang != '' ) { dateFormatString = `${lang}-${lang.toUpperCase()}`; }
  }

}

// ******************************* End of Functions for document.location managing *******************************

// ******************************* Functions for getting Date from DOM converted to Local Time *******************************

function add_LocalClock() {
    let oHeadBar = document.getElementById('headerbarcomponent');
    if ( ! isNullOrEmpty(oHeadBar) ) {
        let oClockBar = document.getElementById('bar');
        if ( ! isNullOrEmpty(oHeadBar) ) {
          localClock = document.createElement('div');
          localClock.setAttribute('class', 'localClock');
          localClock.setAttribute('id', 'localClock');
          oHeadBar.insertBefore(localClock, oClockBar);
        }
    }
}

function get_Local_DateTime_From_DOM_String(sDOM) {
    // Gets the Date in IT Format printed inside the DOM ( dd.MM.yyyy hh:mm:ss )
    // and converts it to the Standard ISO Format ( yyyy-MM-dd HH:mm:ss ) to create a Date Object
    if ( ! isNullOrEmpty(sDOM) ) {
      // Sanitize the DOM String
      if ( sDOM.indexOf('<br>') > 0 ) { sDOM = sDOM.replace('<br>', ' '); }
      if ( sDOM.indexOf('&lt;br&gt;') > 0 ) { sDOM = sDOM.replace('&lt;br&gt;', ' '); }
      if ( sDOM.indexOf('<span>') > 0 ) { sDOM = sDOM.replace('<span>', ''); }
      if ( sDOM.indexOf('</span>') > 0 ) { sDOM = sDOM.replace('</span>', ''); }
      if ( sDOM.indexOf('&lt;br&gt;') > 0 ) { sDOM = sDOM.replace('&lt;br&gt;', ' '); }
      if ( sDOM.indexOf('| ') > 0 ) { sDOM = sDOM.split('| ')[1]; }

      // Split the DOM String in Date & Time
      const dataString = sDOM.split(' ');
      if ( ! isNullOrEmpty(dataString) && dataString.length == 2 ) {
        // Date
        const dataStringDate = dataString[0].split('.');
        if ( isNullOrEmpty(dataStringDate) ) { return ''; }
        // Time
        const dataStringTime = dataString[1].split(':');
        if ( isNullOrEmpty(dataStringTime) ) { return ''; }
        // Recreating Date from ISO Format
        if ( dataStringDate.length == 3 && dataStringTime.length == 3 ) {
          let oDate = new Date(dataStringDate[2], dataStringDate[1] - 1, dataStringDate[0], dataStringTime[0], dataStringTime[1], dataStringTime[2]);
          oDate.setHours(oDate.getHours() + oh_timeDiff_h);

          return oDate;
        }
      }
    }
    // No success, return ''
    return '';
}

function get_FormattedDateTime(oDate) {
    return oDate.toLocaleTimeString(dateFormatString, oh_dateTimeOptions).replace(', ', ' ');
}

function get_FormattedDate(oDate) {
    return oDate.toLocaleDateString(dateFormatString, oh_dateOptions);
}

function get_FormattedTime(oDate) {
    return oDate.toLocaleTimeString(dateFormatString, oh_timeOptions);
}


// ******************************* End of Functions for getting Date from DOM converted to Local Time *******************************
