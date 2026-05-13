import React from "react";
import {DateNetEnergy} from "../models/NetEnergy";
import {Chart} from "react-google-charts";

interface NetEnergiesProps {
    energies: DateNetEnergy[];
}

const EnergiesChart = ({energies}: NetEnergiesProps) => {
    const data = [["Time", "Production", "Consumption", "Exported", "Imported", "Stored", "Released"]]

    const rows = energies.map(it => it.to())
    // @ts-ignore
    rows.forEach((it: []) => data.push(it))

    const options = {
        title: "Solar panel tracking",
        vAxis: {title: "Wh"},
        hAxis: {title: "Time"},
        legend: {position: 'bottom'},
        seriesType: "bars",
        isStacked: true,
        colors: ['blue', 'orange', 'grey', 'grey', 'green', 'green']
    };

    return <>
        <Chart
            chartType="ComboChart"
            width="100%"
            height="80%"
            data={data}
            options={options}
        />
    </>
}

const BatteryChart = ({energies}: NetEnergiesProps) => {
    const data = [["Time", "State of Charge"]]

    const rows = energies.map(it => it.soc())
    // @ts-ignore
    rows.forEach((it: []) => data.push(it))

    const options = {
        title: "Battery status",
        vAxis: {title: "State of charge (%)", minValue: 0, maxValue: 100},
        hAxis: {title: "Time"},
        legend: {position: 'bottom'},
        colors: ['green']
    };

    return <>
        <Chart
            chartType="AreaChart"
            width="100%"
            height="40%"
            data={data}
            options={options}/></>
}

const NetEnergiesDetailChart = ({energies}: NetEnergiesProps) => {
    return <>
        <EnergiesChart energies={energies}/>
        <BatteryChart energies={energies}/>
    </>
}

export default NetEnergiesDetailChart
