/*!
* jQuery Cookie Plugin v1.4.0
* https://github.com/carhartl/jquery-cookie
*
* Copyright 2013 Klaus Hartl
* Released under the MIT license
*/
(function (factory) {
if (typeof define === 'function' && define.amd) {
// AMD. Register as anonymous module.
define(['jquery'], factory);
} else {
// Browser globals.
factory(jQuery);
}
}(function ($) {

var pluses = /\+/g;

function encode(s) {
return config.raw ? s : encodeURIComponent(s);
}

function decode(s) {
return config.raw ? s : decodeURIComponent(s);
}

function stringifyCookieValue(value) {
return encode(config.json ? JSON.stringify(value) : String(value));
}

function parseCookieValue(s) {
if (s.indexOf('"') === 0) {
// This is a quoted cookie as according to RFC2068, unescape...
s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
}

try {
// Replace server-side written pluses with spaces.
// If we can't decode the cookie, ignore it, it's unusable.
s = decodeURIComponent(s.replace(pluses, ' '));
} catch(e) {
return;
}

try {
// If we can't parse the cookie, ignore it, it's unusable.
return config.json ? JSON.parse(s) : s;
} catch(e) {}
}

function read(s, converter) {
var value = config.raw ? s : parseCookieValue(s);
return $.isFunction(converter) ? converter(value) : value;
}

var config = $.cookie = function (key, value, options) {

// Write
if (value !== undefined && !$.isFunction(value)) {
options = $.extend({}, config.defaults, options);

if (typeof options.expires === 'number') {
var days = options.expires, t = options.expires = new Date();
t.setDate(t.getDate() + days);
}

return (document.cookie = [
encode(key), '=', stringifyCookieValue(value),
options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
options.path ? '; path=' + options.path : '',
options.domain ? '; domain=' + options.domain : '',
options.secure ? '; secure' : ''
].join(''));
}

// Read

var result = key ? undefined : {};

// To prevent the for loop in the first place assign an empty array
// in case there are no cookies at all. Also prevents odd result when
// calling $.cookie().
var cookies = document.cookie ? document.cookie.split('; ') : [];

for (var i = 0, l = cookies.length; i < l; i++) {
var parts = cookies[i].split('=');
var name = decode(parts.shift());
var cookie = parts.join('=');

if (key && key === name) {
// If second argument (value) is a function it's a converter...
result = read(cookie, value);
break;
}

// Prevent storing a cookie that we couldn't decode.
if (!key && (cookie = read(cookie)) !== undefined) {
result[name] = cookie;
}
}

return result;
};

config.defaults = {};

$.removeCookie = function (key, options) {
if ($.cookie(key) !== undefined) {
// Must not alter options, thus extending a fresh object...
$.cookie(key, '', $.extend({}, options, { expires: -1 }));
return true;
}
return false;
};

}));

if ($.cookie('has_seen_warning')) {
}
else {
    $('#warningModal').modal('show');
    $.cookie('has_seen_warning', 'true', { expires: 7, path: '/' });
}

$(document).ready(function(){
  $('.main-nav').addClass('mobile-enabled');
  $('.main-nav').prepend('<button type="button" class="nav-toggle btn btn-default"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span><span class="sr-only">Toggle Navigation</span></button>');

  $(".nav-toggle").click(function() {
    $(".main-nav").toggleClass("active");
  });
});

// Key Signup
$(document).ready(function(){
  if ($.cookie('openfda_key')) {
    api_key = $.cookie('openfda_key');
    $("#api-key-form").replaceWith('<div class="api-key-result">Congrats! Your API Key is: <div class="api-key">' + api_key + '</div></div>');
  }

  $("#api-key-form").on('submit', function(e) {
    var form = $(this);
    var email = form.find('#email').val();
    console.log('submit');
    e.preventDefault(); $.post("https://api.data.gov/api-umbrella/v1/users.json?api_key=qeFgqbUXRY76Yk0nCKC60ur1J3bEuLUyPKp2remB", {
      user: {
        first_name: "openFDA",
        last_name: "User",
        email: email,
        use_description: "Signup through open.fda.gov",
        terms_and_conditions: "1",
        send_welcome_email: "0",
        registration_source: "open.fda.gov"
      }
    })
    .done(function(data) {
      $(form).replaceWith('<div class="api-key-result">Congrats! Your API Key is: <div class="api-key">' + data.user.api_key + '</div></div>');
    $.cookie('openfda_key', data.user.api_key, { expires: 7, path: '/' });
    });
    e.preventDefault();
  });
});
