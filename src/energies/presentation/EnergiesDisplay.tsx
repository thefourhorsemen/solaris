import React, {useState} from "react";
import {NetEnergy} from "../common/NetEnergy";
import NetEnergiesDate from "./NetEnergiesDate";
import EnergiesDisplayChart from "./EnergiesDisplayChart";
import {DateRange, DateSelection} from "../common/DateSelection";
import {MDBContainer, MDBRow} from "mdb-react-ui-kit";

interface NetEnergiesProps {
  energies: NetEnergy[];
}

const EnergiesDisplay = ({energies}: NetEnergiesProps) => {
  const [currentDate, setCurrentDate] = useState(new DateSelection(DateRange.Day, energies[energies.length - 1].date))

  return (
      <MDBContainer>
        <MDBRow>
          <NetEnergiesDate date={currentDate} setDate={setCurrentDate}/>
          <EnergiesDisplayChart date={currentDate} energies={energies}/>
        </MDBRow>
      </MDBContainer>
  )
}

export default EnergiesDisplay