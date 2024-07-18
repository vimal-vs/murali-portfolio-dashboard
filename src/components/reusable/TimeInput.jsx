import { useRef } from "react";
import clock from "../../assets/clock.svg";
import Mandate from "./Mandate";
import ErrorMessage from "./ErrorMessage";

export default function TimeInput({
    disabled,
    value,
    setValue,
    placeholder,
    label,
    width,
    mandate,
    error
}) {
    const timeRef = useRef();

    const handleTimePicker = (e) => {
        if (disabled === true) {
            return;
        }
        if (e.target.nodeName === "INPUT") {
            return;
        }
        timeRef.current.showPicker();
    };

    const handleTimeChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
    };

    const timeStyle = ` 
    .spin-button-none::-webkit-outer-spin-button,
    .spin-button-none::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    .spin-button-none {
      -moz-appearance: textfield;
    }
    input[type="time"]::-webkit-calendar-picker-indicator {
      display: none;
    }
  `;

    const inputStyle = {
        width: width || "100%",
    };

    return (
        <div
            className="flex flex-col   max-w-[300px] min-w-[200px] "
            style={{
                width: inputStyle.width
            }}
        >

            <div className="text-[#344054]  text-[12px]  pl-1 font-medium">
                {label}<Mandate mandate={mandate} />
            </div>
            <div
                className={` flex justify-start items-center  ${!disabled && "cursor-pointer"} w-full h-[40px] gap-2 rounded-md border-[1px] border-border-gray pl-2 py-2 ${disabled && "bg-[#eee]"} `}
                onClick={handleTimePicker}
                style={{
                    border: !value && error ? "1px solid #F04438" : "1px solid #CBD5E0",
                }}
            >
                <style>{timeStyle}</style>
                <div onClick={handleTimePicker}>
                    <img src={clock} alt="clock" onClick={handleTimePicker} />
                </div>
                <div className="relative top-[12px] left-[1px]">
                    <div className={`${!value && "text-placeholder-gray"} `} style={{ fontSize: '12px' }}>
                        {value || placeholder}
                    </div>
                    <input
                        id="startTime"
                        type="time"
                        name="startTime"
                        disabled={disabled}
                        value={value}
                        onChange={handleTimeChange}
                        ref={timeRef}
                        className={`opacity-0 border pointer-events-none w-full relative -left-[10px] -top-[15px]`}
                        style={{ fontFamily: 'Poppins', fontSize: '12px' }}

                    />

                </div>

            </div>
            {!value && error && (
                <ErrorMessage >
                    {error}
                </ErrorMessage>
            )}
        </div>
    );
}