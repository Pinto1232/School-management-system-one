import { Box } from '@chakra-ui/react';
import React from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';


// Event array for timiline
const events = [
  {
    date: 'January 2022',
    title: 'Started working on new project',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.',
  },
  {
    date: 'February 2022',
    title: 'Completed first phase of project',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.',
  },
  {
    date: 'March 2022',
    title: 'Launched project',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.',
  },
];

const Timeline = () => {


  return (
    <Box maxWidth="800px" mx="auto" my={8} px={4}>
      <VerticalTimeline>
        {events.map((event, index) => (
          <VerticalTimelineElement
            key={index}
            date={event.date}
            dateClassName="date"
            iconStyle={{ background: '#2f363d', color: '#fff' }}
          >
            <h3 style={{ color: 'black' }} className="vertical-timeline-element-title">{event.title}</h3>
            <h4 className="vertical-timeline-element-subtitle">{event.subtitle}</h4>
            <p>{event.content}</p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </Box>
  )
}

export default Timeline
