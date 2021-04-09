import { Menu, BrowserWindow } from "electron";

export const createMenu = (
  win: BrowserWindow | null,
  props: Electron.ContextMenuParams
) =>
  Menu.buildFromTemplate([
    {
      label: "Back",
      click: () => {
        if (win) {
          win.webContents.goBack();
        }
      },
      accelerator: "Alt+Left",
      enabled: (win && win.webContents.canGoBack()) || false,
    },
    {
      label: "Forward",
      click: () => {
        if (win) {
          win.webContents.goForward();
        }
      },
      accelerator: "Alt+Left",
      enabled: (win && win.webContents.canGoForward()) || false,
    },
    { type: "separator" },
    { label: "Reload", role: "reload", accelerator: "CommandOrControl+R" },
    { type: "separator" },
    {
      label: "Inspect",
      click: () => {
        if (win) {
          win.webContents.inspectElement(props.x, props.y);
        }
      },
      accelerator: "Shift+CommandOrControl+I",
    },
  ]);

export const createHighlightMenu = (
  win: BrowserWindow | null,
  props: Electron.ContextMenuParams
) =>
  Menu.buildFromTemplate([
    {
      label: "Copy",
      role: "copy",
      accelerator: "CommandOrControl+C",
      enabled: props.editFlags.canCopy,
    },
    { type: "separator" },
    {
      label: "Inspect",
      click: () => {
        if (win) {
          win.webContents.inspectElement(props.x, props.y);
        }
      },
      accelerator: "Shift+CommandOrControl+I",
    },
  ]);
