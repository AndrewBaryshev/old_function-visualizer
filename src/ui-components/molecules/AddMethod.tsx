import { FC, useState } from "react";
import { AddFunctionButton } from "../atoms/AddFunctionButton";
import { EditFunction } from "../atoms/EditFunction";

export const AddMethod: FC<any> = ({ method, setMethod }) => {
  const [arrFunctions, setArrFunctions] = useState<any>([]);

  return (
    <div className="add-method-container">
      {method.map((elem: any) => {
        let indexBuf = method.indexOf(elem);
        return (
          <EditFunction
            index={indexBuf}
            method={method}
            setMethod={setMethod}
            containText={arrFunctions[indexBuf].name}
            arrFunctions={arrFunctions}
            setArrFunctions={setArrFunctions}
          ></EditFunction>
        );
      })}
      <AddFunctionButton
        method={method}
        setMethod={setMethod}
        containText={"Add function"}
        arrFunctions={arrFunctions}
        setArrFunctions={setArrFunctions}
      ></AddFunctionButton>
    </div>
  );
};
