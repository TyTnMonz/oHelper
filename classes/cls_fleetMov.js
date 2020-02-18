class cslFleetMov {
        constructor(id) {
            this._id = id;
        }

        // Start Coords
        get start_coords() { return this._start_coords; }
        set start_coords(x) { this._start_coords = x; }

        // Final Coords
        get final_coords() { return this._final_coords; }
        set final_coords(x) { this._final_coords = x; }

        // Starting DateTime
        get starting_datetime() { return this._starting_datetime; }
        set starting_datetime(x) { this._starting_datetime = get_DateFromDOM_Stirng(x); }

        // Arrival DateTime
        get arrival_datetime() { return this._arrival_datetime; }
        set arrival_datetime(x) { this._arrival_datetime = get_DateFromDOM_Stirng(x); }

        // Mission End DateTime
        get mission_end_datetime(){ return this._mission_end_datetime; }
        set mission_end_datetime(x) { this._mission_end_datetime = get_DateFromDOM_Stirng(x); }

        // Data about Mission
        set data_return(x) { this._data_return = x; }
        get isOnWayBack() {   return ( this._data_return == '1' ) ? true:false; }
    }
