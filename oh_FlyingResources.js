// ******************************* Functions to show Resorces on Overview Page *******************************
function _showFlyingRes(oCell){

    // Creating Child Table for Flying Res
    let tblRSS_Fly = document.createElement('table');
    tblRSS_Fly.setAttribute('class', 'customRSS_tableMain');

    // Creating Row & Cells for RSS Name
    let row = tblRSS_Fly.insertRow(0);
    let cell = row.insertCell(0);
    cell.setAttribute('class', 'customRSS_tableRes_resName');
    cell.innerHTML = 'Metallo';
    cell = row.insertCell(1);
    cell.setAttribute('class', 'customRSS_tableRes_resName');
    cell.innerHTML = 'Cristallo';
    cell = row.insertCell(2);
    cell.setAttribute('class', 'customRSS_tableRes_resName');
    cell.innerHTML = 'Deuterio';

    // Calculating RSS Amount
    let tbEvents = document.getElementById('eventContent');
    let rowLength = tbEvents.rows.length;
    let missionsCount=0;
    let metalSum = 0;
    let crystalSum = 0;
    let deuteriumSum=0;
    let iRow=0;
    while(iRow < rowLength){    //Ciclo sul contenuto della tabella evenContent
        let trMissionType = tbEvents.rows[iRow].getAttribute("data-mission-type");
        if(trMissionType!=null && trMissionType!=''){
            let returnFlight = tbEvents.rows[iRow].getAttribute("data-return-flight");

            if(trMissionType!='16'){ //market missions
                if(
                    (trMissionType=='4') ||                           //Market deployment missions
                    (trMissionType=='1' && returnFlight == "true") ||     //Attack missions
                    (trMissionType=='3' && returnFlight == "true") ||     //Transport missions
                    (trMissionType=='6' && returnFlight == "true") ||     //????????
                    (trMissionType=='7' && returnFlight == "true") ||     //Colonization missions
                    (trMissionType=='8' && returnFlight == "true") || //Recycle debris field missions
                    (trMissionType=='15' && returnFlight == "true")       //Expeditions missions
                ){
                    let icon_movement_index = tbEvents.rows[iRow].getElementsByTagName("TD").length;
                    let sTitle = tbEvents.rows[iRow].getElementsByTagName("TD")[icon_movement_index-5].getElementsByTagName("SPAN")[0].getAttribute("title").trim();
                    let start = sTitle.indexOf('<table');
                    let end = sTitle.indexOf('</table>', start);
                    sTitle = sTitle.slice(start, end) + '</table>';

                    let table = document.createElement('table');
                    table.innerHTML = sTitle;
                    let metIdx = table.rows.length - 3;
                    let cryIdx = table.rows.length - 2;
                    let deuIdx = table.rows.length - 1;

                    let sMetallo = _removeNumberPoints(table.rows[metIdx].getElementsByTagName("TD")[1].innerText);
                    let sCristallo = _removeNumberPoints(table.rows[cryIdx].getElementsByTagName("TD")[1].innerText);
                    let sDeuterio = _removeNumberPoints(table.rows[deuIdx].getElementsByTagName("TD")[1].innerText);

                    metalSum += parseInt(sMetallo);
                    crystalSum += parseInt(sCristallo);
                    deuteriumSum += parseInt(sDeuterio);

                    missionsCount++;
                }
            }
        }
        iRow++;
    }

    _setCookie("fr_metal", metalSum, 1);
    _setCookie("fr_crystal", crystalSum, 1);
    _setCookie("fr_deuterium", deuteriumSum, 1);


    // Creating Row & Cells for RSS Value
    row = tblRSS_Fly.insertRow(1);
    cell = row.insertCell(0);
    cell.setAttribute('class', 'customRSS_tableRes_resValue');
    cell.innerHTML = _formatNumber(metalSum, 0, ',', '.');
    cell = row.insertCell(1);
    cell.setAttribute('class', 'customRSS_tableRes_resValue');
    cell.innerHTML = _formatNumber(crystalSum, 0, ',', '.');
    cell = row.insertCell(2);
    cell.setAttribute('class', 'customRSS_tableRes_resValue');
    cell.innerHTML = _formatNumber(deuteriumSum, 0, ',', '.');

    // Adding Table to the Row
    oCell.appendChild(tblRSS_Fly);
}

function _showTotRes(oCell){

    // Creating Child Table for Res Tot
    let tblRSS_Tot = document.createElement('table');
    tblRSS_Tot.setAttribute('class', 'customRSS_tableMain');

    // Creating Row & Cells for RSS Name
    let row = tblRSS_Tot.insertRow(0);
    let cell = row.insertCell(0);
    cell.setAttribute('class', 'customRSS_tableRes_resName');
    cell.innerHTML = 'Metallo';
    cell = row.insertCell(1);
    cell.setAttribute('class', 'customRSS_tableRes_resName');
    cell.innerHTML = 'Cristallo';
    cell = row.insertCell(2);
    cell.setAttribute('class', 'customRSS_tableRes_resName');
    cell.innerHTML = 'Deuterio';

    // Calculating RSS Total amount
    let metalSum = parseInt(_getCookie('fr_metal'));
    let crystalSum = parseInt(_getCookie('fr_crystal'));
    let deuteriumSum = parseInt(_getCookie('fr_deuterium'));
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if((c.indexOf("_planet") != -1) || (c.indexOf("_moon") != -1)){
            let cv = c.substring(c.indexOf("=")+1).split("_");
            metalSum += parseInt(cv[0]);
            crystalSum += parseInt(cv[1]);
            deuteriumSum += parseInt(cv[2]);
        }
    }

    // Creating Row & Cells for RSS Value
    row = tblRSS_Tot.insertRow(1);
    cell = row.insertCell(0);
    cell.setAttribute('class', 'customRSS_tableRes_resValue');
    cell.innerHTML = _formatNumber(metalSum, 0, ',', '.');
    cell = row.insertCell(1);
    cell.setAttribute('class', 'customRSS_tableRes_resValue');
    cell.innerHTML = _formatNumber(crystalSum, 0, ',', '.');
    cell = row.insertCell(2);
    cell.setAttribute('class', 'customRSS_tableRes_resValue');
    cell.innerHTML = _formatNumber(deuteriumSum, 0, ',', '.');

    // Adding Table to the Row
    oCell.appendChild(tblRSS_Tot);
}

function showResources(){

    // Root Element for Overview Page
    let pageOverview = document.getElementById('middle');

    // Creating Main DIV for RSS Content
    let divResources = document.createElement('div');
    divResources.setAttribute('class', 'customRSS_divMain');

    // Creating Main Table for RSS
    let tblResources = document.createElement('table');
    tblResources.setAttribute('class', 'customRSS_tableMain');

    // Creating first Row for Main Table
    let row = tblResources.insertRow(0);

    // Creating Cell for 'Risorse in volo'
    let cell = row.insertCell(0);
    cell.setAttribute('class', 'customRSS_tableRes_Header');
    cell.innerHTML = "<span class='customRSS_tableRes_Header'>Risorse in volo</span>";

    // Creating Cell for 'Risorse Totali'
    cell = row.insertCell(1)
    cell.setAttribute('class', 'customRSS_tableRes_Header');
    cell.setAttribute('id', 'rCornersTL');
    cell.innerHTML = "<span class='customRSS_tableRes_Header'>Risorse Totali</span>";

    // Creating Row and RowCell for 'Risorse in volo'
    row = tblResources.insertRow(1);
    cell = row.insertCell(0);
    cell.setAttribute('class', 'customRSS_tableRes_rowCell');
    _showFlyingRes(cell);

    // Creating Row and RowCell for 'Risorse Totali'
    cell = row.insertCell(1);
    cell.setAttribute('class', 'customRSS_tableRes_rowCell');
    _showTotRes(cell);

    // Appending Main Table to Main DIV for RSS
    divResources.appendChild(tblResources);
    // Appending Main DIV for RSS above Planets Details
    pageOverview.insertBefore(divResources, document.getElementById('overviewcomponent'));
}

// ******************************* End of Functions to show Resorces on Overview Page *******************************
