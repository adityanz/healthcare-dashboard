import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import GroupedBarChart from './GroupedBarChart';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    useTheme,
    makeStyles,
    colors,
    CardActions
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import StackedBarChart from './StackedBarChart'
import { LocalConvenienceStoreOutlined } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
    root: {}
}));

function stackedbarP(dataset, selector) {
    console.log("localdata", dataset)
    let arr = []
    for (var i = 0; i < dataset.length; i++) {
        for (var j = 0; j < dataset[i].values.length; j++) {
            let o = {}
            let diagnosis = dataset[i].diagnosis
            let distribution = dataset[i].values[j].distribution
            let dist = dataset[i].values[j].distribution
            let raw = dist.split("(")[1]
            let bare = dist.split("(")[0]
            let key = bare.trim()
            let gender = raw.split(")")[0]
            let value = dataset[i].values[j].value
            o.gender = gender
            o.disease = diagnosis
            o.total = value;
            o[key] = value
            arr.push(o)
        }
    }
    console.log(arr,"arr")
    console.log(selector,"selector")
    let arr_filtered = arr.filter(function (e) {
        return e.gender === selector;
    });

    let output = []
    arr_filtered.forEach(function (item) {
        var exist = output.filter(function (v, i) {
            return v.disease == item.disease
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
    output.sort(function (a, b) { return b.total - a.total; });
    console.log("output",output)
    return output
}

const DiagnosesStackedBarChart = ({ className, ...rest }) => {
    const classes = useStyles();
    const theme = useTheme();

    let [loading, setLoading] = React.useState(true);
    let [data, setData] = React.useState([]);
    let [selector, setSelector] = React.useState('M');
    let [scale, setScale] = React.useState({
        logarithmic: false,
    });

    console.log(selector)
    React.useEffect(() => {
        let apiUrl = 'https://visualizing-healthcare-data.wm.r.appspot.com/data/insurance/gender';
        fetch(apiUrl)
            .then((response) => response.json())
            .then(result => stackedbarP(result,selector))
            .then(result => {
                setData(result);
                setLoading(false);
            })
    }, [selector])
    console.log(data)

    const handleCategory = (event) => {
        setLoading(true)
        setSelector(event.target.value);
    };

    // const handleScale = (event) => {
    //     setScale({ ...scale, [event.target.name]: event.target.checked });
    // };

    return (
        <Card
            className={clsx(classes.root, className)}
            {...rest}
        >
            <CardHeader
                action={(
                    <Select
                        endIcon={<ArrowDropDownIcon />}
                        value={selector}
                        onChange={handleCategory}
                    >
                        <MenuItem value={"M"}>Male</MenuItem>
                        <MenuItem value={"F"}>Female</MenuItem>
                    </Select>
                )}
                title="Q5 Insurance Stacked Bar"
            />
            <Divider />
            <CardContent id={"sb"}>
                {/* <Box
          id={"gbc"}
          height={400}
          position="relative"
        > */}
                {!loading ? <StackedBarChart data={data} selector={selector} scale={scale} size={[1200, 800]} /> : <CircularProgress />}
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

DiagnosesStackedBarChart.propTypes = {
    className: PropTypes.string
};

export default DiagnosesStackedBarChart;