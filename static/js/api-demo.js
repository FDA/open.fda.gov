// Globals to manage which tab and chart elements to work with,
// and to effectively cache the total number of records in the
// endpoint, for coverage charts.
//
var selectedTab = $('.tab-content > .tab-pane.active');
var selectedChart = $(selectedTab).find('#chart')[0];
var selectedCoverageChart = $(selectedTab).find('#chart-coverage')[0];
var maxNumberOfRecords;

// Utility functions.
// 
function stringToTitleCase(string) {
  return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
function numberToCommaSeparated(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function replaceCountryCode(string) {
  var countries = { "": "No data", "*": "No answer provided", "AA": "Aruba", "AC": "Antigua and Barbuda", "AE": "United Arab Emirates", "AF": "Afghanistan", "AG": "Algeria", "AJ": "Azerbaijan", "AL": "Albania", "AM": "Armenia", "AN": "Andorra", "AO": "Angola", "AQ": "American Samoa", "AR": "Argentina", "AS": "Australia", "AT": "Ashmore and Cartier Islands", "AU": "Austria", "AV": "Anguilla", "AX": "Akrotiri", "AY": "Antarctica", "BA": "Bahrain", "BB": "Barbados", "BC": "Botswana", "BD": "Bermuda", "BE": "Belgium", "BF": "Bahamas, The", "BG": "Bangladesh", "BH": "Belize", "BK": "Bosnia and Herzegovina", "BL": "Bolivia", "BM": "Burma", "BN": "Benin", "BO": "Belarus", "BP": "Solomon Islands", "BQ": "Navassa Island", "BR": "Brazil", "BS": "French Southern and Antarctic Lands Bassas da India", "BT": "Bhutan", "BU": "Bulgaria", "BV": "Bouvet Island", "BX": "Brunei", "BY": "Burundi", "CA": "Canada", "CB": "Cambodia", "CD": "Chad", "CE": "Sri Lanka", "CF": "Congo (Brazzaville)", "CG": "Congo (Kinshasa)", "CH": "China", "CI": "Chile", "CJ": "Cayman Islands", "CK": "Cocos (Keeling) Islands", "CM": "Cameroon", "CN": "Comoros", "CO": "Colombia", "CQ": "Northern Mariana Islands", "CR": "Coral Sea Islands", "CS": "Costa Rica", "CT": "Central African Republic", "CU": "Cuba", "CV": "Cape Verde", "CW": "Cook Islands", "CY": "Cyprus", "DA": "Denmark", "DJ": "Djibouti", "DO": "Dominica", "DQ": "Jarvis Island", "DR": "Dominican Republic", "DX": "Dhekelia", "EC": "Ecuador", "EG": "Egypt", "EI": "Ireland", "EK": "Equatorial Guinea", "EN": "Estonia", "ER": "Eritrea", "ES": "El Salvador", "ET": "Ethiopia", "EU": "French Southern and Antarctic Lands Europa Island", "EZ": "Czech Republic", "FG": "French Guiana", "FI": "Finland", "FJ": "Fiji", "FK": "Falkland Islands (Islas Malvinas)", "FM": "Micronesia, Federated States of", "FO": "Faroe Islands", "FP": "French Polynesia", "FQ": "Baker Island", "FR": "France", "FS": "French Southern and Antarctic Lands", "GA": "Gambia, The", "GB": "Gabon", "GG": "Georgia", "GH": "Ghana", "GI": "Gibraltar", "GJ": "Grenada", "GK": "Guernsey", "GL": "Greenland", "GM": "Germany", "GO": "French Southern and Antarctic Lands Glorioso Islands", "GP": "Guadeloupe", "GQ": "Guam", "GR": "Greece", "GT": "Guatemala", "GV": "Guinea", "GY": "Guyana", "GZ": "Gaza Strip", "HA": "Haiti", "HK": "Hong Kong", "HM": "Heard Island and McDonald Islands", "HO": "Honduras", "HQ": "Howland Island", "HR": "Croatia", "HU": "Hungary", "IC": "Iceland", "ID": "Indonesia", "IM": "Isle of Man", "IN": "India", "IO": "British Indian Ocean Territory", "IP": "Clipperton Island", "IR": "Iran", "IS": "Israel", "IT": "Italy", "IV": "Côte d'Ivoire", "IZ": "Iraq", "JA": "Japan", "JE": "Jersey", "JM": "Jamaica", "JN": "Jan Mayen", "JO": "Jordan", "JQ": "Johnston Atoll", "JU": "French Southern and Antarctic Lands Juan de Nova Island", "KE": "Kenya", "KG": "Kyrgyzstan", "KN": "Korea, North", "KQ": "Kingman Reef", "KR": "Kiribati", "KS": "Korea, South", "KT": "Christmas Island", "KU": "Kuwait", "KV": "Kosovo", "KZ": "Kazakhstan", "LA": "Laos", "LE": "Lebanon", "LG": "Latvia", "LH": "Lithuania", "LI": "Liberia", "LO": "Slovakia", "LQ": "Palmyra Atoll", "LS": "Liechtenstein", "LT": "Lesotho", "LU": "Luxembourg", "LY": "Libya", "MA": "Madagascar", "MB": "Martinique", "MC": "Macau", "MD": "Moldova", "MF": "Mayotte", "MG": "Mongolia", "MH": "Montserrat", "MI": "Malawi", "MJ": "Montenegro", "MK": "Macedonia", "ML": "Mali", "MN": "Monaco", "MO": "Morocco", "MP": "Mauritius", "MQ": "Midway Islands", "MR": "Mauritania", "MT": "Malta", "MU": "Oman", "MV": "Maldives", "MX": "Mexico", "MY": "Malaysia", "MZ": "Mozambique", "NC": "New Caledonia", "NE": "Niue", "NF": "Norfolk Island", "NG": "Niger", "NH": "Vanuatu", "NI": "Nigeria", "NL": "Netherlands", "NN": "Sint Maarten", "NO": "Norway", "NP": "Nepal", "NR": "Nauru", "NS": "Suriname", "NU": "Nicaragua", "NZ": "New Zealand", "OD": "South Sudan", "PA": "Paraguay", "PC": "Pitcairn Islands", "PE": "Peru", "PF": "Paracel Islands", "PG": "Spratly Islands", "PJ": "Etorofu, Habomai, Kunashiri, and Shikotan Islands", "PK": "Pakistan", "PL": "Poland", "PM": "Panama", "PO": "Portugal", "PP": "Papua New Guinea", "PS": "Palau", "PU": "Guinea-Bissau", "QA": "Qatar", "RE": "Réunion", "RI": "Serbia", "RM": "Marshall Islands", "RN": "Saint Martin", "RO": "Romania", "RP": "Philippines", "RQ": "Puerto Rico", "RS": "Russia", "RW": "Rwanda", "SA": "Saudi Arabia", "SB": "Saint Pierre and Miquelon", "SC": "Saint Kitts and Nevis", "SE": "Seychelles", "SF": "South Africa", "SG": "Senegal", "SH": "Saint Helena, Ascension, and Tristan da Cunha", "SI": "Slovenia", "SL": "Sierra Leone", "SM": "San Marino", "SN": "Singapore", "SO": "Somalia", "SP": "Spain", "ST": "Saint Lucia", "SU": "Sudan", "SV": "Svalbard", "SW": "Sweden", "SX": "South Georgia and South Sandwich Islands", "SY": "Syria", "SZ": "Switzerland", "TB": "Saint Barthelemy", "TD": "Trinidad and Tobago", "TE": "French Southern and Antarctic Lands Tromelin Island", "TH": "Thailand", "TI": "Tajikistan", "TK": "Turks and Caicos Islands", "TL": "Tokelau", "TN": "Tonga", "TO": "Togo", "TP": "Sao Tome and Principe", "TS": "Tunisia", "TT": "Timor-Leste", "TU": "Turkey", "TV": "Tuvalu", "TW": "Taiwan", "TX": "Turkmenistan", "TZ": "Tanzania", "UC": "Curaçao", "UG": "Uganda", "UK": "United Kingdom", "UP": "Ukraine", "US": "United States", "UV": "Burkina Faso", "UY": "Uruguay", "UZ": "Uzbekistan", "VC": "Saint Vincent and the Grenadines", "VE": "Venezuela", "VI": "British Virgin Islands", "VN": "Vietnam", "VQ": "United States Virgin Islands", "VT": "Vatican City", "WA": "Namibia", "WE": "West Bank", "WF": "Wallis and Futuna", "WI": " Western Sahara", "WQ": "Wake Island", "WS": "Samoa", "WZ": "Swaziland", "YM": "Yemen", "ZA": "Zambia", "ZI": "Zimbabwe" };
  if (countries[string]) {
    return (countries[string]); 
  }
  else {
    return(string);
  }
}

// Determine the kind of data we're going to chart,
// based on the value of the COUNT= parameter.
//
function determineChartContent(data) {
  var queryCount = $(selectedTab).find("#query-count").val();

  if (queryCount.indexOf("primarysource.reportercountry") >= 0) {
    return "primarysource.reportercountry";
  }
  else if (queryCount.indexOf("primarysource.qualification") >= 0) {
    return "primarysource.qualification";
  }
  else if (queryCount.indexOf("serious") >= 0) {
    return "serious";
  }
  else if (queryCount.indexOf("patient.patientsex") >= 0) {
    return "patient.patientsex";
  }
  else if (queryCount.indexOf("classification") >= 0) {
    return "classification";
  }
  else if (queryCount.indexOf("voluntary_mandated") >= 0) {
    return "voluntary_mandated";
  }
  else if (queryCount.indexOf("effective_time") >= 0) {
    return "effective_time";
  }
  else if (queryCount.indexOf("date") >= 0) {
    return "date";
  }
  else if (queryCount.indexOf("_country") >= 0) {
    return "country_code";
  }
  else if (queryCount !== "" && data.length >= 1) {
    return "count";
  }
}

function updateResultCount(data) {
  $(selectedTab).find("#result-count").text(numberToCommaSeparated(data) + " records match these search parameters");
}

// Draw a donut chart that shows the coverage
// (% of records that match the search query).
//
function updateCoverageChart(resultMax, resultTotal) {
  resultMax -= resultTotal;

  var chart = c3.generate({
    bindto: selectedCoverageChart,
    data: {
      columns: [
        ['Records that don\'t match this search', resultMax],
        ['Records that match this search', resultTotal]
      ],
      type: 'donut',
      groups: [
        ['Records that don\'t match this search', 'Records that match this search']
      ]
    },
    color: {
      // pattern: ['#bbb', '#00539b']
      pattern: ['#d2d2d2', '#888']
    },
    size: {
      height: 65,
      width: 65,
    },
    margin: 0,
    legend: {
      show: false
    },
    label: {
      show: false
    }
  });
}

// Draw chart using c3.js, using data from JSON API.
// Chart initially has no data; we determine the chart content by looking at
// what is being counted, then process the data appropriately
// and supply it to the c3 chart object.
//
function drawChartWithData(data) {
  var dataLabelsForChart = [],
      dataValuesForChart =[],
      chartContent = determineChartContent(data),
      chartHeight = 300;

  function generateBarChart(dataValuesForChart, dataLabelsForChart) {
    var chart = c3.generate({
        bindto: selectedChart,
        data: {
          columns: [
            dataValuesForChart
          ],
          type : 'bar'
        },
        color: {
          pattern: ['#00539b'] // FDA blue, kinda dark
        },
        bar: {
          width: {
            ratio: 0.35
          }
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
        labels: true,
        size: {
          height: chartHeight
        },
        legend: {
          show: false
        }
      });
  }

  function generateDonutChart(dataValuesForChart) {
    var chart = c3.generate({
        bindto: selectedChart,
        data: {
          columns: dataValuesForChart,
          type : 'donut'
        },
        color: {
          pattern: ['#8bc3e0', '#74a9d6', '#5e8dcc', '#4a6fc2', '#3751b8', '#8be095', '#74d674']
        },
        labels: true,
        size: {
          height: chartHeight
        },
        legend: {
          show: true,
          position: 'right'
        }
      });
  }

  function generateLineChart(dataValuesForChart, dataLabelsForChart) {
    var chart = c3.generate({
        bindto: selectedChart,
        data: {
          x: 'Date',
          x_format: '%Y%m',
          columns: [
            dataLabelsForChart,
            dataValuesForChart
            // ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
            // ['Reports', 30, 200, 100, 400, 150, 250]
          ]
        },
        point: {
          show: false
        },
        color: {
          pattern: ['#00539b'] // FDA blue, kinda dark
        },
        axis: {
          x: {
            type: 'timeseries',
            tick: {
              format: '%Y-%m',
              culling: {
                max: 6
              }
            }
          },
          y: {
            tick: {
              culling: {
                max: 4
              }
            }
          }
        },
        legend: {
          show: false
        },
        size: {
          height: chartHeight
        }
      });
  }

  function iterateThroughValues(data, processingLogic, dataType) {
    $.each(data, function(key, val) {
      var dataPair = [];
      $.each(val, function (k, v) {
        dataPair.push(processingLogic(k, v));
      });

      // c3 quirk requires data for a donut chart to be paired
      // in a single array; for proper bar charts, the data must be
      // put into two separate arrays.
      //
      if (dataType === 'bar') {
        dataLabelsForChart.push(dataPair[0]);
        dataValuesForChart.push(dataPair[1]);
      }
      else {
        dataValuesForChart.push(dataPair);
      }
    });
  }

  function rollupDatesAndValues(data, valuesArray, datesArray) {
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
      datesArray.push(item.key);
      valuesArray.push(item.values);
    });
  }

  // For each type of returned data (here defined as counting a particular field):
  //
  // 1. Slice data to appropriate length.
  // 2. Iterate through values.
  // 3. Apply processing logic (chart data-dependent).
  //
  if (chartContent === "count") {
    dataValuesForChart.push('# of matching records');
    data = data.slice(0, 10);
    var processingLogic = function(k, v) {
      if (k == "term") {
        if (v == "") {
          v = "null/no value";
        }
        v = v.toLowerCase();
      };

      // k == "term" && (v = v.toLowerCase());
      return v;
    };
    iterateThroughValues(data, processingLogic, 'bar');
    generateBarChart(dataValuesForChart, dataLabelsForChart);
  }
  else if (chartContent === "date") {
    dataValuesForChart.push('Reports'); // c3 needs this first in the array
    dataLabelsForChart.push('Date'); // c3 needs this first in the array
    rollupDatesAndValues(data, dataValuesForChart, dataLabelsForChart);
    generateLineChart(dataValuesForChart, dataLabelsForChart);
  }
  else if (chartContent === "effective_time") {
    dataValuesForChart.push('Submissions'); // c3 needs this first in the array
    dataLabelsForChart.push('Date'); // c3 needs this first in the array
    rollupDatesAndValues(data, dataValuesForChart, dataLabelsForChart);
    generateLineChart(dataValuesForChart, dataLabelsForChart);
  }
  else if (chartContent === "primarysource.qualification") {
    data = data.slice(0, 5);
    var processingLogic = function(k, v) {
      if (k == "term") {
        if      (v == "1") { v = "Physician"; }
        else if (v == "2") { v = "Pharmacist"; }
        else if (v == "3") { v = "Other health professional"; }
        else if (v == "4") { v = "Lawyer"; }
        else if (v == "5") { v = "Consumer or non-health professional"; }
      }
      return v;
    };
    iterateThroughValues(data, processingLogic, 'donut');
    generateDonutChart(dataValuesForChart);
  }
  else if (chartContent === "primarysource.reportercountry") {
    dataValuesForChart.push('Reporter country');
    data = data.slice(0,10);
    var processingLogic = function(k, v) {
      k == "term" && (v = stringToTitleCase(v));
      return v;
    };
    iterateThroughValues(data, processingLogic, 'bar');
    generateBarChart(dataValuesForChart, dataLabelsForChart);
  }
  else if (chartContent === "serious") {
    data = data.slice(0, 2);
    var processingLogic = function(k, v) {
      if (k == "term") {
        if      (v == "1") { v = "Death, life threatening condition, hospitalization, disability, congenital anomali, or other serious condition"; }
        else if (v == "2") { v = "Other"; }
      }
      return v;
    };
    iterateThroughValues(data, processingLogic, 'donut');
    generateDonutChart(dataValuesForChart);
  }
  else if (chartContent === "patient.patientsex") {
    data = data.slice(0, 3);
    var processingLogic = function(k, v) {
      if (k == "term") {
        if      (v == "1") { v = "Male"; }
        else if (v == "2") { v = "Female"; }
        else if (v == "0") { v = "Other"; }
      }
      return v;
    };
    iterateThroughValues(data, processingLogic, 'donut');
    generateDonutChart(dataValuesForChart);
  }
  else if (chartContent === "classification") {
    data = data.slice(0, 3);
    var processingLogic = function(k, v) {
      return v;
    };
    iterateThroughValues(data, processingLogic, 'donut');
    generateDonutChart(dataValuesForChart);
  }
  else if (chartContent === "voluntary_mandated") {
    data = data.slice(0, 2);
    var processingLogic = function(k, v) {
      return v;
    };
    iterateThroughValues(data, processingLogic, 'donut');
    generateDonutChart(dataValuesForChart);
  }
  else if (chartContent === "country_code") {
    dataValuesForChart.push('Reports');
    data = data.slice(0,10);
    var processingLogic = function(k, v) {
      k == "term" && (v = replaceCountryCode(v));
      return v;
    };
    iterateThroughValues(data, processingLogic, 'bar');
    generateBarChart(dataValuesForChart, dataLabelsForChart);
  }
  else {
    console.log("Not countable");
  }
}

// Make the actual openFDA API calls, and do things with the data.
//
function runQueries(queryStringForTotalMatching, queryString) {

  // Run API query and draw chart with data.
  $.getJSON(queryString)
  .success(function(data) {
    drawChartWithData(data.results);
  })
  .fail(function() {
    console.log('fails');
    $(selectedTab).find('#query-endpoint').popover({
      trigger: 'manual',
      container: 'body',
      placement: 'top',
      content: 'Oh no! The API query failed. It\'s probably due to a syntax error (double-check the query and spelling), or because the API couldn\'t be reached.'
    })
    .on('shown.bs.popover', function() {
      setTimeout(function() {
        $(selectedTab).find('#query-endpoint').popover('hide');
      }, 7000);
    });
    $(selectedTab).find('#query-endpoint').popover('show');
  });

  // Run API query and update coverage chart.
  $.getJSON(queryStringForTotalMatching, function(data) {
    var resultTotal = data.meta.results.total;
    updateCoverageChart(maxNumberOfRecords, resultTotal);
    updateResultCount(resultTotal);
  });
}

// Grab the SEARCH= and COUNT= parameters, configure query strings,
// and pass on to a function that calls the openFDA API.
//
function constructAndExecuteQuery() {
  // var queryString = "https://api.fda.gov/drug/event.json?";     // Query string begins with endpoint,
  var queryString = endpoint;
  var querySearch = $(selectedTab).find("#query-search").val(); // then SEARCH= parameter,
  var queryCount  = $(selectedTab).find("#query-count").val();  // then COUNT= parameter.
  var queryStringForTotalMatching = queryString;
  
  // Count queries don't return total number of matching records to the search,
  // so in order to get a number of matching records, we have to run one query
  // that's an ordinary search, in addition to the count query, which is used
  // to draw the chart.
  // 
  querySearch != "" && (queryStringForTotalMatching += "search=" + querySearch);
  querySearch == "" && (queryStringForTotalMatching = queryString + "search=" + countTerm + "&limit=1");
  
  // Construct the full query string, including contents of the search and count fields.
  querySearch != "" && (queryString += "search=" + querySearch);
  queryCount  != "" && (queryString += "&count=" + queryCount);

  // Run the queries.
  runQueries(queryStringForTotalMatching, queryString);

  // Populate the query <pre> with the fully constructed query string.
  $(selectedTab).find("#query-endpoint").text(queryString);
}

$(document).ready(function() {

  // Run a query, draw a chart!
  constructAndExecuteQuery();

  // Get the total number of records returned by this endpoint,
  // and store in a global for re-use in coverage chart.
  // _exists_:receivedate is a query that should match 100% of records,
  // which is why it's used to get that number.
  //
  $.getJSON(endpoint + 'search=' + countTerm, function(data) {
    maxNumberOfRecords = data.meta.results.total;
  });

  // Bind click handler to the query button
  $(selectedTab).find("#query-button").on('click', (function() {
    constructAndExecuteQuery();
  }));

  // Handle example query/story tab switches.
  // 
  $('a[data-toggle="pill"]').on('shown.bs.tab', function (e) {

    // Update globals with newly selected tabs and their charts.
    selectedTab = $('.tab-content > .tab-pane.active');
    selectedChart = $(selectedTab).find('#chart')[0];
    selectedCoverageChart = $(selectedTab).find('#chart-coverage')[0];

    // Unbind click handler from previous query button,
    // and bind to new query button.
    $(e.relatedTarget[0]).find('#query-button').off('click');
    $(selectedTab).find("#query-button").on('click', (function() {
      constructAndExecuteQuery();
    }));
    
    // Select the first radio button, then run a query.
    var selectedTabSearchOptionFirst = $(selectedTab).find("input[name=api-query-options-search]:radio")[0];
    $(selectedTabSearchOptionFirst).trigger('click');
    constructAndExecuteQuery();

    // Resize the SEARCH =textarea, in case we have a long search query now.
    $('textarea').autosize().show().trigger('autosize.resize');
  });
});

// Change SEARCH= parameter based on radio value, and run a
// new query based on the change.
//
$('.tab-pane').find("input[name=api-query-options-search]:radio").change(function() {
  var querySearchTextArea = $('.tab-pane').find("#query-search");
  var queryStringFromRadioButton = $(this).val();
  
  querySearchTextArea.val(queryStringFromRadioButton);
  $(selectedTab).find('#query-button').trigger("click");
  $('textarea').autosize().trigger('autosize.resize');
});

// Handle keypresses in API query textareas.
$(".query-textarea").keypress(function(e) {
  var code = (e.keyCode ? e.keyCode : e.which);
  var button = $(this).parents('.tab-pane').find('#query-button');

  // Uncheck radio button.
  $(this).parents('.api-query-options').find('input').prop('checked', false);
  
  // Disallow space character.
  if (code === 32) {
    e.preventDefault();
  }
  // Handle return keypress.
  else if (code === 13) {
    e.preventDefault();
    $(button).trigger('click');
  }
});

// Show a "no-SVG" message for IE8 users.
//
if (!Modernizr.svg) {
  $('#api-demo').hide();
  $('#api-demo-no-svg').show();
}