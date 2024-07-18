import { useEffect, useState, useRef } from "react";
import ErrorMessage from "./ErrorMessage";
import Mandate from "./Mandate";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

export default function DropDownSelect({
    label,
    data,
    displayValue,
    returnValue,
    width,
    placeholder,
    value,
    setValue,
    mandate,
    error,
    disabled,
    onClear,
}) {

    const inputStyle = {
        width: width || "100%",
    };

    // const handleOnSearch = (string, results) => {
       
    // }


    const handleOnSelect = (item) => {
        setValue(item)
    }

    return (
        <div
            className={`flex flex-col min-w-[200px]  max-w-[250px]`}
            style={{
                width: inputStyle.width,
            }}
        >
            <div className="text-[#344054] text-[12px] pl-1 font-medium mb-1">
                {label}
                <Mandate mandate={mandate} />
            </div>

            <ReactSearchAutocomplete
                items={data}
                placeholder={placeholder}
                // onSearch={handleOnSearch
                onSelect={handleOnSelect}
                resultStringKeyName={displayValue}
                inputSearchString={value}
                fuseOptions={{
                    keys: [
                        displayValue
                    ]
                }}
                onClear={onClear}
                // autoFocus
                styling={{
                    fontSize: '12px',
                    zIndex: '999',
                    borderRadius: '8px',
                    height: '39px',
                    border: "1px solid lightgray",
                    boxShadow: "none",
                    hoverBackgroundColor: "none"
                }}
                className="searchAutoComplete"
            //    formatResult={formatResult}
            />
            {!value && error && <ErrorMessage>{error}</ErrorMessage>}
        </div>
    );
}
