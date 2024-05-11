## Excel Generator from JSON Data

### Overview

This package provides a memory-efficient solution for generating Excel files from large JSON datasets. It allows you to convert JSON data into Excel format while efficiently managing memory usage, making it suitable for handling large datasets without consuming excessive system resources.

### Features

- **Memory Efficient**: Processes JSON data lazily, minimizing memory consumption even with large datasets.
- **Easy to Use**: Simple API for converting JSON data to Excel format with customizable headers.
- **Streaming**: Generates Excel files gradually as data is read from the JSON file, enabling efficient memory usage and processing of large datasets.

### Installation

You can install the package via npm:

```bash
npm install @imrandil/json-to-excel-generator
```

### Usage

```javascript
const excelGenerator = require('@imrandil/json-to-excel-generator');

const jsonFilePath = './data.json';
const excelFilePath = 'output.xlsx';
const headers = [
  { header: 'Column 1', key: 'column1', width: 15 },
  { header: 'Column 2', key: 'column2', width: 15 },
  // Add more headers as needed
];

excelGenerator.createExcelFromJson(jsonFilePath, excelFilePath, headers)
  .then(() => console.log('Excel file created successfully'))
  .catch(error => console.error('Error creating Excel file:', error));
```

### Use Cases

- **Big Data Processing**: Ideal for handling large JSON datasets efficiently, where loading the entire dataset into memory is not feasible.
- **Batch Processing**: Useful for generating Excel reports or data exports from large JSON files in batch processing scenarios.
- **Memory Optimization**: Helps optimize memory usage when dealing with large datasets, ensuring better performance and resource utilization.

### Note

While this package offers memory-efficient processing for large datasets, it may not be the fastest solution for smaller datasets due to its lazy processing approach. However, it excels in scenarios where memory optimization is crucial.

For more details and examples, refer to the [documentation](#).

### Contribution

Contributions, bug reports, and feature requests are welcome! Feel free to open an issue or submit a pull request on [GitHub](#).

### License

This package is licensed under the [MIT License](#).