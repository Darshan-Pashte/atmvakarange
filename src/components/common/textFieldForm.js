// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";
// import { Controller } from "react-hook-form";
// import Textfield from "./textField";

// export default function TextFieldForm(props) {
//   const { TextFieldProps, rules, controlerProps, required = false } = props;
//   return (
//     <Controller
//       {...controlerProps}
//       rules={rules}
//       render={({ field, fieldState }) => {
//         return (
//           <Textfield
//             value={field.value}
//             // label={label}
//             autoComplete="off"
//             {...field}
//             {...TextFieldProps}
//             // label={<>{TextFieldProps.label}{required ? <sup className="validationStart">*</sup> : null}</>}
//             // {...required}
//             error={required && !!fieldState.error}
//             helperText={required && fieldState.error?.message}
//             InputLabelProps={{
//               shrink: field.value ? true : false,
//             }}
//           />
//         );
//       }}
//     />
//   );
// }

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller } from "react-hook-form";
// import Textfield from "./textField";


import { styled, Button } from "@mui/material";
import InputBase from '@mui/material/InputBase';
import { alpha } from '@mui/material/styles';
import Textfield from "./textField";


export default function TextFieldForm(props) {
  const {
    TextFieldProps,
    rules,
    controlerProps,
    required = false,
    regExp,
    newLine=false,
    backgroundColor=false,
  } = props;


  return (
    <Controller
      {...controlerProps}
      rules={rules}
      render={({ field, fieldState }) => {
        const handleInputChange = (event) => {
          const regex = regExp;
          const { name, value } = event.target;
        
          // Replace newline characters ("\n") with commas (",")
          console.log("name, value", name, value);

          let uppercaseValue;

          if (newLine) {
            uppercaseValue = value.replace(/\n/g, ",");
                      
          } else if (name === "atmid" || name==="luno" ||name==="location" || name==="state" || name==="country") {
            uppercaseValue = value
              .split("")
              .map((char) => char.toUpperCase())
              .join("");
          } else {
            uppercaseValue = value;
          }
        
          const isValidInput = regex.test(uppercaseValue) || uppercaseValue === "";
        
          if (!isValidInput) {
            event.preventDefault();
            return;
          }
        
          field.onChange(uppercaseValue);
        };

        return (
          <Textfield
            value={field.value}
            autoComplete="off"
            {...field}
            {...TextFieldProps}
            // label={
            //   <>
            //     {TextFieldProps.label}
            //     {required && <sup className="validationStart">*</sup>}
            //   </>
            // }

            sx={{
              "& fieldset": { border: 'none' },
              '& .MuiInputBase-root':{
                padding: '4px 0 5px'
              },
              '& .MuiInputBase-input': {
                borderRadius: '6px',
                position: 'relative',
                // backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
                // backgroundColor: '#FFF',
                backgroundColor: !backgroundColor?'#FFF' : "#eee",
           
                
                border: '1px solid',
                // borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
                // borderColor: 'red',
                fontSize: '13px',
                height : "2px",
                color: '#888',
                fontWeight:'500',
                
                // width: '520px',
                padding: '16px 12px',
              }
            }}
            error={required && !!fieldState.error}
            helperText={required && fieldState.error?.message}
            InputLabelProps={{
              shrink: field.value ? true : false,
            }}
            onChange={handleInputChange}
          />
        );
      }}
    />
  );
}
