const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
  // Create the main window
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    maximizable: true,
    icon: path.join('C:', 'Users', 'zohan', 'Downloads', 'Sbertsoftwareicons', 'ico.ico'),
    webPreferences: {
      nodeIntegration: true, // Allow use of Node.js features in the renderer
    }
  });

  // Maximize the window
  mainWindow.maximize();

  // Set the 'About' panel options (built-in About dialog)
  app.setAboutPanelOptions({
    applicationName: 'The Sourbert Software Store',
    applicationVersion: '1.0.0',
    iconPath: path.join('C:', 'Users', 'zohan', 'Downloads', 'Sbertsoftwareicons', 'ico.ico'),
    copyright: 'Copyright © 2025 Sourbert Software (Zohan Haque)',
  });

  // Create custom HTML menu for full styling control
  const menuTemplate = [
    {
      label: 'Option',
      submenu: [
        {
          label: 'About',
          click() {
            app.showAboutPanel(); // Show built-in About panel
          },
        },
        {
          label: 'Quit',
          role: 'quit',
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  // Load the index.html file
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Inject custom CSS for menu background
  const css = `
    body {
      background-color: #333;
      color: white;
      font-family: Arial, sans-serif;
      padding: 20px;
    }
  `;
  mainWindow.webContents.insertCSS(css); // Apply CSS to the index.html loaded content
});
