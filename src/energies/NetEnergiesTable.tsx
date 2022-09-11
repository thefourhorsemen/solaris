import React from "react";
import {NetEnergy} from "./NetEnergy";

interface NetEnergyListProps {
  energies: NetEnergy[];
}

function NetEnergiesTable({energies}: NetEnergyListProps) {
  return (
      <>
        <h1>Simple Inventory Table</h1>
        <table>
          <thead>
          <tr>
            <th>Production</th>
            <th>Consumption</th>
            <th>Imported</th>
            <th>Exported</th>
          </tr>
          </thead>
          <tbody>
          {energies.map((item) => (
              <tr>
                <td>{item.production}</td>
                <td>{item.consumption}</td>
                <td>{item.imported}</td>
                <td>{item.exported}</td>
                <td/>
              </tr>
          ))}
          </tbody>
        </table>
      </>
  )
}

export default NetEnergiesTable