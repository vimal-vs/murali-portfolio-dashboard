import Spinner from "./spinner/Spinner";

export default function Button({
    text,
    width,
    bgColor,
    height,
    onClick,
    type,
    icon,
    textColor,
    borderColor,
    paddingRight,
    fontSize,
    loading,
    disabled,
    ...others
}) {

    const buttonStyle = {
        border: borderColor ? "1px solid" : "",
        width: width || "100%",
        height: height || "40px",
        backgroundColor: bgColor || "#37348f",
        textColor: textColor || "#ffffff",
        borderColor: borderColor || "",
        fontSize: fontSize || "12px"
    };

    return (
        <div
            className={`flex items-center rounded-lg`}
            style={{
                width: buttonStyle.width
            }}
        >
            <button
                type={type || "button"}
                onClick={onClick}
                style={{
                    width: buttonStyle.width,
                    height: buttonStyle.height,
                    backgroundColor: buttonStyle.backgroundColor,
                    color: buttonStyle.textColor,
                    border: buttonStyle.border,
                    borderColor: buttonStyle.borderColor,
                    fontSize: buttonStyle.fontSize
                }}
                className={`flex justify-center gap-1 ${paddingRight && " pr-4 "} items-center w-full h-full font-medium rounded-lg text-sm lg:text-[17px] px-2 ${disabled && "opacity-60 cursor-not-allowed"}`}
                disabled={disabled}
                {...others}
            >
                {icon && (
                    <div>
                        <img src={icon} alt="icon" />
                    </div>
                )}
                {
                    loading &&
                    <Spinner className="mt-3" />
                }
                {text}
            </button>
        </div>
    );
};