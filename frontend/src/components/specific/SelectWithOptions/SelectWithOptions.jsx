import { Select, InputLeftElement, Icon } from "@chakra-ui/react";
import { FaSearch, FaAd } from "react-icons/fa";

function SelectWithOptions({ options, placeholder, ...rest }) {
    return (
        <Select placeholder={placeholder} {...rest}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
            <InputLeftElement
                pointerEvents="none"
                children={<Icon as={FaSearch} color="gray.300" />}
            />
        </Select>
    );
}

export default SelectWithOptions;