{/* import { Box, Button, Flex, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const SortFunction = ({ options = [], activeOption, onSortChange }) => {
    return (
        <Flex alignItems='center' bg='blue.500' p={4} borderRadius={8}>
            <Text mr={2} fontWeight='bold'>Sort by:</Text>
            <Flex mr={2}>
                {options && options.map((option, index) => (
                    <Button
                        key={index}
                        variant={activeOption === option.value ? 'solid' : 'ghost'}
                        colorScheme={activeOption === option.value ? 'blue' : 'gray'}
                        onClick={() => onSortChange(option.value)}
                        mr={2}
                        borderRadius={8}
                        fontSize='sm'
                    >
                        {option.label}
                    </Button>
                ))}
            </Flex>
        </Flex>
    );
};

SortFunction.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ).isRequired,
    activeOption: PropTypes.string.isRequired,
    onSortChange: PropTypes.func.isRequired,
};

export default SortFunction; */}