const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");
const escape = require("escape-string-regexp");
const pak = require("../package.json");

const root = path.resolve(__dirname, "..");
const modules = Object.keys(pak.peerDependencies || {});

const config = getDefaultConfig(__dirname);

config.watchFolders = [root];

// Block peer dependency copies from the library's node_modules
config.resolver.blockList = modules.map(
  (m) => new RegExp(`^${escape(path.join(root, "node_modules", m))}\\/.*$`)
);

// Redirect peer deps to the example's node_modules
config.resolver.extraNodeModules = modules.reduce((acc, name) => {
  acc[name] = path.join(__dirname, "node_modules", name);
  return acc;
}, {});

module.exports = config;
