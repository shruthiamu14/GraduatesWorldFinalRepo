// import { useState } from "react";
// import "../css/Forminput.css";

// const FormInput = (props) => {
//   const [focused, setFocused] = useState(false);
//   const { label, errorMessage, onChange, id, ...inputProps } = props;

//   const handleFocus = (e) => {
//     setFocused(true);
//   };

//   return (
//     <div className="formInput">
//       <label className="rgformlabe;">{label}</label>
//       <input className="rgforminp"
//         {...inputProps}
//         onChange={onChange}
//         onBlur={handleFocus}
//         onFocus={() =>
//           inputProps.name === "confirmPassword" && setFocused(true)
//         }
//         focused={focused.toString()}
//       />
//       <span className="rgformspan">{errorMessage}</span>
//     </div>
//   );
// };

// export default FormInput;

import React, { useState } from "react";
import "../css/Forminput.css";

const FormInput = ({ type, label, options, onChange, errorMessage, id, ...inputProps }) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
     setFocused(true);
  };

  return (
    <div className="formInput">
      <label className="rgformlabe">{label}</label>
      {type === "select" ? (
        <select
          className="rgforminp"
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleFocus}
          focused={focused.toString()}
          {...inputProps}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          className="rgforminp"
          type={type}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleFocus}
          focused={focused.toString()}
          {...inputProps}
        />
      )}
      <span className="rgformspan">{errorMessage}</span>
    </div>
  );
};

export default FormInput;
