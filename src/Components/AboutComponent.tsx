import { Box, List, ListItem, Text } from "@chakra-ui/react";

interface Props {
  command: any;
}

const AboutComponent = ({ command }: Props) => {
  return (
    <Box mb="3" ml="2">
      <Text fontFamily="Courier New" color="red" fontSize="sm">
        {command}
      </Text>
      <List fontFamily="Consolas" fontSize="sm" styleType="disc">
        <ListItem>
          CLI Version 1.0:
          <span style={{ color: "green", marginLeft: "5px" }}>
            This is a front-end CLI created as a part of the Full Stack Hiring
            test. It simulates various command-line functionalities.
          </span>
        </ListItem>
      </List>
    </Box>
  );
};

export default AboutComponent;
