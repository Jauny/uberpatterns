$(function() {
  console.log('%cBrought to you by Jonathan from Growth :)', 'color: red; font-size: x-large');
  $('#input').on('keyup', handleInputUpdate);
  $('#input').focus();
});

var handleInputUpdate = function(event) {
  var value = event.target.value.trim();

  if (!value) {
    return clearPage();
  }

  const country = value.toLowerCase().replace(/ /g, '_');
  const countryThemes = themes.filter(function(theme) {
    return theme.country_name.toLowerCase() === country
  });

  if (countryThemes.length) {
    return updateTheme(countryThemes);
  } else {
    clearPage();
    autocomplete(country);
  }
};

var clearPage = function() {
  clearAutocomplete();
  $('#input').css('background-color', 'white');
  $('#inputWrapper').removeClass('dark');
  $('.theme').remove();
  $('#cta').text('');
};

var updateTheme = function(themes) {
  clearPage();

  if (themes && themes.length) {
    setBGPatterns(themes);
    setCTATextColor(themes[0].button_color);
  }
};

var setBGPatterns = function(themes) {
  var body = $('body');
  var count = themes.length;

  $('#cta').text(themes[0].button_color);

  for (var i = 0; i < count; i++) {
    var themeDiv = $('<div/>', {class: 'theme'})
      .css('width', 100/count + '%');

    var pattern = $('<div/>')
      .css('background-image', 'url('+ themes[i].pattern_url +')')
      .appendTo(themeDiv);
    var mainColor = $('<div/>')
      .css('background-color', themes[i].background_color)
      .text(themes[i].background_color)
      .appendTo(themeDiv);
    var secondaryColor = $('<div/>')
      .css('background-color', themes[i].pattern_fallback_color)
      .text(themes[i].pattern_fallback_color)
      .appendTo(themeDiv);

    body.append(themeDiv);
  }
};

var setCTATextColor = function(color) {
  var body = $('body');
  var inputWrapper = $('#inputWrapper');
  var input = $('#input');

  var colors = hexToRgb(color);
  var r = colors.r,
      g = colors.g,
      b = colors.b;
  var brightness = (r * 299 + g * 587 + b * 114) / 1000;
  if (brightness < 125) {
    inputWrapper.addClass('dark');
  } else {
    inputWrapper.removeClass('dark');
  }
  input.css('background-color', color);
};


function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
  } : null;
};

// autocomplete
function autocomplete(search) {
  clearAutocomplete();
  var country_matches = searchCountries(search);

  for (var i in country_matches) {
    $('#autocomplete').append(country_matches[i].replace(/_/g, ' ') + '<br/>');
  }
}

function searchCountries(search) {
  var matches = [];

  for (var i in themes) {
    var country_name = themes[i].country_name.toLowerCase();

    if (
      country_name.indexOf(search.toLowerCase()) > -1 &&
      matches.indexOf(country_name) < 0
    ) {
      matches.push(country_name);
    }
  }

  return matches;
};

function clearAutocomplete() {
  $('#autocomplete').text('');
}

var themes = [
  {
    "country_id": 0,
    "version": 1,
    "country_name": "Corporate",
    "background_color": "#B1E7D6",
    "pattern_fallback_color": "#62CEAD",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/global-aqua-05.jpg",
    "button_color": "#12939A",
    "button_hover_color": "#007279",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/Global_Palette_email-footer_Aqua.png"
  },
  {
    "country_id": 0,
    "version": 2,
    "country_name": "Corporate",
    "background_color": "#FFCB99",
    "pattern_fallback_color": "#FF9833",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/global-brick-021.jpg",
    "button_color": "#CB380B",
    "button_hover_color": "#AA1700",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/Global_Palette_email-footer_Brick.png"
  },
  {
    "country_id": 0,
    "version": 3,
    "country_name": "Corporate",
    "background_color": "#F1C8E6",
    "pattern_fallback_color": "#E79FD5",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/global-purple-01.jpg",
    "button_color": "#9226BE",
    "button_hover_color": "#71059D",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/Global_Palette_email-footer_Purple.png"
  },
  {
    "country_id": 0,
    "version": 4,
    "country_name": "Corporate",
    "background_color": "#ABBCED",
    "pattern_fallback_color": "#829AE3",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/global-indigo-04.jpg",
    "button_color": "#482BBD",
    "button_hover_color": "#270A9C",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/Global_Palette_email-footer_Indigo.png"
  },
  {
    "country_id": 0,
    "version": 5,
    "country_name": "Corporate",
    "background_color": "#CFEDB5",
    "pattern_fallback_color": "#8ECF56",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/global-green-03.jpg",
    "button_color": "#458A46",
    "button_hover_color": "#246925",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/Global_Palette_email-footer_Green.png"
  },
  {
    "country_id": 1,
    "version": 1,
    "country_name": "United_states",
    "background_color": "#A6DAEC",
    "pattern_fallback_color": "#4DB5D9",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/united-states_teal-4.jpg",
    "button_color": "#57AD57",
    "button_hover_color": "#368C36",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/united-states_email-footer_teal.png"
  },
  {
    "country_id": 1,
    "version": 2,
    "country_name": "United_states",
    "background_color": "#A42105",
    "pattern_fallback_color": "#CB380B",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/united-states_brick-14.jpg",
    "button_color": "#57AD57",
    "button_hover_color": "#368C36",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/united-states_email-footer_brick.png"
  },
  {
    "country_id": 1,
    "version": 3,
    "country_name": "United_states",
    "background_color": "#164677",
    "pattern_fallback_color": "#2067AC",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/united-states_blue-13.jpg",
    "button_color": "#57AD57",
    "button_hover_color": "#368C36",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/united-states_email-footer_blue.png"
  },
  {
    "country_id": 10,
    "version": 1,
    "country_name": "Australia",
    "background_color": "#A3E9EC",
    "pattern_fallback_color": "#2FC5CC",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/australia_aqua-4.jpg",
    "button_color": "#2473BD",
    "button_hover_color": "#03529C",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/australia_email-footer_aqua.png"
  },
  {
    "country_id": 10,
    "version": 3,
    "country_name": "Australia",
    "background_color": "#9ED79F",
    "pattern_fallback_color": "#57AD57",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/australia_green-5.jpg",
    "button_color": "#2473BD",
    "button_hover_color": "#03529C",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/australia_email-footer_green.png"
  },
  {
    "country_id": 10,
    "version": 2,
    "country_name": "Australia",
    "background_color": "#FFEB8C",
    "pattern_fallback_color": "#F6BA00",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/australia_gold-4.jpg",
    "button_color": "#2473BD",
    "button_hover_color": "#03529C",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/australia_email-footer_gold.png"
  },
  {
    "country_id": 11,
    "version": 1,
    "country_name": "Austria",
    "background_color": "#133B65",
    "pattern_fallback_color": "#2067AC",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/austria_blue-13.jpg",
    "button_color": "#EA4444",
    "button_hover_color": "#C92323",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/austria_email-footer_blue.png"
  },
  {
    "country_id": 11,
    "version": 2,
    "country_name": "Austria",
    "background_color": "#15AEB4",
    "pattern_fallback_color": "#47D3D9",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/austria_aqua-9.jpg",
    "button_color": "#EA4444",
    "button_hover_color": "#C92323",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/austria_email-footer_aqua.png"
  },
  {
    "country_id": 11,
    "version": 3,
    "country_name": "Austria",
    "background_color": "#185240",
    "pattern_fallback_color": "#267E63",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/austria_turquoise-15.jpg",
    "button_color": "#EA4444",
    "button_hover_color": "#C92323",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/austria_email-footer_turquoise.png"
  },
  {
    "country_id": 12,
    "version": 1,
    "country_name": "Azerbaijan",
    "background_color": "#C3C989",
    "pattern_fallback_color": "#878A5E",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/azerbaijan_olive-19.jpg",
    "button_color": "#EF5D28",
    "button_hover_color": "#FF7742",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/azerbaijan_email-footer_olive.png"
  },
  {
    "country_id": 12,
    "version": 3,
    "country_name": "Azerbaijan",
    "background_color": "#FFB266",
    "pattern_fallback_color": "#FD7900",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/azerbaijan_orange-5.jpg",
    "button_color": "#EF5D28",
    "button_hover_color": "#FF7742",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/azerbaijan_email-footer_orange.png"
  },
  {
    "country_id": 12,
    "version": 2,
    "country_name": "Azerbaijan",
    "background_color": "#880000",
    "pattern_fallback_color": "#BB0000",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/azerbaijan_red-15.jpg",
    "button_color": "#EF5D28",
    "button_hover_color": "#FF7742",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/azerbaijan_email-footer_red.png"
  },
  {
    "country_id": 14,
    "version": 1,
    "country_name": "Bahrain",
    "background_color": "#510869",
    "pattern_fallback_color": "#820DAF",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/bahrain_purple-13.jpg",
    "button_color": "#DA0000",
    "button_hover_color": "#B90000",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/bahrain_email-footer_purple.png"
  },
  {
    "country_id": 14,
    "version": 2,
    "country_name": "Bahrain",
    "background_color": "#EF5D28",
    "pattern_fallback_color": "#F89570",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/bahrain_brick-7.jpg",
    "button_color": "#DA0000",
    "button_hover_color": "#B90000",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/bahrain_email-footer_brick.png"
  },
  {
    "country_id": 14,
    "version": 3,
    "country_name": "Bahrain",
    "background_color": "#1B5D48",
    "pattern_fallback_color": "#267E63",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/bahrain_turquoise-14.jpg",
    "button_color": "#DA0000",
    "button_hover_color": "#B90000",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/bahrain_email-footer_turquoise.png"
  },
  {
    "country_id": 17,
    "version": 1,
    "country_name": "Belarus",
    "background_color": "#ABBCED",
    "pattern_fallback_color": "#829AE3",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/belarus_navy-4.jpg",
    "button_color": "#C90000",
    "button_hover_color": "#A80000",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/belarus_email-footer_navy.png"
  },
  {
    "country_id": 17,
    "version": 2,
    "country_name": "Belarus",
    "background_color": "#EDC800",
    "pattern_fallback_color": "#D6A000",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/belarus_yellow-11.jpg",
    "button_color": "#C90000",
    "button_hover_color": "#A80000",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/belarus_email-footer_yellow.png"
  },
  {
    "country_id": 17,
    "version": 3,
    "country_name": "Belarus",
    "background_color": "#2C5A2E",
    "pattern_fallback_color": "#3D7A3E",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/belarus_green-14.jpg",
    "button_color": "#C90000",
    "button_hover_color": "#A80000",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/belarus_email-footer_green.png"
  },
  {
    "country_id": 18,
    "version": 1,
    "country_name": "Belgium",
    "background_color": "#17779A",
    "pattern_fallback_color": "#1E96BE",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/belgium_teal-11.jpg",
    "button_color": "#DF4916",
    "button_hover_color": "#BE2800",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/belgium_email-footer_lime.png"
  },
  {
    "country_id": 18,
    "version": 2,
    "country_name": "Belgium",
    "background_color": "#52A353",
    "pattern_fallback_color": "#7DC97F",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/belgium_green-9.jpg",
    "button_color": "#DF4916",
    "button_hover_color": "#BE2800",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/belgium_email-footer_green.png"
  },
  {
    "country_id": 18,
    "version": 3,
    "country_name": "Belgium",
    "background_color": "#FF9833",
    "pattern_fallback_color": "#ED6600",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/belgium_orange-6.jpg",
    "button_color": "#DF4916",
    "button_hover_color": "#BE2800",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/belgium_email-footer_orange.png"
  },
  {
    "country_id": 25,
    "version": 1,
    "country_name": "Brazil",
    "background_color": "#223F9A",
    "pattern_fallback_color": "#4265CC",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/brazil_navy-11.jpg",
    "button_color": "#76B73D",
    "button_hover_color": "#55961C",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/brazil_email-footer_navy.png"
  },
  {
    "country_id": 25,
    "version": 2,
    "country_name": "Brazil",
    "background_color": "#79C7E3",
    "pattern_fallback_color": "#35A6CC",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/brazil_teal-5.jpg",
    "button_color": "#76B73D",
    "button_hover_color": "#55961C",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/brazil_email-footer_lime.png"
  },
  {
    "country_id": 25,
    "version": 3,
    "country_name": "Brazil",
    "background_color": "#FF9833",
    "pattern_fallback_color": "#ED6600",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/brazil_orange-6.jpg",
    "button_color": "#76B73D",
    "button_hover_color": "#55961C",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/brazil_email-footer_orange.png"
  },
  {
    "country_id": 27,
    "version": 1,
    "country_name": "Bulgaria",
    "background_color": "#17779A",
    "pattern_fallback_color": "#1E96BE",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/bulgaria_teal-11.jpg",
    "button_color": "#57AD57",
    "button_hover_color": "#368C36",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/bulgaria_email-footer_teal.png"
  },
  {
    "country_id": 27,
    "version": 2,
    "country_name": "Bulgaria",
    "background_color": "#910000",
    "pattern_fallback_color": "#C90000",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/bulgaria_red-14.jpg",
    "button_color": "#57AD57",
    "button_hover_color": "#368C36",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/bulgaria_email-footer_red.png"
  },
  {
    "country_id": 27,
    "version": 3,
    "country_name": "Bulgaria",
    "background_color": "#3B1EB1",
    "pattern_fallback_color": "#694FD6",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/bulgaria_indigo-9.jpg",
    "button_color": "#57AD57",
    "button_hover_color": "#368C36",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/bulgaria_email-footer_indigo.png"
  },
  {
    "country_id": 32,
    "version": 1,
    "country_name": "Canada",
    "background_color": "#99C7B9",
    "pattern_fallback_color": "#77AC9B",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/canada_turquoise-18.jpg",
    "button_color": "#458A46",
    "button_hover_color": "#246925",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/canada_email-footer_turquoise.png"
  },
  {
    "country_id": 32,
    "version": 2,
    "country_name": "Canada",
    "background_color": "#132559",
    "pattern_fallback_color": "#223F9A",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/canada_navy-15.jpg",
    "button_color": "#458A46",
    "button_hover_color": "#246925",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/canada_email-footer_navy.png"
  },
  {
    "country_id": 32,
    "version": 3,
    "country_name": "Canada",
    "background_color": "#ADB933",
    "pattern_fallback_color": "#DBE765",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/canada_olive-10.jpg",
    "button_color": "#458A46",
    "button_hover_color": "#246925",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/canada_email-footer_olive.png"
  },
  {
    "country_id": 36,
    "version": 1,
    "country_name": "Chile",
    "background_color": "#A6DAEC",
    "pattern_fallback_color": "#4DB5D9",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/chile_teal-4.jpg",
    "button_color": "#B86EDA",
    "button_hover_color": "#974DB9",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/chile_email-footer_teal.png"
  },
  {
    "country_id": 36,
    "version": 2,
    "country_name": "Chile",
    "background_color": "#F59999",
    "pattern_fallback_color": "#F06D6D",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/chile_red-4.jpg",
    "button_color": "#B86EDA",
    "button_hover_color": "#974DB9",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/chile_email-footer_red.png"
  },
  {
    "country_id": 36,
    "version": 3,
    "country_name": "Chile",
    "background_color": "#1B5D48",
    "pattern_fallback_color": "#267E63",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/chile-Turquoise-14.jpg",
    "button_color": "#B86EDA",
    "button_hover_color": "#974DB9",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/chile_email-footer_turquoise.png"
  },
  {
    "country_id": 37,
    "version": 1,
    "country_name": "China",
    "background_color": "#F6E08A",
    "pattern_fallback_color": "#DDBE7C",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/china_gold-19.jpg",
    "button_color": "#DA0000",
    "button_hover_color": "#B90000",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/china_email-footer_gold.png"
  },
  {
    "country_id": 37,
    "version": 2,
    "country_name": "China",
    "background_color": "#1E3788",
    "pattern_fallback_color": "#2C51BE",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/china_navy-12.jpg",
    "button_color": "#DA0000",
    "button_hover_color": "#B90000",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/china_email-footer_navy.png"
  },
  {
    "country_id": 37,
    "version": 3,
    "country_name": "China",
    "background_color": "#13A4AB",
    "pattern_fallback_color": "#2FC5CC",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/china_aqua-10.jpg",
    "button_color": "#DA0000",
    "button_hover_color": "#B90000",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/china_email-footer_aqua.png"
  },
  {
    "country_id": 38,
    "version": 1,
    "country_name": "Colombia",
    "background_color": "#FDC900",
    "pattern_fallback_color": "#E49B00",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/colombia_gold-8.jpg",
    "button_color": "#2C51BE",
    "button_hover_color": "#0B309D",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/colombia_email-footer_gold.png"
  },
  {
    "country_id": 38,
    "version": 2,
    "country_name": "Colombia",
    "background_color": "#AC0000",
    "pattern_fallback_color": "#DA0000",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/colombia_red-12.jpg",
    "button_color": "#2C51BE",
    "button_hover_color": "#0B309D",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/colombia_email-footer_red.png"
  },
  {
    "country_id": 38,
    "version": 3,
    "country_name": "Colombia",
    "background_color": "#2FC5CC",
    "pattern_fallback_color": "#13A4AB",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/colombia_aqua-7.jpg",
    "button_color": "#2C51BE",
    "button_hover_color": "#0B309D",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/colombia_email-footer_aqua.png"
  },
  {
    "country_id": 42,
    "version": 1,
    "country_name": "Costa_rica",
    "background_color": "#75DEE3",
    "pattern_fallback_color": "#17B8BE",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/costa-rica_aqua-5.jpg",
    "button_color": "#DA0000",
    "button_hover_color": "#B90000",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/costa-rica_email-footer_aqua.png"
  },
  {
    "country_id": 42,
    "version": 2,
    "country_name": "Costa_rica",
    "background_color": "#321A97",
    "pattern_fallback_color": "#5438C8",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/costa-rica_indigo-11.jpg",
    "button_color": "#DA0000",
    "button_hover_color": "#B90000",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/costa-rica_email-footer_indigo.png"
  },
  {
    "country_id": 42,
    "version": 3,
    "country_name": "Costa_rica",
    "background_color": "#76B73D",
    "pattern_fallback_color": "#9EDB6B",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/costa-rica_lime-9.jpg",
    "button_color": "#DA0000",
    "button_hover_color": "#B90000",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/costa-rica_email-footer_lime.png"
  },
  {
    "country_id": 44,
    "version": 1,
    "country_name": "Croatia",
    "background_color": "#79C7E3",
    "pattern_fallback_color": "#35A6CC",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/croatia-Teal-7.jpg",
    "button_color": "#DA0000",
    "button_hover_color": "#B90000",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/croatia_email-footer_teal.png"
  },
  {
    "country_id": 44,
    "version": 2,
    "country_name": "Croatia",
    "background_color": "#223F9A",
    "pattern_fallback_color": "#4265CC",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/croatia_navy-11.jpg",
    "button_color": "#DA0000",
    "button_hover_color": "#B90000",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/croatia_email-footer_navy.png"
  },
  {
    "country_id": 44,
    "version": 3,
    "country_name": "Croatia",
    "background_color": "#2C5A2E",
    "pattern_fallback_color": "#3D7A3E",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/croatia_green-14.jpg",
    "button_color": "#DA0000",
    "button_hover_color": "#B90000",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/croatia_email-footer_green.png"
  },
  {
    "country_id": 47,
    "version": 1,
    "country_name": "Czech_republic",
    "background_color": "#A9CBED",
    "pattern_fallback_color": "#5297DA",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/czech-republic_blue-4.jpg",
    "button_color": "#DA0000",
    "button_hover_color": "#B90000",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/czech-republic_email-footer_blue.png"
  },
  {
    "country_id": 47,
    "version": 2,
    "country_name": "Czech_republic",
    "background_color": "#FF9833",
    "pattern_fallback_color": "#ED6600",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/czech-republic_orange-6.jpg",
    "button_color": "#DA0000",
    "button_hover_color": "#B90000",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/czech-republic_email-footer_orange.png"
  },
  {
    "country_id": 47,
    "version": 3,
    "country_name": "Czech_republic",
    "background_color": "#356A36",
    "pattern_fallback_color": "#458A46",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/czech-republic_green-13.jpg",
    "button_color": "#DA0000",
    "button_hover_color": "#B90000",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/czech-republic_email-footer_green.png"
  },
  {
    "country_id": 48,
    "version": 1,
    "country_name": "Denmark",
    "background_color": "#195188",
    "pattern_fallback_color": "#2473BD",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/denmark_blue-12.jpg",
    "button_color": "#EF5D28",
    "button_hover_color": "#CE3C07",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/denmark_email-footer_blue.png"
  },
  {
    "country_id": 48,
    "version": 2,
    "country_name": "Denmark",
    "background_color": "#4DB5D9",
    "pattern_fallback_color": "#1C8EB4",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/denmark_teal-6.jpg",
    "button_color": "#EF5D28",
    "button_hover_color": "#CE3C07",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/denmark_email-footer_teal.png"
  },
  {
    "country_id": 48,
    "version": 3,
    "country_name": "Denmark",
    "background_color": "#89DAC1",
    "pattern_fallback_color": "#37B38B",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/denmark_turquoise-5.jpg",
    "button_color": "#EF5D28",
    "button_hover_color": "#CE3C07",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/denmark_email-footer_turquoise.png"
  },
  {
    "country_id": 53,
    "version": 1,
    "country_name": "Egypt",
    "background_color": "#555F81",
    "pattern_fallback_color": "#7989B7",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/egypt_navy-20.jpg",
    "button_color": "#A51037",
    "button_hover_color": "#840016",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/egypt_email-footer_navy.png"
  },
  {
    "country_id": 53,
    "version": 2,
    "country_name": "Egypt",
    "background_color": "#FFCB99",
    "pattern_fallback_color": "#FF9833",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/egypt_orange-4.jpg",
    "button_color": "#A51037",
    "button_hover_color": "#840016",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/egypt_email-footer_orange.png"
  },
  {
    "country_id": 53,
    "version": 3,
    "country_name": "Egypt",
    "background_color": "#F6D18A",
    "pattern_fallback_color": "#DDB27C",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/egypt_amber-19.jpg",
    "button_color": "#A51037",
    "button_hover_color": "#840016",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/egypt_email-footer_amber.png"
  },
  {
    "country_id": 57,
    "version": 1,
    "country_name": "Estonia",
    "background_color": "#47D3D9",
    "pattern_fallback_color": "#15AEB4",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/estonia_aqua-6.jpg",
    "button_color": "#3B1EB1",
    "button_hover_color": "#1A0090",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/estonia_email-footer_aqua.png"
  },
  {
    "country_id": 57,
    "version": 2,
    "country_name": "Estonia",
    "background_color": "#A9CBED",
    "pattern_fallback_color": "#5297DA",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/estonia_blue-4.jpg",
    "button_color": "#3B1EB1",
    "button_hover_color": "#1A0090",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/estonia_email-footer_blue.png"
  },
  {
    "country_id": 57,
    "version": 3,
    "country_name": "Estonia",
    "background_color": "#9ED79F",
    "pattern_fallback_color": "#57AD57",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/estonia_green-5.jpg",
    "button_color": "#3B1EB1",
    "button_hover_color": "#1A0090",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/estonia_email-footer_green.png"
  },
  {
    "country_id": 60,
    "version": 1,
    "country_name": "Finland",
    "background_color": "#96C3D2",
    "pattern_fallback_color": "#73A6B7",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/finland_teal-18.jpg",
    "button_color": "#CB380B",
    "button_hover_color": "#AA1700",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/finland_email-footer_teal.png"
  },
  {
    "country_id": 60,
    "version": 2,
    "country_name": "Finland",
    "background_color": "#B8C436",
    "pattern_fallback_color": "#9BA52E",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/finland_olive-9.jpg",
    "button_color": "#CB380B",
    "button_hover_color": "#AA1700",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/finland_email-footer_olive.png"
  },
  {
    "country_id": 60,
    "version": 3,
    "country_name": "Finland",
    "background_color": "#2473BD",
    "pattern_fallback_color": "#5297DA",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/finland_blue-8.jpg",
    "button_color": "#CB380B",
    "button_hover_color": "#AA1700",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/finland_email-footer_blue.png"
  },
  {
    "country_id": 61,
    "version": 1,
    "country_name": "France",
    "background_color": "#9EBB84",
    "pattern_fallback_color": "#6C815B",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/france_lime-19.jpg",
    "button_color": "#2C51BE",
    "button_hover_color": "#0B309D",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/france_email-footer_lime.png"
  },
  {
    "country_id": 61,
    "version": 2,
    "country_name": "France",
    "background_color": "#CBE9F4",
    "pattern_fallback_color": "#79C7E3",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/france_teal-3.jpg",
    "button_color": "#2C51BE",
    "button_hover_color": "#0B309D",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/france_email-footer_teal.png"
  },
  {
    "country_id": 61,
    "version": 3,
    "country_name": "France",
    "background_color": "#F06D6D",
    "pattern_fallback_color": "#E31A1A",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/france_red-5.jpg",
    "button_color": "#2C51BE",
    "button_hover_color": "#0B309D",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/france_email-footer_red.png"
  },
  {
    "country_id": 65,
    "version": 1,
    "country_name": "Germany",
    "background_color": "#75DEE3",
    "pattern_fallback_color": "#17B8BE",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/germany_aqua-5.jpg",
    "button_color": "#CB380B",
    "button_hover_color": "#AA1700",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/germany_email-footer_aqua.png"
  },
  {
    "country_id": 65,
    "version": 2,
    "country_name": "Germany",
    "background_color": "#7DC240",
    "pattern_fallback_color": "#639A34",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/germany_lime-8.jpg",
    "button_color": "#CB380B",
    "button_hover_color": "#AA1700",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/germany_email-footer_lime.png"
  },
  {
    "country_id": 65,
    "version": 3,
    "country_name": "Germany",
    "background_color": "#5297DA",
    "pattern_fallback_color": "#A9CBED",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/germany_blue-6.jpg",
    "button_color": "#CB380B",
    "button_hover_color": "#AA1700",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/germany_email-footer_blue.png"
  },
  {
    "country_id": 67,
    "version": 1,
    "country_name": "Greece",
    "background_color": "#2C51BE",
    "pattern_fallback_color": "#5879DA",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/greece_navy-8.jpg",
    "button_color": "#17B8BE",
    "button_hover_color": "#00979D",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/greece_email-footer_navy.png"
  },
  {
    "country_id": 67,
    "version": 2,
    "country_name": "Greece",
    "background_color": "#EF5D28",
    "pattern_fallback_color": "#F89570",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/greece_brick-7.jpg",
    "button_color": "#17B8BE",
    "button_hover_color": "#00979D",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/greece_email-footer_brick.png"
  },
  {
    "country_id": 67,
    "version": 3,
    "country_name": "Greece",
    "background_color": "#C90000",
    "pattern_fallback_color": "#EA4444",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/greece_red-10.jpg",
    "button_color": "#17B8BE",
    "button_hover_color": "#00979D",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/greece_email-footer_red.png"
  },
  {
    "country_id": 75,
    "version": 1,
    "country_name": "Hungary",
    "background_color": "#EA4444",
    "pattern_fallback_color": "#DA0000",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/hungary_red-6.jpg",
    "button_color": "#35A6CC",
    "button_hover_color": "#1485AB",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/hungary_email-footer_red.png"
  },
  {
    "country_id": 75,
    "version": 2,
    "country_name": "Hungary",
    "background_color": "#4265CC",
    "pattern_fallback_color": "#223F9A",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/hungary_navy-7.jpg",
    "button_color": "#35A6CC",
    "button_hover_color": "#1485AB",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/hungary_email-footer_navy.png"
  },
  {
    "country_id": 75,
    "version": 3,
    "country_name": "Hungary",
    "background_color": "#62CEAD",
    "pattern_fallback_color": "#37B38B",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/hungary_turquoise-6.jpg",
    "button_color": "#35A6CC",
    "button_hover_color": "#1485AB",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/hungary_email-footer_turquoise.png"
  },
  {
    "country_id": 77,
    "version": 1,
    "country_name": "India",
    "background_color": "#B51241",
    "pattern_fallback_color": "#E1316A",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/india_magenta-11.jpg",
    "button_color": "#37B38B",
    "button_hover_color": "#16926A",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/india_email-footer_magenta.png"
  },
  {
    "country_id": 77,
    "version": 2,
    "country_name": "India",
    "background_color": "#FFBE33",
    "pattern_fallback_color": "#F69A00",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/india_amber-6.jpg",
    "button_color": "#37B38B",
    "button_hover_color": "#16926A",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/india_email-footer_amber.png"
  },
  {
    "country_id": 77,
    "version": 3,
    "country_name": "India",
    "background_color": "#226DB5",
    "pattern_fallback_color": "#5297DA",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/india_blue-9.jpg",
    "button_color": "#37B38B",
    "button_hover_color": "#16926A",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/india_email-footer_blue.png"
  },
  {
    "country_id": 78,
    "version": 1,
    "country_name": "Indonesia",
    "background_color": "#47D3D9",
    "pattern_fallback_color": "#15AEB4",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/indonesia_aqua-6.jpg",
    "button_color": "#DA0000",
    "button_hover_color": "#B90000",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/indonesia_email-footer_aqua.png"
  },
  {
    "country_id": 78,
    "version": 2,
    "country_name": "Indonesia",
    "background_color": "#FFCE66",
    "pattern_fallback_color": "#F69A00",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/indonesia_amber-5.jpg",
    "button_color": "#DA0000",
    "button_hover_color": "#B90000",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/indonesia_email-footer_amber.png"
  },
  {
    "country_id": 78,
    "version": 3,
    "country_name": "Indonesia",
    "background_color": "#7DC97F",
    "pattern_fallback_color": "#52A353",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/indonesia_green-6.jpg",
    "button_color": "#DA0000",
    "button_hover_color": "#B90000",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/indonesia_email-footer_green.png"
  },
  {
    "country_id": 81,
    "version": 1,
    "country_name": "Ireland",
    "background_color": "#2C5A2E",
    "pattern_fallback_color": "#3D7A3E",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/ireland-01_scale-125_700x57_144dpi_green-14.jpg",
    "button_color": "#76B73D",
    "button_hover_color": "#55961C",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/ireland_email-footer_lime.png"
  },
  {
    "country_id": 81,
    "version": 2,
    "country_name": "Ireland",
    "background_color": "#267E63",
    "pattern_fallback_color": "#309F7D",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/ireland-01_scale-125_700x57_144dpi_turquoise-12.jpg",
    "button_color": "#76B73D",
    "button_hover_color": "#55961C",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/ireland_email-footer_turquoise.png"
  },
  {
    "country_id": 81,
    "version": 3,
    "country_name": "Ireland",
    "background_color": "#7E0A1D",
    "pattern_fallback_color": "#B51241",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/ireland-01_scale-125_700x57_144dpi_magenta-15.jpg",
    "button_color": "#76B73D",
    "button_hover_color": "#55961C",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/ireland_email-footer_magenta.png"
  },
  {
    "country_id": 82,
    "version": 1,
    "country_name": "Israel",
    "background_color": "#FCD6C8",
    "pattern_fallback_color": "#F89570",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/isreal_brick-3.jpg",
    "button_color": "#5297DA",
    "button_hover_color": "#3176B9",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/isreal_email-footer_brick.png"
  },
  {
    "country_id": 82,
    "version": 2,
    "country_name": "Israel",
    "background_color": "#162A65",
    "pattern_fallback_color": "#2647AC",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/isreal_navy-14.jpg",
    "button_color": "#5297DA",
    "button_hover_color": "#3176B9",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/isreal_email-footer_navy.png"
  },
  {
    "country_id": 82,
    "version": 3,
    "country_name": "Israel",
    "background_color": "#DBE765",
    "pattern_fallback_color": "#ADB933",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/isreal_olive-6.jpg",
    "button_color": "#5297DA",
    "button_hover_color": "#3176B9",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/isreal_email-footer_olive.png"
  },
  {
    "country_id": 83,
    "version": 1,
    "country_name": "Italy",
    "background_color": "#223F9A",
    "pattern_fallback_color": "#4265CC",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/italy_navy-11.jpg",
    "button_color": "#17B8BE",
    "button_hover_color": "#00979D",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/italy_email-footer_navy.png"
  },
  {
    "country_id": 83,
    "version": 2,
    "country_name": "Italy",
    "background_color": "#0F4E65",
    "pattern_fallback_color": "#146988",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/italy_teal-14.jpg",
    "button_color": "#17B8BE",
    "button_hover_color": "#00979D",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/italy_email-footer_teal.png"
  },
  {
    "country_id": 83,
    "version": 3,
    "country_name": "Italy",
    "background_color": "#FFBE33",
    "pattern_fallback_color": "#ED8D00",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/italy_amber-6.jpg",
    "button_color": "#17B8BE",
    "button_hover_color": "#00979D",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/italy_email-footer_amber.png"
  },
  {
    "country_id": 85,
    "version": 1,
    "country_name": "Japan",
    "background_color": "#37B38B",
    "pattern_fallback_color": "#89DAC1",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/japan_turquoise-8.jpg",
    "button_color": "#C90000",
    "button_hover_color": "#A80000",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/japan_email-footer_turquoise.png"
  },
  {
    "country_id": 85,
    "version": 2,
    "country_name": "Japan",
    "background_color": "#75DEE3",
    "pattern_fallback_color": "#17B8BE",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/japan_aqua-5.jpg",
    "button_color": "#C90000",
    "button_hover_color": "#A80000",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/japan_email-footer_aqua.png"
  },
  {
    "country_id": 85,
    "version": 3,
    "country_name": "Japan",
    "background_color": "#F9CADA",
    "pattern_fallback_color": "#F4A3BF",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/japan_magenta-3.jpg",
    "button_color": "#C90000",
    "button_hover_color": "#A80000",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/japan_email-footer_magenta.png"
  },
  {
    "country_id": 86,
    "version": 1,
    "country_name": "Jordan",
    "background_color": "#9CAAD3",
    "pattern_fallback_color": "#7989B7",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/jordan_navy-18.jpg",
    "button_color": "#458A46",
    "button_hover_color": "#246925",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/jordan_email-footer_navy.png"
  },
  {
    "country_id": 86,
    "version": 2,
    "country_name": "Jordan",
    "background_color": "#63101D",
    "pattern_fallback_color": "#970E2D",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/jordan_magenta-16.jpg",
    "button_color": "#458A46",
    "button_hover_color": "#246925",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/jordan_email-footer_magenta.png"
  },
  {
    "country_id": 86,
    "version": 3,
    "country_name": "Jordan",
    "background_color": "#FFB266",
    "pattern_fallback_color": "#FA7400",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/jordan_orange-5.jpg",
    "button_color": "#458A46",
    "button_hover_color": "#246925",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/jordan_email-footer_orange.png"
  },
  {
    "country_id": 88,
    "version": 1,
    "country_name": "Kenya",
    "background_color": "#FFBE33",
    "pattern_fallback_color": "#ED8D00",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/kenya_amber-6.jpg",
    "button_color": "#C90000",
    "button_hover_color": "#A80000",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/kenya_email-footer_amber.png"
  },
  {
    "country_id": 88,
    "version": 2,
    "country_name": "Kenya",
    "background_color": "#FA7400",
    "pattern_fallback_color": "#FFB266",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/kenya_orange-9.jpg",
    "button_color": "#C90000",
    "button_hover_color": "#A80000",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/kenya_email-footer_orange.png"
  },
  {
    "country_id": 88,
    "version": 3,
    "country_name": "Kenya",
    "background_color": "#406422",
    "pattern_fallback_color": "#57882E",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/kenya_lime-14.jpg",
    "button_color": "#C90000",
    "button_hover_color": "#A80000",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/kenya_email-footer_lime.png"
  },
  {
    "country_id": 91,
    "version": 1,
    "country_name": "South_korea",
    "background_color": "#3B1EB1",
    "pattern_fallback_color": "#694FD6",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/south-korea_indigo-9.jpg",
    "button_color": "#17B8BE",
    "button_hover_color": "#00979D",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/south-korea_email-footer_indigo.png"
  },
  {
    "country_id": 91,
    "version": 2,
    "country_name": "South_korea",
    "background_color": "#C90000",
    "pattern_fallback_color": "#EA4444",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/south-korea_red-10.jpg",
    "button_color": "#17B8BE",
    "button_hover_color": "#00979D",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/south-korea_email-footer_red.png"
  },
  {
    "country_id": 91,
    "version": 3,
    "country_name": "South_korea",
    "background_color": "#8ECF56",
    "pattern_fallback_color": "#6EAC3A",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/south-korea_lime-7.jpg",
    "button_color": "#17B8BE",
    "button_hover_color": "#00979D",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/south-korea_email-footer_lime.png"
  },
  {
    "country_id": 96,
    "version": 1,
    "country_name": "Lebanon",
    "background_color": "#2C1685",
    "pattern_fallback_color": "#5438C8",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/lebanon_indigo-12.jpg",
    "button_color": "#CE40AA",
    "button_hover_color": "#AD1F89",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/lebanon_email-footer_indigo.png"
  },
  {
    "country_id": 96,
    "version": 2,
    "country_name": "Lebanon",
    "background_color": "#79C7E3",
    "pattern_fallback_color": "#35A6CC",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/lebanon_teal-5.jpg",
    "button_color": "#CE40AA",
    "button_hover_color": "#AD1F89",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/lebanon_email-footer_teal.png"
  },
  {
    "country_id": 96,
    "version": 3,
    "country_name": "Lebanon",
    "background_color": "#4C9A4E",
    "pattern_fallback_color": "#6ABB6B",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/lebanon_green-10.jpg",
    "button_color": "#CE40AA",
    "button_hover_color": "#AD1F89",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/lebanon_email-footer_green.png"
  },
  {
    "country_id": 106,
    "version": 1,
    "country_name": "Malaysia",
    "background_color": "#1E96BE",
    "pattern_fallback_color": "#17779A",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/malaysia_teal-8.jpg",
    "button_color": "#DA0000",
    "button_hover_color": "#B90000",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/malaysia_email-footer_teal.png"
  },
  {
    "country_id": 106,
    "version": 2,
    "country_name": "Malaysia",
    "background_color": "#FF9833",
    "pattern_fallback_color": "#ED6600",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/malaysia_orange-11.jpg",
    "button_color": "#DA0000",
    "button_hover_color": "#B90000",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/malaysia_email-footer_orange.png"
  },
  {
    "country_id": 106,
    "version": 3,
    "country_name": "Malaysia",
    "background_color": "#FFE466",
    "pattern_fallback_color": "#F6BA00",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/malaysia_gold-5.jpg",
    "button_color": "#DA0000",
    "button_hover_color": "#B90000",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/malaysia_email-footer_gold.png"
  },
  {
    "country_id": 113,
    "version": 1,
    "country_name": "Mexico",
    "background_color": "#185240",
    "pattern_fallback_color": "#267E63",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/mexico_turquoise-15.jpg",
    "button_color": "#CE40AA",
    "button_hover_color": "#AD1F89",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/mexico_email-footer_turquoise.png"
  },
  {
    "country_id": 113,
    "version": 2,
    "country_name": "Mexico",
    "background_color": "#CAF2F4",
    "pattern_fallback_color": "#47D3D9",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/mexico_aqua-8.jpg",
    "button_color": "#CE40AA",
    "button_hover_color": "#AD1F89",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/mexico_email-footer_aqua.png"
  },
  {
    "country_id": 113,
    "version": 3,
    "country_name": "Mexico",
    "background_color": "#B6E490",
    "pattern_fallback_color": "#7DC240",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/mexico_lime-5.jpg",
    "button_color": "#CE40AA",
    "button_hover_color": "#AD1F89",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/mexico_email-footer_lime.png"
  },
  {
    "country_id": 119,
    "version": 1,
    "country_name": "Morocco",
    "background_color": "#1E3788",
    "pattern_fallback_color": "#2C51BE",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/morocco_navy-12.jpg",
    "button_color": "#D91955",
    "button_hover_color": "#B80034",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/morocco_email-footer_navy.png"
  },
  {
    "country_id": 119,
    "version": 2,
    "country_name": "Morocco",
    "background_color": "#FAA100",
    "pattern_fallback_color": "#D67100",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/morocco_amber-9.jpg",
    "button_color": "#D91955",
    "button_hover_color": "#B80034",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/morocco_email-footer_amber.png"
  },
  {
    "country_id": 119,
    "version": 3,
    "country_name": "Morocco",
    "background_color": "#89DAC1",
    "pattern_fallback_color": "#37B38B",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/morocco-01_scale-100_700x57_144dpi_turquoise-5.jpg",
    "button_color": "#D91955",
    "button_hover_color": "#B80034",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/morocco_email-footer_turquoise.png"
  },
  {
    "country_id": 125,
    "version": 1,
    "country_name": "Netherlands",
    "background_color": "#A3E9EC",
    "pattern_fallback_color": "#2FC5CC",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/netherlands_aqua-4.jpg",
    "button_color": "#F26C00",
    "button_hover_color": "#D14B00",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/netherlands_email-footer_aqua.png"
  },
  {
    "country_id": 125,
    "version": 2,
    "country_name": "Netherlands",
    "background_color": "#6D0A0A",
    "pattern_fallback_color": "#9F0000",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/netherlands-red-16.jpg",
    "button_color": "#F26C00",
    "button_hover_color": "#D14B00",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/netherlands_email-footer_red.png"
  },
  {
    "country_id": 125,
    "version": 3,
    "country_name": "Netherlands",
    "background_color": "#F6DA00",
    "pattern_fallback_color": "#D6A000",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/netherlands_yellow-10.jpg",
    "button_color": "#F26C00",
    "button_hover_color": "#D14B00",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/netherlands_email-footer_yellow.png"
  },
  {
    "country_id": 126,
    "version": 1,
    "country_name": "New_zealand",
    "background_color": "#2B8F70",
    "pattern_fallback_color": "#216E56",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/new-zealand_turquoise-11.jpg",
    "button_color": "#C90000",
    "button_hover_color": "#A80000",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/new-zealand_email-footer_turquoise.png"
  },
  {
    "country_id": 126,
    "version": 2,
    "country_name": "New_zealand",
    "background_color": "#7DB1E3",
    "pattern_fallback_color": "#3B85CC",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/new-zealand_blue-5.jpg",
    "button_color": "#C90000",
    "button_hover_color": "#A80000",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/new-zealand_email-footer_blue.png"
  },
  {
    "country_id": 126,
    "version": 3,
    "country_name": "New_zealand",
    "background_color": "#9EDB6B",
    "pattern_fallback_color": "#76B73D",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/new-zealand_lime-6.jpg",
    "button_color": "#C90000",
    "button_hover_color": "#A80000",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/new-zealand_email-footer_lime.png"
  },
  {
    "country_id": 129,
    "version": 1,
    "country_name": "Nigeria",
    "background_color": "#223F9A",
    "pattern_fallback_color": "#4265CC",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/nigeria_navy-11.jpg",
    "button_color": "#52A353",
    "button_hover_color": "#318232",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/nigeria_email-footer_navy.png"
  },
  {
    "country_id": 129,
    "version": 2,
    "country_name": "Nigeria",
    "background_color": "#D20000",
    "pattern_fallback_color": "#EA4444",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/nigeria_red-9.jpg",
    "button_color": "#52A353",
    "button_hover_color": "#318232",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/nigeria_email-footer_red.png"
  },
  {
    "country_id": 129,
    "version": 3,
    "country_name": "Nigeria",
    "background_color": "#F6DA00",
    "pattern_fallback_color": "#E4B600",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/nigeria_yellow-10.jpg",
    "button_color": "#52A353",
    "button_hover_color": "#318232",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/nigeria_email-footer_yellow.png"
  },
  {
    "country_id": 130,
    "version": 1,
    "country_name": "Norway",
    "background_color": "#57AD57",
    "pattern_fallback_color": "#9ED79F",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/norway_green-8.jpg",
    "button_color": "#CB380B",
    "button_hover_color": "#AA1700",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/norway_email-footer_green.png"
  },
  {
    "country_id": 130,
    "version": 2,
    "country_name": "Norway",
    "background_color": "#5297DA",
    "pattern_fallback_color": "#A9CBED",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/norway_blue-6.jpg",
    "button_color": "#CB380B",
    "button_hover_color": "#AA1700",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/norway_email-footer_blue.png"
  },
  {
    "country_id": 130,
    "version": 3,
    "country_name": "Norway",
    "background_color": "#7989B7",
    "pattern_fallback_color": "#7989B7",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/norway_navy-19.jpg",
    "button_color": "#CB380B",
    "button_hover_color": "#AA1700",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/norway_email-footer_navy.png"
  },
  {
    "country_id": 134,
    "version": 1,
    "country_name": "Panama",
    "background_color": "#96C3D2",
    "pattern_fallback_color": "#73A6B7",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/panama_teal-18.jpg",
    "button_color": "#DA0000",
    "button_hover_color": "#B90000",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/panama_email-footer_teal.png"
  },
  {
    "country_id": 134,
    "version": 2,
    "country_name": "Panama",
    "background_color": "#223F9A",
    "pattern_fallback_color": "#4265CC",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/panama_navy-11.jpg",
    "button_color": "#DA0000",
    "button_hover_color": "#B90000",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/panama_email-footer_navy.png"
  },
  {
    "country_id": 134,
    "version": 3,
    "country_name": "Panama",
    "background_color": "#FFB266",
    "pattern_fallback_color": "#FA7400",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/panama_orange-5.jpg",
    "button_color": "#DA0000",
    "button_hover_color": "#B90000",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/panama_email-footer_orange.png"
  },
  {
    "country_id": 137,
    "version": 1,
    "country_name": "Peru",
    "background_color": "#C5154A",
    "pattern_fallback_color": "#E9487E",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/peru_magenta-10.jpg",
    "button_color": "#17B8BE",
    "button_hover_color": "#00979D",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/peru_email-footer_magenta.png"
  },
  {
    "country_id": 137,
    "version": 2,
    "country_name": "Peru",
    "background_color": "#510869",
    "pattern_fallback_color": "#820DAF",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/peru_purple-13.jpg",
    "button_color": "#17B8BE",
    "button_hover_color": "#00979D",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/peru_email-footer_purple.png"
  },
  {
    "country_id": 137,
    "version": 3,
    "country_name": "Peru",
    "background_color": "#E4ED8B",
    "pattern_fallback_color": "#B8C436",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/peru_olive-5.jpg",
    "button_color": "#17B8BE",
    "button_hover_color": "#00979D",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/peru_email-footer_olive.png"
  },
  {
    "country_id": 138,
    "version": 1,
    "country_name": "Philippines",
    "background_color": "#2C1685",
    "pattern_fallback_color": "#5438C8",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/philippines_indigo-12.jpg",
    "button_color": "#37B38B",
    "button_hover_color": "#16926A",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/philippines_email-footer_indigo.png"
  },
  {
    "country_id": 138,
    "version": 2,
    "country_name": "Philippines",
    "background_color": "#FFDB33",
    "pattern_fallback_color": "#EDAB00",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/philippines_gold-6.jpg",
    "button_color": "#37B38B",
    "button_hover_color": "#16926A",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/philippines_email-footer_gold.png"
  },
  {
    "country_id": 138,
    "version": 3,
    "country_name": "Philippines",
    "background_color": "#9563A8",
    "pattern_fallback_color": "#664473",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/philippines_purple-19.jpg",
    "button_color": "#37B38B",
    "button_hover_color": "#16926A",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/philippines_email-footer_purple.png"
  },
  {
    "country_id": 139,
    "version": 1,
    "country_name": "Poland",
    "background_color": "#7597B6",
    "pattern_fallback_color": "#536A81",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/poland_blue-19.jpg",
    "button_color": "#CB380B",
    "button_hover_color": "#AA1700",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/poland_email-footer_blue.png"
  },
  {
    "country_id": 139,
    "version": 2,
    "country_name": "Poland",
    "background_color": "#A6DAEC",
    "pattern_fallback_color": "#4DB5D9",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/poland_teal-4.jpg",
    "button_color": "#CB380B",
    "button_hover_color": "#AA1700",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/poland_email-footer_teal.png"
  },
  {
    "country_id": 139,
    "version": 3,
    "country_name": "Poland",
    "background_color": "#7DC97F",
    "pattern_fallback_color": "#52A353",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/poland_green-6.jpg",
    "button_color": "#CB380B",
    "button_hover_color": "#AA1700",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/poland_email-footer_green.png"
  },
  {
    "country_id": 140,
    "version": 1,
    "country_name": "Portugal",
    "background_color": "#2C51BE",
    "pattern_fallback_color": "#5879DA",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/portugal_navy-8.jpg",
    "button_color": "#57AD57",
    "button_hover_color": "#368C36",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/portugal_email-footer_navy.png"
  },
  {
    "country_id": 140,
    "version": 2,
    "country_name": "Portugal",
    "background_color": "#AC0000",
    "pattern_fallback_color": "#DA0000",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/portugal_red-12.jpg",
    "button_color": "#57AD57",
    "button_hover_color": "#368C36",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/portugal_email-footer_red.png"
  },
  {
    "country_id": 140,
    "version": 3,
    "country_name": "Portugal",
    "background_color": "#FED21A",
    "pattern_fallback_color": "#EDAB00",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/portugal_gold-7.jpg",
    "button_color": "#57AD57",
    "button_hover_color": "#368C36",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/portugal_email-footer_gold.png"
  },
  {
    "country_id": 141,
    "version": 1,
    "country_name": "Qatar",
    "background_color": "#7597B6",
    "pattern_fallback_color": "#536A81",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/qatar_blue-19.jpg",
    "button_color": "#C5154A",
    "button_hover_color": "#A40029",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/qatar_email-footer_blue.png"
  },
  {
    "country_id": 141,
    "version": 2,
    "country_name": "Qatar",
    "background_color": "#FFE466",
    "pattern_fallback_color": "#F6BA00",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/qatar_gold-5.jpg",
    "button_color": "#C5154A",
    "button_hover_color": "#A40029",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/qatar_email-footer_gold.png"
  },
  {
    "country_id": 141,
    "version": 3,
    "country_name": "Qatar",
    "background_color": "#EDCAD6",
    "pattern_fallback_color": "#E29DB4",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/qatar_magenta-17.jpg",
    "button_color": "#C5154A",
    "button_hover_color": "#A40029",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/qatar_email-footer_magenta.png"
  },
  {
    "country_id": 142,
    "version": 1,
    "country_name": "Romania",
    "background_color": "#79C7E3",
    "pattern_fallback_color": "#35A6CC",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/romania_teal-5.jpg",
    "button_color": "#D91955",
    "button_hover_color": "#B80034",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/romania_email-footer_teal.png"
  },
  {
    "country_id": 142,
    "version": 2,
    "country_name": "Romania",
    "background_color": "#FED21A",
    "pattern_fallback_color": "#EDAB00",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/romania_gold-7.jpg",
    "button_color": "#D91955",
    "button_hover_color": "#B80034",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/romania_email-footer_gold.png"
  },
  {
    "country_id": 142,
    "version": 3,
    "country_name": "Romania",
    "background_color": "#321A97",
    "pattern_fallback_color": "#5438C8",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/romania_indigo-11.jpg",
    "button_color": "#D91955",
    "button_hover_color": "#B80034",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/romania_email-footer_indigo.png"
  },
  {
    "country_id": 143,
    "version": 1,
    "country_name": "Russia",
    "background_color": "#164677",
    "pattern_fallback_color": "#2067AC",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/russia_blue-13.jpg",
    "button_color": "#17B8BE",
    "button_hover_color": "#00979D",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/russia_email-footer_blue.png"
  },
  {
    "country_id": 143,
    "version": 2,
    "country_name": "Russia",
    "background_color": "#C7DDE5",
    "pattern_fallback_color": "#96C3D2",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/russia-teal-17.jpg",
    "button_color": "#17B8BE",
    "button_hover_color": "#00979D",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/russia_email-footer_teal.png"
  },
  {
    "country_id": 143,
    "version": 3,
    "country_name": "Russia",
    "background_color": "#910000",
    "pattern_fallback_color": "#C90000",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/russia_red-14.jpg",
    "button_color": "#17B8BE",
    "button_hover_color": "#00979D",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/russia_email-footer_red.png"
  },
  {
    "country_id": 151,
    "version": 1,
    "country_name": "Saudi_arabia",
    "background_color": "#267E63",
    "pattern_fallback_color": "#309F7D",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/saudi-arabia_turquoise-12.jpg",
    "button_color": "#ED8D00",
    "button_hover_color": "#CC6C00",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/saudi-arabia_email-footer_turquoise.png"
  },
  {
    "country_id": 151,
    "version": 2,
    "country_name": "Saudi_arabia",
    "background_color": "#880B23",
    "pattern_fallback_color": "#C5154A",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/saudi-arabia_magenta-14.jpg",
    "button_color": "#ED8D00",
    "button_hover_color": "#CC6C00",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/saudi-arabia_email-footer_magenta.png"
  },
  {
    "country_id": 151,
    "version": 3,
    "country_name": "Saudi_arabia",
    "background_color": "#164677",
    "pattern_fallback_color": "#2067AC",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/saudi-arabia_blue-13.jpg",
    "button_color": "#ED8D00",
    "button_hover_color": "#CC6C00",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/saudi-arabia_email-footer_blue.png"
  },
  {
    "country_id": 156,
    "version": 1,
    "country_name": "Singapore",
    "background_color": "#75DEE3",
    "pattern_fallback_color": "#15AEB4",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/singapore_aqua-5.jpg",
    "button_color": "#7A0DA6",
    "button_hover_color": "#590085",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/singapore_email-footer_aqua.png"
  },
  {
    "country_id": 156,
    "version": 2,
    "country_name": "Singapore",
    "background_color": "#FFBE33",
    "pattern_fallback_color": "#ED8D00",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/singapore_amber-6.jpg",
    "button_color": "#7A0DA6",
    "button_hover_color": "#590085",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/singapore_email-footer_amber.png"
  },
  {
    "country_id": 156,
    "version": 3,
    "country_name": "Singapore",
    "background_color": "#75DEE3",
    "pattern_fallback_color": "#15AEB4",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/singapore_aqua-5.jpg",
    "button_color": "#7A0DA6",
    "button_hover_color": "#590085",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/singapore_email-footer_aqua.png"
  },
  {
    "country_id": 157,
    "version": 1,
    "country_name": "Slovakia",
    "background_color": "#FAB8A0",
    "pattern_fallback_color": "#F89570",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/slovakia_brick-4.jpg",
    "button_color": "#DA0000",
    "button_hover_color": "#B90000",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/slovakia_email-footer_brick.png"
  },
  {
    "country_id": 157,
    "version": 2,
    "country_name": "Slovakia",
    "background_color": "#6ABB6B",
    "pattern_fallback_color": "#4C9A4E",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/slovakia_green-7.jpg",
    "button_color": "#DA0000",
    "button_hover_color": "#B90000",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/slovakia_email-footer_green.png"
  },
  {
    "country_id": 157,
    "version": 3,
    "country_name": "Slovakia",
    "background_color": "#2C1685",
    "pattern_fallback_color": "#5438C8",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/slovakia_indigo-12.jpg",
    "button_color": "#DA0000",
    "button_hover_color": "#B90000",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/slovakia_email-footer_indigo.png"
  },
  {
    "country_id": 161,
    "version": 1,
    "country_name": "South_africa",
    "background_color": "#4DB5D9",
    "pattern_fallback_color": "#1C8EB4",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/south-africa-Teal-6.jpg",
    "button_color": "#458A46",
    "button_hover_color": "#246925",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/south-africa_email-footer_teal.png"
  },
  {
    "country_id": 161,
    "version": 2,
    "country_name": "South_africa",
    "background_color": "#880000",
    "pattern_fallback_color": "#BB0000",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/south-africa_red-15.jpg",
    "button_color": "#458A46",
    "button_hover_color": "#246925",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/south-africa_email-footer_red.png"
  },
  {
    "country_id": 161,
    "version": 3,
    "country_name": "South_africa",
    "background_color": "#FFDB33",
    "pattern_fallback_color": "#F6BA00",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/south-africa_gold-6.jpg",
    "button_color": "#458A46",
    "button_hover_color": "#246925",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/south-africa_email-footer_gold.png"
  },
  {
    "country_id": 162,
    "version": 1,
    "country_name": "Spain",
    "background_color": "#4DC19C",
    "pattern_fallback_color": "#309F7D",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/spain-01_scale-100_700x57_144dpi_turquoise-7.jpg",
    "button_color": "#DA0000",
    "button_hover_color": "#B90000",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/spain_email-footer_turquoise.png"
  },
  {
    "country_id": 162,
    "version": 2,
    "country_name": "Spain",
    "background_color": "#F6BA00",
    "pattern_fallback_color": "#D68800",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/spain_gold-10.jpg",
    "button_color": "#DA0000",
    "button_hover_color": "#B90000",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/spain_email-footer_gold.png"
  },
  {
    "country_id": 162,
    "version": 3,
    "country_name": "Spain",
    "background_color": "#1E3788",
    "pattern_fallback_color": "#2C51BE",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/spain_navy-12.jpg",
    "button_color": "#DA0000",
    "button_hover_color": "#B90000",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/spain_email-footer_navy.png"
  },
  {
    "country_id": 163,
    "version": 1,
    "country_name": "Sri_lanka",
    "background_color": "#784343",
    "pattern_fallback_color": "#A55C5C",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/sri-lanka_red-21.jpg",
    "button_color": "#EF5D28",
    "button_hover_color": "#CE3C07",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/sri-lanka_email-footer_red.png"
  },
  {
    "country_id": 163,
    "version": 2,
    "country_name": "Sri_lanka",
    "background_color": "#185240",
    "pattern_fallback_color": "#267E63",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/sri-lanka_turquoise-15.jpg",
    "button_color": "#EF5D28",
    "button_hover_color": "#CE3C07",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/sri-lanka_email-footer_turquoise.png"
  },
  {
    "country_id": 163,
    "version": 3,
    "country_name": "Sri_lanka",
    "background_color": "#FDC900",
    "pattern_fallback_color": "#FFFBE6",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/sri-lanka-gold-8.jpg",
    "button_color": "#EF5D28",
    "button_hover_color": "#CE3C07",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/sri-lanka_email-footer_gold.png"
  },
  {
    "country_id": 167,
    "version": 1,
    "country_name": "Sweden",
    "background_color": "#89DAC1",
    "pattern_fallback_color": "#37B38B",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/sweden_turquoise-5.jpg",
    "button_color": "#2647AC",
    "button_hover_color": "#05268B",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/sweden_email-footer_turquoise.png"
  },
  {
    "country_id": 167,
    "version": 2,
    "country_name": "Sweden",
    "background_color": "#FAC200",
    "pattern_fallback_color": "#E49B00",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/sweden_gold-9.jpg",
    "button_color": "#2647AC",
    "button_hover_color": "#05268B",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/sweden_email-footer_gold.png"
  },
  {
    "country_id": 167,
    "version": 3,
    "country_name": "Sweden",
    "background_color": "#CB380B",
    "pattern_fallback_color": "#EF5D28",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/sweden_brick-11.jpg",
    "button_color": "#2647AC",
    "button_hover_color": "#05268B",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/sweden_email-footer_brick.png"
  },
  {
    "country_id": 168,
    "version": 1,
    "country_name": "Switzerland",
    "background_color": "#ABBCED",
    "pattern_fallback_color": "#829AE3",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/switzerland_navy-4.jpg",
    "button_color": "#57AD57",
    "button_hover_color": "#368C36",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/switzerland_email-footer_navy.png"
  },
  {
    "country_id": 168,
    "version": 2,
    "country_name": "Switzerland",
    "background_color": "#2C1685",
    "pattern_fallback_color": "#694FD6",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/switzerland-indigo-12.jpg",
    "button_color": "#57AD57",
    "button_hover_color": "#368C36",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/switzerland_email-footer_indigo.png"
  },
  {
    "country_id": 168,
    "version": 3,
    "country_name": "Switzerland",
    "background_color": "#AC0000",
    "pattern_fallback_color": "#E31A1A",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/switzerland-red-12.jpg",
    "button_color": "#57AD57",
    "button_hover_color": "#368C36",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/switzerland_email-footer_red.png"
  },
  {
    "country_id": 172,
    "version": 1,
    "country_name": "Thailand",
    "background_color": "#164677",
    "pattern_fallback_color": "#2067AC",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/thailand_blue-13.jpg",
    "button_color": "#CE40AA",
    "button_hover_color": "#AD1F89",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/thailand_email-footer_blue.png"
  },
  {
    "country_id": 172,
    "version": 2,
    "country_name": "Thailand",
    "background_color": "#1B5D48",
    "pattern_fallback_color": "#267E63",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/thailand_turquoise-14.jpg",
    "button_color": "#CE40AA",
    "button_hover_color": "#AD1F89",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/thailand_email-footer_turquoise.png"
  },
  {
    "country_id": 172,
    "version": 3,
    "country_name": "Thailand",
    "background_color": "#FF9833",
    "pattern_fallback_color": "#FA7400",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/thailand_orange-6.jpg",
    "button_color": "#CE40AA",
    "button_hover_color": "#AD1F89",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/thailand_email-footer_orange.png"
  },
  {
    "country_id": 178,
    "version": 1,
    "country_name": "Turkey",
    "background_color": "#79C7E3",
    "pattern_fallback_color": "#35A6CC",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/turkey_teal-5.jpg",
    "button_color": "#DA0000",
    "button_hover_color": "#B90000",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/turkey_email-footer_teal.png"
  },
  {
    "country_id": 178,
    "version": 2,
    "country_name": "Turkey",
    "background_color": "#62CEAD",
    "pattern_fallback_color": "#34A984",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/turkey_turquoise-6.jpg",
    "button_color": "#DA0000",
    "button_hover_color": "#B90000",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/turkey_email-footer_turquoise.png"
  },
  {
    "country_id": 178,
    "version": 3,
    "country_name": "Turkey",
    "background_color": "#2C1685",
    "pattern_fallback_color": "#5438C8",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/turkey_indigo-12.jpg",
    "button_color": "#DA0000",
    "button_hover_color": "#B90000",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/turkey_email-footer_indigo.png"
  },
  {
    "country_id": 183,
    "version": 1,
    "country_name": "United_arab_emirates",
    "background_color": "#37B38B",
    "pattern_fallback_color": "#89DAC1",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/uae_turquoise-8.jpg",
    "button_color": "#C5154A",
    "button_hover_color": "#A40029",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/uae_email-footer_turquoise.png"
  },
  {
    "country_id": 183,
    "version": 2,
    "country_name": "United_arab_emirates",
    "background_color": "#17B8BE",
    "pattern_fallback_color": "#17B8BE",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/uae_aqua-11.jpg",
    "button_color": "#C5154A",
    "button_hover_color": "#A40029",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/uae_email-footer_aqua.png"
  },
  {
    "country_id": 183,
    "version": 3,
    "country_name": "United_arab_emirates",
    "background_color": "#F6D18A",
    "pattern_fallback_color": "#DDB27C",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/uae_amber-19.jpg",
    "button_color": "#C5154A",
    "button_hover_color": "#A40029",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/uae_email-footer_amber.png"
  },
  {
    "country_id": 184,
    "version": 1,
    "country_name": "United_kingdom",
    "background_color": "#507481",
    "pattern_fallback_color": "#73A6B7",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/united-kingdom_teal-20.jpg",
    "button_color": "#76B73D",
    "button_hover_color": "#55961C",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/united-kingdom_email-footer_teal.png"
  },
  {
    "country_id": 184,
    "version": 2,
    "country_name": "United_kingdom",
    "background_color": "#1E3788",
    "pattern_fallback_color": "#2C51BE",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/united-kingdom_navy-12.jpg",
    "button_color": "#76B73D",
    "button_hover_color": "#55961C",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/united-kingdom_email-footer_navy.png"
  },
  {
    "country_id": 184,
    "version": 3,
    "country_name": "United_kingdom",
    "background_color": "#FFDF99",
    "pattern_fallback_color": "#FEB31A",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/united-kingdom_amber-4.jpg",
    "button_color": "#76B73D",
    "button_hover_color": "#55961C",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/united-kingdom_email-footer_amber.png"
  },
  {
    "country_id": 185,
    "version": 1,
    "country_name": "Uruguay",
    "background_color": "#FAC200",
    "pattern_fallback_color": "#E49B00",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/uruguay_gold-9.jpg",
    "button_color": "#2067AC",
    "button_hover_color": "#00468B",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/uruguay_email-footer_gold.png"
  },
  {
    "country_id": 185,
    "version": 2,
    "country_name": "Uruguay",
    "background_color": "#75DEE3",
    "pattern_fallback_color": "#17B8BE",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/uruguay-Aqua.jpg",
    "button_color": "#2067AC",
    "button_hover_color": "#00468B",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/uruguay_email-footer_aqua.png"
  },
  {
    "country_id": 185,
    "version": 3,
    "country_name": "Uruguay",
    "background_color": "#9EDB6B",
    "pattern_fallback_color": "#76B73D",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/uruguay-lime.jpg",
    "button_color": "#2067AC",
    "button_hover_color": "#00468B",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/uruguay_email-footer_lime.png"
  },
  {
    "country_id": 190,
    "version": 1,
    "country_name": "Vietnam",
    "background_color": "#164677",
    "pattern_fallback_color": "#2067AC",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/vietnam_blue-13.jpg",
    "button_color": "#15AEB4",
    "button_hover_color": "#008D93",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/vietnam_email-footer_blue.png"
  },
  {
    "country_id": 190,
    "version": 2,
    "country_name": "Vietnam",
    "background_color": "#AC0000",
    "pattern_fallback_color": "#DA0000",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/vietnam_red-12.jpg",
    "button_color": "#15AEB4",
    "button_hover_color": "#008D93",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/vietnam_email-footer_red.png"
  },
  {
    "country_id": 190,
    "version": 3,
    "country_name": "Vietnam",
    "background_color": "#3D7A3E",
    "pattern_fallback_color": "#52A353",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/vietnam_green-12.jpg",
    "button_color": "#15AEB4",
    "button_hover_color": "#008D93",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/vietnam_email-footer_green.png"
  },
  {
    "country_id": 194,
    "version": 1,
    "country_name": "Hong_kong",
    "background_color": "#C7DDE5",
    "pattern_fallback_color": "#96C3D2",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/hong-kong_teal-18.jpg",
    "button_color": "#EA4444",
    "button_hover_color": "#C92323",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/hong%20kong_email-footer_teal.png"
  },
  {
    "country_id": 194,
    "version": 2,
    "country_name": "Hong_kong",
    "background_color": "#FED21A",
    "pattern_fallback_color": "#EDAB00",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/hong-kong_gold-7.jpg",
    "button_color": "#EA4444",
    "button_hover_color": "#C92323",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/hong%20kong_email-footer_gold.png"
  },
  {
    "country_id": 194,
    "version": 3,
    "country_name": "Hong_kong",
    "background_color": "#216E56",
    "pattern_fallback_color": "#2B8F70",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/hong-kong-turquoise-13.jpg",
    "button_color": "#EA4444",
    "button_hover_color": "#C92323",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/hong%20kong_email-footer_turquoise.png"
  },
  {
    "country_id": 195,
    "version": 1,
    "country_name": "Taiwan",
    "background_color": "#FFB266",
    "pattern_fallback_color": "#FD7900",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/taiwan_orange-5.jpg",
    "button_color": "#D91955",
    "button_hover_color": "#B80034",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/taiwan_email-footer_orange.png"
  },
  {
    "country_id": 195,
    "version": 2,
    "country_name": "Taiwan",
    "background_color": "#A3E9EC",
    "pattern_fallback_color": "#2FC5CC",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/taiwan_aqua-4.jpg",
    "button_color": "#D91955",
    "button_hover_color": "#B80034",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/taiwan_email-footer_aqua.png"
  },
  {
    "country_id": 195,
    "version": 3,
    "country_name": "Taiwan",
    "background_color": "#FFE466",
    "pattern_fallback_color": "#F6BA00",
    "pattern_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/pattern/taiwan_gold-5.jpg",
    "button_color": "#D91955",
    "button_hover_color": "#B80034",
    "footer_image_url": "https://uber-static.s3.amazonaws.com/emails/2016/global/footer_img/taiwan_email-footer_gold.png"
  },
  {
    "country_id": 220,
    "version": 1,
    "country_name": "Macao",
    "background_color": 0,
    "pattern_fallback_color": 0,
    "pattern_url": 0,
    "button_color": 0,
    "button_hover_color": 0,
    "footer_image_url": 0
  },
  {
    "country_id": 220,
    "version": 2,
    "country_name": "Macao",
    "background_color": 0,
    "pattern_fallback_color": 0,
    "pattern_url": 0,
    "button_color": 0,
    "button_hover_color": 0,
    "footer_image_url": 0
  },
  {
    "country_id": 220,
    "version": 3,
    "country_name": "Macao",
    "background_color": 0,
    "pattern_fallback_color": 0,
    "pattern_url": 0,
    "button_color": 0,
    "button_hover_color": 0,
    "footer_image_url": 0
  }
];
