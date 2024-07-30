import React from 'react';
import {useField} from 'formik';

function Input({label, id, name, value, onChange, type, placeholder, error, touched, required, className, onBlur
}){
  return(
    <>
      <div className="flex flex-col h-8">
        <label htmlFor={id} className="sr-only">{label}</label>
        <input 
          value={value}
          onChange={onChange}
          onBlur={onBlur}
           id={id} 
          placeholder={placeholder}
           className={className + "border-2 px-2 py-1 border-l-0"}
          />
          {/* {touched && error && <p className="text-red-600 text-sm">{error}</p>} */}
      </div>
    </>
  )
}

export default Input;