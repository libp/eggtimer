var Time = require('../utils/time.js')
var Time = Time.Time
var Egg = {
    name: "EggTimer",
    expiredMessage: "",
    label: "",
    progress: 0,
    startTime: 0,
    endTime: 0,
    totalTime: 0,
    currDate: null,
    endDate: null,
    ticker: null,
    start: function() {
        var that = this;
        Egg.initializeTimer(Egg.startTime, Egg.endTime, Egg.label,that);
    },
    initializeTimer : function(startTime, endTime, label,that) {
        Egg.endTime = endTime;
        Egg.startTime = startTime;
        Egg.label = label;
        Egg.totalTime = Egg.endTime - Egg.startTime;
        Egg.endDate = new Date(new Date().getTime() + Egg.totalTime);
        Egg.currDate = new Date();
        Egg.expiredMessage = Egg.expiredMessage || "Time Expired" + (label ? ": " : "!") + label;
        Egg.update(that);
        if (!Egg.ticker) {
            // Egg.ticker = setInterval(Egg.update(), 1000 / 4);
            Egg.ticker = setInterval(Egg.update, 1000 / 4, that);
            // Egg.ticker = setInterval(
            //     function () {
            //         Egg.update(that)
            //     }
            // , 1000/4);
        }
    },
    update: function(that){
        Time.calcTime(Egg.currDate.getTime(), Egg.endDate.getTime());
        Egg.updateParts(Time,that);
    },
    updateParts: function(Time,that) {
        var that = that;
        if (Time.totalSeconds < 0) {
            Egg.onTimeComplete(that);
            return;
        }
        var clockTime = [];
        var yearText,
        monthText,
        dayText,
        hourText,
        minText,
        secText;

        yearText = 
        monthText = 
        dayText = 
        hourText = 
        minText = 
        secText = "";

        if (Time.remainingYears > 0) {
            clockTime.push(padTimeText(Time.remainingYears) + "y");
            yearText = getTimeText(Time.remainingYears, "year");
        }

        if (Time.remainingMonths > 0) {
            clockTime.push(padTimeText(Time.remainingMonths) + "m");
            monthText = getTimeText(Time.remainingMonths, "month");
        }

        if (Time.remainingDays > 0) {
            clockTime.push(padTimeText(Time.remainingDays) + "d");
            dayText = getTimeText(Time.remainingDays, "day");
        }

        if (Time.remainingHours > 0) {
            clockTime.push(padTimeText(Time.remainingHours) + "h");
            hourText = getTimeText(Time.remainingHours, "hour");
        }

        if (Time.remainingMinutes > 0) {
            clockTime.push(padTimeText(Time.remainingMinutes));
            minText = getTimeText(Time.remainingMinutes, "minute");
        } else {
            clockTime.push(padTimeText(0));
        }

        if (Time.remainingSeconds > 0) {
            clockTime.push(padTimeText(Time.remainingSeconds));
            secText = getTimeText(Time.remainingSeconds, "second");
        } else {
            clockTime.push(padTimeText(0));
        }

        var slabel = (Egg.label && Egg.label != "") ? Egg.label + "<br />" : "";
        var timeText = slabel + yearText + monthText + 
            dayText + hourText + minText + secText;

        Egg.updateText(timeText,that);

        Egg.progress = ((Egg.totalTime - Time.totalMilliseconds) / Egg.totalTime);
        Egg.updateProgressBar(that);

        Egg.currDate = new Date();
    },
    updateProgressBar : function (that) {
        that.setData({
            progressWidth: (that.data.Width +20) * Egg.progress
        })        
    },
    updateText : function (text,that) {
        if (text) {
            that.setData({
                text:text
            })
        }
    },
    onTimeComplete: function (that) {
        Egg.progress = 1;
        Egg.updateProgressBar(that);
        that.audioCtx.play()
        clearInterval(Egg.ticker);
        Egg.updateText(Egg.expiredMessage,that);
    },

};
function getSModifier(value) {
    var mod;
    if (value == 0) {
        mod = "";
    }
    else if (value == 1) {
        mod = " ";
    }
    else {
        mod = "s ";
    }

    return mod;
}

function padTimeText(value) {
    return value < 10 ? '0' + value : '' + value;
}

function getTimeText(time, label) {
    var timeText = "";
    if (time > 0) {
        timeText = time + " " + label + getSModifier(time);
    }
    return timeText;
}


module.exports = {
    Egg:Egg
}