import React from 'react';
import * as d3 from 'd3';
import * as d3l from 'd3-svg-legend'
import './StackedBarChart.css'

class StackedBarChart extends React.Component {
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

        var margin = { top: 20, right: 0, bottom: 20, left: 70 },
            width = owidth - margin.left - margin.right,
            height = oheight - margin.top - margin.bottom;

        const svg = d3.select("body").select("#sb").select("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        const div = d3.select("body").append("div")
            .attr("class", "tooltip-donut")
            .style("opacity", 0);

        this.setState({ svg, div, width, height });
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

        const owidth = this.props.size[0]
        const oheight = this.props.size[1]

        const selector = this.props.selector

        var margin = { top: 20, right: 0, bottom: 20, left: 70 },
            width = owidth - margin.left - margin.right,
            height = oheight - margin.top - margin.bottom;

        let output = this.props.data

  
        var yScale = d3.scaleBand()
            .range([margin.top, height - margin.bottom])
            .padding(0.1)
            .paddingOuter(0.2)
            .rangeRound([0, height])
            .align(0.1);

        var xScale = d3.scaleLinear()
            .rangeRound([0, width]);

        var zScale = d3.scaleOrdinal(d3.schemeCategory10)



        var keys = ["Government", "Medicaid", "Medicare", "Private", "Self Pay"]
        xScale.domain([0, 1500])


        yScale.domain(output.map(function (d) { return d.disease; }));

        zScale.domain(keys)

        console.log("keys")
        console.log(keys)


        console.log("output")
        console.log(output)

        console.log("d3")
        console.log(d3.stack().keys(keys)(output))

        svg.attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        svg.append("g")
            .attr("class", "axis")
            .style("stroke", "lightslategray")
            .call(d3.axisLeft(yScale).ticks(null, "s"));
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .style("stroke", "lightslategray")
            .call(d3.axisBottom(xScale).ticks(16, "f"));

        svg.append("g")
            .selectAll("g")
            .data(d3.stack().keys(keys)(output))
            .enter().append("g")
            .attr("fill", function (d) { return zScale(d.key) })
            .selectAll("rect").data(function (d) { { console.log("stacked", d) } return d; })
            .enter().append("rect")
            .attr("y", function (d) { { console.log("y", d) } return yScale(d.data.disease) })
            .attr("x", function (d) { { console.log("x", d) } return xScale(d[0]) })
            .attr("height", function (d) {
                return yScale.bandwidth()
            })
            .on("mouseover", function (event, d) {
                d3.select(this).transition()
                    .duration('50')
                    .attr('opacity', .50);
                console.log(d, event)
                /// add to html
                div.transition()
                    .duration(50)
                    .style("opacity", 1)
                let key = Object.keys(d.data).find(key => d.data[key] === d[1] - d[0]);

                div.html(" Alarm Type: " + key + "<br>" + "Total Number of Alarms: " + (d[1] - d[0]))
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
            .transition()
            .duration(2000)//time in ms
            .attr("width", function (d) {
                return xScale(d[1]) - xScale(d[0])
            })

        var legend = d3l.legendColor()
            .scale(zScale)
            .shape('circle')
            .orient('vertical')


        svg.append("g")
            .attr("class", "legend")
            .attr("transform", "translate(" + (width - 350) + ", " + 20 + ")");


        svg.select(".legend")
            .call(legend);


    }

    render() {
        return (
            <svg />
        )
    }
}

export default StackedBarChart;
