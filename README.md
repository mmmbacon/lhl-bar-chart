--> https://mmmbacon.github.io/lhl-bar-chart/

# About
This is a stretch project for the lighthouse labs web development course. It uses HTML, CSS, Javascript and JQuery to render a barchart to a page. I have used bootstrap to simplify the component design and layout. The chart is code uses a revealing constructor pattern and string literals to create templated and re-usable classes in JS.

# Functionality
![Chart Options](img/chart-options.png)
<p>These are the options for changing the chart settings</p>
![Chart](img/chart.png)
This chart shows the X-Axis title along the bottom. The Y-Axis title on the left side of the chart. The chart title. The chart content.

The drawBarChart function takes a data object, and an options parameter for specifying:
    title: Title of the Chart
    width: Width of the chart on the page 
    height: Height of the chart on the page 
    xAxisTitle: The title of the X-Axis for the data set
    yAxisTitle: The title of the Y-Axis for the data set
    graduations: The amount of graduations on the chart
The final parameter of the function is the DOM component we are attaching the chart to.
    
# Known Issues / Bugs
* Chart does not currently encapsulate events - events are triggered on all charts on the page.
* Page does not scale well for very small devices
* Data values limited to 100 maximum

# Feature Roadmap
* Encapsulation improvements including controlling event propagation. 
* Integrate chart options panel into the chart for usability improvements.
* Custom colors for each data segment

# Resources

jQuery Docs: https://api.jquery.com/
Bootstrap: https://getbootstrap.com/
Revealing Constructor Pattern: https://vanillajstoolkit.com/boilerplates/revealing-constructor/
Finding help with nested template literals (tagged template literals): https://stackoverflow.com/questions/53840093/efficient-method-of-inserting-jquery-elements-within-template-literals
