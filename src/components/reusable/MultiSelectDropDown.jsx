import { useEffect, useState, useRef } from "react";
import ErrorMessage from "./ErrorMessage";
import Mandate from "./Mandate";

export default function MultiSelectDropDown({
    label,
    data,
    displayValue,
    returnValue,
    width,
    mandate,
    placeholder,
    selectedOptions,
    setSelectedOptions,
    error
}) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef();

    const [selected, setSelected] = useState([]);

    const [isChecked, setIsChecked] = useState({});

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleOptionClick = (index) => {
        const option = data[index][displayValue];

        setIsChecked((prevChecked) => {
            const updatedChecked = { ...prevChecked };
            updatedChecked[option] = !updatedChecked[option];
            return updatedChecked;
        });

        if (selectedOptions) {
            if (selectedOptions.includes(data[index][returnValue])) {
                removeOption(option);
            } else {
                setSelectedOptions([...selectedOptions, data[index][returnValue]]);
            }
        } else {
            setSelectedOptions([data[index][returnValue]]);
        }

        if (selected) {
            if (selected.includes(option)) {
                removeOption(option);
            } else {
                setSelected([...selected, option]);
            }
        }
        else {
            setSelected([option]);
        }
    };

    const removeOption = (option) => {
        setSelectedOptions((currentSelectedOptions) => {
            const item = data.find(item => item[displayValue] === option);
            return currentSelectedOptions.filter(selected => selected !== item[returnValue]);
        });


        setSelected((currentSelected) => {
            return currentSelected.filter(selected => selected !== option);
        });

        setIsChecked((prevChecked) => {
            const updatedChecked = { ...prevChecked };
            updatedChecked[option] = false;
            return updatedChecked;
        });
    };

    const displayOptions = () => {
        return (
            <div className="flex flex-wrap w-full gap-3">
                {selected.map((option, index) => (
                    <span key={index} className="flex gap-2 justify-center items-center px-2 bg-[#F1F6F9] p-1 rounded-[4px]">
                        <p className="font-medium text-[#667085]">{option}</p>
                        <button
                            className="text-lg font-medium pt-[1px]"
                            onClick={(e) => {
                                e.stopPropagation();
                                removeOption(option);
                            }}
                        >
                            <svg width="10" height="10" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 4L1 1M4 4L7 7M4 4L7 1M4 4L1 7" stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </span>
                ))}
            </div>
        );
    };

    const checkBoxStyle = `
        .custom-checkbox {
            position: relative;
            display: inline-block;
            margin-right: 8px;
            bottom: 5px;
        }
        
        .custom-checkbox input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
        }
        
        .checkmark {
            position: absolute;
            top: 0;
            left: 0;
            width: 13px;
            height: 13px;
            border: 1px solid #1849A9;
            border-radius: 3px;
            background-color: #fff;
        }
        
        .checkmark:after {
            content: "";
            position: absolute;
            display: none;
            left: 3px;
            top: 0.5px;
            width: 5px;
            height: 9px;
            border: solid #1849A9;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
            border-radius: 1px;
        }
        
        .custom-checkbox input:checked~.checkmark:after {
            display: block;
        }
    `

    const inputStyle = {
        width: width || "100%",
    };

    return (
        <div className="flex-auto">
            <div className="h-fit">
                <label
                    className="text-[#344054] text-[15px] pl-1 font-medium"
                    htmlFor={label}
                >
                    {label}<Mandate mandate={mandate} />
                </label>
            </div>
            <div ref={dropdownRef} className={`flex-auto relative`}
                style={{
                    width: inputStyle.width
                }}>
                <style>{checkBoxStyle}</style>
                <button
                    id="dropdownDefaultButton"
                    data-dropdown-toggle="dropdown"
                    className={`text-center flex justify-around w-full z-40 px-3 h-[40px] items-center font-medium text-base text-[#4e4e4e] border border-border-gray ${!selected.length && error ? "border-[#F04438]" : "border-inputBorderGray"} bg-white rounded-lg leading-tight focus:outline-none focus:bg-white`}
                    type="button"
                    onClick={toggleDropdown}
                >
                    <div className="flex text-placeholderTextGray font-normal w-full">
                        {placeholder}
                    </div>
                    <svg
                        className={`w-2.5 ${isDropdownOpen && "transform rotate-180"}`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                    >
                        <path
                            stroke="#6F7990"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 4 4 4-4"
                        />
                    </svg>
                </button>

                {isDropdownOpen && (
                    <div className={`absolute z-40 w-full mt-1 focus:outline-none`}>
                        <ul
                            className="py-2 w-full text-sm text-gray-700 overflow-auto bg-white rounded-md drop-shadow-xl max-h-60 ring-1 ring-black ring-opacity-5 "
                        >
                            {data.map((item, index) => (
                                <li key={index} className="w-full">
                                    <button
                                        href="#"
                                        className={`flex gap-4 items-center px-4 py-2 hover:bg-gray-100 w-full`}
                                        onClick={() => handleOptionClick(index)}
                                    >
                                        <label htmlFor={`checkbox-${index}`} className="flex gap-4 pointer-events-none">
                                            <div className="flex justify-center items-center custom-checkbox">
                                                <input
                                                    id={`checkbox-${index}`}
                                                    name={`checkbox-${index}`}
                                                    type="checkbox"
                                                    readOnly
                                                    className="hidden"
                                                    checked={isChecked[item[displayValue]]}
                                                />
                                                <span className="checkmark"></span>
                                            </div>
                                        </label>
                                        <p className="text-dropdownTextGray font-medium">{item[displayValue]}</p>
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className={`mt-4 w-full`}>{selected.length > 0 && displayOptions()}</div>
                    </div>
                )
                }
                {!selected.length && error && (
                    <div className="-mt-2">
                        <ErrorMessage>
                            {error}
                        </ErrorMessage>
                    </div>
                )}
            </div>
        </div>
    );
};