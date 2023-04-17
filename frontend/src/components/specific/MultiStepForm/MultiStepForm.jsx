import { Box, Button, Heading, Stack } from "@chakra-ui/react";
import { useState } from "react";
import Step1 from "./FormSteps/Step1";
import Step2 from "./FormSteps/Step2";
import Step3 from "./FormSteps/Step3";
import FormStep from "./FormSteps/FormStep";
import StepOne from "./FormSteps/StepOne";
import StepTwo  from "./FormSteps/StepTwo";
import StepThree  from "./FormSteps/StepThree";

const MultiStepForm = () => {
  const steps = [Step1, Step2, Step3];
  const [step, setStep] = useState(0);
  const currentStep = steps[step];

  const handleNextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted");
  };

  return (
    <Box borderWidth={1} borderRadius={8} p={8}>
      <Heading as="h2" size="lg" mb={8}>
        Multi-Step Form Example
      </Heading>
      <FormStep onSubmit={handleSubmit}>
        {(formik) => (
          <Box>
            <Box display={step === 0 ? "block" : "none"}>
              <StepOne
                values={formik.values}
                handleChange={formik.handleChange}
              />
            </Box>
            <Box display={step === 1 ? "block" : "none"}>
              <StepTwo
                values={formik.values}
                handleChange={formik.handleChange}
              />
            </Box>
            <Box display={step === 2 ? "block" : "none"}>
              <StepThree
                values={formik.values}
                handleChange={formik.handleChange}
              />
            </Box>
            <Stack direction="row" mt={8} spacing={4}>
              <Button onClick={handlePrevStep} disabled={step === 0}>
                Back
              </Button>
              <Button
                colorScheme="blue"
                onClick={handleNextStep}
                disabled={!formik.isValid}
              >
                {step === steps.length - 1 ? "Submit" : "Next"}
              </Button>
            </Stack>
          </Box>
        )}
      </FormStep>
    </Box>
  );
};
export default MultiStepForm;
