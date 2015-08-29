function jsonToArray(dataJson){
    var dataJson = dataJson;
    // '[{ "name": "Microsoft Internet Explorer","y": "56.33" }, {"name": "Chrome","y": "24.03"}]';
    // dataJson = dataJson.substring(1,dataJson.length-1);
    // dataJson = JSON.stringify(dataJson);
        // alert(dataJson);
    var dataJson = JSON.parse(dataJson);

    var attrName = new Array();
    var attrData = new Array();
    // var maxIndex = 0;
    // var maxValue = 0;
    for(var i=0;i<dataJson.length;i++){
        attrName[i] = dataJson[i].name;
        // attrData[i] = parseInt(dataJson[i].y);
        attrData[i] = dataJson[i].data;
        // if (maxValue<attrData[i]){
            // maxValue = attrData[i];
            // maxIndex = i;
        // }
        // alert(dataJson);
    }
    var dataSeries = new Array();
    for(var j=0;j<attrName.length;j++){
        // if(j==maxIndex){
        //     var temp = [attrName[j],attrData[j],"true","true"];
        // }

        // else{
            var temp = [attrName[j],attrData[j]];
        // }
        
        dataSeries[j] = temp;
    }

    // alert(dataSeries);
    return dataSeries;
}


// $() was removed.
function initialiseChart(dataJson) {

    var dataSeries = jsonToArray(dataJson);
    // alert(dataSeries);

    $('#chart-container').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'The most Popular Queries from 14, August till Now'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
                // point: {
                //     events: {
                //         mouseOver: function (event) {
                //             // $report.html('<h2>' + this.name + '</h2><p>' + this.percentage.toFixed(1) + '%</p>');
                //             this.select(true);
                //         },
                //         mouseOut: function (event) {
                //             this.select(false);
                //         },
                //         legendItemClick: function (event) {
                //             // this.select(null);
                //             // $report.html('<h2>' + this.name + '</h2><p>' + this.percentage.toFixed(1) + '%</p>');

                //             // return false;
                //         }
                //     }
                // }
            },
        },
        series: [{
            name: "Proportion",
            colorByPoint: true,
            data: dataSeries
        }]
    });
};


            // [{
            //     name: "Microsoft Internet Explorer",
            //     y: 56.33
            // }, {
            //     name: "Chrome",
            //     y: 24.03,
            // }, {
            //     name: "Firefox",
            //     y: 10.38,
            //     sliced: true,
            //     selected: true
            // }]






