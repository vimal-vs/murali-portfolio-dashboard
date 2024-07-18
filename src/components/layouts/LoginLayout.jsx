import { Card } from "antd"
import login_logo from "../../assets/login_logo.svg"

export default function LoginLayout({ title, text, children }) {
    return (
        <div className="flex justify-center items-center min-h-screen bg-white">
            <Card className="flex flex-col justify-center items-center py-8 px-2 shadow-lg">
                <div className="flex flex-col justify-center items-center mb-6">
                    <img src={login_logo} alt="" />
                    <h2 className=" text-lg lg:text-[2.5rem] text-[#101828] font-semibold mt-4">{title}</h2>
                    <h3 className="text-text-black font-semibold text-sm lg:text-lg mt-1">{text}</h3>
                </div>
                {children}
            </Card>
        </div>
    )
};
