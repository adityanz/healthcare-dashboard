import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import AreaChart from './AreaChart';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    useTheme,
    makeStyles,
    colors
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles(() => ({
    root: {}
}));


function areaP(dataset) {
    let arr = []
    console.log("aledata", dataset)
    console.log("dataprocess values")
    dataset.forEach(function (d) {
        d.values.forEach(function (e) {
            let o = {}
            o[d.diagnosis] = e.value
            o.id = e.age
            o.total = e.value
            arr.push(o)
        })
    });
    console.log("arr", arr)

    let output = []

    arr.forEach(function (item) {
        console.log("each item", item)
        var exist = output.filter(function (v, i) {
            return v.id == item.id
        });
        console.log("exist", exist)
        if (exist.length) {
            var index = output.indexOf(exist[0]);
            var total = output[index].total + item.total;
            console.log("index", index)
            console.log("total", total)
            Object.assign(output[index], item);
            output[index].total = total;
        } else {
            if (typeof item.value == 'string') {
                console.log("string", item.value)
                item.value = [item.value];
            }
            console.log("item", item)
            output.push(item);
        }
    });
    output.sort(function (a, b) { return a.id - b.id; });

    console.log("output", output)
    return output
}

function getKeys(dataset)
{
    return dataset.map(function (d) { return d.diagnosis; });
}
const DiagnosesLineChart = ({ className, ...rest }) => {
    const classes = useStyles();
    const theme = useTheme();

    let [loading, setLoading] = React.useState(true);
    let [data, setData] = React.useState([]);
    let [keys, setKeys] = React.useState([]);

    React.useEffect(() => {
        let apiUrl = 'https://visualizing-healthcare-data.wm.r.appspot.com/data/age/';
        fetch(apiUrl)
            .then((response) => response.json())
            .then(result => {
                setData(areaP(result));
                setKeys(getKeys(result));
                setLoading(false);
            })
    }, [])
    console.log(data)

    // const handleChange = (event) => {
    //     setSelector(event.target.value);
    // };

    return (
        <Card
            className={clsx(classes.root, className)}
            {...rest}
        >
            <CardHeader
                // action={(
                //     <Select
                //         endIcon={<ArrowDropDownIcon />}
                //         value={selector}
                //         onChange={handleChange}
                //     >
                //         <MenuItem value={0}>Chest Pain</MenuItem>
                //         <MenuItem value={1}>Pneumonia</MenuItem>
                //         <MenuItem value={2}>Sepsis</MenuItem>
                //         <MenuItem value={3}>Trauma</MenuItem>
                //     </Select>
                // )}
                title="Q4 Age Area Chart"
            />
            <Divider />
            <CardContent id={"lc"}>
                {/* <Box
          id={"gbc"}
          height={400}
          position="relative"
        > */}
                {!loading ? <AreaChart data={data} keys={keys} size={[800, 800]} /> : <CircularProgress />}
                {/* </Box> */}
            </CardContent>
            <Divider />
            <Box
                display="flex"
                justifyContent="flex-end"
                p={2}
            >
                {/* <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          Overview
        </Button> */}
            </Box>
        </Card>
    );
};

DiagnosesLineChart.propTypes = {
    className: PropTypes.string
};

export default DiagnosesLineChart;
