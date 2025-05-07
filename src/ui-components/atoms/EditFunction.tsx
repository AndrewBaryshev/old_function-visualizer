import { FC, useState } from "react";
import { templateFunctions } from "../../logic";
import { EditParameters } from "../molecules/EditParameters";

export const EditFunction: FC<any> = ({
  index,
  containText,
  method,
  setMethod,
  arrFunctions,
  setArrFunctions,
}) => {
  const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false);

  function deleteCurr() {
    const indexToDelete = index; // Удаляем элемент с индексом 2 (число 3)
    const newArray1 = method.filter((_: any, i: any) => i !== indexToDelete);
    const newArray2 = arrFunctions.filter(
      (_: any, i: any) => i !== indexToDelete
    );

    setMethod([...newArray1]);
    setArrFunctions([...newArray2]);
  }

  return (
    <div className="button-add-function">
      <div
        onClick={() => deleteCurr()}
        className="switch-button-small-minus transition"
      >
        -
      </div>
      <div
        onClick={() => setIsOpenAdd(!isOpenAdd)}
        className="value-switch-container-interface transition"
      >
        {containText}
      </div>
      {isOpenAdd && (
        <EditParameters
          index={index}
          method={method}
          setMethod={setMethod}
          arrFunctions={arrFunctions}
          setArrFunctions={setArrFunctions}
          setIsOpenAdd={setIsOpenAdd}
          isOpenAdd={isOpenAdd}
        ></EditParameters>
      )}
    </div>
  );
};
