window.app = window.app || {};

app.renderChart = function (divName, data) {
    function convert(d, prev) {
        var res = {
            date: new Date(d.date),
            storage: +d.storage,
            day: +d.day,
            night: +d.night
        };

        if(prev){
            res.storage -= prev.storage;
            res.day -= prev.day;
            res.night -= prev.night;

            var days = moment.duration(moment(res.date).diff(prev.date)).asDays()
            res.storage /= days;
            res.day /= days;
            res.night /= days;
        }

        res.storage = res.storage.toFixed(2);
        res.day = res.day.toFixed(2);
        res.night = res.night.toFixed(2);

        return res;
    }
    var prev = convert(data[0]);
    data = data.slice(1).map(function (d) {
        var res = convert(d, prev);
        prev = d;
        return res;
    });

    var guides = data.map(function (d) {
        return {
            date: d.date.toString(),
            lineColor: "#aaa",
            lineAlpha: 1,
            dashLength: 2,
            inside: true,
            label: moment(d.date).format('DD MMMM YYYY'),
            labelRotation: 90
        };
    });

    console.log(guides);

    var chart = AmCharts.makeChart(divName, {
        "type": "serial",
        "theme": "light",
        "marginRight":30,
        "legend": {
            "equalWidths": false,
            "position": "top",
            "valueAlign": "left",
            "valueWidth": 100
        },
        "dataProvider": data,
        "valueAxes": [{
            "stackType": "regular",
            "gridAlpha": 0.07,
            "position": "left",
            "title": "Cost"
        }],
        "graphs": [{
            "balloonText": "<span style='font-size:14px; color:#000000;'>Storage: <b>[[value]]</b>/day</span>",
            "fillAlphas": 0.6,
            "lineAlpha": 0.4,
            "title": "Storage",
            "valueField": "storage"
        }, {
            "balloonText": "<span style='font-size:14px; color:#000000;'>Night: <b>[[value]]</b>/day</span>",
            "fillAlphas": 0.6,
            "lineAlpha": 0.4,
            "title": "Night",
            "valueField": "night"
        }, {
            "balloonText": "<span style='font-size:14px; color:#000000;'>Day: <b>[[value]]</b>/day</span>",
            "fillAlphas": 0.6,
            "lineAlpha": 0.4,
            "title": "Day",
            "valueField": "day"
        }],
        "plotAreaBorderAlpha": 0,
        "marginTop": 10,
        "marginLeft": 0,
        "marginBottom": 0,
        "chartScrollbar": {},
            "chartCursor": {
            "cursorAlpha": 0
        },
        "categoryField": "date",
        "categoryAxis": {
            "startOnAxis": true,
            "axisColor": "#DADADA",
            "gridAlpha": 0.07,
            "title": "date",
            "parseDates": true,
            "guides": guides
        },
        "export": {
            "enabled": true
        }
    });
};
