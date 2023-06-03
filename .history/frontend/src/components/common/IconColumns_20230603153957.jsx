const IconColumns = ({ backgroundColor }) => {
  const bgButtonColor = useColorModeValue("#319795", "#3182ce");
  const iconsTextColor = useColorModeValue("#fff", "#fff");

  return (
    <SimpleGrid
      bg={backgroundColor}
      padding={40}
      columns={[1, 2, 3, 4]}
      gap={0} // This is the change
    >
      {Array.isArray(iconsData) &&
        iconsData.map((iconData) => (
          <IconColumn
            key={iconData.id}
            icon={iconData.icon}
            title={iconData.title}
            style={iconData.style}
            textColor={iconsTextColor}
          />
        ))}
      <GridItem colSpan={[1, 2, 4]} textAlign="center">
        <CustomButton bgColor={bgButtonColor} width={200} textColor="#fff">
          learn more
        </CustomButton>
      </GridItem>
    </SimpleGrid>
  );
};
