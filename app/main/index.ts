import { app, BrowserWindow } from "electron";
import path from "path";

const WINDOW_INITIAL_WIDTH = 1080;
const WINDOW_INITIAL_HEIGHT = 720;

let mainWindow: BrowserWindow | null = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: WINDOW_INITIAL_WIDTH,
    height: WINDOW_INITIAL_HEIGHT,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    show: false,
  });

  const url =
    process.env.NODE_ENV !== "development"
      ? `file://${path.join(__dirname, "..", "renderer", "index.html")}`
      : "http://localhost:8080";

  mainWindow.loadURL(url);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  mainWindow.once("ready-to-show", () => {
    if (mainWindow) {
      mainWindow.show();
    }
  });
};

app.on("ready", () => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
