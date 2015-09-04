// This JavaScript file is mainly used to display the PIE Chart in the homa page.

// This is a auxiliary function to get array data from the JSON data sent from the server.
function jsonToArray(dataJson){
    var dataJson = dataJson;
    var dataJson = JSON.parse(dataJson);
    var attrName = new Array();
    var attrData = new Array();

    for(var i=0;i<dataJson.length;i++){
        attrName[i] = dataJson[i].name;
        attrData[i] = dataJson[i].data;
    }

    var dataSeries = new Array();
    for(var j=0;j<attrName.length;j++){
        var temp = [attrName[j],attrData[j]];
        dataSeries[j] = temp;
    }

    return dataSeries;
}

// This is the main function to initialise and display the Pie Chart.
function initialiseChart(dataJson) {

    var dataSeries = jsonToArray(dataJson);

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
            },
        },
        series: [{
            name: "Proportion",
            colorByPoint: true,
            data: dataSeries
        }]
    });
};

