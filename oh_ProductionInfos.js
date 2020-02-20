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
