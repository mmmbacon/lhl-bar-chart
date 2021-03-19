'use strict';

let App = (function () {

  let App = function () {

    let api = {};

    api.container = $(`<div id='app'></div>`);

    return api;
  }

  return App;
})();

let Navbar = (function (options) {

  let Navbar = function (options) {

    //Styling
    let _style = {
      title: `"
        font-family: 'Pacifico';
        font-size: 25pt;
      "`
    }

    let updateTheme = function (type, params) {
      switch (params.theme) {
        case 'Lightly':
          api.container.fadeOut(200, function () {
            api.container.removeClass('navbar-dark bg-dark').addClass('navbar-light bg-light').fadeIn().delay(200);
          });
          break;
        case 'Darkly':
          api.container.fadeOut(200, function () {
            api.container.removeClass('navbar-light bg-light').addClass('navbar-dark bg-dark').fadeIn().delay(200);
          });
          break;
      }

      let html = api.container.html();
    }

    //Event Listeners
    $(document).on("themeUpdate", updateTheme);

    //Should not be declared inside the class like this, but whatever... time...
    let themeLink1 = new NavbarThemeLink({ href: '#', text: 'Darkly' });
    let themeLink2 = new NavbarThemeLink({ href: '#', text: 'Lightly' });

    let api = {};
    api.options = options;
    api.container = $(`
      <nav class="navbar navbar-expand-lg ${api.options.theme === 'Darkly' ? 'navbar-dark' : 'navbar-light'} ${api.options.theme === 'Darkly' ? 'bg-dark' : 'bg-light'}">
        <div class="container-fluid">
          <a class="navbar-brand" href="#" style=${_style.title}>${api.options.title}</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

      </nav>
    `);

    api.container.find("#themeList").append(themeLink1.container);
    api.container.find("#themeList").append(themeLink2.container);

    return api;

  };

  return Navbar;
})();

let NavbarThemeLink = (function (options) {

  let NavbarThemeLink = function (options) {

    let api = {};
    api.options = options;
    api.container = $(`<a class="dropdown-item" href="#">${api.options.text}</a>`).on('click', function () {
      switch (api.options.theme) {
        case 'Lightly':
          currentTheme = "Lightly";
          break;
        case 'Darkly':
          currentTheme = "Darkly";
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

let Header = (function (title) {

  let Header = function (title) {

    let _style = `"

    "`

    let api = {};

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

let Footer = (function (title) {

  let Footer = function (title) {

    let api = {};

    let updateTheme = function (type, params) {
      switch (params.theme) {
        case 'Lightly':
          api.container.fadeOut(200, function () {
            api.container.removeClass('text-light').addClass('text-dark').fadeIn().delay(200);
          });
          break;
        case 'Darkly':
          api.container.fadeOut(200, function () {
            api.container.removeClass('text-dark').addClass('text-light').fadeIn().delay(200);
          });
          break;
      }

      let html = api.container.html();
    }

    let _style = `"
      position: fixed;
      bottom: 0;
      width: 100%;
    "`

    api.title = title;
    api.container = $(`
      <div class="text-center align-middle" style=${_style}>
        <h6>
          <p class="my-2">${title}</p>
        </h6>
      </div>
    `);

    $(document).on("themeUpdate", updateTheme);

    return api;

  };

  return Footer;
})();

let Page = (function (options) {

  let Page = function (options) {

    let api = {};

    api.container = $(`<div id="page" class="container-fluid"></div>`);

    return api;

  };

  return Page;
})();

let Barchart = (function (data, options) {

  let Barchart = function (data, options) {

    let chartColor = 'var(--bs-purple)';
    let labelColor = 'dark';

    let api = {};
    api.data = data;
    api.options = options;

    api.options.maxValue = Math.max.apply(Math, api.data);

    //Styling
    let _style = {
      main: `"
      "`,
      chart: `"
        display: flex;
        align-items: flex-end;
        border-bottom: 1px solid black;
        border-left: 1px solid black;
      "`,
      left: `"
        text-align: center;
        vertical-align: middle;
      "`,
      infoPanel: `"
        margin-left: 10px;
      "`
    }

    //Event Handlers
    let onUpdateTheme = function (type, params) {
      switch (params.theme) {
        case 'Lightly':
          api.container.fadeOut(200, function () {
            api.container.removeClass('text-light').addClass('text-dark').fadeIn().delay(200);
          });
          $("#barchart_chart").fadeOut(200, function () {
            $("#barchart_chart").css({ 'border-color': 'black' }).fadeIn().delay(200);
          });
          break;
        case 'Darkly':
          api.container.fadeOut(200, function () {
            api.container.removeClass('text-dark').addClass('text-light').fadeIn().delay(200);
          });
          $("#barchart_chart").fadeOut(200, function () {
            $("#barchart_chart").css({ 'border-color': 'white' }).fadeIn().delay(200);
          });
          break;
      }

      let html = api.container.html();
    }

    let onInputUpdate = function (type, params) {
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

    let onGenerateRandomData = function () {

      let dataLength = Math.round(Math.random() * 10);
      let dataSet = [];

      //Generate a set of items with labels
      for (let x = 0; x < dataLength + 1; x++) {
        let item = {
          label: "Item " + x,
          values: []
        }

        //Generate data set for each item
        let valuesLength = Math.round(Math.random() * 5);
        for (let y = 0; y < valuesLength + 1; y++) {
          item.values.push(Math.round(1 + Math.random() * 100));
        }
        item.values.sort((a, b) => a - b);
        dataSet.push(item);
      }

      generateItems(dataSet);

    }

    let sumItems = function (item) {

      let sum = 0;

      for (let value of item) {
        sum += value;
      }

      return sum;
    }

    //Methods
    let generateItems = function (items) {

      let itemWidth = (1 / items.length) * 100;
      let itemTotals = [];

      //Clear the Chart first
      api.container.find("#barchart_chart").empty();

      //Calculate maximum value from all items, based on the sum of their values (confusing)
      for (let item of items) {
        itemTotals.push(sumItems(item.values));
      }
      let maxItemValue = Math.max.apply(Math, itemTotals);

      //Generate and append new items
      if (items) {
        items.map((item) => {
          let sum = sumItems(item.values);
          let chartItem = new BarchartItem(item, { color: chartColor, width: itemWidth, maxChartHeight: api.options.maxChartHeight, maxItemValue: maxItemValue, sum: sum });
          api.container.find("#barchart_chart").append(chartItem.container);
        });
      }
    }

    let generateLeftGraduations = function (graduations) {

      for (let x = 0; x < graduations; x++) {
        let tickItem = new BarchartIncrement({ height: api.options.maxChartHeight / graduations, width: 20, top: x == 0 ? true : false, value: 100 - (graduations * x) })
        api.container.find("#barchart_leftIncrements").append(tickItem.container);
      }
    }

    let $input = $(`
      <div class="d-flex flex-column">

        <div class="mt-1 text-center" style="font-size: 11pt;">Chart Settings</div>

          <input id="barchart_input_title" type="text" class="form-control" placeholder="Chart Title" aria-label="Chart Title" aria-describedby="basic-addon1" value="Student Performance">
          <label for="floatingInput">Chart Title</label>
        </div>

        <div class="form-floating mt-1">
          <input id="barchart_input_xAxis" type="text" class="form-control" placeholder="X-Axis" aria-label="X-Axis" aria-describedby="basic-addon1" value="Students">
          <label for="floatingInput">X-Axis Label</label>
        </div>

        <div class="form-floating mt-1">
          <input id="barchart_input_yAxis" type="text" class="form-control" placeholder="Y-Axis" aria-label="Y-Axis aria-describedby="basic-addon1" value="Strength">
          <label for="floatingInput">Y-Axis Label</label>
        </div>
      </div>
    `).on('input', 'input', function (event) {
      $.event.trigger("titleUpdate", {
        text: event.currentTarget.value,
        id: event.currentTarget.id
      });
    });

    let $buttonRandomize = $(`
      <button id="randomButton" type="button" class="btn btn-secondary mt-1">Generate Random Data</button>
    `).on('click', function () {
      $.event.trigger('generateRandomData');
    });

    let $buttonColor1 = $(`
      <button id="buttonColor1" type="button" class="btn m-1" style="height: 30px; width: 30px; background-color: var(--bs-purple)"></button>
    `).on('click', function () {
      chartColor = 'var(--bs-purple)';
      $.event.trigger('chartColorUpdate', { color: chartColor });
    });

    let $buttonColor2 = $(`
      <button id="buttonColor2" type="button" class="btn m-1" style="height: 30px; width: 30px; background-color: var(--bs-pink)"></button>
    `).on('click', function () {
      chartColor = 'var(--bs-pink)';
      $.event.trigger('chartColorUpdate', { color: chartColor });
    });

    let $buttonColor3 = $(`
      <button id="buttonColor3" type="button" class="btn m-1" style="height: 30px; width: 30px; background-color: var(--bs-red)"></button>
    `).on('click', function () {
      chartColor = 'var(--bs-red)';
      $.event.trigger('chartColorUpdate', { color: chartColor });
    });

    let $buttonColor4 = $(`
      <button id="buttonColor4" type="button" class="btn m-1" style="height: 30px; width: 30px; background-color: var(--bs-orange)"></button>
    `).on('click', function () {
      chartColor = 'var(--bs-orange)';
      $.event.trigger('chartColorUpdate', { color: chartColor });
    });

    let $buttonColor5 = $(`
      <button id="buttonColor5" type="button" class="btn m-1" style="height: 30px; width: 30px; background-color: var(--bs-teal)"></button>
    `).on('click', function () {
      chartColor = 'var(--bs-teal)';
      $.event.trigger('chartColorUpdate', { color: chartColor });
    });

    let $buttonColor6 = $(`
      <button id="buttonColor6" type="button" class="btn m-1" style="height: 30px; width: 30px; background-color: var(--bs-green)"></button>
    `).on('click', function () {
      chartColor = 'var(--bs-green)';
      $.event.trigger('chartColorUpdate', { color: chartColor });
    });

    //Label Color
    let $labelColor1 = $(`
      <button id="labelColor1" type="button" class="btn m-1" style="height: 30px; width: 30px; background-color: var(--bs-dark)"></button>
    `).on('click', function () {
      labelColor = 'dark';
      $.event.trigger('labelColorChange', { color: labelColor });
    });

    let $labelColor2 = $(`
      <button id="labelColor2" type="button" class="btn m-1" style="height: 30px; width: 30px; background-color: var(--bs-green)"></button>
    `).on('click', function () {
      labelColor = 'green';
      $.event.trigger('labelColorChange', { color: labelColor });
    });

    let $textPositionSelector = $(`
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

    let $barSpacingSelector = $(`
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

    // //Add items to section
    $input.append($buttonRandomize);
    $input.append('<div class="mt-1 text-center" style="font-size: 11pt;">Data Text Position</div>')
    $input.append($textPositionSelector);

    // $input.append('<div class="mt-1 text-center" style="font-size: 11pt;">Chart Color</div>')
    // let $colorDiv = $('<div class="d-flex flex-row justify-content-center"></div>')
    // $input.append($colorDiv);
    // $colorDiv.append($buttonColor1);
    // $colorDiv.append($buttonColor2);
    // $colorDiv.append($buttonColor3);
    // $colorDiv.append($buttonColor4);
    // $colorDiv.append($buttonColor5);
    // $colorDiv.append($buttonColor6);

    // //Label Color
    // $input.append('<div class="mt-1 text-center" style="font-size: 11pt;">Label Color</div>')
    // let $labelDiv = $('<div class="d-flex flex-row justify-content-center"></div>')
    // $input.append($labelDiv);
    // $labelDiv.append($labelColor1);
    // $labelDiv.append($labelColor2);

    // //Bar Spacing
    // $input.append('<div class="mt-1 text-center" style="font-size: 11pt;">Bar Spacing</div>')
    // let $barSpacingDiv = $('<div class="d-flex flex-row justify-content-center"></div>')
    // $input.append($barSpacingDiv);
    // $barSpacingDiv.append($barSpacingSelector);

    api.container = $(`
      <div class="container-fluid w-50" >

        <div id="barchart_heading" class="row text-center">
          <div class="col"><h1 id="barchart_title" class="mb-5 mt-4">${api.options.title}</h1></div>
        </div>

        <div id="barchart_content" class="d-flex">
          <div id="barchart_left" class="d-flex flex-row float-left">
            <h5 id="barchart_yAxis" class="text-center" style="writing-mode: vertical-rl; transform: rotate(180deg);">
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

          <div id="barchart_options" style=${_style.infoPanel}>
            <div id="barchart_input_title" class="input-group-sm mb-3"></div>
          </div>
        </div>
      </div>
    `);

    generateItems(api.data);
    generateLeftGraduations(api.options.graduations);

    api.container.find('#barchart_options').append($input);
    //Event Listeners
    $(document).on("themeUpdate", onUpdateTheme);
    $(document).on("titleUpdate", onInputUpdate);
    $(document).on("generateRandomData", onGenerateRandomData);

    return api;

  };

  return Barchart;
})();

let BarchartItem = (function (data, options) {

  let BarchartItem = function (data, options) {

    let itemSpacing;

    let api = {};
    api.data = data;
    api.options = options;


    //Event Handlers
    let onUpdateTheme = function (type, params) {
      switch (params.theme) {
        case 'Lightly':
          api.container.fadeOut(200, function () {
            api.container.css({ 'background-color': '#ff9b42' }).removeClass('text-light').addClass('text-dark').fadeIn().delay(200);
          });
          break;
        case 'Darkly':
          api.container.fadeOut(200, function () {
            api.container.css({ 'background-color': '#ff9b42' }).removeClass('text-dark').addClass('text-light').fadeIn().delay(200);
          });
          break;
      }

      let html = api.container.html();
    }

    let onChartColorUpdate = function (type, params) {
      api.container.css({
        'background-color': params.color
      });
    }

    let onChartLabelColorChange = function (type, params) {


      switch (params.color) {
        case 'dark':
          api.container.find('#barchart_label_text').css({ 'color': 'var(--bs-dark)' });
          break;
        case 'green':
          api.container.find('#barchart_label_text').css({ 'color': 'var(--bs-green)' });
          break;
        default:
          break;
      }
    }

    let onBarSpacingChange = function (type, params) {

      api.container
        .removeClass(`mx-${itemSpacing}`)
        .addClass(`mx-${params.spacing}`)

      itemSpacing = params.spacing;

    }

    let onValuePositionChange = function (type, params) {

      switch (params.position) {
        case 'Top':
          api.container.removeClass('justify-content-start justify-content-center justify-content-end').addClass('justify-content-start');
          break;
        case 'Middle':
          api.container.removeClass('justify-content-start justify-content-center justify-content-end').addClass('justify-content-center');
          break;
        case 'Bottom':
          api.container.removeClass('justify-content-start justify-content-center justify-content-end').addClass('justify-content-end');
          break;
        default:
          break;
      }
    }

    let generateDataGroup = function (item) {


      //get maximum height based on chart max
      let totalItemHeight = (api.options.sum / api.options.maxItemValue) * api.options.maxChartHeight;

      //Clear the Group first
      api.container.find("#barchart_item_group").empty();

      //Generate and append new items to group
      if (item.values) {
        item.values.forEach(function (item, index, array) {
          let valueHeight = (item / api.options.maxItemValue) * totalItemHeight;
          api.container.find("#barchart_item_group").append(`<div style="height: ${valueHeight}px; background-color: var(--bs-purple); opacity: ${index / array.length}"></div>`);
        })
      }
    }

    //Event Listeners
    $(document).on("themeUpdate", onUpdateTheme);
    $(document).on("chartColorUpdate", onChartColorUpdate);

    let _style = {
      bar: `"
        width: ${options.width}%;
        height: ${options.maxHeight}px;
        min-height: 1.5em;
        position: relative;
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
        font-size: 11px;
      "`
    }

    api.container = $(`
      <span id="barchart_item" class="mx-1 d-flex flex-column justify-content-center align-content-stretch" style=${_style.bar}>
        <div class="flex-grow-1">
          <div id="barchart_item_group"></div>
          <div style=${_style.label}>
            <div id="barchart_label_text" style=${_style.labelText}>A3445X</div>
          </div>
        </div>
      </span>
    `);

    let $dataContent = $(`
      <div>${api.options.sum}</div>
    `)

    $(document).on("valuePositionChange", onValuePositionChange);
    $(document).on("labelColorChange", onChartLabelColorChange);
    $(document).on("barSpacingChange", onBarSpacingChange);

    generateDataGroup(api.data);


    return api;

  };

  return BarchartItem;
})();

let BarchartIncrement = (function (options) {

  let BarchartIncrement = function (options) {

    let api = {};
    api.options = options;

    //There are better ways to handle this
    let updateTheme = function (type, params) {
      switch (params.theme) {
        case 'Lightly':
          api.container.fadeOut(200, function () {
            api.container.css({ 'border-color': 'black' }).fadeIn().delay(200);
          });
          break;
        case 'Darkly':
          api.container.fadeOut(200, function () {
            api.container.css({ 'border-color': 'white' }).fadeIn().delay(200);
          });
          break;
      }

      let html = api.container.html();
    }

    //Event Listeners
    $(document).on("themeUpdate", updateTheme);

    let _style = {
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

let app = new App();
let mainpage = new Page();

let testData = [
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
    values: [90, 44, 3]
  },
];

let drawBarChart = function(data, options, element){

  let navbar = new Navbar({ title: "Barchart App" });
  let footer = new Footer("Lighthouse Labs Barchart App - Brandon Macdonald 2021");
  let barchart = new Barchart(data, { xAxisTitle: options.xAxisTitle, yAxisTitle: options.yAxisTitle, graduations: options.graduations, maxChartHeight: options.height, maxChartWidth: options.width, title: options.title, });

  element.container.append(barchart.container);
  app.container.append(navbar.container);
  app.container.append(mainpage.container);
  app.container.append(footer.container);

  $("body")
    .css({ 'background-color': 'var(--bs-light)' })
    .append(app.container);
};

$(document).ready(function () {

  let onUpdateTheme = function (type, params) {
    switch (params.theme) {
      case 'Lightly':
        $("body").css({ 'background-color': 'var(--bs-light)' });
        break;
      case 'Darkly':
        $("body").css({ 'background-color': 'var(--bs-dark)' });
        break;
    }
  }

  //Event Listeners
  $(document).on("themeUpdate", onUpdateTheme);

  //Initalize App
  drawBarChart(testData, {width: 500, height: 500, xAxisTitle: "Students", yAxisTitle: "Strength", graduations: 10, maxChartHeight: 500, title: "Student Performance",}, mainpage);

});
