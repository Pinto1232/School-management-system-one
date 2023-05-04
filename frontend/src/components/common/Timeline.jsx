import { Box } from "@chakra-ui/react";
import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import TimeLineDataEvent from "../../data/TimeLineDataEvent";

const Timeline = () => {
  return (
    <Box maxWidth="800px" mx="auto" my={8} px={4}>
      <VerticalTimeline>
        {Array.isArray(TimeLineDataEvent) &&
          TimeLineDataEvent.map((event, index) => (
            <VerticalTimelineElement
              key={index}
              date={event.date}
              dateClassName="date"
              iconStyle={{ background: "#2f363d", color: "#fff" }}
            >
              <h3
                style={{ color: "black" }}
                className="vertical-timeline-element-title"
              >
                {event.title}
              </h3>
              <h4 className="vertical-timeline-element-subtitle">
                {event.subtitle}
              </h4>
              <p>{event.content}</p>
            </VerticalTimelineElement>
          ))}
      </VerticalTimeline>
    </Box>
  );
};

export default Timeline;
