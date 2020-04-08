function notifyMe() {
    if (!window.Notification) {
        console.log('Browser does not support notifications.');
    } else {
        // check if permission is already granted
        if (Notification.permission === 'granted') {
            // show notification here
            console.log('Notifications granted.');
            var notify = new Notification('ALERT!!!', {
                body: 'Incoming Attack!!!'//,
                //icon: 'https://bit.ly/2DYqRrh',
            });
        } else {
            // request permission from user
            Notification.requestPermission().then(function (p) {
                if (p === 'granted') {
                    console.log('Notifications granted.');
                    // show notification here
                    var notify = new Notification('ALERT!!!', {
                        body: 'Incoming Attack!!!'//,
                        //icon: 'https://bit.ly/2DYqRrh',
                    });
                } else {
                    console.log('User blocked notifications.');
                }
            }).catch(function (err) {
                console.error(err);
            });
        }
    }
}

function checkIncomingAttack() {
    // If Option Enabled
    console.log('Checking Incoming Attack');
    if ( get_OptionValue('ohIncomingAttacksAlert') == 'true' ) {
      // Getting [attack_alert] DOM
      const alertWrapper = document.getElementById('attack_alert');
      const alertWrapperClass = alertWrapper.getAttribute('class');
      // If the Element Class is different from 'tooltip noAttack' there is an Incoming Attack!
      getPrintDebugLog('alertWrapper Class : ' + alertWrapperClass);
      if ( alertWrapperClass.includes('tooltip eventToggle soon') ) {
        getPrintDebugLog('Incoming Attack detected!!!');
        // Notify User with Desktop PopUp
        notifyMe();
      } else { getPrintDebugLog('NO Incoming Attack'); }
      // Settings Next Check in a Random interval between 5 and 10 minutes, in seconds
      nextCheck = getRandomIntInclusive(300, 600); getPrintDebugLog(`nextCheck in ${nextCheck} secs`);
    }
}

function verifyLastRefresh() {
    // Stopping Last Refresh Check to avoid mmultiple execution
    stopCheckRefresh = true;
    // If Option Enabled
    //getPrintDebugLog('Verifing last Refresh...');
    if ( get_OptionValue('ohIncomingAttacksAlert') == 'true' ) {
      // Checking Delta-Time from last Page Refresh
      let deltaFromLastRefresh = new Date();
      deltaFromLastRefresh = (deltaFromLastRefresh.valueOf() - lastRefresh.valueOf()) / 1000;
      // If [nextCheck] Delta-Time is expired then Reaload current Location
      if ( deltaFromLastRefresh > nextCheck ) { getPrintDebugLog('Refresh Time expired, refreshing.'); location.reload(); }
    }
}
