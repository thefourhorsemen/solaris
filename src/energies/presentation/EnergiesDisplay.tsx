import React, {useState} from "react";
import {NetEnergy} from "../common/NetEnergy";
import NetEnergiesDate from "./NetEnergiesDate";
import EnergiesDisplayChart from "./EnergiesDisplayChart";
import {DateRange, DateSelection} from "../common/DateSelection";
import {Container, Row} from "react-bootstrap";

interface NetEnergiesProps {
  energies: NetEnergy[];
}

const EnergiesDisplay = ({energies}: NetEnergiesProps) => {
  const [currentDate, setCurrentDate] = useState(new DateSelection(DateRange.Day, energies[energies.length - 1].date))

  return (
      <Container>
        <Row>
          <NetEnergiesDate date={currentDate} setDate={setCurrentDate}/>
          <EnergiesDisplayChart date={currentDate} energies={energies}/>
        </Row>
      </Container>
  )
}

export default EnergiesDisplay