function _setCookie(cname, cvalue, exdays) {
    let d1 = new Date();
    d1.setHours(d1.getHours() + (23 - d1.getHours()));
    d1.setMinutes(d1.getMinutes() + (59 - d1.getMinutes()));
    d1.setSeconds(d1.getSeconds() + (59 - d1.getSeconds()));
    let expires = "expires="+d1.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function _getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function refreshCurPlanetCookie(){
    var metal = _removeNumberPoints(document.getElementById('resources_metal').innerHTML);
    var crystal = _removeNumberPoints(document.getElementById('resources_crystal').innerHTML);
    var deuterium = _removeNumberPoints(document.getElementById('resources_deuterium').innerHTML);
    var ck = _getMeta('ogame-planet-id') + "_" + _getMeta('ogame-planet-type');

    //document.cookie = ck + "; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; //reset cookie befere update
    _setCookie(ck, metal+"_"+crystal+"_"+deuterium, 1);
}
