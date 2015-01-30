// Scripts that run on API docs-related pages

// Create anchors for each h2 through h6 on the page.

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

    $('.reference :header').not('.noindex').each(function() {
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

// JSON prettyprint

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

// Document ready

$(document).ready(function() {
  
  // Create navigation sidebar on API docs pages

  createNavigationSidebarFromHeadings();
  createAnchorsFromHeadings();

  // Attach autosize event handler to text areas

  $('textarea').autosize();

  // Affix navigation sidebar when user scrolls

  $('.reference-nav').affix({
    offset: {
      top: function () {
        return (this.top = $('.reference-nav').offset().top - 12);
      }
    }
  });

  // Update API status on endpoint reference pages

  if ($('#api-status-updated').length > 0) {
    var dateUpdated, dateLatest;
    var endpoint = $('#api-status-updated').find("#endpoint").html();
    var count = $('#api-status-updated').find("#count").html();

    $.getJSON(endpoint + 'count=' + count)
    .success(function(data) {
      if(data.results) {
        var dateWithDashes = data.results[data.results.length - 1].time.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
        dateUpdated = 'Updated ' + data.meta.last_updated;
        dateLatest = 'Data current through ' + dateWithDashes;
        $('#api-status-updated').find("#date-updated").text('API OK | ' + dateUpdated + ' | ');
        $('#api-status-updated').find("#date-latest").text(dateLatest);
      }
      else {
        var errorMessage = "This API is down right now.";
        $('#api-status-updated').find("#date-updated").text(errorMessage);
      }
    })
    .error(function() {
      var errorMessage = "This API is down right now.";
      $('#api-status-updated').find("#date-updated").text(errorMessage);
    });
  }

  // Update API status on open.fda.gov/api/status

  if ($('.api-status').length > 0) {

    $.getJSON('//api.fda.gov/status')
    .done(function(data) {
      
      var statuses = {};
      for (item in data) {
        if (data[item].endpoint == 'recall') {
          statuses['/drug/enforcement.json'] = {
            status: data[item].status,
            last_updated: data[item].last_updated
          };
          statuses['/device/enforcement.json'] = {
            status: data[item].status,
            last_updated: data[item].last_updated
          };
          statuses['/food/enforcement.json'] = {
            status: data[item].status,
            last_updated: data[item].last_updated
          };
        }
        else if (data[item].endpoint == 'drugevent') {
          statuses['/drug/event.json'] = {
            status: data[item].status,
            last_updated: data[item].last_updated
          };
        }
        else if (data[item].endpoint == 'druglabel') {
          statuses['/drug/label.json'] = {
            status: data[item].status,
            last_updated: data[item].last_updated
          };
        }
        else if (data[item].endpoint == 'deviceevent') {
          statuses['/device/event.json'] = {
            status: data[item].status,
            last_updated: data[item].last_updated
          };
        }
      }
      
      $('.api-status').each(function(index) {
        var status = this;
        var endpoint = $(status).data('endpoint');

        if (statuses[endpoint]) {
          if (statuses[endpoint].status == 'GREEN') {
            $(status).find('.status').text('OK');
            $(status).find('.updated').text(statuses[endpoint].last_updated);

            $(status).find('.metric').addClass('visible');
            $(status).addClass('green');
          }
          else if (statuses[endpoint].status == 'YELLOW') {
            $(status).find('.status').text('Slow');
            $(status).find('.updated').text(statuses[endpoint].last_updated);

            $(status).find('.metric').addClass('visible');
            $(status).addClass('yellow');
          }
          else if (statuses[endpoint].status == 'RED') {
            $(status).find('.status').text('Down');
            $(status).find('.updated').text(statuses[endpoint].last_updated);

            $(status).find('.metric').addClass('visible');
            $(status).addClass('red');
          }
        }
        else {
          $(status).find('.status').text('No information available');
          $(status).find('.updated').text('—');

          $(status).find('.metric').addClass('visible');
        }
      });
    })
    .fail(function() {
      $('.api-status').each(function(index) {
        var status = this;
        var endpoint = $(status).data('endpoint');

        $(status).find('.status').text('API status server not responding');
        $(status).find('.updated').text('—');

        $(status).find('.metric').addClass('visible');
      });
    });
  }

  // Process API queries in interactive query explorer

  $(".api-explorer button.go").click(function () {
    var e = $(this).parents(".api-explorer-form").find(".api-explorer-query").val(),
      t = $(this).parents("div.api-explorer").find(".return"),
      button = $(this);
    $(t).find(".response pre").html("Loading...");
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
      $(t).find(".response pre").html("The API response was an error. Check the syntax and give it another try.");
    });
  });

  // Handle keypresses in API query textareas

  $(".api-explorer-query").keypress(function(e) {
    var code = (e.keyCode ? e.keyCode : e.which),
        button = $(this).parents("div.api-explorer").find("button.go");
    
    // Handle space character (don't allow it)
    if (code === 32) {
      e.preventDefault();
    }
    // Handle return keypress
    else if (code === 13) {
      e.preventDefault();
      $(button).trigger('click');
    }
  });
});