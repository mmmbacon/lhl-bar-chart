'use strict';

var App = (function () {

  var App = function () {

    var api = {};

    api.container = $("<div id='app'></div>");

    return api;
  }

  return App;
})();

var Navbar = (function (title) {

  var Navbar = function (title) {

    var api = {};

    api.title = title;
    api.container = $(`
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">${api.title}</a>
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
            </ul>
          </div>
        </div>
      </nav>
    `);

    return api;

  };

  return Navbar;
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

var Page = (function () {

  var Page = function () {

    var _style = `"
    "`

    var api = {};

    api.container = $(`
      <div class="container-fluid" style=${_style}>
        This is a page
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

      if (items) {
        const listItems = items.map((item) => {

          var chartItem = new BarchartItem(item, { bgcolor: 'blue' });
          return chartItem.container;

        }).join("");

        return listItems;
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
            <div id="barchart_yAxis">Y-Axis</div>
          </div>
          <div id="barchart_main" style=${_style.main}>
            <div id="barchart_chart" style=${_style.chart}>
              ${generateItems(data)}
            </div>
            <div id="barchart_xAxis">X_Axis</div>
          </div>
        </div>
        <div id="barchart_footer"></div>
      </div>
      `);

    return api;

  };

  return Barchart;
})();

var BarchartItem = (function (data, options) {

  var BarchartItem = function (data, options) {

    var _style = {
      bar: `"
        display: inline-block;
        background-color: var(--bs-light);
        width: ${100 * data}px;
        height: ${data * 20}px;
        text-align: center;
      "`
    }

    var api = {};

    api.container = `<span class="border" style=${_style.bar}>${data}</span>`;

    return api;

  };

  return BarchartItem;
})();

$(document).ready(function () {

  var testData = [1, 2, 3, 4, 5, 6, 7];

  var app = new App();
  var navbar = new Navbar("Barchart App");
  var footer = new Footer("Lighthouse Labs Barchart App - Brandon Macdonald 2021");
  var mainpage = new Page();
  var barchart = new Barchart(testData);

  mainpage.container.append(barchart.container);

  //app.container.append(header.container);
  app.container.append(navbar.container);
  app.container.append(mainpage.container);
  app.container.append(footer.container);


  $("body").append(app.container);

});
