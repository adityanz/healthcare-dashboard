import React from 'react';
import * as d3 from 'd3';
import * as d3l from 'd3-svg-legend'

let svg_count = 0;

class AreaChart extends React.Component {
    constructor(props) {
        super(props)
        this.removeExistingBars = this.removeExistingBars.bind(this);
        this.createBarChart = this.createBarChart.bind(this)
        this.state = {
            svg: null,
            width: 0,
            height: 0
        };

    }
    componentDidMount() {
        const owidth = this.props.size[0]
        const oheight = this.props.size[1]

        var margin = { top: 20, right: 20, bottom: 70, left: 100 },
            width = owidth - margin.left - margin.right,
            height = oheight - margin.top - margin.bottom;

        const svg = d3.select("body").select("#lc").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        this.setState({ svg, width, height });
    }
    componentDidUpdate() {
        this.removeExistingBars();
        this.createBarChart();
    }

    midpoint(range) {
        return range[0] + (range[1] - range[0]) / 2.0;
    }

    removeExistingBars() {
        const { svg } = this.state;

        svg.selectAll("*").remove();

    }

    createBarChart() {
        const { svg } = this.state;
        const { width } = this.state;
        const { height } = this.state;

        const output = this.props.data


        let data = output.filter(function (e) {
            return e.id < 299;
        });

        var color = d3.scaleOrdinal(d3.schemeCategory10)

        var keys = ["CHEST PAIN", "PNEUMONIA", "SEPSIS", "TRAUMA"]

        var stackedData = d3.stack()
            .keys(keys)
            (data)

        console.log("originalData", data)
        console.log("pancake", stackedData)


        // let series = d3.stack().keys(keys)(data)
        // console.log("series",series)

        // var xScale = d3.scaleLinear()
        //     .range([0, width]); // output

        // // 6. Y scale will use the randomly generate number 
        // var yScale = d3.scaleLinear()
        //     // .domain([0, 1]) // input 
        //     .range([height, 0]); // output 

        var xScale = d3.scaleLinear()
            .domain(d3.extent(data, function (d) { return d.id; }))
            .range([0, width]);



        // Add Y axis
        var yScale = d3.scaleLinear()
            .domain([0, 250])
            .range([height, 0]);
        //  xScale.domain([0, d3.max(data, function (key) { return d3.max(key.values, function (d) { return d.distribution; }); })]);
        // yScale.domain([0, d3.max(data, function (key) { return d3.max(key.values, function (d) { return d.value; }); })]);


        let xAxis = svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale));

        let yAxis = svg.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(yScale));


        let area = d3.area()
            .x(function (d) { return xScale(d.data.id); })
            .y0(function (d) { return yScale(d[0]); })
            .y1(function (d) { return yScale(d[1]); })
            .curve(d3.curveMonotoneX) // apply smoothing to the line

        //////////
        // BRUSHING AND CHART //
        //////////

        // Add a clipPath: everything out of this area won't be drawn.
        var clip = svg.append("defs").append("svg:clipPath")
            .attr("id", "clip")
            .append("svg:rect")
            .attr("width", width)
            .attr("height", height)
            .attr("x", 0)
            .attr("y", 0);

        // Add brushing
        // var brush = d3.brushX()                 // Add the brush feature using the d3.brush function
        //     .extent([[0, 0], [width, height]]) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
        //     .on("end", updateChart) // Each time the brush selection changes, trigger the 'updateChart' function

        // Create the scatter variable: where both the circles and the brush take place
        var areaChart = svg.append('g')
            .attr("clip-path", "url(#clip)")

        // Show the areas
        areaChart
            .selectAll("mylayers")
            .data(stackedData)
            .enter()
            .append("path")
            .attr("class", function (d) { return "myArea " + d.key })
            .style("fill", function (d) { return color(d.key); })
            .attr("d", area)

        // Add the brushing
        // areaChart
        //     .append("g")
        //     .attr("class", "brush")
        //     .call(brush);

        // var idleTimeout
        // function idled() { idleTimeout = null; }

        // // A function that update the chart for given boundaries
        // function updateChart(d, event) {

        //     let extent = event.selection

        //     // If no selection, back to initial coordinate. Otherwise, update X axis domain
        //     if (!extent) {
        //         if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
        //         xScale.domain(d3.extent(data, function (d) { return d.year; }))
        //     } else {
        //         xScale.domain([xScale.invert(extent[0]), xScale.invert(extent[1])])
        //         areaChart.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
        //     }

        //     // Update axis and area position
        //     xAxis.transition().duration(1000).call(d3.axisBottom(xScale).ticks(5))
        //     areaChart
        //         .selectAll("path")
        //         .transition().duration(1000)
        //         .attr("d", area)
        // }



        //////////
        // HIGHLIGHT GROUP //
        //////////

        // What to do when one group is hovered
        // var highlight = function (d) {
        //     console.log(d)
        //     // reduce opacity of all groups
        //     d3.selectAll(".myArea").style("opacity", .1)
        //     // expect the one that is hovered
        //     d3.select("." + d).style("opacity", 1)
        // }

        // // And when it is not hovered anymore
        // var noHighlight = function (d) {
        //     d3.selectAll(".myArea").style("opacity", 1)
        // }



        // //////////
        // // LEGEND //
        // //////////

        // // Add one dot in the legend for each name.
        // var size = 20
        // svg.selectAll("myrect")
        //     .data(keys)
        //     .enter()
        //     .append("rect")
        //     .attr("x", 400)
        //     .attr("y", function (d, i) { return 10 + i * (size + 5) }) // 100 is where the first dot appears. 25 is the distance between dots
        //     .attr("width", size)
        //     .attr("height", size)
        //     .style("fill", function (d) { return color(d) })
        //     .on("mouseover", highlight)
        //     .on("mouseleave", noHighlight)

        // // Add one dot in the legend for each name.
        // svg.selectAll("mylabels")
        //     .data(keys)
        //     .enter()
        //     .append("text")
        //     .attr("x", 400 + size * 1.2)
        //     .attr("y", function (d, i) { return 10 + i * (size + 5) + (size / 2) }) // 100 is where the first dot appears. 25 is the distance between dots
        //     .style("fill", function (d) { return color(d) })
        //     .text(function (d) { return d })
        //     .attr("text-anchor", "left")
        //     .style("alignment-baseline", "middle")
        //     .on("mouseover", highlight)
        //     .on("mouseleave", noHighlight)

        var legend = d3l.legendColor()
            .scale(color)
            .shape('circle')
            .orient('vertical')


        svg.append("g")
            .attr("class", "legend")
            .attr("transform", "translate(" + (width - 350) + ", " + 20 + ")");


        svg.select(".legend")
            .call(legend);


        const xmid = xScale.range()[0] + (xScale.range()[1] - xScale.range()[0]) / 2.0;
        const ymid = yScale.range()[0] + (yScale.range()[1] - yScale.range()[0]) / 2.0;
        const xtitle = svg.append('text')
            .attr('class', 'axis-title')
            .text("Age");
        xtitle.attr('text-anchor', 'middle');
        xtitle.attr('x', xmid);
        xtitle.attr('y', height + 40);
        const ytitle = svg.append('text')
            .attr('class', 'axis-title')
            .text('Distribution')
        ytitle.attr('x', -240);
        ytitle.attr('y', -80);
        ytitle.attr('dy', '1.75ex');
        ytitle.attr('text-anchor', 'middle');
        ytitle.attr('transform', 'rotate(-90)');

        // const tooltip = d3
        //     .select('#container')
        //     .append('div')
        //     .attr('class', 'tooltip')
        //     .style('opacity', 0);

        // function mouseover() {
        //     d3.select(this).attr("opacity", .5)

        // }

        // function mouseout() {
        //     d3.select(this).attr("opacity", 1);
        // }

    }



    render() {
        return (
            <div ref={this.myRef} />
        )
    }

}

export default AreaChart;
