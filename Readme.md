# Dynatrace Log Pusher

This project is a tool for pushing logs to Dynatrace.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [File Structure](#file-structure)
- [Functionality](#functionality)
  - [Log Parsing](#log-parsing)
  - [Batch Processing](#batch-processing)
  - [Duplicate Log Handling](#duplicate-log-handling)
- [Contributing](#contributing)

## Installation

Clone the repository:

```bash
git clone https://github.com/mdAliMaaz/dynatrace_log_pusher.git
```

```bash
cd dynatrace_log_pusher
```

## Install dependencies:

will install dependencies

```bash
npm install
```

will generate `dist` folder

```bash
npm run build
```

will run the application

```bash
npm run start
```

## Usage

To use this tool, follow these steps:

1. Ensure your log files are located in the specified directory `(DIR_NAME)`
2. Run the following command to push logs to Dynatrace:

## Configuration

Before running the tool, make sure to set the following environment variables:

- `DIR_NAME`: The directory containing the log files to push.
- `API_URL`: The URL of the Dynatrace API.
- `API_TOKEN`: Your Dynatrace API token.

## File Structure

The project structure is as follows:

- `src/`: Contains the source code files.
- `src/utils/`: Contains utility functions.
- `timestamp.log`: File containing timestamps of pushed logs.

## Functionality

### Log Parsing

The Dynatrace Log Pusher parses log files using regular expressions to extract relevant information such as severity, timestamp, custom class, trace ID, service name, and content. Each parsed log entry is represented as a JavaScript object conforming to the `Log` interface.

### Batch Processing

To optimize performance and minimize API calls, the Dynatrace Log Pusher processes logs in batches. You can configure the batch size to control the number of logs pushed in each request.

### Duplicate Log Handling

Before pushing logs to Dynatrace, the tool checks for duplicate log entries based on their timestamps. Duplicate logs are identified and excluded from the push operation to prevent redundant data.

## Contributing

Contributions are welcome! To contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.
