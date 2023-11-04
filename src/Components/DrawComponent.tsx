import { useState, useEffect } from "react";
import { Box, HStack, Text } from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: any;
  command: string;
  file: string;
}

const colorsArr = [
  "#FF5733",
  "#33FF57",
  "#5733FF",
  "#FF3399",
  "#3399FF",
  "#99FF33",
  "#9933FF",
  "#33FF99",
  "#FF3333",
  "#33FF33",
  "#3333FF",
  "#FF33FF",
  "#FFFF99",
  "#99FFFF",
  "#FF9933",
  "#33FFCC",
  "#CC33FF",
  "#33CCFF",
];

const DrawComponent = ({ data, command, file }: Props) => {
  const parts = command.split(" ");
  const one = parts[0];
  const fileName = parts[1];
  const three = parts.slice(2).join(" ");

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(data.length - 1);

  const handleZoomIn = () => {
    if (end - start >= 10) {
      setStart(start + 50);
      setEnd(end - 50);
    }
  };

  const handleZoomOut = () => {
    if (start >= 5 && end < data.length - 1) {
      setStart(start - 50);
      setEnd(end + 50);
    }
  };

  const visibleData = data.slice(start, end + 50);
  const limit = 100; // The number of records you want
  const limitedData = visibleData.slice(0, limit);

  const columnsArr = three.split(",");
  function toPascalCase(str: string) {
    return str
      .replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      })
      .replace(/\s+/g, "");
  }

  return (
    <Box width="100%">
      {data && (
        <HStack ml="2" mb="5px">
          <button style={{ display: "none" }} onClick={handleZoomIn}>
            Zoom In
          </button>
          <button style={{ display: "none" }} onClick={handleZoomOut}>
            Zoom Out
          </button>
          <Text fontFamily="Courier New" color="red" fontSize="sm">
            {one} <span style={{ color: "white" }}>{file} </span>
            {three}
          </Text>
        </HStack>
      )}
      {data && (
        <ResponsiveContainer width="98%" height={500}>
          <LineChart width={750} height={400} data={limitedData}>
            <XAxis dataKey={toPascalCase(columnsArr[0])} />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            {columnsArr.slice(1).map((one, i) => (
              <Line
                key={i}
                type="monotone"
                dataKey={toPascalCase(one)}
                stroke={colorsArr[i]}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      )}
      {data && (
        <Text ml="2" fontFamily="Courier New" color="#1aff66" fontSize="sm">
          Chart drawn successfully
        </Text>
      )}
    </Box>
  );
};

export default DrawComponent;
