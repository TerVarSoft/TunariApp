'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:sellingsBarChart
 * @description
 * # sellingsBarChart
 */
angular.module('tunariApp')
  .directive('sellingsBarChart', ['ServerData', function (ServerData) {

    var margin =  { top: 20, right: 20, bottom: 100, left: 40 };
    var height = 500 - margin.top - margin.bottom;
    var spaceBetweenBars = 5;  
    var color = d3.scale.category20();
    var tooltipFormatDate = "dddd, MMMM DD YYYY HH:mm:ss";
    var groupingFormatDate = "YYYY-MM";

    return {
      restrict: 'E',
      scope: {      	
    	data: '='  	    
      },
      link: function postLink(scope, element, attrs) {

        var width = $("#sellings-bar-chart").width() - margin.left - margin.right;
        var legendNames;
        var interval;
        var parseDate;

        var xScale = d3.time.scale();
        var yScale = d3.scale.linear()
                      .range([height, 0]);

        var xAxis = d3.svg.axis()
                      .scale(xScale)
                      .orient("bottom")
                      .innerTickSize(-height)
                      .ticks(4);
        var yAxis = d3.svg.axis()
                      .scale(yScale)
                      .orient("left");        

        var svg = d3.select(element[0])
                    .append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)

        var mainVis = svg.append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

        var legendsVis = d3.selectAll("#selling-legends")


        $(window).resize(function() {
            var newWidth = $("#sellings-bar-chart").width() - margin.left - margin.right;

            // Repaint just if width has changed
            if(newWidth>0 && width!= newWidth){
                width = newWidth;         
                repaint(scope.data); 
            }       
        });
      
        scope.$watch('data', function (newVal, oldVal) { 
            repaint(newVal);    
        });

        function repaint(data) {        
            mainVis.selectAll('*').remove();
            legendsVis.selectAll('*').remove();

            mainVis.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", - margin.left)
            .attr("x", - (height/2))
            .attr("dy", "1em")
            .style("font-size", "15px") 
            .style("text-anchor", "middle")
            .text("Total [Bs]");

            setUpGlobalChartVariables(data);
            var dataSet = formatData(data);
            var barWidth = getBarWidth(dataSet);           

            // Legends
            var legends = legendsVis
              .append("svg")
                .attr("height", dataSet.length*50)            
              .selectAll(".legend")
              .data(legendNames)
              .enter()
              .append("g")
                .attr("class", "legend")
                .attr("transform", function(d, i) { return "translate(5," + i * 37 + ")"; })
    
            // Legends colors
            legends
            .append("rect")
              .attr("x", 0)
              .attr("width", 50)
              .attr("height", 35)
              .style("fill-opacity", 0.7)
              .attr("rx", 5)
              .style("fill", function(d, i){return color(d);})

            // Legends texts
            legends
            .append("text")
                .attr("x", 51)
                .attr("y", function(d, i) {return 18+0.1*i})
                .text(function(d){return d;})


            xScale.range([barWidth/2, width-barWidth/2])
              .domain(d3.extent(dataSet, function(d) { return parseDate(d.roundedDate); }));
            yScale.domain([0, d3.max(dataSet, function(d) { return d.y1; })]);

            yAxis.innerTickSize(-width)

            mainVis.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis);
            mainVis.append("g")
                .attr("class", "y axis")
                .call(yAxis);

            // Tooltips
            var tip = d3.tip()
              .attr('class', 'well well-lg')
              .html(function(d) {
                return "<div class='col-xs-12'>" +
                      "<div class='col-xs-7'>" +
                        "<img class='img-responsive' src='" +
                        ServerData.urlImages + "/" + d.product.category + "/" +
                        (d.product.properties.type||"") + "/" + d.product.name +"-S.jpg"+"'>" +
                      "</img>" + 
                      "</div>" +
                      "<div class='col-xs-5'>" +
                        "<strong>Producto:</strong> <span>" + d.product.name + "</span></br>" +
                        "<strong>Total:</strong> <span>" + d.total + "</span></br>"+
                        "<strong>Fecha:</strong> <span>" + d.date.format(tooltipFormatDate) + "</span>"+
                      "</div>" +
                    "</div>";
              });

            mainVis.call(tip);  

            // Bars
            mainVis
            .append("g")
              .attr("class", "bars")
            .selectAll(".bar.stack")
            .data(dataSet)
            .enter()
            .append("g")
              .attr("class", "bar stack")
              .style("stroke","black")
              .style("stroke-width", 2)
              .style("fill-opacity", 0.7)
              .attr("transform", function(d) { return "translate(" + (xScale(parseDate(d.roundedDate)) - barWidth/2 + spaceBetweenBars/2) + ",0)"; })
              .on('mouseover', tip.show)
              .on('mouseout', tip.hide)
            .append("rect")
              .attr("class", "bar")
              .attr("width", barWidth-spaceBetweenBars)
              .attr("y", height)
              .attr("height", 0)
              .style("fill", function(d, i) { return color(d.product.name); })
              .transition()
                .delay(function(d, i) { return 70; })
                .attr("y", function(d){return yScale(d.y1)})
                .attr("height", function(d){return yScale(d.y0) - yScale(d.y1);});

            mainVis.selectAll('.axis line, .axis path')
             .style({'stroke': 'Black', 'fill': 'none', 'stroke-width': '0.5px'});                
        }

        // Set up general variables based in how the sellings will be stacked
        // by month, day or hour
        function setUpGlobalChartVariables(data) {
          var dateRange = moment(data[0].date).diff(moment(data[data.length-1].date));

          //by hour
          if(dateRange < 86400000) {
                parseDate = d3.time.format("%Y-%m-%d %H").parse;                  
                groupingFormatDate = "YYYY-MM-DD HH";
                interval = 'hour';
            } 
            // by day
            else if(dateRange < 2678400000){
                parseDate = d3.time.format("%Y-%m-%d").parse;                  
                groupingFormatDate = "YYYY-MM-DD";
                interval = 'day';
            }    
            // by month          
            else {
                parseDate = d3.time.format("%Y-%m").parse;                  
                groupingFormatDate = "YYYY-MM";
                interval = 'month';
            }  
        }

        function formatData(data) {
            var dataSet = getSellingsForTopProducts(data);
            
            legendNames = _.uniq(_.pluck(dataSet, "product[0].name"));

            dataSet = groupDataByDate(dataSet);            

            return dataSet;
        }

        // Get the sellings for the top 20 products
        function getSellingsForTopProducts(data) {
            var sellingsForTopProducts = _.chain(data).groupBy(function(d) {
                return d.product[0].name
            })
            .mapValues(function(d) {
                return {
                  total: _.sum(d, function(d) {return d.total;}),
                  sellings: d
                };
            })
            .sortBy(function(d) { return -d.total})
            .take(20)
            .pluck("sellings")
            .flatten()
            .value();            

            return sellingsForTopProducts;
        }

        // Group sellings for date to be able to
        // create the stacked bar charts
        function groupDataByDate(data) {

            var sortedData = _.sortBy(data, function(n) {
                return n.date;
            });

            var groupedSellings = _.groupBy(sortedData, function(element){
                return moment(element.date).format(groupingFormatDate);
            });

            
            var result = [];
            var keyDates = _.keys(groupedSellings);
            _.each(keyDates, function(date) {
                
                var y0 = 0;
                var sellingsForDate = groupedSellings[date];
                _.each(sellingsForDate, function(selling) {
                      
                      result.push({
                          roundedDate: date,
                          date: moment(selling.date),
                          product: selling.product[0],
                          y0: y0,
                          y1: y0 += selling.total,
                          total: selling.total
                      });
                });
            });

            return result;
        }

        // Calculates the the width of the bars
        // based on the interval that is based on how
        // the data is stacked (by month, day or hour)
        function getBarWidth(dataSet) {
            var minDate = dataSet[0].date.clone().startOf(interval);
            var maxDate = dataSet[dataSet.length-1].date.clone().startOf(interval);
            var numberOfBars = maxDate.diff(minDate, interval) + 1;

            var barWidth = width/numberOfBars;

            return barWidth;
        }
      }
    };
  }]);
