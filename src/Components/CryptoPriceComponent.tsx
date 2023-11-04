import { Box, List, ListItem, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

interface Props {
  command: any;
}

const url = "https://api.binance.com/api/v3/avgPrice?symbol=";

export const errorMsg = (error: any) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    const statusCode = error.response.status;
    const responseData = error.response.data;

    switch (statusCode) {
      case 400:
        return "Bad Request: The server could not understand the request.";
        break;
      case 401:
        return "Unauthorized: Authentication is required, or the provided credentials are invalid.";
        break;
      case 403:
        return "Forbidden: Access to the requested resource is denied.";
        break;
      case 404:
        return "Not Found: The requested resource could not be found on the server.";
        break;
      case 500:
        return "Internal Server Error: An unexpected error occurred on the server.";
        break;
      default:
        return "Status Code:" + statusCode + " Response Data:" + responseData;
        break;
    }
  } else if (error.request) {
    // The request was made but no response was received
    return "No Response Received";
  } else {
    // Something happened in setting up the request or other errors
    return "Request Error:" + error.message;
  }
};

const CryptoPriceComponent = ({ command }: Props) => {
  const [cryptoPrice, setCryptoPrice] = useState<any | null>(null);
  const [cryptoError, setCryptoError] = useState<any | null>(null);

  const fetchCryptoPrice = (currency: string) => {
    currency = currency.toUpperCase();
    axios
      .get(url + currency)
      .then((response) => {
        setCryptoPrice(parseFloat(response.data.price).toFixed(2).toString());
      })
      .catch((error) => {
        setCryptoError(errorMsg(error));
      });
  };

  useEffect(() => {
    if (command) {
      fetchCryptoPrice(command);
    }
  }, [command]);

  return (
    <Box mb="3" ml="2">
      <Text fontFamily="Courier New" color="red" fontSize="sm">
        {"fetch-price " + command}
      </Text>
      {cryptoError && (
        <Text fontFamily="Courier New" color="green" fontSize="sm">
          {cryptoError}
        </Text>
      )}
      {cryptoPrice && (
        <List
          fontFamily="Consolas"
          fontSize="sm"
          styleType="disc"
          color="green"
        >
          <ListItem>
            The current price of{" "}
            <span style={{ color: "white" }}>{command.toUpperCase()}</span> is
            <span style={{ color: "white", marginLeft: "5px" }}>
              ${cryptoPrice}
            </span>
          </ListItem>
        </List>
      )}
    </Box>
  );
};

export default CryptoPriceComponent;
