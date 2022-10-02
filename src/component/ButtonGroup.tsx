import React, {useState} from "react";
import "./button-group.css";

interface ButtonProps {
  buttons: string[],
  selectButton: (id: number) => void
}

const ButtonGroup = ({buttons, selectButton}: ButtonProps) => {
  const [clickedId, setClickedId] = useState(0);

  const handleClick = (id: number) => {
    setClickedId(id)
    selectButton(id)
  };

  return (
      <>
        {buttons.map((buttonLabel, i) => (
            <button key={i}
                    name={buttonLabel}
                    onClick={() => handleClick(i)}
                    className={i === clickedId ? "customButton active" : "customButton"}>
              {buttonLabel}
            </button>
        ))}
      </>
  )
}

export default ButtonGroup
