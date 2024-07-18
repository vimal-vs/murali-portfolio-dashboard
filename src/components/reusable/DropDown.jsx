import { useEffect, useState, useRef } from "react";
import ErrorMessage from "./ErrorMessage";
import Mandate from "./Mandate";

export default function DropDown({
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
  selectAll
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();

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

  const handleOptionClick = (item) => {
    if (item[displayValue] === "--- Select All ---") {
      setValue("");
      setIsDropdownOpen(false);
      return;
    }
    setValue(item);
    setIsDropdownOpen(false);
    error = false;
  };

  const inputStyle = {
    width: width || "100%",
  };

  const modifiedData =
    data && selectAll
      ? [{ [displayValue]: "--- Select All ---" }, ...data]
      : data;
  return (
    <div
      className={`flex flex-col min-w-[200px]  max-w-[300px]`}
      style={{
        width: inputStyle.width,
      }}
    >
      <div className="text-[#344054] text-[12px] pl-1 font-medium">
        {label}
        <Mandate mandate={mandate} />
      </div>
      <div ref={dropdownRef} className={`flex-auto relative w-56] `}>
        <button
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          className={` text-center flex justify-around  w-full z-40 px-3 pl-2 h-[40px] items-center text-[#4e4e4e] border border-border-gray  appearance-none bg-white rounded-[6px] focus:outline-none focus:bg-white`}
          style={{
            border: error ? "1px solid #F04438" : "1px solid #CBD5E0",
            backgroundColor: disabled && "#eee"
          }}
          type="button"
          onClick={toggleDropdown}
          disabled={disabled}
        >
          <div
            className={`flex pl-[1px] w-full ${value && value[displayValue]
              ? "text-[#101828]"
              : "text-placeholder-gray text-sm"
              }`}
            style={{ fontSize: '12px' }}
          >
            {(value === "" && selectAll
              ? "--- Select All ---"
              : value && value[displayValue]) ||
              placeholder
            }
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
          <div
            id="dropdown"
            className={`  absolute z-40 drop-shadow-xl mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none`}
            style={{
              width: inputStyle.width,
            }}
          >
            <ul className="py-2 text-sm text-gray-700">
              {/* <li>
                <button
                  href="#"
                  className={`block px-4 py-2 w-full text-left`}
                  disabled
                >
                  <p className="text-dropdownTextGray">Select the value</p>
                </button>
              </li> */}
              {modifiedData?.map((item, index) => (
                <li key={index}>
                  <button
                    href="#"
                    className={`block px-4 py-2 w-full text-left hover:bg-gray-100`}
                    onClick={() => handleOptionClick(item)}
                    style={{ fontSize: '12px' }}
                  >
                    <p className="text-dropdownTextGray">
                      {item[displayValue]}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    </div>
  );
}
