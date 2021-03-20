'use strict';

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

    //Styling
    var _style = {
      title: `"
        font-family: 'Pacifico';
        font-size: 25pt;
      "`,
      navbar: `"
        box-shadow: 0px 2px 10px rgb(200, 200, 200, 0.5);
      "`
    }

    var api = {};
    api.options = options;
    api.container = $(`
      <nav class="navbar navbar-expand-lg navbar-light bg-light" style=${_style.navbar}>
        <div class="container-fluid">
          <a class="navbar-brand" href="#" style=${_style.title}>${api.options.title}</a>
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

    var api = {};

    var _style = `"
      position: fixed;
      bottom: 0;
      width: 100%;
      box-shadow: 0px -2px 10px rgb(200, 200, 200, 0.5);
      font-size: 11pt;
    "`

    api.title = title;
    api.container = $(`
      <div class="text-center align-middle bg-light py-1" style=${_style}>
      ${title}
      </div>
    `);

    return api;

  };

  return Footer;
})();

var Page = (function (options) {

  var Page = function (options) {

    var api = {};

    api.container = $(`<div id="page" class="d-flex flex-column justify-content-center"></div>`);

    return api;

  };

  return Page;
})();

var Barchart = (function (data, options) {

  var Barchart = function (data, options) {

    var chartColor = 'var(--bs-purple)';
    var labelColor = 'dark';
    var titleColor = 'var(--bs-dark)';
    var titleSize = '22pt';

    var api = {};
    api.data = data;
    api.options = options;

    api.options.maxValue = Math.max.apply(Math, api.data);

    //Styling
    var _style = {
      container: `"

      "`,
      main: `"
        max-width: ${api.options.maxChartWidth}px;
      "`,
      chart: `"
        display: flex;
        align-items: flex-end;
        border-bottom: 1px solid black;
        border-left: 1px solid black;
        max-height: ${api.options.maxChartHeight}px;
      "`,
      left: `"
        text-align: center;
        vertical-align: middle;
      "`,
      infoPanel: `"
        margin-left: 10px;
        top: 100px;
        left: -10px;
        box-shadow: 0px 2px 10px rgb(200, 200, 200, 0.5);
      "`,
      label: `"
        font-size: 10pt;
      "`,
      heading: `"
        font-family: 'Pacifico';
      "`,
      closeButton: `"
      position: absolute;
      right: 0px;
      top: -24px;
      width: 50px;
      height: 50px;
      line-height: 0em;
      padding: 5px;
      vertical-align: center;
      color: rgb(200,200,200);
      border-radius: 0px 5px 5px 0px;
      font-size: 30px;
      "`
    }

    //Event Handlers

    var onInputUpdate = function (type, params) {
      switch (params.id) {
        case 'barchart_input_title':
          api.container.find("#barchart_title").text(params.text);
          break;
        case 'barchart_input_xAxis':
          api.container.find("#barchart_xAxis").text(params.text);
          break;
        case 'barchart_input_yAxis':
          api.container.find("#barchart_yAxis").text(params.text);
          break;
      }

    }

    var onGenerateRandomData = function () {

      var dataLength = Math.round(Math.random() * 10);
      var dataSet = [];

      //Generate a set of items with labels
      for (var x = 0; x < dataLength + 1; x++) {
        var item = {
          label: "Item " + x,
          values: []
        }

        //Generate data set for each item
        var valuesLength = Math.round(Math.random() * 5);
        for (var y = 0; y < valuesLength + 1; y++) {
          item.values.push(Math.round(1 + Math.random() * 100));
        }
        item.values.sort((a, b) => a - b);
        dataSet.push(item);
      }

      generateItems(dataSet);

    }

    var onTitleColorChange = function (type, params) {
      api.container.find("#barchart_title").css({ 'color': params.color });
    }

    var onTitleSizeChange = function (type, params) {
      switch (params.size) {
        case 'Small':
          api.container.find("#barchart_title").css({ 'font-size': '12pt' });
          break;
        case 'Medium':
          api.container.find("#barchart_title").css({ 'font-size': '18pt' });
          break;
        case 'Large':
          api.container.find("#barchart_title").css({ 'font-size': '22pt' });
          break;
        default:
          break;
      }

    }


    //Methods
    var sumItems = function (item) {

      var sum = 0;

      for (var value of item) {
        sum += value;
      }

      return sum;
    }

    var generateItems = function (items) {

      var itemWidth = (1 / items.length) * 100;
      var itemTotals = [];

      //Clear the Chart first
      api.container.find("#barchart_chart").empty();

      //Calculate maximum value from all items, based on the sum of their values (confusing)
      for (var item of items) {
        itemTotals.push(sumItems(item.values));
      }
      var maxItemValue = Math.max.apply(Math, itemTotals);

      //Generate and append new items
      if (items) {
        items.map((item) => {
          var sum = sumItems(item.values);
          var chartItem = new BarchartItem(item, { color: chartColor, width: itemWidth, maxChartHeight: api.options.maxChartHeight, maxItemValue: maxItemValue, sum: sum });
          api.container.find("#barchart_chart").append(chartItem.container);
        });
      }
    }

    var generateLeftGraduations = function (graduations) {

      for (var x = 0; x < graduations; x++) {
        var tickItem = new BarchartIncrement({ height: api.options.maxChartHeight / graduations, width: 20, top: x == 0 ? true : false, value: 100 - (graduations * x) })
        api.container.find("#barchart_leftIncrements").append(tickItem.container);
      }
    }

    var $chartSettings = $(`
      <div id="chartsettings_container" class="d-flex flex-column>

        <div class="my-2 text-center" style=${_style.heading}><h4>Chart Settings</h4></div>
          <label for="floatingInput" style=${_style.label}>Chart Title</label>
          <input id="barchart_input_title" type="text" class="form-control" placeholder="Chart Title" aria-label="Chart Title" aria-describedby="basic-addon1" value="Weightlifting Performance">
          <div></div>
          </div>

        <div class="form-floating mt-1">
          <input id="barchart_input_xAxis" type="text" class="form-control" placeholder="X-Axis" aria-label="X-Axis" aria-describedby="basic-addon1" value="Sets">
          <label for="floatingInput">X-Axis Label</label>
        </div>

        <div class="form-floating mt-1">
          <input id="barchart_input_yAxis" type="text" class="form-control" placeholder="Y-Axis" aria-label="Y-Axis aria-describedby="basic-addon1" value="Reps">
          <label for="floatingInput">Y-Axis Label</label>
        </div>

      </div>
    `).on('input', 'input', function (event) {
      $.event.trigger("titleUpdate", {
        text: event.currentTarget.value,
        id: event.currentTarget.id
      });
    });

    var $buttonClose = $(`
      <button id="barchart_close_button" type="button" class="btn btn-light mt-4" style=${_style.closeButton}>✕</button>
    `).on('click', function () {
      if ($("#barchart_close_button").text() === "▶") {
        $("#barchart_close_button").animate({ right: '0px' });
        $("#barchart_options").animate({ left: '0px' });
        $("#barchart_close_button").html("✕");
        $("#barchart_close_button").css({ 'font-size': '30px' });
        $("#barchart_close_button").toggleClass("shadow-sm");
      } else {
        $("#barchart_close_button").animate({ right: '-50px' });
        $("#barchart_options").animate({ left: '-255px' });
        $("#barchart_close_button").html("▶");
        $("#barchart_close_button").css({ 'box-shadow': 'none', 'font-size': '20px' });
        $("#barchart_close_button").toggleClass("shadow-sm");
      }
    });

    var $buttonRandomize = $(`
      <button id="randomButton" type="button" class="btn btn-danger mt-4">Generate Random Data</button>
    `).on('click', function () {
      $.event.trigger('generateRandomData');
    });

    var $buttonColor1 = $(`
      <button id="buttonColor1" type="button" class="btn m-1" style="height: 30px; width: 30px; background-color: var(--bs-purple)"></button>
    `).on('click', function () {
      chartColor = 'var(--bs-purple)';
      $.event.trigger('chartColorUpdate', { color: chartColor });
    });

    var $buttonColor2 = $(`
      <button id="buttonColor2" type="button" class="btn m-1" style="height: 30px; width: 30px; background-color: var(--bs-pink)"></button>
    `).on('click', function () {
      chartColor = 'var(--bs-pink)';
      $.event.trigger('chartColorUpdate', { color: chartColor });
    });

    var $buttonColor3 = $(`
      <button id="buttonColor3" type="button" class="btn m-1" style="height: 30px; width: 30px; background-color: var(--bs-red)"></button>
    `).on('click', function () {
      chartColor = 'var(--bs-red)';
      $.event.trigger('chartColorUpdate', { color: chartColor });
    });

    var $buttonColor4 = $(`
      <button id="buttonColor4" type="button" class="btn m-1" style="height: 30px; width: 30px; background-color: var(--bs-orange)"></button>
    `).on('click', function () {
      chartColor = 'var(--bs-orange)';
      $.event.trigger('chartColorUpdate', { color: chartColor });
    });

    var $buttonColor5 = $(`
      <button id="buttonColor5" type="button" class="btn m-1" style="height: 30px; width: 30px; background-color: var(--bs-teal)"></button>
    `).on('click', function () {
      chartColor = 'var(--bs-teal)';
      $.event.trigger('chartColorUpdate', { color: chartColor });
    });

    var $buttonColor6 = $(`
      <button id="buttonColor6" type="button" class="btn m-1" style="height: 30px; width: 30px; background-color: var(--bs-green)"></button>
    `).on('click', function () {
      chartColor = 'var(--bs-green)';
      $.event.trigger('chartColorUpdate', { color: chartColor });
    });

    //Label Color
    var $labelColor1 = $(`
      <button id="labelColor1" type="button" class="btn m-1" style="height: 30px; width: 30px; background-color: var(--bs-dark)"></button>
    `).on('click', function () {
      labelColor = 'dark';
      $.event.trigger('labelColorChange', { color: labelColor });
    });

    var $labelColor2 = $(`
      <button id="labelColor2" type="button" class="btn m-1" style="height: 30px; width: 30px; background-color: var(--bs-green)"></button>
    `).on('click', function () {
      labelColor = 'green';
      $.event.trigger('labelColorChange', { color: labelColor });
    });

    //Title Color
    var $titleColor1 = $(`
      <button id="labelColor1" type="button" class="btn m-1" style="height: 30px; width: 30px; background-color: var(--bs-red)"></button>
    `).on('click', function () {
      titleColor = 'var(--bs-red)';
      $.event.trigger('titleColorChange', { color: titleColor });
    });

    var $titleColor2 = $(`
      <button id="labelColor2" type="button" class="btn m-1" style="height: 30px; width: 30px; background-color: var(--bs-primary)"></button>
    `).on('click', function () {
      titleColor = 'var(--bs-primary)';
      $.event.trigger('titleColorChange', { color: titleColor });
    });

    //Title Size
    var $titleSizeSelector = $(`
    <div class="btn-group" role="group" aria-label="Bar Spacing Selector">
      <button type="button" class="btn btn-secondary" value="Small">Small</button>
      <button type="button" class="btn btn-secondary" value="Medium">Medium</button>
      <button type="button" class="btn btn-primary" value="Large">Large</button>
    </div>
    `).on('click', '.btn', function (event) {
      $(this).parent().find('.btn').removeClass('btn-primary').addClass('btn-secondary');
      $(this).removeClass('btn-secondary').addClass('btn-primary');
      $.event.trigger('titleSizeChange', { size: event.currentTarget.value });
    });

    //Label Position
    var $textPositionSelector = $(`
    <div class="btn-group" role="group" aria-label="Text Position Selector">
      <button type="button" class="btn btn-secondary" value="Top">Top</button>
      <button type="button" class="btn btn-primary" value="Middle">Middle</button>
      <button type="button" class="btn btn-secondary" value="Bottom">Bottom</button>
    </div>
    `).on('click', '.btn', function (event) {
      $(this).parent().find('.btn').removeClass('btn-primary').addClass('btn-secondary');
      $(this).removeClass('btn-secondary').addClass('btn-primary');
      $.event.trigger('valuePositionChange', { position: event.currentTarget.value });
    });

    var $barSpacingSelector = $(`
    <div class="btn-group" role="group" aria-label="Bar Spacing Selector">
      <button type="button" class="btn btn-primary" value="1">1</button>
      <button type="button" class="btn btn-secondary" value="2">2</button>
      <button type="button" class="btn btn-secondary" value="3">3</button>
    </div>
    `).on('click', '.btn', function (event) {
      $(this).parent().find('.btn').removeClass('btn-primary').addClass('btn-secondary');
      $(this).removeClass('btn-secondary').addClass('btn-primary');
      $.event.trigger('barSpacingChange', { spacing: event.currentTarget.value });
    });

    var $colorDiv = $('<div class="d-flex flex-row justify-content-center"></div>');
    $colorDiv = $colorDiv.add($buttonColor1)
      .add($buttonColor2)
      .add($buttonColor3)
      .add($buttonColor4)
      .add($buttonColor5)
      .add($buttonColor6);

    var $labelDiv = $('<div class="d-flex flex-row justify-content-center"></div>');
    $labelDiv = $labelDiv.add($labelColor1)
      .add($labelColor2);

    var $barSpacingDiv = $('<div class="d-flex flex-row justify-content-center"></div>');
    $barSpacingDiv = $barSpacingDiv.add($barSpacingSelector);

    // //Add items to section
    $chartSettings = $chartSettings
      .add($buttonClose)
      .add('<div class="mt-1" style="font-size: 11pt;">Data Text Position</div>')
      .add($textPositionSelector)
      .add('<div class="mt-1" style="font-size: 11pt;">Chart Color</div>')
      .add($colorDiv)
      .add('<div class="mt-1" style="font-size: 11pt;">Label Color</div>')
      .add($labelDiv)
      .add('<div class="mt-1" style="font-size: 11pt;">Title Color</div>')
      .add($titleColor1)
      .add($titleColor2)
      .add('<div class="mt-1" style="font-size: 11pt;">Title Size</div>')
      .add($titleSizeSelector)
      .add('<div class="mt-1" style="font-size: 11pt;">Bar Spacing</div>')
      .add($barSpacingDiv)
      .add('<div class="mt-1" style="font-size: 11pt;"></div>')
      .add($buttonRandomize);

    api.container = $(`
      <div class="container d-flex flex-column justify-content-center" style=${_style.container}>

        <div id="barchart_heading" class="row text-center">
          <div class="col"><h1 id="barchart_title" class="mb-5 mt-4" style="font-size: ${titleSize}">${api.options.title}</h1></div>
        </div>

        <div id="barchart_content" class="d-flex flex-row justify-content-center">
          <div id="barchart_left" class="d-flex flex-row float-left">
            <h5 id="barchart_yAxis" class="text-center position-relative" style="height: ${api.options.maxChartHeight}px; top: 0px; writing-mode: vertical-rl; transform: rotate(180deg);">
              ${api.options.yAxisTitle}
            </h5>

          </div>
          <div id="barchart_leftIncrements" class="d-flex flex-column align-items-end"></div>

          <div id="barchart_main" class="flex-grow-1" style=${_style.main}">
            <div id="barchart_chart" style=${_style.chart}></div>
            <div class="container">
              <div class="row">
                <div class="col">
                  <h5>
                    <p id="barchart_xAxis" class="text-center my-5 pt-5">${api.options.xAxisTitle}</p>
                  </h5>
                </div>
              </div>
            </div>
          </div>

          <div id="barchart_options" class="position-absolute p-2 bg-light rounded" style=${_style.infoPanel}>
            <div id="barchart_input_title" class="input-group-sm mb-2"></div>
          </div>
        </div>
      </div>
    `);

    generateItems(api.data);
    generateLeftGraduations(api.options.graduations);

    api.container.find('#barchart_options').append($chartSettings);

    //Event Listeners
    $(document).on("titleUpdate", onInputUpdate);
    $(document).on("titleColorChange", onTitleColorChange);
    $(document).on("titleSizeChange", onTitleSizeChange);
    $(document).on("generateRandomData", onGenerateRandomData);

    return api;

  };

  return Barchart;
})();

var BarchartItem = (function (data, options) {

  var BarchartItem = function (data, options) {

    var itemSpacing;

    var api = {};
    api.data = data;
    api.options = options;

    var onChartColorUpdate = function (type, params) {
      api.container.css({
        'background-color': params.color
      });
    }

    var onChartLabelColorChange = function (type, params) {

      switch (params.color) {
        case 'dark':
          api.container.css({ 'color': 'var(--bs-dark)' });
          break;
        case 'green':
          api.container.css({ 'color': 'var(--bs-green)' });
          break;
        default:
          break;
      }
    }

    var onBarSpacingChange = function (type, params) {

      api.container
        .removeClass(`mx-${itemSpacing}`)
        .addClass(`mx-${params.spacing}`)

      itemSpacing = params.spacing;

    }

    var onValuePositionChange = function (type, params) {

      switch (params.position) {
        case 'Top':
          api.container.find('#barchart_item_group_item').removeClass('align-items-center align-items-start align-items-end').addClass('align-items-start');
          break;
        case 'Middle':
          api.container.find('#barchart_item_group_item').removeClass('align-items-center align-items-start align-items-end').addClass('align-items-center');
          break;
        case 'Bottom':
          api.container.find('#barchart_item_group_item').removeClass('align-items-center align-items-start align-items-end').addClass('align-items-end');
          break;
        default:
          break;
      }
    }

    var generateDataGroup = function (item) {

      //get maximum height based on chart max
      var totalItemHeight = (api.options.sum / api.options.maxItemValue) * api.options.maxChartHeight;

      //Clear the Group first
      api.container.find("#barchart_item_group").empty();

      //Generate and append new items to group
      if (item.values) {
        item.values.forEach(function (item, index, array) {
          var valueHeight = (item / api.options.maxItemValue) * totalItemHeight;
          api.container.find("#barchart_item_group").append(`
            <div id="barchart_item_group_item" class="d-flex flex-row justify-content-center align-items-center" style="height: ${valueHeight}px; min-height: 1.5em; font-size: 9pt; background-color: rgba(255,255,255,${0.9 - (index / array.length)});">
              <div>
              ${item}
              </div>
            </div>
          `);
        })
      }
    }

    var _style = {
      bar: `"
        width: ${options.width}%;
        height: ${options.maxHeight}px;
        min-height: 1.5em;
        position: relative;
        background-color: var(--bs-purple);
      "`,
      label: `"
        position: absolute;
        left: 50%;
        bottom: 0px;
        margin-top: 10px;
      "`,
      labelText: `"
        position: absolute;
        writing-mode: vertical-rl;
        transform: rotate(180deg);
        line-height: 0em;
        margin-top: 20px;
        font-size: 14px;
      "`
    }

    api.container = $(`
      <span id="barchart_item" class="mx-1 d-flex flex-column justify-content-center align-content-stretch" style=${_style.bar}>
        <div class="flex-grow-1">
          <div id="barchart_item_group"></div>
          <div style=${_style.label}>
            <div id="barchart_label_text" style=${_style.labelText}>${api.options.sum}</div>
          </div>
        </div>
      </span>
    `);

    var $dataContent = $(`
      <div>${api.options.sum}</div>
    `)

    $(document).on("valuePositionChange", onValuePositionChange);
    $(document).on("labelColorChange", onChartLabelColorChange);
    $(document).on("barSpacingChange", onBarSpacingChange);
    $(document).on("chartColorUpdate", onChartColorUpdate);

    generateDataGroup(api.data);

    return api;

  };

  return BarchartItem;
})();

var BarchartIncrement = (function (options) {

  var BarchartIncrement = function (options) {

    var api = {};
    api.options = options;

    var _style = {
      tick: `"
        width: ${api.options.width}px;
        border-bottom: 1px solid black;
        border-top: ${api.options.top ? 1 : 0}px solid black;
        height: ${api.options.height}px;
      "`,
      tickText: `"
        font-size: 11px;
      "`
    }

    api.container = $(`
      <div style=${_style.tick}>
        <div style=${_style.tickText}>${api.options.value}</div>
      </div>
    `);

    return api;

  };

  return BarchartIncrement;
})();

var app = new App();
var mainpage = new Page();

var testData = [
  {
    label: "X0001",
    values: [10, 12, 21]
  },
  {
    label: "X0002",
    values: [15, 33, 65]
  },
  {
    label: "X00013",
    values: [3, 44, 90]
  },
];

var drawBarChart = function (data, options, element) {

  var navbar = new Navbar({ title: "Barchart App" });
  var footer = new Footer("Lighthouse Labs Barchart App - Brandon Macdonald 2021");
  var barchart = new Barchart(data, { xAxisTitle: options.xAxisTitle, yAxisTitle: options.yAxisTitle, graduations: options.graduations, maxChartHeight: options.height, maxChartWidth: options.width, title: options.title, });

  element.container.append(barchart.container);
  app.container.append(navbar.container);
  app.container.append(mainpage.container);
  app.container.append(footer.container);

  $("body")
    .css({ 'background-color': 'rgb(244, 244, 244)' })
    .append(app.container);
};

$(document).ready(function () {

  //Initalize App
  drawBarChart(testData, { title: "Weightlifting Performance", width: 500, height: 500, xAxisTitle: "Sets", yAxisTitle: "Reps", graduations: 10, height: 500, width: 500 }, mainpage);

});
