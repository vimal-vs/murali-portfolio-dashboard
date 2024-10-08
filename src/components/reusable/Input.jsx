import { useLocation } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import Mandate from "./Mandate";

export default function Input({
    label,
    type,
    placeholder,
    value,
    error,
    onChange,
    onBlur,
    width,
    mandate,
    disabled,
    invisible,
    upppercase = false,
    ...other
}) {

    const inputStyle = {
        width: width || "100%",
    };

    const location = useLocation();
    const url = location.pathname;

    return (
        <div
            className={`flex flex-col min-w-[200px]  w-full ${url === "/login" || url === "/forgot-password" || url === "/reset-password" ? "" : " max-w-[300px] "}` + (invisible ? " invisible" : "")}
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
                <input
                    type={type}
                    name={label}
                    id={label}
                    className={` ${disabled && "bg-[#eee]"} border ${!value && error ? "border-[#F04438]" : "border-border-gray"} ${value === "" ? "text-sm" : "text-base"} text-text-black placeholder-placeholder-gray outline-none rounded-lg pb-[1px] pl-2 h-[40px] focus:border-primary-blue ${upppercase && "uppercase"} ${upppercase && "placeholder:lowercase"}`}
                    style={{ width: inputStyle.width, fontSize: "12px" }}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    disabled={disabled}
                    {...other}
                />
                {!value && error && (
                    <ErrorMessage>
                        {error}
                    </ErrorMessage>
                )}
            </div>
        </div>
    );
};
