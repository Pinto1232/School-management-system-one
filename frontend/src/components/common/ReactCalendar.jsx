import React from "react";
import Calendar from "react-calendar";
import { Box, Center } from "@chakra-ui/react";

const ResponsiveCalendar = ({ value, onChange, ...rest }) => {
    return (
        <Center>
            <Box
                display={{ base: "block", md: "flex" }}
                justifyContent="center"
                alignItems="center"
                border="1px solid #E2E8F0"
                borderRadius="lg"
                p={4}
                m={4}
                boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
                {...rest}
            >
                <Calendar
                    value={value}
                    onChange={onChange}
                    calendarType="US"
                    tileClassName="react-calendar__tile--custom"
                    tileDisabled={({ activeStartDate, date, view }) =>
                        date.getDay() === 0 || date.getDay() === 6
                    }
                />
            </Box>
        </Center>
    );
};

export default ResponsiveCalendar;
