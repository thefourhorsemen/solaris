import React from "react";
import {DateNetEnergy, NetEnergy} from "../models/NetEnergy";
import NetEnergiesKpiChart from "./NetEnergiesKpiChart";
import NetEnergiesDetailChart from "./NetEnergiesDetailChart";
import {DateSelection} from "../models/DateSelection";
import {Col, Row} from "react-bootstrap";
import {groupBy} from "../functions/Util";
import {ChartType} from "../models/ChartType";

interface NetEnergiesProps {
  date: DateSelection,
  energies: DateNetEnergy[],
  chartType: ChartType;
}

const getGrouper = (chartType: ChartType, date: DateSelection) => {
  return chartType === ChartType.MEASURE ? date.grouper() : date.dayGrouper();
}

const getComputer = (chartType: ChartType) => {
  return chartType === ChartType.MEASURE
      ? (date: Date, energies: NetEnergy[]) => new DateNetEnergy(date, NetEnergy.sum(energies))
      : (date: Date, energies: NetEnergy[]) => new DateNetEnergy(date, NetEnergy.average(energies));
}

const groupByDate = (netEnergies: DateNetEnergy[], grouper: (date: Date) => number) => {
  const grouped = groupBy(netEnergies, energy => grouper(energy.date), energy => energy.energy)
  const result = new Map<Date, NetEnergy[]>()
  grouped.forEach((v, k) => result.set(new Date(k), v))
  return result;
}

const reduce = (grouped: Map<Date, NetEnergy[]>,
                computer: (date: Date, energies: NetEnergy[]) => DateNetEnergy) => {
  const result: DateNetEnergy[] = []
  grouped.forEach((energies, date) => result.push(computer(date, energies)))
  return result
}

const selectEnergies = (date: DateSelection, energies: DateNetEnergy[], grouper: (date: Date) => number,
                        computer: (date: Date, energies: NetEnergy[]) => DateNetEnergy): DateNetEnergy[] => {
  const filtered = energies.filter(energy => date.match(energy.date))
  const grouped = groupByDate(filtered, grouper);
  return reduce(grouped, computer)
}

const EnergiesChart = ({date, energies, chartType}: NetEnergiesProps) => {
  const grouper = getGrouper(chartType, date);
  const computer = getComputer(chartType);

  const selectedEnergies = selectEnergies(date, energies, grouper, computer)
  if (selectedEnergies.length === 0) {
    return <div>No data associated to the selected date</div>
  }

  return <>
    <Row>
      <Col md={8} center>
        <NetEnergiesDetailChart energies={selectedEnergies}/>
      </Col>
      <Col md={4} center>
        <NetEnergiesKpiChart energies={selectedEnergies.map(ds => ds.energy)}/>
      </Col>
    </Row>
  </>
}

export default EnergiesChart