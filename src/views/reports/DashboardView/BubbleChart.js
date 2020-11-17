import React from 'react';
import * as d3 from 'd3';
import { range } from 'd3';

class BubbleChart extends React.Component {
    constructor(props) {
        super(props)
        this.removeExistingBubbles = this.removeExistingBubbles.bind(this);
        this.createBarChart = this.createBarChart.bind(this)
        this.state = {
            svg: null,
            width: null,
            height: null,
        };

    }
    componentDidMount() {
        const owidth = this.props.size[0]
        const oheight = this.props.size[1]
        var diameter = 600;

        var margin = { top: 20, right: 20, bottom: 70, left: 100 },
            width = owidth - margin.left - margin.right,
            height = oheight - margin.top - margin.bottom;

        const svg = d3.select("body").select("#bc").select("svg")
            .attr("width", diameter)
            .attr("height", diameter)
            .attr("class", "bubble");

        this.setState({ svg });
        this.setState({ width });
        this.setState({ height });

    }
    componentDidUpdate() {
        this.removeExistingBubbles();
        this.createBarChart();
    }

    midpoint(range) {
        return range[0] + (range[1] - range[0]) / 2.0;
    }

    removeExistingBubbles() {
        const { svg } = this.state;

        svg.selectAll("*").remove();

    }

    createBarChart() {
        const { svg } = this.state;
        const { width } = this.state;
        const { height } = this.state;

        const rawdata = this.props.data

        console.log(rawdata)

        let dataset = {
            "children": []
        };

        console.log(dataset)
        console.log(typeof (dataset))

        for (var val of rawdata) {
            let key = Object.values(val)[0]
            let theval = Object.values(Object.values(val)[1][0])[0]

            dataset["children"].push({
                Name: key,
                Count: theval
            })
        }
        console.log(dataset)

        var diameter = 600;
        var color = d3.scaleOrdinal(d3.schemeCategory10);

        var bubble = d3.pack(dataset)
            .size([diameter, diameter])
            .padding(1.5);


        var nodes = d3.hierarchy(dataset)
            .sum(function (d) { return d.Count; });

        var diameter = 600;
        var color = d3.scaleOrdinal(d3.schemeCategory10);

        var bubble = d3.pack(dataset)
            .size([diameter, diameter])
            .padding(1.5);

        var nodes = d3.hierarchy(dataset)
            .sum(function (d) { return d.Count; });

        var node = svg.selectAll(".node")
            .data(bubble(nodes).descendants())
            .enter()
            .filter(function (d) {
                return !d.children
            })
            .append("g")
            .attr("class", "node")
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });


        node.append("title")
            .text(function (d) {
                return d.Name + ": " + d.Count;
            });

        node.append("circle")
            .attr("r", function (d) {
                return d.r;
            })
            .style("fill", function (d, i) {
                return color(i);
            });

        node.append("text")
            .attr("dy", ".2em")
            .style("text-anchor", "middle")
            .text(function (d) {
                return d.data.Name.substring(0, d.r / 3);
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", function (d) {
                return d.r / 5;
            })
            .attr("fill", "white");

        node.append("text")
            .attr("dy", "1.3em")
            .style("text-anchor", "middle")
            .text(function (d) {
                return d.data.Count;
            })
            .attr("font-family", "Gill Sans", "Gill Sans MT")
            .attr("font-size", function (d) {
                return d.r / 5;
            })
            .attr("fill", "white");

        node.append("title")
            .text(function (d) {
                return d.Name + ": " + d.Count;
            });

        node.append("circle")
            .attr("r", function (d) {
                return d.r;
            })
            .style("fill", function (d, i) {
                return color(i);
            });

        node.append("text")
            .attr("dy", ".2em")
            .style("text-anchor", "middle")
            .text(function (d) {
                return d.data.Name.substring(0, d.r / 3);
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", function (d) {
                return d.r / 5;
            })
            .attr("fill", "white");

        node.append("text")
            .attr("dy", "1.3em")
            .style("text-anchor", "middle")
            .text(function (d) {
                return d.data.Count;
            })
            .attr("font-family", "Gill Sans", "Gill Sans MT")
            .attr("font-size", function (d) {
                return d.r / 5;
            })
            .attr("fill", "white");
        
        var zoom = d3.zoom()
            .scaleExtent([1, 8])
            .on('zoom', function (event) {
                    svg.attr('transform', event.transform)

            });

        svg.call(zoom);

        function mouseover() {
            d3.select(this).attr("opacity", .5)

        }

        function mouseout() {
            d3.select(this).attr("opacity", 1);
        }

        function zoomed({ transform }) {
            nodes.attr("transform", transform);
        }


    }



    render() {
        return (
            <svg />
        )
    }

}

export default BubbleChart;
