import { Box, List, ListItem, Text } from "@chakra-ui/react";

interface Props {
  command: any;
}
const HelpComponent = ({ command }: Props) => {
  return (
    <Box mb="3" ml="2">
      <Text fontFamily="Courier New" color="red" fontSize="sm">
        {command}
      </Text>
      <Text fontFamily="Courier New" fontSize="md">
        Available commands:
      </Text>
      <List fontFamily="Consolas" fontSize="sm" styleType="disc">
        <ListItem>
          • Help:
          <span style={{ color: "green", marginLeft: "5px" }}>
            Show available commands
          </span>
        </ListItem>
        <ListItem>
          • About:
          <span style={{ color: "green", marginLeft: "5px" }}>
            Display information about this CLI
          </span>
        </ListItem>
        <ListItem>
          • fetch-price [pair]:
          <span style={{ color: "green", marginLeft: "5px" }}>
            Fetch the current price of a specified cryptocurrency
          </span>
        </ListItem>
        <ListItem>
          • upload:
          <span style={{ color: "green", marginLeft: "5px" }}>
            Opens the file explorer to allow uploading CSV files only.
          </span>
        </ListItem>
        <ListItem>
          • draw [file] [columns]:
          <span style={{ color: "green", marginLeft: "5px" }}>
            Draws the chart of the specified columns of the file present in the
            draw-chart directory.
          </span>
        </ListItem>
        <ListItem>
          • Delete [file]:
          <span style={{ color: "green", marginLeft: "5px" }}>
            {" "}
            To delete a file
          </span>
        </ListItem>
      </List>
    </Box>
  );
};

export default HelpComponent;
