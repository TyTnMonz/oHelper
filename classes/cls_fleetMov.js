class clsFleetMov {
    constructor(id) {
      this._id = id;
    }

    // Origin Coords
    get start_coords() { return this._start_coords; }
    set start_coords(x) { this._start_coords = x; }

    // Final Coords
    get final_coords() { return this._final_coords; }
    set final_coords(x) { this._final_coords = x; }

    // Data about Mission :
    // x = 0 --> fleet is on his way out
    // x = 1 --> fleet is on his way back
    set data_return(x) { this._data_return = x; }
    get isOnWayBack() {   return ( this._data_return == '1' ) ? true:false; }

    // Starting DateTime fronm Origin Coords
    get starting_datetime() { return this._starting_datetime; }
    set starting_datetime(x) { this._starting_datetime = get_Local_DateTime_From_DOM_String(x); }

    // Landing DateTime @ ACTUAL Destination
    get arrival_datetime() { return this._arrival_datetime; }
    set arrival_datetime(x) { this._arrival_datetime = get_Local_DateTime_From_DOM_String(x); }

    // Mission End DateTime
    get mission_end_datetime() { return this._mission_end_datetime; }
    set mission_end_datetime(x) { this._mission_end_datetime = get_Local_DateTime_From_DOM_String(x); }

    // Recall Landing DateTime
    get recall_datetime() {
      let rDate = new Date();
      let rDateTime = rDate.getTime();
      rDate.setTime(rDateTime + (rDateTime - this._starting_datetime));
      return rDate;
    }

}
