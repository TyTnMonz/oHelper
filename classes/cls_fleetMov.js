class cslFleetMov {
        constructor(id) {
            this._id = id;
        }

        get start_coords() {
            return this._start_coords;
        }
        set start_coords(x) {
            this._start_coords = x;
        }

        get final_coords() {
            return this._final_coords;
        }
        set final_coords(x) {
            this._final_coords = x;
        }

        get starting_datetime() {
            return this._starting_datetime;
        }
        set starting_datetime(x) {
            this._starting_datetime = x;
        }

        get arrival_datetime() {
            return this._arrival_datetime;
        }
        set arrival_datetime(x) {
            x = x[0].getElementsByClassName('tooltipHTML');
            x = x[0].getAttribute('title');
            x = x.split('| ')[1].replace('<br>',' ');
            this._arrival_datetime = x;
        }

        set data_return(x) {
            this._data_return = x;
        }
        get isOnWayBack() {
            return ( this._data_return == '1' ) ? true:false;
        }
    }
