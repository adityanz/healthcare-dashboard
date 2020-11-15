import React from 'react';
import * as d3 from 'd3';
import './GroupedBarChart.css'

class GroupedBarChart extends React.Component {
    constructor(props) {
        super(props)
        this.removeExistingBars = this.removeExistingBars.bind(this);
        this.createBarChart = this.createBarChart.bind(this)
        this.state = {
            svg: null,
            div: null
        };

    }
    componentDidMount() {
        const owidth = this.props.size[0]
        const oheight = this.props.size[1]

        var margin = { top: 20, right: 0, bottom: 20, left: 40 },
            width = owidth - margin.left - margin.right,
            height = oheight - margin.top - margin.bottom;

        const svg = d3.select("body").select("#gbc").select("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        const div = d3.select("body").select("#gbc").append("div")
            .attr("class", "tooltip-donut")
            .style("opacity", 0);

        this.setState({ svg, div });
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
        const { div } = this.state;

        const data = this.props.data
        const owidth = this.props.size[0]
        const oheight = this.props.size[1]

        const label = this.props.selector

        var margin = { top: 20, right: 20, bottom: 70, left: 100 },
            width = owidth - margin.left - margin.right,
            height = oheight - margin.top - margin.bottom;

        console.log("data", data);
        var dnames = data.map(function (d) { return d.diagnosis; });
        var gname = data[0].values.map(function (d) { return d.distribution; });

        console.log("dname", dnames)
        console.log("gname", gname)


        function getKeyByValue(object, value) {
            return Object.keys(object).find(key => object[key] === value);
        }


        var xScale = d3.scaleBand()
            .range([0, width]) // output
            .padding(0.1)

        var yScale = d3.scaleLinear()
            .range([height, 0]); // output

        var color = d3.scaleOrdinal(d3.schemeCategory10)

        console.log("graphdata", data)

        var xScale1 = d3.scaleBand()

        xScale.domain(dnames);
        xScale1.domain(gname).rangeRound([0, xScale.bandwidth()]);

        yScale.domain([0, d3.max(data, function (key) { return d3.max(key.values, function (d) { return d.value; }); })]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale));

        svg.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(yScale));

        var slice = svg.selectAll(".slice")
            .data(data)
            .enter().append("g")
            .attr("class", "g")
            .attr("transform", function (d) { return "translate(" + xScale(d.diagnosis) + ",0)"; });


        slice.selectAll("rect")
            .data(function (d) { return d.values; })
            .enter().append("rect")
            .attr("width", xScale1.bandwidth())
            .attr("x", function (d) { { console.log("x", d.distribution) } return xScale1(d.distribution); })
            .attr("y", function (d) { { console.log(d.value) } return yScale(d.value); })
            .style("fill", function (d) { return color(d.distribution) })
            .attr("height", function (d) { return height - yScale(d.value); })
            .on("mouseover", function (event, d) {
                d3.select(this).transition()
                    .duration('50')
                    .attr('opacity', .50);
                console.log(d, event)
                /// add to html
                div.transition()
                    .duration(50)
                    .style("opacity", 1)

                div.html(label +": " + d.distribution + "<br>" + "Amount: " + d.value)
                    .style("left", (event.pageX - 30) + "px")
                    .style("top", (event.pageY - 15) + "px")

            })
            .on("mouseout", function (d) {
                d3.select(this).transition()
                    .duration('50')
                    .attr('opacity', 1)
                div.transition()
                    .duration('50')
                    .style("opacity", 0)
            })

        let size = 1
        svg.selectAll("g")
            .data(data)
            .enter()
            .append("text")
            .attr("x", 10)
            .attr("y", function (d, i) { return 10 }) // 100 is where the first dot appears. 25 is the distance between dots
            .style("fill", function (d) { return color(d.distribution) })
            .text(function (d) { return d.distribution })
            .attr("text-anchor", "left")

        const xmid = xScale.range()[0] + (xScale.range()[1] - xScale.range()[0]) / 2.0;
        const ymid = yScale.range()[0] + (yScale.range()[1] - yScale.range()[0]) / 2.0;
        const xtitle = svg.append('text')
            .attr('class', 'axis-title')
            .text('Diseases');
        xtitle.attr('text-anchor', 'middle');
        xtitle.attr('x', xmid);
        xtitle.attr('y', height + 40);
        const ytitle = svg.append('text')
            .attr('class', 'axis-title')
            .text('Number of Patients')
        ytitle.attr('x', xmid);
        ytitle.attr('y', height + 40);
        ytitle.attr('dy', '1.75ex');
        ytitle.attr('text-anchor', 'middle');
        ytitle.attr('transform', 'rotate(-90)');

        const tooltip = d3
            .select('#container')
            .append('div')
            .attr('class', 'tooltip')
            .style('opacity', 0);

        function mouseover() {
            d3.select(this).attr("opacity", .5)

        }

        function mouseout() {
            d3.select(this).attr("opacity", 1);
        }

    }


    
    render() {
        return (
            <svg/>
        )
    }

}

export default GroupedBarChart;
