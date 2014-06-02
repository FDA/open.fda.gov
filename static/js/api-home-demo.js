var selectedChart = $('#api-home-demo').find('#chart')[0];
var dataValuesForChart = ['Reports'];
var dataLabelsForChart = ['Date'];

function rollupDatesAndValues(data, callback) {
  dataValuesForChart = ['Reports'];
  dataLabelsForChart = ['Date'];

  var nestedData = d3.nest()
    .key(function(d) {
      return d.time.slice(0,6);
    })
    .rollup(function(d) {
      return d3.sum(d, function(g) {
        return g.count;
      });
    })
    .entries(data);

  nestedData.map(function(item) {
    dataLabelsForChart.push(item.key);
    dataValuesForChart.push(item.values);
  });
  callback();
}

function processDataForCount(data, callback) {
  dataLabelsForChart = [];
  dataValuesForChart = ['Number of matching reports'];

  $.each(data, function(key, val) {
    dataLabelsForChart.push(val.term.toLowerCase());
    dataValuesForChart.push(val.count);
  });
  callback();
}

function processDataForPrimarySource(data, callback) {
  dataValuesForChart = [];

  $.each(data, function(key, val) {
    if      (val.term == "1") { term = "Physician"; }
    else if (val.term == "2") { term = "Pharmacist"; }
    else if (val.term == "3") { term = "Other HCP"; }
    else if (val.term == "4") { term = "Lawyer"; }
    else if (val.term == "5") { term = "Consumer or non-HCP"; }
    dataValuesForChart.push([term, val.count]);
  });
  callback();
}

function renderDemoChart(number) {
  if (number === 1) {
    $.when($.getJSON('https://api.fda.gov/drug/event.json?search=receivedate:[20040101+TO+20150101]&count=receivedate', function(data) {
      rollupDatesAndValues(data.results, function() {
        return;
      });
    }))
    .then(function() {
      $('#title').text('Adverse drug event reports, 2004 to 2013');
      $('#title').addClass('in').removeClass('out');
      var chart = c3.generate({
        bindto: selectedChart,
        data: {
          x: 'Date',
          x_format: '%Y%m',
          columns: [
            dataLabelsForChart,
            dataValuesForChart
          ]
        },
        point: {
          show: false
        },
        color: {
          pattern: ['#fff']
          // pattern: ['#00539b']
        },
        tooltip: {
          show: false
        },
        axis: {
          x: {
            padding: 15,
            type: 'timeseries',
            tick: {
              format: '%Y-%m',
              culling: {
                max: 10
              }
            }
          },
          y: {
            show: true,
            tick: {
              culling: {
                max: 9
              }
            }
          }
        },
        legend: {
          show: false
        },
        size: {
          height: 220
        }
      });
    });
  }
  else if (number === 2) {
    $.when($.getJSON('https://api.fda.gov/drug/event.json?&count=patient.drug.drugindication.exact', function(data) {
      processDataForCount(data.results.slice(0,5), function() {
        return;
      });
    }))
    .then(function(data) {
      $('#api-home-demo #title').text('Frequently reported drug classes in adverse event reports');
      $('#title').addClass('in').removeClass('out');
      var chart = c3.generate({
        bindto: selectedChart,
        data: {
          columns: [
            dataValuesForChart
          ],
          type : 'bar'
        },
        color: {
          pattern: ['#fff'] // FDA blue, kinda dark
        },
        bar: {
          width: {
            ratio: 0.25
          }
        },
        tooltip: {
          show: false
        },
        axis: {
          rotated: true,
          x: {
            type: 'categorized',
            categories: dataLabelsForChart
          },
          y: {
            show: false,
            ticks: {
              culling: {
                max: 1
              }
            }
          }
        },
        size: {
          height: 220
        },
        legend: {
          show: false
        }
      });
    });
  }
  else if (number === 3) {
    $.when($.getJSON('https://api.fda.gov/drug/event.json?search=patient.patientsex:2+AND+patient.patientonsetage:[55+TO+90]&count=patient.drug.drugindication.exact', function(data) {
      processDataForCount(data.results.slice(0,5), function() {
        return;
      });
    }))
    .then(function(data) {
      $('#api-home-demo #title').text('Frequently reported indications for drug use among women, 55 to 90');
      $('#title').addClass('in').removeClass('out');
      var chart = c3.generate({
        bindto: selectedChart,
        data: {
          columns: [
            dataValuesForChart
          ],
          type : 'bar'
        },
        color: {
          pattern: ['#fff'] // FDA blue, kinda dark
        },
        bar: {
          width: {
            ratio: 0.25
          }
        },
        tooltip: {
          show: false
        },
        axis: {
          rotated: true,
          x: {
            type: 'categorized',
            categories: dataLabelsForChart
          },
          y: {
            show: true,
            ticks: {
              culling: {
                max: 10
              }
            }
          }
        },
        size: {
          height: 220
        },
        legend: {
          show: false
        }
      });
    });
  }
  else if (number === 4) {
    $.when($.getJSON('https://api.fda.gov/drug/event.json?search=receivedate:[20040101+TO+20150101]+AND+patient.drug.drugindication:hypertension&count=receivedate', function(data) {
      rollupDatesAndValues(data.results, function() {
        return;
      });
    }))
    .then(function() {
      $('#title').text('Adverse drug event reports, 2004 to 2013, where an indication for use was hypertension');
      $('#title').addClass('in').removeClass('out');
      var chart = c3.generate({
        bindto: selectedChart,
        data: {
          x: 'Date',
          x_format: '%Y%m',
          columns: [
            dataLabelsForChart,
            dataValuesForChart
          ]
        },
        point: {
          show: false
        },
        color: {
          pattern: ['#fff']
          // pattern: ['#00539b']
        },
        tooltip: {
          show: false
        },
        axis: {
          x: {
            padding: 15,
            type: 'timeseries',
            tick: {
              format: '%Y-%m',
              culling: {
                max: 10
              }
            }
          },
          y: {
            show: true,
            tick: {
              culling: {
                max: 9
              }
            }
          }
        },
        legend: {
          show: false
        },
        size: {
          height: 220
        }
      });
    });
  }
  // else if (number === 5) {
  //   $.when($.getJSON('https://api.fda.gov/drug/event.json?&count=primarysource.qualification', function(data) {
  //     processDataForPrimarySource(data.results.slice(0,5), function() {
  //       return;
  //     });
  //   }))
  //   .then(function() {
  //     $('#title').text('Who reports adverse drug events?');
  //     $('#title').addClass('in').removeClass('out');
  //     var chart = c3.generate({
  //       bindto: selectedChart,
  //       data: {
  //         columns: dataValuesForChart,
  //         type : 'donut'
  //       },
  //       color: {
  //         pattern: ['#5a859d', '#476c92', '#375587', '#293d7c', '#1e2871']
  //       },
  //       labels: true,
  //       size: {
  //         height: 300
  //       },
  //       legend: {
  //         show: true,
  //         position: 'right'
  //       }
  //     });
  //   });
  // }
}

$(document).ready(function() {
  var randomNumber = Math.floor((Math.random() * 4) + 1);
  renderDemoChart(randomNumber);
  console.log(randomNumber);
});