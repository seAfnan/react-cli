import { Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { useState, useRef } from "react";
import axios from "axios";
import { NavBar } from "./Components/NavBar";
import HelpComponent from "./Components/HelpComponent";
import AboutComponent from "./Components/AboutComponent";
import CryptoPriceComponent from "./Components/CryptoPriceComponent";
import DrawComponent from "./Components/DrawComponent";
import { errorMsg } from "./Components/CryptoPriceComponent";

// import "./App.css";
const apiUrl = "http://localhost:3100/api/";

function App() {
  const [inputValue, setInputValue] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const bottomGridRef = useRef<null | HTMLDivElement>(null);
  const [appendedComponents, setAppendedComponents] = useState<JSX.Element[]>(
    []
  );

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: any) => {
    if (inputValue) {
      if (e.key === "Enter") {
        // let checkName = query.toLowerCase().replace(/ /g, '');
        let checkName = inputValue.toLowerCase();
        let currency = "";
        if (checkName.includes("fetch-price")) {
          const [pre, post] = checkName.split(" ");
          checkName = pre;
          currency = post;
        }
        let restCommand = "";
        if (checkName.includes("draw")) {
          restCommand = checkName;
          checkName = "draw";
        }
        if (checkName.includes("delete")) {
          restCommand = checkName;
          checkName = "delete";
        }

        setInputValue("");
        setTimeout(() => {
          bottomGridRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);

        switch (checkName) {
          case "help":
            return setAppendedComponents([
              ...appendedComponents,
              <HelpComponent
                command={checkName}
                key={appendedComponents.length}
              />,
            ]);
          case "about":
            return setAppendedComponents([
              ...appendedComponents,
              <AboutComponent
                command={checkName}
                key={appendedComponents.length}
              />,
            ]);
          case "fetch-price":
            return setAppendedComponents([
              ...appendedComponents,
              <CryptoPriceComponent
                command={currency}
                key={appendedComponents.length}
              />,
            ]);
          case "upload":
            return openFileSelectDialog();
          case "draw":
            // return <DrawComponent command={restCommand} />;
            return drawChart(restCommand);
          case "delete":
            return deleteFile(restCommand);
          default:
            return setAppendedComponents([
              ...appendedComponents,
              <Text
                key={appendedComponents.length}
                ml="2"
                color="red"
                fontSize="sm"
                fontFamily="Consolas"
              >
                <span style={{ color: "white" }}>{checkName}</span> is Invalid
                Command
              </Text>,
            ]);
        }
      }
    }
  };

  const openFileSelectDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Programmatically click the file input
    }
  };
  const handleFileUpload = (selectedFile: File | null) => {
    if (selectedFile) {
      console.log("Uploading file:", selectedFile);

      const formData = new FormData();
      formData.append("file", selectedFile);
      axios
        .post(apiUrl + "file/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("File uploaded successfully:", response.data);
          const { filename, columns } = response.data;

          setAppendedComponents([
            ...appendedComponents,
            <div key={filename}>
              <Text ml="2" color="white" fontSize="sm" fontFamily="Consolas">
                {filename}
                <span style={{ color: "green" }}> uploaded successfully</span>
              </Text>
              <Heading ml="2" color="white" fontSize="xs" fontFamily="Consolas">
                Columns: {columns.join(", ")}
              </Heading>
            </div>,
          ]);

          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        });
    }
  };

  const drawChart = (command: string) => {
    var [one, fileName, three] = command.split(" ");
    let postObj = { file: fileName };
    axios
      .post(apiUrl + "file/draw", postObj)
      .then((response) => {
        if (response.data) {
          console.log(response.data.file);
          setAppendedComponents([
            ...appendedComponents,
            <DrawComponent
              data={response.data.data}
              command={command}
              file={response.data.file}
              key={appendedComponents.length}
            />,
          ]);
        }
      })
      .catch((error) => {
        setAppendedComponents([
          ...appendedComponents,
          <Text
            key={appendedComponents.length}
            ml="2"
            color="red"
            fontSize="sm"
            fontFamily="Courier New"
          >
            <span style={{ color: "white" }}>{fileName} </span>
            {errorMsg(error)}
          </Text>,
        ]);
      });
  };
  const deleteFile = (command: string) => {
    var [one, fileName] = command.split(" ");
    const deleteUrl = apiUrl + "file/delete/" + fileName;
    axios
      .delete(deleteUrl)
      .then((response) => {
        if (response) {
          setAppendedComponents([
            ...appendedComponents,
            <Text
              key={appendedComponents.length}
              ml="2"
              color="red"
              fontSize="sm"
              fontFamily="Courier New"
            >
              <span style={{ color: "white" }}>{fileName} </span>deleted
              successfully
            </Text>,
          ]);
        }
      })
      .catch((error) => {
        setAppendedComponents([
          ...appendedComponents,
          <Text
            key={appendedComponents.length}
            ml="2"
            color="red"
            fontSize="sm"
            fontFamily="Courier New"
          >
            <span style={{ color: "white" }}>{fileName} </span>
            {errorMsg(error)}
          </Text>,
        ]);
      });
  };

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav" "main"`,
      }}
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>
      <GridItem mb="10px" mt="10px" textAlign="center">
        <Heading>CLI</Heading>
        <small>Please write "help" to start</small>
      </GridItem>
      {appendedComponents.map((component, i) => (
        <GridItem key={i}>{component}</GridItem>
      ))}
      <GridItem>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Enter command"
          style={{
            width: "100%", // Ensure it's 100% width
            top: 0, // Position it at the top
            border: "none", // Remove border
            outline: "none", // Remove outline
            backgroundColor: "transparent", // Set background color to transparent
            fontSize: "15px",
            padding: "10px",
            margin: 0,
          }}
        />
        <GridItem ref={bottomGridRef}></GridItem>
      </GridItem>
      <input
        type="file"
        style={{ display: "none", fontFamily: "Courier New !important" }}
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        ref={fileInputRef}
        onChange={(event) => {
          // Handle file selection here
          const selectedFile = event.target.files && event.target.files[0];
          handleFileUpload(selectedFile);
        }}
      />
    </Grid>
  );
}

export default App;
