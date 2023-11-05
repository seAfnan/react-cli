## React CLI


This repository contains a CLI (Command-Line Interface) application developed as part of the Full-Stack Engineer recruitment challenge for Antematter.io. The application is built using **React, NodeJs, Vite, Electron, ChakraUI and Recharts**.

![React-CLI](https://imgur.com/j5W6fmG.gif)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Available Commands](#available-commands)
- [API](#api)

## Installation

To use this CLI application, you will need Node.js and npm installed. After cloning the repository, navigate to the project's root directory and install the necessary dependencies.

```bash
npm install
```

## Usage
After installing, you can run project by:
````
npm run dev
````

## Available Commands
```bash
- help: Display a help message with information about available commands.
- about: Provide information about the application or its purpose.
- fetch-price [coin]: Fetch the current price of a specified cryptocurrency.
- upload: Opens the file explorer to allow uploading csv files only.
- draw [file] [columns]: Draws the chart of the specified columns of the file present in the draw-chart directory.
- delete [file]: Delete the specified file from directory.
````

## API

The CLI application includes a Node.js-based API that provides functionality for file-related operations. This API is integrated into the root directory of the React project. To use the API, follow these steps:

1. **Installation:**

   You can install the required API dependencies using npm. Navigate to the API root directory **/api** and run the following command:

   ```bash
   npm install
   ````
   
2. **Run:**

   You can run this by:

   ```bash
   node index
   ````
   
**Makre sure that both API and Frontend should run at the same time on different terminals.**


## GOOD LUCK.
