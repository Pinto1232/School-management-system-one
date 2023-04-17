import { Form, Formik } from "formik";
import { motion } from "framer-motion";

const FormStep = ({ children, onSubmit }) => (
    <Formik initialValues={{}} onSubmit={onSubmit}>
        {(formik) => (
            <Form>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {children(formik)}
                </motion.div>
            </Form>
        )}
    </Formik>
);

export default FormStep;
