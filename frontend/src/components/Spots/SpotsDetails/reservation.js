import React, { useState } from "react";
import DatePicker from "react-datepicker";

export const Reservation = () => {
    const [checkin, setCheckin] = useState(new Date());
    const [checkOut, setCheckOut] = useState(new Date());

    return (
        <>
            <DatePicker
                selected={checkin}
                onChange={(date) => setCheckin(date)}
            />
            <DatePicker
                selected={checkOut}
                onChange={(date) => setCheckOut(date)}
            />
        </>
    )
}

export default Reservation;
