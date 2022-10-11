import React from "react";
import {NetEnergy} from "../common/NetEnergy";
import {Chart} from "react-google-charts";
import {Container, Table} from "react-bootstrap";

interface NetEnergiesProps {
  energies: NetEnergy[];
}

const NetEnergiesKpiChart = ({energies}: NetEnergiesProps) => {
  const result = energies.reduce((acc, val) => ({
    production: acc.production + val.production / 1000,
    consumption: acc.consumption + val.consumption / 1000,
    exported: acc.exported + val.exported / 1000,
    imported: acc.imported + val.imported / 1000
  }), {production: 0, consumption: 0, exported: 0, imported: 0})

  const autoConsumptionEnergy = result.production - result.exported

  const prodData = [["Energy", "kWh"], ["Locally consumed", autoConsumptionEnergy], ["Exported", result.exported]]
  const prodOptions = {
    title: "Production",
    pieHole: 0.4,
    is3D: false,
    colors: ['green', 'grey']
  };

  const consData = [["Energy", "kWh"], ["Locally consumed", autoConsumptionEnergy], ["Imported", result.imported]]
  const consOptions = {
    title: "Consumption",
    pieHole: 0.4,
    is3D: false,
    colors: ['green', 'grey']
  };

  return (
      <Container>
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
            <td align='right'>{Math.round(result.production).toFixed(1)}</td>
            <td align='left'>kWh</td>
          </tr>
          <tr>
            <td align='left'>Consumption</td>
            <td align='right'>{Math.round(result.consumption).toFixed(1)}</td>
            <td align='left'>kWh</td>
          </tr>
          <tr>
            <td align='left'>Exported</td>
            <td align='right'>{Math.round(result.exported).toFixed(1)}</td>
            <td align='left'>kWh</td>
          </tr>
          <tr>
            <td align='left'>Imported</td>
            <td align='right'>{Math.round(result.imported).toFixed(1)}</td>
            <td align='left'>kWh</td>
          </tr>
          </tbody>
        </Table>
      </Container>
  )
}

export default NetEnergiesKpiChart
