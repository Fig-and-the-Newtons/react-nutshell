        
const DateMod = {}
        
        DateMod.getTime = () => {
        let time = "";
        let currentTime = new Date()
        let hours = currentTime.getHours()
        let minutes = currentTime.getMinutes()
        let seconds = currentTime.getSeconds()
        let dayOrNight = "";
        if (minutes < 10) {
            minutes = "0" + minutes
        }
        if (seconds < 10) {
            seconds = "0" + seconds
        }
        if(hours > 11){
            dayOrNight = "PM"
        } else {
            dayOrNight = "AM"
        }
        if(hours >= 13){
            hours = hours - 12
        }
        time = hours + ":" + minutes + ":" + seconds + " " + dayOrNight;
        return time;
    }
    
        DateMod.getDate = () => {
        let date = new Date();
        let dd = date.getDate();
        let mm = date.getMonth() + 1;
        let yyyy = date.getFullYear();
        if( dd < 10 ) {
            dd = "0" + dd
        };
        if( mm < 10 ) {
            mm = "0" + mm
        };
        date = mm + "/" + dd + "/" + yyyy + " at " + DateMod.getTime();
        return date;
    }

export default DateMod;