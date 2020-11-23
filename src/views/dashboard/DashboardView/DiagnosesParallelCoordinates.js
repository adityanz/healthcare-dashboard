import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import ScatterPlot from './ScatterPlot';
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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ParallelCoordinates from './ParallelCoordinates'
const useStyles = makeStyles(() => ({
    root: {}
}));

function pcv1data(dataset) {
    console.log("data1", dataset.map(function (d) { return d.diagnosis; }))
    console.log("datase1", dataset)

    let arr = []
    for (var i = 0; i < dataset.length; i++) {
        let m = {}
        let f = {}
        m.disease = dataset[i].diagnosis
        f.disease = dataset[i].diagnosis

        for (var j = 0; j < dataset[i].values.length; j++) {
            let dist = dataset[i].values[j].distribution
            let raw = dist.split("(")[1]
            let bare = dist.split("(")[0]
            let key = bare.trim()
            let gender = raw.split(")")[0]
            let value = dataset[i].values[j].value

            if (gender == "M") {
                m[key] = value
                m.type = "Male"
            }
            else if (gender == "F") {
                f[key] = value
                f.type = "Female"
            }

        }
        arr.push(m)
        arr.push(f)
    }
    console.log("arr1",arr)
    return arr

}


function pcv2data(dataset) {
    console.log("data2", dataset.map(function (d) { return d.diagnosis; }))
    console.log("dataset2", dataset)

    let arr = []
    for (var i = 0; i < dataset.length; i++) {
        let m = {}
        let f = {}
        m.disease = dataset[i].diagnosis
        f.disease = dataset[i].diagnosis

        for (var j = 0; j < dataset[i].values.length; j++) {
            let dist = dataset[i].values[j].distribution
            let raw = dist.split("(")[1]
            let bare = dist.split("(")[0]
            let key = bare.trim()
            let gender = raw.split(")")[0]
            let value = dataset[i].values[j].value

            if (gender == "English") {
                m[key] = value
                m.type = "English"
            }
            else if (gender == "Non-English") {
                f[key] = value
                f.type = "Non-English"
            }

        }
        arr.push(m)
        arr.push(f)
    }
    console.log("arr2", arr)
    return arr

}

const DiagnosesParallelCoordinates = ({ className, ...rest }) => {
    const classes = useStyles();
    const theme = useTheme();

    let [loading, setLoading] = React.useState(true);
    let [data, setData] = React.useState([]);
    const [check, setCheck] = React.useState({
        a: true,
        b: true,
        c: true,
        d: true,
    });

    React.useEffect(() => {
        let apiUrl = 'https://visualizing-healthcare-data.wm.r.appspot.com/data/insurance/gender';
        let apiUrl2 = 'https://visualizing-healthcare-data.wm.r.appspot.com/data/insurance/language';
        fetch(apiUrl)
            .then((response) => response.json())
            .then(result => pcv1data(result))
            .then(result => {
                setData(result);
            })
        fetch(apiUrl2)
            .then((response) => response.json())
            .then(result => pcv2data(result))
            .then(result => {
                setData(data.concat(result));
                setLoading(false);
            })
    }, [])
    console.log(data)

    const handleChange = (event) => {
        setCheck(event.target.value);
    };

    return (
        <Card
            className={clsx(classes.root, className)}
            {...rest}
        >
            <CardHeader
                action={(
                    <FormControlLabel
                        control={<Checkbox checked={check.checkedA} onChange={handleChange} name="checkedA" />}
                        label="Secondary"
                    />
                )}
                title="Parallel Coordinates"
            />
            <Divider />
            <CardContent id={"pc"}>
                {/* <Box
          id={"gbc"}
          height={400}
          position="relative"
        > */}
                {!loading ? <ParallelCoordinates data={data} size={[800, 800]} /> : <CircularProgress />}
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

DiagnosesParallelCoordinates.propTypes = {
    className: PropTypes.string
};

export default DiagnosesParallelCoordinates;
