// API query d3 chart function for examples with &count=
//
function drawBarChart(data, chartElement) {

    data = data.slice(1,11);
    
    var termFn = function(key) { return key.term; },
        countFn = function(key) { return key.count; };

    var margin = {top: 20, right: 5, bottom: 0, left: 3},
        width = 270 - margin.left - margin.right,
        barHeight = 30,
        chart = d3.select(chartElement),
        clearChart = function() { chart.selectAll("g").remove(); };

    var refreshChart = function() {
        chart = d3.select(chartElement)
                .attr("width", width + margin.right + margin.left)
                .attr("height", barHeight * data.length + margin.top)
            .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scale.linear()
            .domain([0, d3.max(data, function(d) { return countFn(d); })])
            .rangeRound([0, width]);

        var bar = chart.selectAll("g").data(data);
        
        var xAxis = d3.svg.axis()
            .scale(x)
            .ticks(3)
            .outerTickSize(0)
            .orient("top");
            
        bar.enter()
            .append("g")
            .attr("opacity", 1e-6)
            .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; })
            .transition()
            .attr("opacity", 1);

        chart.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + 0 + ")")
            .call(xAxis);

        bar.append("rect")
            .attr("width", 0)
            .transition()
            .attr("width", function(d) { return x(countFn(d)); })
            .attr("height", barHeight - 25);

        bar.append("text")
            // .attr("x", function(d) { return x(countFn(d)) - 5; }) // End of line with 5px padding
            .attr("x", 0)
            .attr("y", barHeight - 17)
            .attr("dy", ".35em")
            .text(function(d) { return termFn(d) + " (" + countFn(d) + ")"; });
    };

    clearChart();
    refreshChart();
}

function parseResultForChart(json, button) {
  // TODO: Add logic to decide whether and what type of chart to draw.
  //       For now, this just checks whether the chart element exists and draws a chart.
  var chartElement = $(button).parents("div.api-explorer").find(".query").find("svg.chart");

  if (chartElement[0]) {
    $(chartElement[0]).show();
    drawBarChart(json, chartElement[0]);
  }
}

// Create anchors for each h2 through h6 on the page.
//
function createAnchorsFromHeadings() {
  return $("h2, h3, h4, h5, h6").each(function(i, el) {
    var $el, icon, id;
    $el = $(el);
    id = $el.attr('id');
    icon = '<i class="fa fa-link"></i>';
    if (id) {
      return $el.append($("<a />").addClass("header-link").attr("href", "#" + id).html(icon));
    }
  });
}

function createNavigationSidebarFromHeadings() {
  if('#reference-nav-ul') {
    var navigationItems = "",
        depth = null;

    $('#reference :header').not('.noindex').each(function() {
      var heading = $(this),
          headingTag = this.tagName,
          headingDepth = headingTag.substr(1,1),
          title = heading.text(),
          link = "#" + heading.attr("id"),
          newNavigationItem = "";

      if (depth === null) {
        newNavigationItem = "";
      }
      else if (depth < headingDepth) {
        newNavigationItem =
          "<ul>";
      }
      else if (depth > headingDepth) {
        var difference = depth - headingDepth;
        for (var i = 0; i < difference; i++) {
          newNavigationItem +=
              "</ul>" +
            "</li>";
        }
      }
      else if (depth === headingDepth) {
        newNavigationItem =
          "</li>";
      }

      newNavigationItem +=
        "<li>" +
          "<a href='" + link + "'>" +
            title +
          "</a>";

      navigationItems += newNavigationItem;
      depth = headingDepth;
    });

    $("#reference-nav-ul").prepend(navigationItems);
  }
}

if (!library) { var library = {}; }
library.json = {
  replacer: function (e, t, n, r, i) {
    var s = "<span class=json-key>",
        o = "<span class=json-value>",
        u = "<span class=json-string>",
        a = t || "";
    n && (a = a + s + n.replace(/[": ]/g, "") + "</span>: ");
    r && (a = a + (r[0] == '"' ? u : o) + r + "</span>");
    return a + (i || "");
  },
  prettyPrint: function (e) {
    var t = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
    return JSON.stringify(e, null, 3).replace(/&/g, "&amp;").replace(/\\"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(t, library.json.replacer);
  }
};

$(document).ready(function() {
  createNavigationSidebarFromHeadings();
  createAnchorsFromHeadings();
  $('textarea').autosize();

  // Affix navigation sidebar when user scrolls.
  //
  $('.reference-nav').affix({
    offset: {
      top: function () {
        return (this.top = $('.reference-nav').offset().top - 12);
      }
    }
  });

  // Process API queries.
  //
  $(".api-explorer button.go").click(function () {
    var e = $(this).parents(".api-explorer-form").find(".api-explorer-query").val(),
      t = $(this).parents("div.api-explorer").find(".return"),
      button = $(this);
    $(t).find(".response pre").html("Loading request...");
    $.getJSON(e, function (json) {
      // parseResultForChart(json, button);
      $(t).find(".response pre").html(library.json.prettyPrint(json));
      $(t).parent().find('.response-close').remove();
      $(t).find(".response pre").after('<button class="btn pull-left response-close">Close</button>');
      if ($(t).height() > 200) {
        $(t).find(".response pre").before('<button class="btn pull-left response-close">Close</button>');
      }
      $(".response-close").click(function () {
        $(this).parent().find("pre").html('Click "Run query" to see its results.');
        $(this).parent().find('.response-close').remove();
      });
    }).fail(function () {
      $(t).find(".response pre").html("The API response was an error. Bummer. Check the syntax and give it another try.");
    });
  });

  // Handle keypresses in API query textareas.
  //
  $(".api-explorer-query").keypress(function(e) {
    var code = (e.keyCode ? e.keyCode : e.which),
        button = $(this).parents("div.api-explorer").find("button.go");
    
    // Handle space character (don't allow it).
    if (code === 32) {
      e.preventDefault();
    }
    // Handle return keypress.
    else if (code === 13) {
      e.preventDefault();
      $(button).trigger('click');
    }
  });
});