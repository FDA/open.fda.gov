// Scripts that run on API docs-related pages

var kIndexToEnpdoint = {
  'recall': [ '/device/enforcement.json', '/drug/enforcement.json', '/food/enforcement.json' ],
  'devicerecall': [ '/device/recall.json' ],
  'drugevent': ['/drug/event.json'],
  'druglabel': ['/drug/label.json'],
  'deviceevent': ['/device/event.json'],
  'devicepma': ['/device/pma.json'],
  'deviceclass': ['/device/classification.json'],
  'deviceclearance': ['/device/510k.json'],
};

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

function updateDownloadAreas() {

  var getLinkHtml = function(partition) {
    var linkHtml =  "<a href='" + partition.file + "'>" +
                      "<i class='fa fa-file-o' style='margin-right: 5px; font-size: .94em'></i>" +
                      partition.display_name +
                    "</a> " +
                    "<span class='slight'>" + partition.size_mb + " MB </span><br />";
    return linkHtml;
  };

  $('.api-download').each(function(index) {
    var downloadArea = this;
    var endpointString = $(downloadArea).data('endpoint');
    var endpointParts = endpointString.split('.');

    $.getJSON('https://api.fda.gov/download.json')
    .done(function(data) {
      var endpointDownloads = data.results[endpointParts[0]][endpointParts[1]];
      var endpointPartitions = endpointDownloads.partitions ? endpointDownloads.partitions : [];
      var endpointDateUpdated = endpointDownloads.export_date ? endpointDownloads.export_date : '';

      // If there were no partitions found (no files to download)
      if (endpointPartitions.length == 0) {
        $(downloadArea).find('.description').append(
          "<p>" +
            "The list of data files for this endpoint could not be found. The most likely cause is a problem with the openFDA server. Try again in a few minutes." +
          "</p>"
        );
      }

      // Append the download last-updated date, which is an empty string if no data were found
      $(downloadArea).find('.single').append(
        "<p class='light'>Download data last updated " + endpointDateUpdated + ".</p>"
      );

      // If there are a lot of partitions (files)
      if (endpointPartitions.length > 10) {
        // Hide the partitions div, which would otherwise take up a lot of space.
        // A 'show downloads' button will be appended to the download description,
        // which the user can click to see all the partitions.
        $(downloadArea).find('.partitions').css({ "display": "none" });
        $(downloadArea).find('.description').append(
          "<p>This endpoint’s data may be downloaded in zipped JSON files. The results are represented in the same format as API calls to this endpoint. For more information about openFDA downloads, see the <a href='/api/reference/#downloads'>API basics</a>.</p>" +
          "<p><a class='api-download-show' style='cursor: pointer' data-endpoint='" + endpointString + "'>" +
            "Show data files (" + endpointPartitions.length + ")" +
          "</a></p>"
        );

        // Divide this long list of partitions up into useful chunks. (By display name.)
        // We only divide when partition display names begin with a number (e.g. YYYY) or the term 'All'.
        var isDisplayNameAUsefulDivider = function(displayName) {
          if (!isNaN(parseInt(displayName.slice(0,1)))) {
            return true;
          }
          if (displayName.slice(0,3) == 'All') {
            return true;
          }
          return false;
        };

        var firstDisplayName = endpointPartitions[0].display_name;

        if (isDisplayNameAUsefulDivider(firstDisplayName)) {
          var divider;
          $.each(endpointPartitions, function(i, partition) {
            var linkHtml =  getLinkHtml(partition);
            // Use the first part of the display name as a category/divider.
            var displayNameFirstPart = partition.display_name.split(' ')[0];

            // Special case to catch 'All'
            if (displayNameFirstPart.slice(0,3) == 'All') {
              displayNameFirstPart = 'All';
            }
            if (divider !== displayNameFirstPart) {
              divider = displayNameFirstPart;
              if (divider == 'All') {
                $('.partitions').append(
                  "<div class='col-sm-4' id='partition-" + divider + "'>" +
                    "<h3>All other data</h3>" +
                    "<p class='slight'>Records that fell outside the categories here, such as earlier or later dates or those with potential data errors.</p>" +
                  "</div>"
                );
              }
              else {
                $('.partitions').append(
                  "<div class='col-sm-4' id='partition-" + divider + "'>" +
                    "<h3>" + divider + "</h3>" +
                  "</div>"
                );
              }
            }
            $('#partition-' + divider).append(linkHtml);
          });
        }
        else {
          $.each(endpointPartitions, function(i, partition) {
            var linkHtml =  getLinkHtml(partition);
            $(downloadArea).find('.single').append(linkHtml);
          });
        }
      }
      else {
        $(downloadArea).find('.description').append(
          "<p>This endpoint’s data may be downloaded in zipped JSON files. The results are represented in the same format as API calls to this endpoint. For more information about openFDA downloads, see the <a href='/api/reference/#downloads'>API basics</a>.</p></p>"
        );
        $.each(endpointPartitions, function(i, partition) {
          var linkHtml =  getLinkHtml(partition);
          $(downloadArea).find('.single').append(linkHtml);
        });
      }
    })
    .fail(function() {
      $(downloadArea).find('.description').append(
        "<p>" +
          "The list of data files for this endpoint could not be found. The most likely cause is a problem with the openFDA server. Try again in a few minutes." +
        "</p>"
      );
    });
  });
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

  // Create download sections

  if ($('.api-download').length > 0) {
    updateDownloadAreas();
  }

  // Handle "show downloads" clicks

  $('body').on('click', '.api-download-show', function () {
    var endpoint = $(this).data('endpoint');
    $(this).css({ "display": "none" });
    $(".api-download[data-endpoint='" + endpoint + "'] .partitions").css({ "display": "block" });
  });

  // Update API status on open.fda.gov/api/status

  if ($('.api-status').length > 0) {

    $.getJSON('//api.fda.gov/status')
    .done(function(data) {
      var statuses = {};
      for (key in data) {
        var item = data[key];
        var endpoints = kIndexToEnpdoint[item.endpoint];
        if (!endpoints) {
          continue;
        }
        for (var i = 0; i < endpoints.length; ++i) {
          statuses[endpoints[i]] = {
            status: item.status,
            last_updated: item.last_updated
          }
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
