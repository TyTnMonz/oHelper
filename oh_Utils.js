// Const for Date Format
const oh_dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
const oh_timeOptions = { hours : '2-digit', minutes : '2-digit', seconds : '2-digit' };
const oh_dateTimeOptions = { year: 'numeric', month: '2-digit', day: '2-digit', hours : '2-digit', minutes : '2-digit', seconds : '2-digit' };
const oh_dateTimeShortOptions = { year: '2-digit', month: '2-digit', day: '2-digit', hours : '2-digit', minutes : '2-digit', seconds : '2-digit' };
const oh_dateTimeShortNoYearOptions = { month: '2-digit', day: '2-digit', hours : '2-digit', minutes : '2-digit', seconds : '2-digit' };

const speedBarTimeOut = 1;
let speedBar;

let mainObserver;
let eventBoxObserver;
let technologydetailsObserver;

let lang;
let dateFormatString;
let localClock;
let oh_timeDiff_h;
let onFleetMovementsPage = false;
let onFleetDispatchPage = false;
let lastRefresh;
let nextCheck;


// ******************************* Functions for Debugging *******************************



function setEnableDebugLog() {
    let oCheckBox = document.getElementById('debugChbx');
    if ( ! isNullOrEmpty(oCheckBox) ) {
      console.log('dbgCheckBox: ' + oCheckBox.checked);
      sessionStorage.setItem('debug', oCheckBox.checked);
      console.log('sessione registrata: ' + sessionStorage.getItem('debug'));
    }
}

function setEnableIncomingAttacksAlert() {
    let oCheckBox = document.getElementById('ohIAAChbx');
    if ( ! isNullOrEmpty(oCheckBox) ) {
      console.log('dbgCheckBox: ' + oCheckBox.checked);
      localStorage.setItem('ohIAAChbx', oCheckBox.checked);
      console.log('sessione registrata: ' + localStorage.getItem('ohIAAChbx'));
    }
}

function getPrintDebugLog(sMessageLog) {
  if ( sessionStorage.getItem('debug') == 'true' ) { console.log(sMessageLog); }
}

// ******************************* End of Functions for Debugging *******************************

// ******************************* Functions for Random *******************************

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Il max è escluso e il min è incluso
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Il max è incluso e il min è incluso
}

// ******************************* End of Functions for Random *******************************

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
    let attributeValue = '';
    if ( isOne(oTag) ) {
        attributeValue = oTag[0].getAttribute(oAttribute);
    } else {
        attributeValue = oTag.getAttribute(oAttribute);
    }
    if ( ! isNullOrEmpty(attributeValue) ) { return attributeValue; }
    return attributeValue;
}

function waitForElement(selector) {
  return new Promise(function(resolve, reject) {
    var element = document.querySelector(selector);

    if(element) {
      resolve(element);
      return;
    }

    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        var nodes = Array.from(mutation.addedNodes);
        for(var node of nodes) {
          if(node.matches && node.matches(selector)) {
            observer.disconnect();
            resolve(node);
            return;
          }
        };
      });
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });
  });
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

function get_FormattedDateTimeShort(oDate) {
    return oDate.toLocaleTimeString(dateFormatString, oh_dateTimeShortOptions).replace(', ', ' ');
}

function get_FormattedDateTimeNoYear(oDate) {
    return oDate.toLocaleTimeString(dateFormatString, oh_dateTimeShortNoYearOptions).replace(', ', ' ');
}

function get_DateTimeAfterCountdown(countdownTimer) {
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  let index = 0;
  const cTimerParts = countdownTimer.split(' ');
  if ( isNullOrEmpty(cTimerParts) ) { return ''; }
  // Scanning every parts of Countdown timer
  Array.from(cTimerParts).forEach((el) => {
    // Getting Type of timer Part
    let timePart = el.substr(el.length - 1);
    switch (timePart) {
      // Weeks of production
      case 'w':
        hours = hours + ( parseInt(el.replace('w','')) * 7 ) * 24;
      break;
      case 's':
        // In Italian could be WEEKS or SECONDS, take a look on [Index] of the current el :
        // if = 0 --> WEEKS | if = cTimerParts.length --> SECONDS
        if ( index == 0 ) {
            hours = hours + ( parseInt(el.replace('s','')) * 7 ) * 24;
        } else {
            seconds = seconds + parseInt(el.replace('s',''));
        }
      break;
      // Days of production
      case 'd': hours = hours + parseInt(el.replace('d','')) * 24; break;
      case 'g': hours = hours + parseInt(el.replace('g','')) * 24; break;
      // Hours of production
      case 'h': hours = hours + parseInt(el.replace('h','')); break;
      case 'o': hours = hours + parseInt(el.replace('o','')); break;
      // Minutes of production
      case 'm': minutes = minutes + parseInt(el.replace('m','')); break;

      default: break;

    }
    index = index + 1;
  });

  // Building Production Finisch DateTime starting from now
  let dateTimeAfterCountdown = new Date();
  dateTimeAfterCountdown.setHours(dateTimeAfterCountdown.getHours() + hours);
  dateTimeAfterCountdown.setMinutes(dateTimeAfterCountdown.getMinutes() + minutes);
  dateTimeAfterCountdown.setSeconds(dateTimeAfterCountdown.getSeconds() + seconds);

  return dateTimeAfterCountdown;
}
// ******************************* End of Functions for getting Date from DOM converted to Local Time *******************************

// ******************************* Start of Functions for getting Meta data from html *******************************
function _getMeta(metaName) {
    const metas = document.getElementsByTagName('meta');
    for (let i = 0; i < metas.length; i++) {
        if (metas[i].getAttribute('name') === metaName) {
            return metas[i].getAttribute('content');
        }
    }
    return '';
}
// ******************************* End of Functions for getting Meta data from html *******************************

// ******************************* Start of Functions for working on numbers *******************************
function _formatNumber(amount, decimalCount = 2, decimal = ".", thousands = ",") {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
        console.log(e)
    }
}

function _removeNumberPoints(str){
    /*while(str.indexOf('.') != -1){
        str = str.replace('.', '');
    }
    return str;*/

    let strings = str.split('.');
    let ret = "";
    for(i=0; i<strings.length; i++){
      ret += strings[i];
    }

    return ret;
}

/*function _replaceAllOccurrence(str, occ){
  let strings = str.split(occ);
  console.log(strings);
  let ret = "";
  for(i=0; i<strings.length; i++){
    ret += strings[i];
  }

  return ret;
}*/
// ******************************* End of Functions for working on numbers *******************************


// ********* Start of functions for creating a DOM element from html *******
/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

var td = htmlToElement('<td>foo</td>'),
    div = htmlToElement('<div><span>nested</span> <span>stuff</span></div>');

/**
 * @param {String} HTML representing any number of sibling elements
 * @return {NodeList}
 */
function htmlToElements(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes;
}
// ********* End of functions for creating a DOM element from html *******
