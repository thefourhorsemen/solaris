import React from "react";
import {NetEnergy} from "../common/NetEnergy";
import {Chart} from "react-google-charts";
import {Table} from "react-bootstrap";

interface NetEnergiesProps {
  energies: NetEnergy[];
}

const NetEnergiesKpiChart = ({energies}: NetEnergiesProps) => {
  const result = NetEnergy.sumEnergies(energies)

  const autoConsumptionEnergy = result.production - result.exported

  const prodData = [["Energy", "kWh"], ["Locally consumed", autoConsumptionEnergy], ["Exported", result.exported]]
  const prodOptions = {
    title: "Production",
    pieHole: 0.25,
    is3D: false,
    colors: ['green', 'grey']
  };

  const consData = [["Energy", "kWh"], ["Locally consumed", autoConsumptionEnergy], ["Imported", result.imported]]
  const consOptions = {
    title: "Consumption",
    pieHole: 0.25,
    is3D: false,
    colors: ['green', 'grey']
  };

  const round = (value: number) => {
    const mile = value / 1000
    return mile.toFixed(1)
  }

  return (
      <>
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
            <td align='right'>{round(result.production)}</td>
            <td align='left'>kWh</td>
          </tr>
          <tr>
            <td align='left'>Consumption</td>
            <td align='right'>{round(result.consumption)}</td>
            <td align='left'>kWh</td>
          </tr>
          <tr>
            <td align='left'>Exported</td>
            <td align='right'>{round(result.exported)}</td>
            <td align='left'>kWh</td>
          </tr>
          <tr>
            <td align='left'>Imported</td>
            <td align='right'>{round(result.imported)}</td>
            <td align='left'>kWh</td>
          </tr>
          </tbody>
        </Table>
      </>
  )
}

export default NetEnergiesKpiChart
