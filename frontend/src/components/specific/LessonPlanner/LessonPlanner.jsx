import React, { useState } from 'react';
import ResourceRepository from './sub-components/ResourceRepository';
import ScheduleCalendar from './sub-components/ScheduleCalendar';
import CollaborationArea from './sub-components/CollaborationArea';
import CurriculumMap from './sub-components/CurriculumMap';


const LessonPlanner = () => {
    

    return (
        <div>
            <CurriculumMap />
            <ResourceRepository />
            <ScheduleCalendar />
            <CollaborationArea />
        </div>
    );
};

export default LessonPlanner;