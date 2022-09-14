import React from "react";
import {NetEnergy} from "./NetEnergy";

interface NetEnergyListProps {
  energies: NetEnergy[];
}

function NetEnergiesTable({energies}: NetEnergyListProps) {
  const rows = energies.map((energy) => (
      <tr>
        <td>{energy.date.toString()}</td>
        <td>{energy.production}</td>
        <td>{energy.consumption}</td>
        <td>{energy.imported}</td>
        <td>{energy.exported}</td>
        <td/>
      </tr>
  ))
  return (
      <>
        <h1>Simple Inventory Table</h1>
        <table>
          <thead>
          <tr>
            <th>Date</th>
            <th>Production</th>
            <th>Consumption</th>
            <th>Imported</th>
            <th>Exported</th>
          </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </>
  )
}

export default NetEnergiesTable