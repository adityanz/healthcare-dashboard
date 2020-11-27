import React from 'react';
import * as d3 from 'd3';
import * as d3l from 'd3-svg-legend'

class WaffleChart extends React.Component {
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
        const width = this.props.size[0]
        const height = this.props.size[1]

        // var margin = { top: 20, right: 20, bottom: 70, left: 100 },
        //     width = owidth - margin.left - margin.right,
        //     height = oheight - margin.top - margin.bottom;

        const svg = d3.select("body").select("#wc").select("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


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
        let { width } = this.state;
        let { height } = this.state;

        const data = this.props.data
        console.log("the incoming data", data)
        var total = 0;
        var
            widthSquares = 20,
            heightSquares = 5,
            squareSize = 25,
            squareValue = 0,
            gap = 1,
            theData = [];

        var color = d3.scaleOrdinal(d3.schemeCategory10);

        //total
        total = d3.sum(data, function (d) { return d.total; });

        //value of a square
        squareValue = total / (widthSquares * heightSquares);

        //remap data
        data.forEach(function (d, i) {

            console.log("dataeach", d)
            console.log("index", i)
            d.total = +d.total;
            d.units = (Math.floor(d.total / squareValue)) < 1 ? 1 : (Math.floor(d.total / squareValue));
            theData = theData.concat(
                Array(d.units + 1).join(1).split('').map(function () {
                    return {

                        squareValue: squareValue,
                        units: d.units,
                        total: d.total,
                        groupIndex: i

                    };
                })
            );
        });

        width = (squareSize * widthSquares) + widthSquares * gap + 25;
        height = (squareSize * heightSquares) + heightSquares * gap + 25;
        console.log("end")
        console.log(theData)
        svg.append("g")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .selectAll("div")
            .data(theData)
            .enter()
            .append("rect")
            .attr("width", squareSize)
            .attr("height", squareSize)
            .attr("fill", function (d) {
                { console.log(d) }
                return color(data[d.groupIndex].diagnosis);
            })
            .attr("x", function (d, i) {
                //group n squares for column
                let col = Math.floor(i / heightSquares);
                return (col * squareSize) + (col * gap);
            })
            .attr("y", function (d, i) {
                let row = i % heightSquares;
                return (heightSquares * squareSize) - ((row * squareSize) + (row * gap))
            })
            .append("title")
            .text(function (d, i) {
                return "diagnosis range: " + data[d.groupIndex].diagnosis + " | " + d.total + " , " + d.units + "%"
            });

        var legend = d3l.legendColor()
            .scale(color)
            .shape('circle')
            .orient('vertical')
            .labelOffset(5)


        svg.append("g")
            .attr("class", "legend")
            .attr("transform", "translate(" + (width - 10) + ", " + 10 + ")")
            .style("font-size", "12")

        svg.select(".legend")
            .call(legend);
        
    }



    render() {
        return (
            <svg />
        )
    }

}

export default WaffleChart;
