'use strict';

var themeOverrides = {
  darkly: {
    main: 'var(--gray-dark)'
  }
}

var currentTheme = "Lightly";

var App = (function () {

  var App = function () {

    var api = {};

    api.container = $(`<div id='app'></div>`);

    return api;
  }

  return App;
})();

var Navbar = (function (options) {

  var Navbar = function (options) {

    var updateTheme = function(type, params){
      switch(params.theme){
        case 'Lightly':
          api.container.fadeOut(200, function(){
            api.container.removeClass('navbar-dark bg-dark').addClass('navbar-light bg-light').fadeIn().delay(200);
          });
          break;
        case 'Darkly':
          api.container.fadeOut(200, function(){
            api.container.removeClass('navbar-light bg-light').addClass('navbar-dark bg-dark').fadeIn().delay(200);
          });
          break;
        case 'Avocado Toast':
          api.container.fadeOut(200, function(){
            api.container.removeClass('navbar-dark bg-dark').addClass('navbar-light bg-light').fadeIn().delay(200);
          });
          break;
        case 'Rocket Popsicle':
          api.container.fadeOut(200, function(){
            api.container.removeClass('navbar-dark bg-dark').addClass('navbar-light bg-light').fadeIn().delay(200);
          });
          break;
      }

      var html = api.container.html();
    }

    //Event Listeners
    $(document).on("themeUpdate", updateTheme);

    //Should not be declared inside the class like this, but whatever... time...
    var themeLink1 = new NavbarThemeLink({ href: '#', text: 'Darkly' });
    var themeLink2 = new NavbarThemeLink({ href: '#', text: 'Lightly' });
    var themeLink3 = new NavbarThemeLink({ href: '#', text: 'Avocado Toast' });
    var themeLink4 = new NavbarThemeLink({ href: '#', text: 'Rocket Popsicle' });

    var api = {};
    api.options = options;
    api.container = $(`
      <nav class="navbar navbar-expand-lg ${api.options.theme === 'Darkly' ? 'navbar-dark' : 'navbar-light'} ${api.options.theme === 'Darkly' ? 'bg-dark' : 'bg-light'}">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">${api.options.title}</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Data Set Example 1</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Data Set Example 2</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Data Set Example 3</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Color Themes
                </a>
                <ul id="themeList" class="dropdown-menu" aria-labelledby="navbarDropdown"></ul>
              </li>
      </nav>
    `);

    api.container.find("#themeList").append(themeLink1.container);
    api.container.find("#themeList").append(themeLink2.container);
    api.container.find("#themeList").append(themeLink3.container);
    api.container.find("#themeList").append(themeLink4.container);

    return api;

  };

  return Navbar;
})();

var NavbarThemeLink = (function (options) {

  var NavbarThemeLink = function (options) {

    var api = {};
    api.options = options;
    api.container = $(`<a class="dropdown-item" href="#">${api.options.text}</a>`).on('click', function(){
      switch(api.options.theme){
        case 'Lightly':
          currentTheme = "Lightly";
          break;
        case 'Darkly':
          currentTheme = "Darkly";
          break;
        case 'Avocado Toast':
          currentTheme = "Avocado Toast";
          break;
        case 'Rocket Popsicle':
          currentTheme = "Rocket Popsicle";
          break;
      }

      $.event.trigger("themeUpdate", {
        theme: api.options.text
      });
    });

    return api;

  };

  return NavbarThemeLink;
})();

var Header = (function (title) {

  var Header = function (title) {

    var _style = `"

    "`

    var api = {};

    api.title = title;
    api.container = $(`
        <div class="container" style=${_style}>
          <div class="row">
            <div class="col">
              <h1>
                <p class="text-center my-4">${title}</p>
              </h1>
            </div>
          </div>
        </div>
      `);

    return api;

  };

  return Header;
})();

var Footer = (function (title) {

  var Footer = function (title) {

    var _style = `"
      background-color: var(--bs-light)
    "`

    var api = {};

    api.title = title;
    api.container = $(`
      <div class="container-fluid" style=${_style}>
        <div class="row">
          <div class="col">
            <h6>
              <p class="text-center my-2">${title}</p>
            </h6>
          </div>
        </div>
      </div>
      `);

    return api;

  };

  return Footer;
})();

var Page = (function (options) {

  var Page = function (options) {

    var updateTheme = function(type, params){
      switch(params.theme){
        case 'Lightly':
          api.container.fadeOut(200, function(){
            api.container.removeClass('bg-dark').addClass('bg-light').fadeIn().delay(200);
          });
          break;
        case 'Darkly':
          api.container.fadeOut(200, function(){
            api.container.removeClass('bg-light').addClass('bg-dark').fadeIn().delay(200);
          });
          break;
        case 'Avocado Toast':
          api.container.fadeOut(200, function(){
            api.container.removeClass('bg-dark').addClass('bg-light').fadeIn().delay(200);
          });
          break;
        case 'Rocket Popsicle':
          api.container.fadeOut(200, function(){
            api.container.removeClass('bg-dark').addClass('bg-light').fadeIn().delay(200);
          });
          break;
      }

      var html = api.container.html();
    }

    //Event Listeners
    $(document).on("themeUpdate", updateTheme);

    var _style = `"
    "`

    var api = {};

    api.container = $(`
      <div id="page" class="container-fluid bg-light" style=${_style}>

      </div>
      `);

    return api;

  };

  return Page;
})();

var Barchart = (function (data, options) {

  var Barchart = function (data, options) {

    var _style = {
      main: `"
      "`,
      chart: `"
      display: flex;
      align-items: flex-end;
      "`,

    }

    var generateItems = function (items) {

      var maxValue = Math.max.apply(Math, items);
      var itemWidth = (1 / items.length) * 100;

      if (items) {
        const listItems = items.map((item) => {

          var itemHeight = (item / maxValue) * api.options.maxChartHeight;
          var chartItem = new BarchartItem(item, { bgcolor: 'blue', width: itemWidth, height: itemHeight });
          api.container.find("#barchart_chart").append(chartItem.container);
        });
      }

    }

    var api = {};

    api.data = data;
    api.options = options;

    api.container = $(`
      <div class="container-fluid w-50" >
        <div id="barchart_heading"></div>
        <div id="barchart_content">
          <div id="barchart_left">
            <div id="barchart_yAxis">
              <div class="row">
                <div class="col">
                  <h6>
                    <p class="text-center my-2">${api.options.yAxisTitle}</p>
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div id="barchart_main" style=${_style.main}>
            <div id="barchart_chart" style=${_style.chart}>

            </div>
            <div id="barchart_xAxis" class="container">
              <div class="row">
                <div class="col">
                  <h6>
                    <p class="text-center my-2">${api.options.xAxisTitle}</p>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="barchart_footer"></div>
      </div>
    `);

    generateItems(api.data);

    return api;

  };

  return Barchart;
})();

var BarchartItem = (function (data, options) {

  var BarchartItem = function (data, options) {

    var updateTheme = function(type, params){
      switch(params.theme){
        case 'Lightly':
          api.container.fadeOut(200, function(){
            api.container.removeClass('bg-primarytext-light').addClass('bg-light border text-dark').fadeIn().delay(200);
          });
          break;
        case 'Darkly':
          api.container.fadeOut(200, function(){
            api.container.removeClass('bg-light border text-dark').addClass('bg-primary text-light').fadeIn().delay(200);
          });
          break;
        case 'Avocado Toast':
          api.container.fadeOut(200, function(){
            api.container.removeClass('bg-primarytext-light').addClass('bg-light border text-dark').fadeIn().delay(200);
          });
          break;
        case 'Rocket Popsicle':
          api.container.fadeOut(200, function(){
            api.container.removeClass('bg-primarytext-light').addClass('bg-light border text-dark').fadeIn().delay(200);
          });
          break;
      }

      var html = api.container.html();
    }

    //Event Listeners
    $(document).on("themeUpdate", updateTheme);

    var _style = {
      bar: `"
        display: inline-block;
        background-color: var(--bs-light);
        width: ${options.width}%;
        height: ${options.height}px;
        text-align: center;
      "`
    }

    var api = {};

    api.container = $(`<span class="border mx-1 bg-light" style=${_style.bar}>${data}</span>`);

    return api;

  };

  return BarchartItem;
})();

$(document).ready(function () {

  var testData = [0.3, 21, 33, 75, 98, 100];

  var app = new App();
  var navbar = new Navbar({ title: "Barchart App" });
  var footer = new Footer("Lighthouse Labs Barchart App - Brandon Macdonald 2021");
  var mainpage = new Page();
  var barchart = new Barchart(testData, { xAxisTitle: "Students", yAxisTitle: "Strength", maxChartHeight: 500 });

  mainpage.container.append(barchart.container);

  //app.container.append(header.container);
  app.container.append(navbar.container);
  app.container.append(mainpage.container);
  app.container.append(footer.container);


  $("body").append(app.container);

});
