export default function TableHead({ children, position = "center" ,
    width = " 140px",
    height = "60px",
}) {
    return (
        <div 
        style={{
            width: width,
            justifyContent: position,
            height: height,
        }}
        className="flex items-center text-left  text-placeholder-gray  pl-[11px]  text-[13px]    ">
            {children}
        </div>
    );
  }
  