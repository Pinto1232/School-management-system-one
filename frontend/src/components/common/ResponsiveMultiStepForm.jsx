import { Box, Button, Flex, Text } from "@chakra-ui/react";
import MultiStep from "react-multistep";

const StepWrapper = ({ children }) => (
    <Box w="full" mx="auto" px={[4, 8]} py={8}>
        {children}
    </Box>
);

const StepTitle = ({ children }) => (
    <Text fontSize="xl" mb={4}>
        {children}
    </Text>
);

const StepDescription = ({ children }) => (
    <Text fontSize="md" color="gray.600">
        {children}
    </Text>
);

const NavigationButton = ({ onClick, children, ...rest }) => (
    <Button onClick={onClick} ml={20} {...rest}>
        {children}
    </Button>
);

const ResponsiveMultiStep = ({
    showNavigation = true,
    showTitles = true,
    prevButton = "Prev",
    nextButton = "Next",
    stepCustomStyle = {},
    direction = "horizontal",
    activeStep = 0,
    steps = [],
    title = "",
    style = {},
    ...rest
}) => {
    const defaultStyle = {
        bgColor: "white",
        textColor: "gray.800",
        buttonBgColor: "gray.100",
        buttonTextColor: "gray.800",
        buttonBorderColor: "gray.300",
    };
    const mergedStyle = { ...defaultStyle, ...style };
    const activeStepProps = { ...mergedStyle, ...stepCustomStyle };

    return (
        <Flex direction="column" alignItems="start" {...rest}>
            {showTitles && (
                <Box textAlign="start">
                    <StepTitle>{title}</StepTitle>
                    <StepDescription>{steps[activeStep].description}</StepDescription>
                </Box>
            )}
            {showNavigation && (
                <Flex w="full" justifyContent="space-between">
                    <MultiStep
                        showNavigation={showNavigation}
                        prevButton={
                            <NavigationButton {...activeStepProps}>
                                {prevButton}
                            </NavigationButton>
                        }
                        nextButton={
                            <NavigationButton {...activeStepProps}>
                                {nextButton}
                            </NavigationButton>
                        }
                        steps={steps}
                        activeStep={activeStep}
                        direction={direction}
                        stepClassName="multi-step"
                        {...activeStepProps}
                    >
                        {steps.map(({ component: StepContent }) => (
                            <StepWrapper>
                                <StepContent />
                            </StepWrapper>
                        ))}
                    </MultiStep>
                </Flex>
            )}
        </Flex>
    );
};

export default ResponsiveMultiStep;
