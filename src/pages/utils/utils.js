import { message } from "antd";
import DateUtils from "./DateUtils";

export const getTripStatus = (activeKey) => {
    let tripStatus = 0;

    if (activeKey === 'new-booking') {
        tripStatus = 0;
    }

    if (activeKey === 'accepted') {
        tripStatus = 1;
    }

    if (activeKey === 'proceeded') {
        tripStatus = 2;
    }

    if (activeKey === 'app-alloted') {
        tripStatus = 3;
    }

    if (activeKey === 'manual-alloted') {
        tripStatus = 4;
    }

    if (activeKey === 'completed') {
        tripStatus = 5;
    }

    if (activeKey === 'cancelled') {
        tripStatus = 6;
    }

    if (activeKey === 'faked') {
        tripStatus = 7;
    }

    return tripStatus;
}



export const getTripModeId = (activeKey) => {
    let tripModeId = 1;
    // if (activeKey === 'one-way') {
    //     tripModeId = 1;
    // }
    if (activeKey === 'round-way') {
        tripModeId = 2;
    }
    else if (activeKey === 'rental') {
        tripModeId = 3;
    }
    else if (activeKey === 'local-drop') {
        tripModeId = 4;
    }

    return tripModeId;
}

export const copyToClipboard = async (data) => {
    const travelDate =  DateUtils.convertDate(data.dateOfRide) || DateUtils.convertDate(data.pickupDate) || DateUtils.convertDate(data.tripDate) || "''";
    const returnDate = data.tripMode.tripName === 'Round Way' ? `Return Date : ${DateUtils.convertDate(data.rDateOfRide)}\n\n` : '';
    const duration = data.tripMode.tripName === 'Rental' ? `Duration : ${data.rentalDuration} Hrs\n\n` : '';

    const textToCopy = `
Ride ID : ${data.rideId}

From : ${data.fromLocation || data.pickUpLocation || "''"}

To : ${data.toLocation || data.dropLocation || ""}

Travel Date : ${travelDate}

${returnDate}Pickup Time : ${DateUtils.convertTime(data.pickUpTime)}

${duration}Vehicle Type : ${data.carMode.carType}

Trip Type : ${data.tripMode.tripName}

Estimated Km : ${data.distanceInKm} km

Driver Fee : ₹${data.driverFee}

Customer Phone Number : ${data.customerUser.mobileNumber}

Fare Per Km : ₹14

Total Estimated Fare : ₹${data.totalFare}

Pickup Location : ${data.pickupLocationUrl}
`.trim();

    try {
        await navigator.clipboard.writeText(textToCopy);
        message.success('Copied to clipboard!');
    } catch (err) {
        console.error('Error copying to clipboard:', err);
        message.error('Error copying to clipboard!');
    }

}

export const tripTimeDropDownData = [
    { label: "12:00 AM", value: "00:00" },
    { label: "12:15 AM", value: "00:15" },
    { label: "12:30 AM", value: "00:30" },
    { label: "12:45 AM", value: "00:45" },
    { label: "01:00 AM", value: "01:00" },
    { label: "01:15 AM", value: "01:15" },
    { label: "01:30 AM", value: "01:30" },
    { label: "01:45 AM", value: "01:45" },
    { label: "02:00 AM", value: "02:00" },
    { label: "02:15 AM", value: "02:15" },
    { label: "02:30 AM", value: "02:30" },
    { label: "02:45 AM", value: "02:45" },
    { label: "03:00 AM", value: "03:00" },
    { label: "03:15 AM", value: "03:15" },
    { label: "03:30 AM", value: "03:30" },
    { label: "03:45 AM", value: "03:45" },
    { label: "04:00 AM", value: "04:00" },
    { label: "04:15 AM", value: "04:15" },
    { label: "04:30 AM", value: "04:30" },
    { label: "04:45 AM", value: "04:45" },
    { label: "05:00 AM", value: "05:00" },
    { label: "05:15 AM", value: "05:15" },
    { label: "05:30 AM", value: "05:30" },
    { label: "05:45 AM", value: "05:45" },
    { label: "06:00 AM", value: "06:00" },
    { label: "06:15 AM", value: "06:15" },
    { label: "06:30 AM", value: "06:30" },
    { label: "06:45 AM", value: "06:45" },
    { label: "07:00 AM", value: "07:00" },
    { label: "07:15 AM", value: "07:15" },
    { label: "07:30 AM", value: "07:30" },
    { label: "07:45 AM", value: "07:45" },
    { label: "08:00 AM", value: "08:00" },
    { label: "08:15 AM", value: "08:15" },
    { label: "08:30 AM", value: "08:30" },
    { label: "08:45 AM", value: "08:45" },
    { label: "09:00 AM", value: "09:00" },
    { label: "09:15 AM", value: "09:15" },
    { label: "09:30 AM", value: "09:30" },
    { label: "09:45 AM", value: "09:45" },
    { label: "10:00 AM", value: "10:00" },
    { label: "10:15 AM", value: "10:15" },
    { label: "10:30 AM", value: "10:30" },
    { label: "10:45 AM", value: "10:45" },
    { label: "11:00 AM", value: "11:00" },
    { label: "11:15 AM", value: "11:15" },
    { label: "11:30 AM", value: "11:30" },
    { label: "11:45 AM", value: "11:45" },
    { label: "12:00 PM", value: "12:00" },
    { label: "12:15 PM", value: "12:15" },
    { label: "12:30 PM", value: "12:30" },
    { label: "12:45 PM", value: "12:45" },
    { label: "01:00 PM", value: "13:00" },
    { label: "01:15 PM", value: "13:15" },
    { label: "01:30 PM", value: "13:30" },
    { label: "01:45 PM", value: "13:45" },
    { label: "02:00 PM", value: "14:00" },
    { label: "02:15 PM", value: "14:15" },
    { label: "02:30 PM", value: "14:30" },
    { label: "02:45 PM", value: "14:45" },
    { label: "03:00 PM", value: "15:00" },
    { label: "03:15 PM", value: "15:15" },
    { label: "03:30 PM", value: "15:30" },
    { label: "03:45 PM", value: "15:45" },
    { label: "04:00 PM", value: "16:00" },
    { label: "04:15 PM", value: "16:15" },
    { label: "04:30 PM", value: "16:30" },
    { label: "04:45 PM", value: "16:45" },
    { label: "05:00 PM", value: "17:00" },
    { label: "05:15 PM", value: "17:15" },
    { label: "05:30 PM", value: "17:30" },
    { label: "05:45 PM", value: "17:45" },
    { label: "06:00 PM", value: "18:00" },
    { label: "06:15 PM", value: "18:15" },
    { label: "06:30 PM", value: "18:30" },
    { label: "06:45 PM", value: "18:45" },
    { label: "07:00 PM", value: "19:00" },
    { label: "07:15 PM", value: "19:15" },
    { label: "07:30 PM", value: "19:30" },
    { label: "07:45 PM", value: "19:45" },
    { label: "08:00 PM", value: "20:00" },
    { label: "08:15 PM", value: "20:15" },
    { label: "08:30 PM", value: "20:30" },
    { label: "08:45 PM", value: "20:45" },
    { label: "09:00 PM", value: "21:00" },
    { label: "09:15 PM", value: "21:15" },
    { label: "09:30 PM", value: "21:30" },
    { label: "09:45 PM", value: "21:45" },
    { label: "10:00 PM", value: "22:00" },
    { label: "10:15 PM", value: "22:15" },
    { label: "10:30 PM", value: "22:30" },
    { label: "10:45 PM", value: "22:45" },
    { label: "11:00 PM", value: "23:00" },
    { label: "11:15 PM", value: "23:15" },
    { label: "11:30 PM", value: "23:30" },
    { label: "11:45 PM", value: "23:45" }
];
