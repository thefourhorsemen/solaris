import React from "react";
import {NetEnergy} from "../models/NetEnergy";
import {Chart} from "react-google-charts";
import {Table} from "react-bootstrap";

enum EnergyUnit {
  Wh = 1, kWh = 1000, MWh = 1000000
}

const energyUnit = (energy: NetEnergy): EnergyUnit => {
  const sum = energy.production + energy.consumption + energy.exported + energy.imported
  const average = sum / 4
  var result: EnergyUnit
  if (average <= EnergyUnit.kWh.valueOf()) {
    result = EnergyUnit.Wh
  } else if (average <= EnergyUnit.MWh.valueOf()) {
    result = EnergyUnit.kWh
  } else {
    result = EnergyUnit.MWh
  }
  return result
}

const round = (value: number, unit: EnergyUnit): number => {
  const mile = value / unit.valueOf()
  return parseFloat(mile.toFixed(2))
}

interface NetEnergiesProps {
  energies: NetEnergy[];
}

const NetEnergiesKpiChart = ({energies}: NetEnergiesProps) => {
  const result = NetEnergy.sum(energies)
  const unit = energyUnit(result)

  const production = round(result.production, unit)
  const consumption = round(result.consumption, unit)
  const exported = round(result.exported, unit)
  const imported = round(result.imported, unit)
  const autoConsumptionEnergy = production - exported

  const prodData = [["Energy", energyUnit], ["Locally consumed", autoConsumptionEnergy], ["Exported", exported]]

  const prodOptions = {
    title: "Production",
    pieHole: 0.25,
    is3D: false,
    colors: ['green', 'grey']
  };
  const consData = [["Energy", energyUnit], ["Locally produced", autoConsumptionEnergy], ["Imported", imported]]

  const consOptions = {
    title: "Consumption",
    pieHole: 0.25,
    is3D: false,
    colors: ['green', 'grey']
  };

  const strUnit = EnergyUnit[unit]
  return <>
    <Chart
        chartType="PieChart"
        options={prodOptions}
        data={prodData}
    />
    <Chart
        chartType="PieChart"
        options={consOptions}
        data={consData}
    />
    <Table borderless>
      <tbody>
      <tr>
        <td align='left'>Production</td>
        <td align='right'>{production}</td>
        <td align='left'>{strUnit}</td>
      </tr>
      <tr>
        <td align='left'>Consumption</td>
        <td align='right'>{consumption}</td>
        <td align='left'>{strUnit}</td>
      </tr>
      <tr>
        <td align='left'>Exported</td>
        <td align='right'>{exported}</td>
        <td align='left'>{strUnit}</td>
      </tr>
      <tr>
        <td align='left'>Imported</td>
        <td align='right'>{imported}</td>
        <td align='left'>{strUnit}</td>
      </tr>
      <tr>
        <td align='left'>Locally comsumed</td>
        <td align='right'>{parseFloat(autoConsumptionEnergy.toFixed(2))}</td>
        <td align='left'>{strUnit}</td>
      </tr>
      </tbody>
    </Table>
  </>
}

export default NetEnergiesKpiChart
