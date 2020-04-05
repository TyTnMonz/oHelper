function set_InproveBuildingInfos(mainDiv) {
    console.log('set_InproveBuildingInfos.....');



    // Chaging styles to reduce space
    let build_duration = mainDiv.getElementsByClassName('build_duration');
    if ( isOne(build_duration) ) { build_duration[0].setAttribute('style', 'margin-bottom: 5px !important;') }

    let possible_build_start = mainDiv.getElementsByClassName('possible_build_start');
    if ( isOne(possible_build_start) ) { possible_build_start[0].setAttribute('style', 'margin-bottom: 5px !important;') }

    let research_laboratory_levels_sum = mainDiv.getElementsByClassName('research_laboratory_levels_sum');
    if ( isOne(research_laboratory_levels_sum) ) { research_laboratory_levels_sum[0].setAttribute('style', 'margin-bottom: 5px !important;') }

    let costs = mainDiv.getElementsByClassName('costs');
    if ( isOne(costs) ) { costs[0].setAttribute('style', 'top: 90px !important;') }
}

/*************** Start showing depots time remaining before full ***************/
function showDepotTimeRemaining(){
  //_showMetalDepotTimeRemaining();
  _showDepotTimeRemaining('metal_box');
  _showDepotTimeRemaining('crystal_box');
  _showDepotTimeRemaining('deuterium_box');
}

function _showDepotTimeRemaining(depotName){
  let oBox = document.getElementById(depotName);
  let oTable = htmlToElement(oBox.getAttribute('title').split('|')[1]);
  let oSpans = oTable.getElementsByTagName('span');

  let available = _removeNumberPoints(oSpans[0].innerHTML);
  let capacity = _removeNumberPoints(oSpans[1].innerHTML);
  let production = _removeNumberPoints(oSpans[2].innerHTML);
  let curPercentage = Math.floor((available/capacity)*100);

  if(production > 0){
    let remaining = (capacity-available)/production;
    let hours = Math.floor(remaining);
    let minutes = Math.floor((remaining-hours)*60);

    oSpan = document.createElement('span');
    if(curPercentage <=50){
      oSpan.setAttribute('class', 'ohDepotTimeSpanGreen');
    }
    else if(curPercentage>50 && curPercentage<=85){
      oSpan.setAttribute('class', 'ohDepotTimeSpanYellow');
    }
    else if(curPercentage>85){
      oSpan.setAttribute('class', 'ohDepotTimeSpanRed');
    }
    oSpan.innerHTML = hours + 'h ' + minutes + 'm';

    oBox.appendChild(oSpan);
  }
}
/*function _showMetalDepotTimeRemaining(){
  let oMetalBox = document.getElementById('metal_box');
  let oTable = htmlToElement(oMetalBox.getAttribute('title').split('|')[1]);
  let oSpans = oTable.getElementsByTagName('span');

  let available = _removeNumberPoints(oSpans[0].innerHTML);
  let capacity = _removeNumberPoints(oSpans[1].innerHTML);
  let production = _removeNumberPoints(oSpans[2].innerHTML);

  let remaining = (capacity-available)/production;
  let hours = Math.floor(remaining);
  let minutes = Math.floor((remaining-hours)*60);

  oSpan = document.createElement('span');
  oSpan.setAttribute('class', 'ohDepotTimeSpan');
  oSpan.innerHTML = hours + 'h ' + minutes + 'm';

  oMetalBox.appendChild(oSpan);
}*/
/*************** End showing depots time remaining before full ***************/
