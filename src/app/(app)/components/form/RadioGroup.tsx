import React from "react";
import RadioButton, { RadioButtonModel } from "./RadioButton";

interface Props {
  displayName: string;
  radios: RadioButtonModel[];
  className?: string
}

const RadioGroup = ({ displayName, radios, className }: Props) => {
  const radioElems = radios.map((radio) => {
    return (
      <RadioButton
        key={radio.value}
        name={radio.name}
        displayName={radio.displayName}
        value={radio.value}
        checked={radio.checked}
        onChange={radio.onChange}
      />
    );
  });

  return (
    <div className={`flex flex-col full-width m-2 ${className}`}>
      <p>{displayName}</p>
      <div className={`hide-scrollbar flex overflow-x-scroll my-2`}>{radioElems}</div>
    </div>
  );
};

export default RadioGroup;
