//获取首页数据
function createEchart3() {
    htmlobj = $.ajax({
        url: nginx_url + "/monitor/selectDriAcount",
        dataType: "json",
        async: false,
        success: function (res) {
            let dataArray = res.data;
            buildData3(dataArray);
        },
        error: function (res) {
            alert(res.code);
        }
    });
}

//获取首页数据
function createEchart1() {
    htmlobj = $.ajax({
        url: nginx_url + "/monitor/selectCusAcount",
        dataType: "json",
        async: false,
        success: function (res) {
            let dataArray = res.data;
            buildData1(dataArray);
        },
        error: function (res) {
            alert(res.code);
        }
    });
}

function createEchart2() {
    htmlobj = $.ajax({
        url: nginx_url + "/monitor/printLineOverall?pageNum=1&limit=10",
        dataType: "json",
        async: false,
        success: function (res) {
            let dataArray = res.data;
            buildData2(dataArray);
        },
        error: function (res) {
            alert(res.code);
        }
    });
}

//封装数据3
function buildData3(data) {
    let columnLabels = ['承运费总计', '加运费总计', '总次数'];
    //x轴
    let columnNames = new Array();
    //y轴
    let allCarriageTotals = new Array();
    let insuranceTotals = new Array();
    let times = new Array();
    for (let i = 0; i < data.length; i++) {
        //组装x轴
        let columnName = data[i].driverCode;
        columnNames.push(columnName);
        //封装series
        let carriageTotal = data[i].carryFeeTotal;
        allCarriageTotals.push(carriageTotal);
        let insuranceTotal = data[i].addCarriageTotal;
        insuranceTotals.push(insuranceTotal);
        let time = data[i].total;
        times.push(time);
    }
    buildChart3(columnLabels, columnNames, allCarriageTotals, insuranceTotals, times);
}

//封装数据2
function buildData1(data) {
    //图标
    let columnLabels = ['运费总计', '保险费总计', '件数总计'];
    //x轴
    let columnNames = new Array();
    //y轴
    let allCarriageTotals = new Array();
    let insuranceTotals = new Array();
    let times = new Array();
    for (let i = 0; i < data.length; i++) {
        //组装x轴
        let columnName = data[i].sendGoodsCustomer;
        columnNames.push(columnName);
        //封装series
        let carriageTotal = data[i].carriageTotal;
        allCarriageTotals.push(carriageTotal);
        let insuranceTotal = data[i].insuranceTotal;
        insuranceTotals.push(insuranceTotal);
        let time = data[i].times;
        times.push(time);
    }
    buildChart1(columnLabels, columnNames, allCarriageTotals, insuranceTotals, times);
}

//封装数据
function buildData2(data) {
    //图标
    let columnLabels = ['总运费', '总保险费', '总次数'];
    //x轴
    let columnNames = new Array();
    //y轴
    let allCarriageTotals = new Array();
    let insuranceTotals = new Array();
    let times = new Array();
    for (let i = 0; i < data.length; i++) {
        //组装x轴
        let columnName = data[i].loadStation + "至" + data[i].dealGoodsStation;
        columnNames.push(columnName);
        //封装series
        let allCarriageTotal = data[i].allCarriageTotal;
        allCarriageTotals.push(allCarriageTotal);
        let insuranceTotal = data[i].insuranceTotal;
        insuranceTotals.push(insuranceTotal);
        let time = data[i].times;
        times.push(time);
    }
    buildChart2(columnLabels, columnNames, allCarriageTotals, insuranceTotals, times);
}

var chart = document.getElementById('main');
var echart = echarts.init(chart);

//生成图形
function buildChart2(columnLabels, columnNames, allCarriageTotals, insuranceTotals, times) {

    let option = {
        title: {
            text: '专线整体',
            subtext: ''

        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: columnLabels
        },
        toolbox: {
            show: true,
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                data: columnNames
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '总运费',
                type: 'bar',
                data: allCarriageTotals
            },
            {
                name: '总保险费',
                type: 'bar',
                data: insuranceTotals
            },
            {
                name: '总次数',
                type: 'bar',
                data: times
            }
        ]
    };
    echart.setOption(option);
}

//生成图形
function buildChart1(columnLabels, columnNames, allCarriageTotals, insuranceTotals, times) {
    let option2 = {
        title: {
            text: '客户运量',
            subtext: ''

        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: columnLabels
        },
        toolbox: {
            show: true,
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                data: columnNames
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '运费总计',
                type: 'bar',
                data: allCarriageTotals
            },
            {
                name: '保险费总计',
                type: 'bar',
                data: insuranceTotals
            },
            {
                name: '件数总计',
                type: 'bar',
                data: times
            }
        ]
    };
    echart.setOption(option2);
}

//生成图形
function buildChart3(columnLabels, columnNames, allCarriageTotals, insuranceTotals, times) {
    let option3 = {
        title: {
            text: '司机运量',
            subtext: ''

        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: columnLabels
        },
        toolbox: {
            show: true,
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                data: columnNames
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '承运费总计',
                type: 'bar',
                data: allCarriageTotals
            },
            {
                name: '加运费总计',
                type: 'bar',
                data: insuranceTotals
            },
            {
                name: '总次数',
                type: 'bar',
                data: times
            }
        ]
    };
    echart.setOption(option3);
}

function clearEchart() {
    echart.clear();
}
