import { app, BrowserWindow } from "electron";
import path from "path";

const WINDOW_INITIAL_WIDTH = 1080;
const WINDOW_INITIAL_HEIGHT = 720;

let mainWindow: BrowserWindow | null = null;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: WINDOW_INITIAL_WIDTH,
    height: WINDOW_INITIAL_HEIGHT,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  const url =
    process.env.NODE_ENV !== "development"
      ? `file://${path.join(__dirname, "..", "renderer", "index.html")}`
      : "http://localhost:8080";

  mainWindow.loadURL(url);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

app.on("window-all-closed", () => {});

app.on("activate", () => {});
