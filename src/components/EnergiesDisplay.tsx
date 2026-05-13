import React, {useState} from "react";
import {DateNetEnergy} from "../models/NetEnergy";
import NetEnergiesDate from "./NetEnergiesDate";
import {DateRange, DateSelection} from "../models/DateSelection";
import {ChartType} from "../models/ChartType";
import EnergiesChart from "./EnergiesChart";
import BatteryDisplay from "./BatteryDisplay";

const Divider = () => {
    return (
        <hr
            style={{borderTop: "10px solid lightgrey"}}
        ></hr>
    );
};

interface NetEnergiesProps {
    energies: DateNetEnergy[];
}

const RenderAll = (energies: DateNetEnergy[]) => {
    const [currentDate, setCurrentDate] = useState(new DateSelection(DateRange.Day, energies[energies.length - 1].date))
    const [chartType, setChartType] = useState(ChartType.MEASURE)
    const [energiesWithBattery, setEnergiesWithBattery] = useState(energies)

    return <>
        <NetEnergiesDate date={currentDate} setDate={setCurrentDate} setChartType={setChartType}/>
        <Divider/>
        <EnergiesChart date={currentDate} energies={energiesWithBattery}
                       chartType={chartType}/>
        <Divider/>
        <BatteryDisplay energies={energies} setEnergies={setEnergiesWithBattery}/>
    </>
}

const EnergiesDisplay = ({energies}: NetEnergiesProps) => {
    if (energies.length === 0) {
        return <div>Nothing to display</div>
    }

    return RenderAll(energies)
}

export default EnergiesDisplay