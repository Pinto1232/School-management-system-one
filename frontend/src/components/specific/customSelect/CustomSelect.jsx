import { Select } from "@chakra-ui/react";

const CustomSelect = ({ options, ...rest }) => {
    return (
        <Select {...rest}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </Select>
    );
};

export default CustomSelect;
