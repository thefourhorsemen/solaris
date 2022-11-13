import React from "react";
import {NetEnergy} from "../models/NetEnergy";
import NetEnergiesKpiChart from "./NetEnergiesKpiChart";
import NetEnergiesDetailChart from "./NetEnergiesDetailChart";
import {DateSelection} from "../models/DateSelection";
import {Col, Row} from "react-bootstrap";
import {groupBy, transformMap} from "../functions/Util";
import {ChartType} from "../models/ChartType";

interface NetEnergiesProps {
  date: DateSelection,
  energies: NetEnergy[],
  chartType: ChartType;
}

const getGrouper = (chartType: ChartType, date: DateSelection) => {
  return chartType === ChartType.MEASURE
      ? date.grouper()
      : date.dayGrouper();
}

const getComputer = (chartType: ChartType) => {
  return chartType === ChartType.MEASURE
      ? (k: Date, v: { production: number; consumption: number; exported: number; imported: number; count: number; }) => NetEnergy.from(k, v)
      : (k: Date, v: { production: number; consumption: number; exported: number; imported: number; count: number; }) => NetEnergy.average(k, v);
}

const groupByDate = (netEnergies: NetEnergy[], grouper: (date: Date) => number) => {
  const grouped = groupBy(netEnergies, energy => {
    return grouper(energy.date)
  })
  const result = new Map<Date, NetEnergy[]>()
  grouped.forEach((v, k) => result.set(new Date(k), v))
  return result;
}

const sum = (grouped: Map<Date, NetEnergy[]>,
             computer: (k: Date, v: { production: number; consumption: number; exported: number; imported: number; count: number }) => NetEnergy) => {
  const reduced = transformMap(grouped, values => NetEnergy.sumEnergies(values))
  const result: NetEnergy[] = []
  reduced.forEach((v, k) => result.push(computer(k, v)))
  return result
}

const selectEnergies = (date: DateSelection, energies: NetEnergy[], grouper: (date: Date) => number,
                        computer: (k: Date, v: { production: number; consumption: number; exported: number; imported: number; count: number }) => NetEnergy): NetEnergy[] => {
  const filtered = energies.filter(energy => date.match(energy.date))
  const grouped = groupByDate(filtered, grouper);
  return sum(grouped, computer)
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
        <NetEnergiesKpiChart energies={selectedEnergies}/>
      </Col>
    </Row>
  </>
}

export default EnergiesChart