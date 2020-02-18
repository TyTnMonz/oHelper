function get_TitleAttributeFromDOM(oTag) {
    // Extracts the DateTime from Title Attribute of the DOM Object -oTag-
    if ( oTag.length == 1 ) {
          return oTag[0].getAttribute('Title');
    }
    return '';
}

function get_DateFromDOM_Stirng(sDOM) {
    // Gets the Date in IT Format printed inside the DOM ( dd.MM.yyyy hh:mm:ss )
    // and converts it to the Standard ISO Format ( yyyy-MM-dd HH:mm:ss ) to create a Date Object

    // Sanitize the DOM String
    if ( sDOM.indexOf('<br>') > 0 ) { sDOM = sDOM.replace('<br>', ' '); }
    if ( sDOM.indexOf('&lt;br&gt;') > 0 ) { sDOM = sDOM.replace('&lt;br&gt;', ' '); }
    if ( sDOM.indexOf('| ') > 0 ) { sDOM = sDOM.split('| ')[1]; }

    // Split the DOM String in Date & Time
    const dataString = sDOM.split(' ');
    // Date
    const dataStringDate = dataString[0].split('.');
    // Time
    const dataStringTime = dataString[1].split(':');
    // Recreating Date from ISO Format
    return new Date(dataStringDate[2], dataStringDate[1], dataStringDate[0], dataStringTime[0], dataStringTime[1], dataStringTime[2]);
}
