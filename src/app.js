(function() {
    var app = window.app = window.app || {};

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    var key = getParameterByName('key');
    var sheet = getParameterByName('sheet') || "od6";

    app.validSetup = !!key;

    app.getData = function (done) {
        function convert(data) {
            var entries = data && data.feed && data.feed.entry;
            if(!entries) return res;

            return entries.map(function (e) {
                var d = {};
                for(var p in e) {
                    if(p.indexOf('gsx$') === 0) {
                        var k = p.substring(4);
                        d[k] = e[p].$t;
                    }
                }
                return d;
            });
        }

        var url = "https://spreadsheets.google.com/feeds/list/"+key+"/"+sheet+"/public/values?alt=json";

        $.get(url, function (res) {
            done(convert(res));
        });
    };

}());
