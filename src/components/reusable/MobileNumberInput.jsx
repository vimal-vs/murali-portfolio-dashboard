import { useLocation } from "react-router-dom";
import ErrorMessage from "./ErrorMessage"
import Mandate from "./Mandate";

export default function MobileNumberInput({
    width,
    label,
    value,
    setValue,
    mandate,
    error,
    readOnly,
    disabled,
    ...others
}) {

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        const cleanedInput = inputValue.replace(/\D/g, "").slice(0, 10);
        const formattedInput = cleanedInput.replace(/(\d{5})/, "$1 ");
        setValue(formattedInput.trim());
    };

    const inputStyle = {
        width: width || "100%",
    };

    const location = useLocation();
    const url = location.pathname;
    return (
        <div className={`flex flex-col relative min-w-[200px]  w-full
            ${url === "/" || url === "/forgot-password" || url === "/reset-password" ? " w-full" : " max-w-[300px] "}`}
        >
            <div className="h-fit">
                <label
                    className="text-[#344054] font-medium text-[12px]"
                    htmlFor={label}
                >
                    {label}<Mandate mandate={mandate} />
                </label>
            </div>
            <div
                className={`relative flex items-center justify-center h-full`}
                style={{
                    width: inputStyle.width
                }}
                
            >
                <span className="absolute inset-y-0 left-0 flex text-sm lg:text-sm  items-center pl-2 text-text-black font-medium" style={{ fontSize: '12px' }}>
                    +91
                </span>
                <input
                    type="tel"
                    value={value}
                    readOnly={readOnly}
                    onChange={handleInputChange}
                    disabled={disabled}
                    className={` h-[40px] text-text-black ${value ? "text-base" : "text-sm"} placeholder-placeholder-gray  ${readOnly && "cursor-default"}  spin-button-none rounded-[8px] border ${ !value && error ? "border-[#F04438]" : "border-border-gray"} pl-[42px] outline-none ${disabled && "bg-[#EEEEEE]"} ${readOnly ? "cursor-default" : "focus:border-[#1849A9]"} placeholder-gray-400  text-black pb-[2px]`}
                    placeholder="00000 00000"
                    style={{
                        width: inputStyle.width,
                        fontSize: '12px'
                    }}
                    {...others}
                />
            </div>
            <div>
                {!value && error && (
                    <ErrorMessage>
                        {error}
                    </ErrorMessage>
                )}
            </div>
        </div>
    );
}