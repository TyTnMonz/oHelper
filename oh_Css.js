function create_CSS_Style(){
  let css = document.createElement('style');
  css.setAttribute('type','text/css');

  css.innerHTML = `
  /* Custom CSS Styles for OGame Helper */

  .oh_Countdown_desc {
    margin-left: 54px;
    color: #6f9fc8;
  }

  .oh_Countdown_time {
    margin-left: 54px;
    color: #9c0!important;
  }

  div.customRSS_divMain {
    width: 95%;
    margin-left: 12px;
  }

  table.customRSS_tableMain {
    width: 100%;
    border: 0px;
    margin-top: 3px;
    margin-bottom: 3px;
  }

  table.customRSS_tableRes {
    width: 50%;
    cellspacing: 0px;
    cellpadding: 0px;
    border: 0px;
  }

  table td.customRSS_tableRes_Header {
    text-align: center;
    width: 50%;
    padding: 2px 0px 2px 0px;
    border: 1px solid #6f9fc8;
    border-bottom: 0px;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
  }

  span.customRSS_tableRes_Header {
    font-size: 18px;
    font-weight: bolder;
    color: #ffffff;
  }

  table td.customRSS_tableRes_resName {
    font-size: 12px;
    text-align: center;
    width: 33%;
    font-weight: normal;
    color: #6f9fc8;
    padding: 2px 0px 2px 0px;
    border-left: 1px solid #6f9fc8;
    border-right: 1px solid #6f9fc8;
  }

  table td.customRSS_tableRes_resValue {
    font-size: 11px;
    text-align: center;
    width: 33%;
    font-weight: normal;
    color: #9c0!important;
    padding: 2px 0px 2px 0px;
    border-left: 1px solid #6f9fc8;
    border-right: 1px solid #6f9fc8;
  }

  div.localClock {
    width: 100%;
    text-align: right;
    display: block;
    color: #848484;
    font-weight: 700;
    font-size: 11px;
  }

  #ohOverlay {
    position: fixed;
    display: none;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.8);
    z-index: 2;
  }

  #ohOverlayDialog{
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 14px;
    color: white;
    transform: translate(-50%,-50%);
    background-color: rgba(0,0,0,1);
    width: 650px;
  }

  #ohOverlayDialogClose:link, #ohOverlayDialogClose:visited {
    background-color: #f44336;
    color: white;
    padding: 14px 25px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
  }

  #ohOverlayDialogClose:hover, #ohOverlayDialogClose:active {
    background-color: red;
  }

  #ohOverlayDialogClearCache:link, #ohOverlayDialogClearCache:visited {
    background-color: #66CCFF;
    color: white;
    padding: 14px 25px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
  }

  #ohOverlayDialogClearCache:hover, #ohOverlayDialogClearCache:active {
    background-color: #6699FF;
  }

  .ohDepotTimeSpanGreen{
    position: relative;
    top: 10px;
    font-size: 10px;
    color: #00cc00;
  }

  .ohDepotTimeSpanYellow{
    position: relative;
    top: 10px;
    font-size: 10px;
    color: #ffff00;
  }

  .ohDepotTimeSpanRed{
    position: relative;
    top: 10px;
    font-size: 10px;
    color: #ff0000;
  }

  #oh_ResAndNavToolbar div{
    padding-left: 100px;
    color: red;
  }

  `;

  if ( get_OptionValue('ohApplyCSS') == 'true' ) {
    css.innerHTML = css.innerHTML + `
      #rechts #myPlanets div.smallplanet a.moonlink .icon-moon {
        width: 20px;
        height: 20px;
        position: relative;
        left: 0;
        top: 10px;
      }

      .customMoonLink {
        left: 110px;
        top: 10px;
        position: absolute;
      }
      `;
  }

  document.head.appendChild(css);

}
