# Chrome-Dictionary-Extension

## Description
This Chrome extension allows users to quickly look up the definitions of words by simply selecting them in the browser window. It retrieves definitions from a MySQL database and displays them in a pop-up window.

## Features
- Instant word definition lookup
- Uses a MySQL database for storing word definitions
- Simple and intuitive user interface

## Installation
1. **Clone this repository** to your local machine:
   ```bash
   git clone https://github.com/bhuvi-ai/Chrome-Dictionary-Extension.git

2. **Navigate to the Cloned Directory:
   ```bash
   cd Chrome-Dictionary-Extension

3. Load the extension in Chrome:
   - Open Chrome and go to chrome://extensions/
   - Enable Developer mode (toggle switch in the top right corner)
   - Click on "Load unpacked" and select the chrome-dictionary-extension directory

## Usage
   - Using the Chrome Extension:
   - Select any word on a webpage.
   - Click on the extension icon or use the predefined keyboard shortcut to activate the extension.
   - A pop-up window will appear with the definition of the selected word.
## Screenshots


![Screenshot 1](https://github.com/bhuvi-ai/Chrome-Dictionary-Extension/blob/224592f2e5a4f950015c573b013a287c6a204506/ScreenShots/Screenshot%202024-05-04%20232854.png)
![Screenshot 2](https://github.com/bhuvi-ai/Chrome-Dictionary-Extension/blob/f615080819c853650e16011ca0cf263c6bc20fd5/ScreenShots/Screenshot%202024-05-04%20233010.png)

# Requirements

This project utilizes specific Python packages to function properly. These packages are listed in the `requirements.txt` file. To install the required dependencies, you can use the following command:

```bash
pip install -r requirements.txt
```
## Running app.py:
   1. Ensure that you have Python installed on your machine.
   2. Navigate to the Chrome-Dictionary-Extension directory.
   3. Run the app.py file:
   ```
python app.py
   ```
   4. Open Chrome and navigate to any webpage.
   5. Select any word on the webpage.
   6. Check the terminal where app.py is running; it will display the definition of the selected word.

## Database Setup
 - Import the provided MySQL database file (dictionary.sql) into your MySQL server.
 - Update the app.py file with your MySQL database credentials.

## Contributing
  Contributions are welcome! Please fork the repository and submit a pull request with your improvements

## License
This project is licensed under the [MIT License](LICENSE).
