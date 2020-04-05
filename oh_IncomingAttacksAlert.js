function notifyMe() {
    if (!window.Notification) {
        console.log('Browser does not support notifications.');
    } else {
        // check if permission is already granted
        if (Notification.permission === 'granted') {
            // show notification here
            var notify = new Notification('ALERT!!!', {
                body: 'Incoming Attack!!!',
                icon: 'https://bit.ly/2DYqRrh',
            });
        } else {
            // request permission from user
            Notification.requestPermission().then(function (p) {
                if (p === 'granted') {
                    // show notification here
                    var notify = new Notification('ALERT!!!', {
                        body: 'Incoming Attack!!!',
                        icon: 'https://bit.ly/2DYqRrh',
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
    if ( localStorage.getItem('ohIncomingAttacksAlert') == 'true' ) {
      // Getting [attack_alert] DOM
      const alertWrapper = document.getElementById('attack_alert');
      const alertWrapperClass = alertWrapper.getAttribute('class');
      // If the Element Class is different from 'tooltip noAttack' there is an Incoming Attack!
      if ( alertWrapperClass != 'tooltip noAttack' ) { notifyMe(); }
      // Settings Next Check in a Random interval between 5 and 10 minutes, in seconds
      nextCheck = getRandomIntInclusive(300, 600); console.log('nextCheck in ' + nextCheck + ' secs');
    }
}

function verifyLastRefresh() {
    // If Option Enabled
    if ( localStorage.getItem('ohIncomingAttacksAlert') == 'true' ) {
      // Checking Delta-Time from last Page Refresh
      let deltaFromLastRefresh = new Date();
      deltaFromLastRefresh = (deltaFromLastRefresh.valueOf() - lastRefresh.valueOf()) / 1000;
      // If [nextCheck] Delta-Time is expired then Reaload current Location
      if ( deltaFromLastRefresh > nextCheck ) { location.reload(); }
    }
}
