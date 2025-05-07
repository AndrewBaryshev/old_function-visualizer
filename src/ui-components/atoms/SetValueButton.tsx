import { FC } from "react";

function roundToTwoNonZeroDigits(number: number) {
  //? Временный вариант
  var numStr = number.toString();
  var decimalIndex = numStr.indexOf(".") + 1;
  var nonZeroIndex = decimalIndex + 2;

  if (decimalIndex === 0) {
    return parseFloat(numStr);
  }

  if (nonZeroIndex >= numStr.length) {
    return parseFloat(numStr).toFixed(decimalIndex - 1);
  }

  while (nonZeroIndex < numStr.length && numStr.charAt(nonZeroIndex) === "0") {
    nonZeroIndex++;
  }

  var roundedNum = parseFloat(numStr.slice(0, nonZeroIndex + 1));
  if (nonZeroIndex === decimalIndex) {
    return roundedNum.toFixed(1);
  } else {
    return roundedNum.toFixed(nonZeroIndex - decimalIndex);
  }
}

export const SetValueButton: FC<any> = ({
  containText,
  value,
  setNewValue,
  step,
  oldValue,
}) => {
  return (
    <div className="flexibility">
      <p>{containText}</p>
      <div className="scaleButton">
        <div
          onClick={() => {
            setNewValue(value / step);
          }}
          className="switch-button-small-minus transition"
        >
          -
        </div>
        <div
          onClick={() => setNewValue(oldValue)}
          className="value-switch-container-some transition"
        >
          {roundToTwoNonZeroDigits(value)}
        </div>
        <div
          onClick={() => setNewValue(value * step)}
          className="switch-button-small-plus transition"
        >
          +
        </div>
      </div>
    </div>
  );
};
