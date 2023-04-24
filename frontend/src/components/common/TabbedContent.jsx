import { useState } from "react";
import {
    Tabs,
    TabList,
    Tab,
    TabPanel,
    TabPanels,
    Box,
    Text,
} from "@chakra-ui/react";

const TabbedContent = ({ tabs }) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const handleTabChange = (index) => {
        setActiveTabIndex(index);
    };

    return (
        <Tabs index={activeTabIndex} onChange={handleTabChange}>
            <TabList>
                {tabs.map((tab, index) => (
                    <Tab key={index}>{tab.title}</Tab>
                ))}
            </TabList>
            <TabPanels bg="#fff">
                {tabs.map((tab, index) => (
                    <TabPanel key={index}>
                        <Box p={4}>
                            <Text color="#000" fontSize="xl">{tab.content}</Text>
                        </Box>
                    </TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    );
};

export default TabbedContent;
