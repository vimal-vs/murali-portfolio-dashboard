export default function TableCell({
  children,

  position = "center",
  width = " 140px ",
  height = "40px",
}) {
  return (
    <div
      style={{
        width: width,
        justifyContent: position,
        minHeight: height,
      }}
      className="flex items-center text-left h-auto  pl-4  "
    >
      {children}
    </div>
  );
}
