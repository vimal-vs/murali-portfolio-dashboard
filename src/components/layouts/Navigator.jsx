import { useLocation, useNavigate } from "react-router-dom";

export default function Navigator({ children }) {
    const path = useLocation().pathname;
    const p = path.substring(1);
    const pathArray = p.split('/');

    const navigate = useNavigate();

    const handleClick = (item) => {
        const url = pathArray;
        let arr = [];
        const index = url.indexOf(item.split(" ").join("%20"));
        for (let i = 0; i <= index; i++) {
            arr.push(url[i]);
        }
        const realAnswer = arr.join("/");
        navigate(`/${realAnswer}`);
    };

    const ReplaceSpace = (word) => {
        return word
            .split('%20')
            .join(' ');
    };

    return (
        <div className="w-full h-screen px-3 lg:px-4">
            <div className="flex pt-7  gap-2 h-[5vh]">
                {pathArray.map((item, index) => {
                    item = ReplaceSpace(item);
                    const words = item.split('-');
                    const first = words.map((word, i) =>
                        i === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word
                    ).join(' ');
                    return (
                        <div className="flex justify-center items-center gap-3" key={item}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512" fill={`${index + 1 === pathArray.length ? "black" : "#98A2B3"}`}><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" /></svg>
                            {
                                first === pathArray[1] ? <div style={{ fontSize: '14px', fontStyle: "oblique" }} className={` text-lg font-medium ${index + 1 === pathArray.length ? "text-black" : "text-[#98A2B3]"}`}>
                                    {first}
                                </div> :
                                    <div style={{ fontSize: '14px', fontStyle: "oblique" }} onClick={() => handleClick(item)} className={`cursor-pointer text-lg font-medium ${index + 1 === pathArray.length ? "text-black" : "text-[#98A2B3]"}`}>
                                        {first}
                                    </div>
                            }
                        </div>
                    );
                })}
            </div>
            <div className="h-[95vh]">
                {children}
            </div>
        </div>
    )
}