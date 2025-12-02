const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: true, // 允许使用 Node.js 集成
    },
  });

  win.loadURL('http://localhost:3000'); // 或者直接使用 build 后的文件路径

  win.on('closed', () => {
    win = null;
  });
}

// 当 Electron 完全加载后启动应用
app.whenReady().then(() => {
  createWindow();

  // 在 macOS 上，点击 dock 时重新打开窗口
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 退出应用的处理
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});