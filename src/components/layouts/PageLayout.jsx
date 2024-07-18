import Button from "../reusable/Button";
import Navigator from "./Navigator";
import plus from "../../assets/plus.svg";

export default function PageLayout({
    title,
    description,
    buttonTitle,
    buttonWidth,
    children,
    setAddModal,
    paddingRight,
    buttonIcon
}) {
    return (
        <Navigator>
            <div className="flex flex-col w-full h-full pt-3 relative">
                <div className="flex flex-col md:flex-row justify-between w-full md:px-5 py-3">
                    {title && (
                        <div>
                            <h3 className="pt-3 text-[20px] md:text-[25px] whitespace-nowrap" style={{ fontFamily: 'Rubik Dirt' }}>{title}</h3>
                            <h3 className="pt-1 text-placeholder-gray whitespace-nowrap hidden md:block">{description}</h3>
                        </div>
                    )}
                    <div>
                        {buttonTitle && (
                            <div className="  mr-0 lg:mr-1 lg:mt-0 mt-3">
                                <Button
                                    onClick={() => setAddModal(true)}
                                    text={buttonTitle}
                                    width={buttonWidth}
                                    icon={buttonIcon || plus}
                                    paddingRight={paddingRight}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div>{children}</div>
            </div>
        </Navigator>
    );
}