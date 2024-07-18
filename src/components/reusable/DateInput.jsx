import { useRef } from "react";
import calendar from "../../assets/calendar.svg";
import ErrorMessage from "./ErrorMessage";
import Mandate from "./Mandate";
import { isSafari, isIOS } from 'react-device-detect';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateInput({
    value,
    setValue,
    placeholder,
    label,
    width,
    mandate,
    disabled,
    readOnly,
    error,
    setErrors,
    disableMinWidth
}) {
    const dateRef = useRef();

    const handleClick = (e) => {
        if (isSafari) {
            dateRef.current.showPicker();
            return;
        }
        if (e.target.nodeName === "INPUT") {
            return;
        }
        dateRef.current.showPicker();
    };

    const handleChange = (e) => {

        setValue(e.target.value);
    };

    const dateStyle = `
    .spin-button-none::-webkit-outer-spin-button,
    .spin-button-none::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    .spin-button-none {
      -moz-appearance: textfield;
    }
    input[type="date"]::-webkit-calendar-picker-indicator {
      display: none;
    }
  `;

    const inputStyle = {
        width: width || "100%",
    };

    const formatDate = (dateString) => {
        if (!dateString) return null;

        const ddMMyyyyRegex = /^(\d{2})-(\d{2})-(\d{4})$/;
        if (ddMMyyyyRegex.test(dateString)) {
            const [dd, mm, yyyy] = dateString.split('-');
            return new Date(`${yyyy}-${mm}-${dd}`);
        }

        const yyyyMMddRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
        if (yyyyMMddRegex.test(dateString)) {
            return new Date(dateString);
        }

        console.error('Invalid date format:', dateString);
        return null;
    };

    return (
        <div
            className={`flex flex-col ${disableMinWidth ? "" : "min-w-[200px]"}  max-w-[300px] relative`}
            style={{
                width: inputStyle.width
            }}
        >
            <div className="text-[#344054] text-[12px] pl-1 font-medium">
                {label}<Mandate mandate={mandate} />
            </div>
            <style>{dateStyle}</style>
            {!disabled && (isSafari || isIOS) ? (
                <>
                    <DatePicker
                        selected={formatDate(value)}
                        onChange={(date) => setValue(date)}
                        placeholderText={placeholder}
                        dateFormat={"dd-MM-yyyy"}
                        todayButton="Today"
                        readOnly={readOnly}
                        disabled={disabled}
                        className={`flex relative justify-start items-center w-full h-[40px] text-xs placeholder:text-placeholder-gray rounded-md ${error ? "border-[#F04438]" : "border-border-gray"} border pl-8  py-2 ${disabled && !readOnly && "bg-[#EEEEEE]"} outline-none focus:border-primary-blue`}
                    // minDate={new Date(DateUtils.getDateYyyyMmDd())}
                    />
                    <img src={calendar} alt="calendar" className="absolute top-[1.9rem] pl-[0.6rem]" />
                </>
            ) : (
                <div
                    onClick={!disabled ? handleClick : () => { }}
                    className={`flex relative justify-start items-center w-full h-[40px] ${!disabled && "cursor-pointer"
                        }   rounded-md ${error ? "border-[#F04438]" : "border-border-gray"
                        } border pl-3  py-2 ${disabled && !readOnly && "bg-[#EEEEEE]"}`}
                >
                    <img src={calendar} alt="calendar" />
                    <input
                        id="date1"
                        type="date"
                        readOnly
                        name="input1"
                        value={value}
                        onChange={handleChange}
                        placeholder={placeholder}
                        className={`outline-none text-base opacity-0 pl-0 pointer-events-none ${value === undefined || value === null || !value
                            ? "text-textGray"
                            : "text-textBlack"
                            } ${disabled && !readOnly && "bg-[#EEEEEE]"}`}
                    />
                    <div className={`absolute top-[9px] left-9 w-fit font-normal`}>

                        <div className={`${!value && " text-sm text-placeholder-gray"}`} style={{ fontSize: "12px" }}>
                            {value || placeholder}
                        </div>
                        <input
                            type="date"
                            ref={dateRef}
                            value={value}
                            onChange={handleChange}
                            className={`opacity-0 pointer-events-none text-base absolute top-[32px] -left-[37px] h-1`}
                            disabled={disabled}
                            min={`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`}
                        />
                    </div>
                </div>

            )}
            {error && (
                <ErrorMessage>
                    {error}
                </ErrorMessage>
            )}
        </div>
    );
}