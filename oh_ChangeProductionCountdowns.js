
function get_ProductionFinishDateTime(countdownTimer) {
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
      case 'd': days = days + parseInt(el.replace('d','')); break;
      case 'g': days = days + parseInt(el.replace('g','')); break;
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
  let productionFinishDateTime = new Date();
  productionFinishDateTime.setHours(productionFinishDateTime.getHours() + hours);
  productionFinishDateTime.setMinutes(productionFinishDateTime.getMinutes() + minutes);
  productionFinishDateTime.setSeconds(productionFinishDateTime.getSeconds() + seconds);

  return productionFinishDateTime;
}

function set_productionBox(sBox) {

    const boxID = `productionbox${sBox}component`;
    const countdownID =  `${sBox}Countdown`;
    // Selecting Production Box for [sBox]
    const productionBox = document.getElementById(boxID);
    if ( isNullOrEmpty(productionBox) ) { return; }
    // Selecting Countdown <span> inside Production Box
    const productionCountdown = document.getElementById(countdownID);
    if ( isNullOrEmpty(productionCountdown) ) { return; }
    // Remaing Time to ultimate Production
    const countdownTimer = productionCountdown.innerHTML;
    if ( countdownTimer.trim != '' ) {
      // Now Parse the countdownTimer splitted inside his wole components
      const productionFinishDateTime = get_ProductionFinishDateTime(countdownTimer);
      if ( ! isNullOrEmpty(productionFinishDateTime) ) {
        // Getting current Production Box Table
        let boxTable = productionBox.getElementsByClassName('construction active');
        if ( isOne(boxTable) ) {
            boxTable = boxTable[0];
            // Add new Row to the Table in the rows.length - 1 position, just before the "Complete with MO"
            const boxTableNewRow = boxTable.insertRow(boxTable.rows.length - 1);
            boxTableNewRow.setAttribute("class", "data");
            // Adding new Cell to the new Row
            const boxTableNewCell = boxTableNewRow.insertCell(0);
            boxTableNewCell.setAttribute("colspan", "2");
            // Pasting DateTime inside the new Cell
            boxTableNewCell.innerHTML = "<span class='oh_Countdown_desc'>Ends:</span><br />";
            boxTableNewCell.innerHTML += "<span class='oh_Countdown_time'>" + get_FormattedDateTime(productionFinishDateTime) + "</span>";
        }
      }
    }
}

function set_ProductionBox_All() {
  set_productionBox('building');
  set_productionBox('research');
  set_productionBox('shipyard');
}
