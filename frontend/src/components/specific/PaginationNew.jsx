import { Button, ButtonGroup, Flex } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const PaginationNew = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }
    onPageChange(page);
  };

  const renderPageButtons = () => {
    const pageButtons = [];

    for (let i = 1; i <= totalPages; i++) {
      const isCurrentPage = currentPage === i;
      const buttonColor = isCurrentPage ? "blue" : "gray";

      pageButtons.push(
        <Button
          key={i}
          colorScheme={buttonColor}
          size="sm"
          variant={isCurrentPage ? "solid" : "outline"}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Button>
      );
    }

    return pageButtons;
  };

  return (
    <Flex align="center" justify="center" my={6}>
      <ButtonGroup spacing="2">
        <Button
          leftIcon={<ChevronLeftIcon />}
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </Button>

        {renderPageButtons()}

        <Button
          rightIcon={<ChevronRightIcon />}
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

export default PaginationNew;
