import { createContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";

export const ConnContext = createContext();
export const ConnProvider = ({ children }) => {
//   const [isLoading, setIsLoading] = useState(false);
  const [AtmId, setAtmID] = useState([]);
 

  
  let defaultFormData = {
    AtmId: "",
  };

 

  const {
    control,
    handleSubmit,
    setValue,
    register,
    getValues,
    formState,
    watch,
    reset,
  } = useForm({
    defaultValues: defaultFormData,
    mode: "onChange",
  });

  const useFormData = {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState,
    watch,
    reset,
    register,
  };

  return (
    <ConnContext.Provider
      value={{
       AtmId,setAtmID
      }}
    >
      {children}
    </ConnContext.Provider>
  );
};