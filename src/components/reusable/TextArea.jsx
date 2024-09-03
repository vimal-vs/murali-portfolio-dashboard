import { useLocation } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import Mandate from "./Mandate";

export default function TextArea({
    label,
    placeholder,
    value,
    error,
    onChange,
    onBlur,
    width,
    mandate,
    disabled,
    invisible,
    rows = 4,
    charLimit,
    ...other
}) {

    const inputStyle = {
        width: width || "100%",
    };

    const location = useLocation();
    const url = location.pathname;

    const handleInputChange = (e) => {
        if (charLimit) {
            const charCount = e.target.value.length;
            // if (charCount <= charLimit) {
            onChange(e);
            // }
        } else {
            onChange(e);
        }
    };

    return (
        <div
            className={`flex flex-col min-w-[200px]`}
            style={{
                width: inputStyle.width
            }}
        >
            <div className="h-fit">
                <label
                    className="text-[#344054] text-[12px] pl-1 font-medium"
                    htmlFor={label}
                >
                    {label}<Mandate mandate={mandate} />
                </label>
            </div>
            <div>
                <textarea
                    name={label}
                    id={label}
                    className={` ${disabled && "bg-[#eee]"} border ${!value && error ? "border-[#F04438]" : "border-border-gray"} text-sm text-text-black placeholder-placeholder-gray outline-none rounded-lg pb-[1px] pl-2 pt-2 focus:border-primary-blue`}
                    style={{ width: inputStyle.width, fontSize: "12px" }}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleInputChange}
                    onBlur={onBlur}
                    disabled={disabled}
                    rows={rows}
                    {...other}
                />
                {!value && error && (
                    <ErrorMessage>
                        {error}
                    </ErrorMessage>
                )}
                {charLimit && (
                    <div className="text-right text-[10px] text-gray-500">
                        {value.length} / {charLimit} characters
                    </div>
                )}
            </div>
        </div>
    );
}