


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
      const productionFinishDateTime = get_DateTimeAfterCountdown(countdownTimer);
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
            boxTableNewCell.innerHTML += "<span class='oh_Countdown_time'>" + get_FormattedDateTimeNoYear(productionFinishDateTime) + "</span>";
        }
      }
    }
}

function set_ProductionBox_All() {
  set_productionBox('building');
  set_productionBox('research');
  set_productionBox('shipyard');
}
