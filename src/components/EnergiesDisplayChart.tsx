import React from "react";
import {NetEnergy} from "../models/NetEnergy";
import NetEnergiesKpiChart from "./NetEnergiesKpiChart";
import NetEnergiesDetailChart from "./NetEnergiesDetailChart";
import {DateSelection} from "../models/DateSelection";
import {Col, Row} from "react-bootstrap";
import {groupBy, transformMap} from "../functions/Util";

interface NetEnergiesProps {
  date: DateSelection,
  energies: NetEnergy[];
}

const groupByDate = (netEnergies: NetEnergy[], date: DateSelection) => {
  const grouped = groupBy(netEnergies, energy => {
    return date.grouper()(energy.date)
  })
  const result = new Map<Date, NetEnergy[]>()
  grouped.forEach((v, k) => result.set(new Date(k), v))
  return result;
}

const sum = (grouped: Map<Date, NetEnergy[]>) => {
  const reduced = transformMap(grouped, values => NetEnergy.sumEnergies(values))
  const result: NetEnergy[] = []
  reduced.forEach((v, k) => result.push(NetEnergy.from(k, v)))
  return result
}

const selectEnergies = (date: DateSelection, energies: NetEnergy[]): NetEnergy[] => {
  const filtered = energies.filter(energy => date.match(energy.date))
  const grouped = groupByDate(filtered, date);
  return sum(grouped)
}

const EnergiesDisplayChart = ({date, energies}: NetEnergiesProps) => {
  const selectedEnergies = selectEnergies(date, energies)
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

export default EnergiesDisplayChart