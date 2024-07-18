export default function StatusCard({ status, isDot }) {
  let labelColorClass = "";
  let labelText = "";
  let labelBgColorClass = "";
  let DotBgColorClass = "";

  switch (status.toLowerCase()) {
    case "notalloted":
      labelColorClass = "text-[#B42318]";
      labelText = "Not Alloted";
      labelBgColorClass = "bg-[#FEF3F2]";
      DotBgColorClass = "bg-[#F04438]";
      break;
    case "alloted":
      labelColorClass = "text-[#1849A9]";
      labelText = "Alloted";
      labelBgColorClass = "bg-[#D7E6FF]";
      DotBgColorClass = "bg-[#3A74D8]";
      break;
    case "completed":
      labelColorClass = "text-[#027A48]";
      labelText = "Completed";
      labelBgColorClass = "bg-[#ECFDF3]";
      DotBgColorClass = "bg-[#12B76A]";
      break;
    case "notyetbegin":
      labelColorClass = "text-[#B54708]";
      labelText = "Not yet begin";
      labelBgColorClass = "bg-[#FFFAEB]";
      DotBgColorClass = "bg-[#F79009]";
      break;
    case "cancelled":
      labelColorClass = "text-[#B42318]";
      labelText = "Cancelled";
      labelBgColorClass = "bg-[#FEF3F2]";
      DotBgColorClass = "bg-[#F04438]";
      break;
    case "ongoing":
      labelColorClass = "text-[#1849A9]";
      labelText = "Ongoing";
      labelBgColorClass = "bg-[#D7E6FF]";
      DotBgColorClass = "bg-[#3A74D8]";
      break;
    case "active":
      labelColorClass = "text-[#027A48]";
      labelText = "Active";
      labelBgColorClass = "bg-[#ECFDF3]";
      DotBgColorClass = "bg-[#12B76A]";
      break;
    case "inactive":
      labelColorClass = "text-[#B42318]";
      labelText = "Inactive";
      labelBgColorClass = "bg-[#FEF3F2]";
      DotBgColorClass = "bg-[#F04438]";
      break;
    case "fake":
      labelColorClass = "text-[#B42318]";
      labelText = "Fake";
      labelBgColorClass = "bg-[#FEF3F2]";
      DotBgColorClass = "bg-[#F04438]";
      break;
    case "application":
      labelColorClass = "text-[#1849A9]";
      labelText = "App";
      labelBgColorClass = "bg-[#EFF8FF]";
      break;
    case "website":
      labelColorClass = "text-[#7F56D9]";
      labelText = "Website";
      labelBgColorClass = "bg-[#F3EEFF]";
      break;
    case "manual":
      labelColorClass = "text-[#C4320A]";
      labelText = "Manual";
      labelBgColorClass = "bg-[#FFF6ED]";
      break;
    case "dashboard":
      labelColorClass = "text-[#C4320A]";
      labelText = "Dashboard";
      labelBgColorClass = "bg-[#FFF6ED]";
      break;
    case "processed":
      labelColorClass = "text-[#1849A9]";
      labelText = "Processed";
      labelBgColorClass = "bg-[#EAECF0]";
      DotBgColorClass = "bg-[#1849A9]";
      break;
    case "verified":
      labelColorClass = "text-[#027A48]";
      labelText = "Verified";
      labelBgColorClass = "bg-[#ECFDF3]";
      DotBgColorClass = "bg-[#12B76A]";
      break;
    case "notverified":
      labelColorClass = "text-[#B42318]";
      labelText = "Not Verified";
      labelBgColorClass = "bg-[#FEF3F2]";
      DotBgColorClass = "bg-[#F04438]";
      break;
    default:
      labelColorClass = "";
      labelText = "";
      labelBgColorClass = "";
      DotBgColorClass = "";
      break;
  }
  return (

    <div
      className={`w-fit py-1 px-3 flex items-center justify-center rounded-full ${labelBgColorClass}`}
    >
      {
        isDot && <div
          className={`w-[6px] h-[6px] p-1 rounded-full ${DotBgColorClass}`}
        ></div>
      }

      <p className={`${labelColorClass} ${isDot && "pl-[6px] pr-[2px]"}  text-xs font-medium`}>
        {labelText}
      </p>
    </div>
  );
}
