import { Box, Flex } from "@chakra-ui/react";
import TwoColumnLayout from "../../components/specific/twoColumnLayout/TwoColumnLayout";
import EmailBadge from "../../components/specific/badge/EmailBadge";
import BellBadge from "../../components/specific/badge/BellBadge";
import GlobeBadge from "../../components/specific/badge/GlobeBadge";
import UserMenu from "./UserMenu";

export const TopBar = ({ emailCount, handleMenuToggle, changeView }) => {
    return (
      <TwoColumnLayout>
        <Flex align={"start"} p={6} gap={10}>
          <Box>
            <EmailBadge
              width="40px"
              height="40px"
              bgColor="transparent"
              count={emailCount}
              textColor="white"
              iconWidth="20px"
              iconHeight="20px"
            />
          </Box>
          <Box>
            <BellBadge
              count={5}
              width="40px"
              height="40px"
              bgColor="red"
              textColor="white"
            />
          </Box>
          <Box>
            <GlobeBadge count={5} />
          </Box>
          <Box>
            <UserMenu onMenuToggle={handleMenuToggle} changeView={changeView} />
          </Box>
        </Flex>
      </TwoColumnLayout>
    );
  };