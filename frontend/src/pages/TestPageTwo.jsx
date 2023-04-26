import { Text } from '@chakra-ui/react'
import React from 'react'
import MegaMenus from '../components/specific/megamenu/MegaMenus'
import MegamenuData from '../data/MegamenuData'



const TestPageTwo = () => {
    const orientation = "horizontal";

    return (
        <div>
            <MegaMenus megamenudata={MegamenuData} orientation={orientation} />
        </div>
    )
}

export default TestPageTwo
