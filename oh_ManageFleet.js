function manageFleet(){
    var oMainButton = document.getElementById('continueToFleet2');

    var observer1 = new MutationObserver(function(mutations) {  //fleet2 div style change
        mutations.forEach(function(mutationRecord) {
            var metaOPT = _getMeta('ogame-planet-type');
            if(metaOPT != ''){
                var ownCoords = _getMeta('ogame-planet-coordinates');
                var selCoords = document.getElementById('galaxy').getAttribute('value');
                selCoords += ':' + document.getElementById('system').getAttribute('value');
                selCoords += ':' + document.getElementById('position').getAttribute('value');
                if(selCoords == ownCoords){
                    if(metaOPT=='planet'){
                        document.getElementById('mbutton').click();
                    }
                    else{
                        document.getElementById('pbutton').click();
                    }
                }
            }
            observer1.disconnect();
        });
    });

    var observer2 = new MutationObserver(function(mutations) {  //fleet3 div style change
        mutations.forEach(function(mutationRecord) {
            var divStatBarFleet = document.getElementById('statusBarFleet');
            var destCoords = divStatBarFleet.getElementsByClassName("targetName")[0].firstChild.nodeValue.trim();
            var ownCoords = '';
            var planetList = document.getElementById('planetList').getElementsByClassName('planet-koords');
            var index=0;
            for(index=0;index<planetList.length;index++){
                ownCoords += planetList[index].innerHTML;
            }
            if(ownCoords.indexOf(destCoords) != -1){
                document.getElementById('missionButton4').click();
            }
            observer2.disconnect();
        });
    });

    var observer3 = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutationRecord) {
        });
    });

    var target2 = document.getElementById('fleet2');
    var target3 = document.getElementById('fleet3');
    var target4 = document.getElementById('errorBoxDecisionContent');
    observer1.observe(target2, { attributes : true, attributeFilter : ['style'] });
    observer2.observe(target3, { attributes : true, attributeFilter : ['style'] });
}
