const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// Adiciona a extensão 'csv' na lista de arquivos aceitos pelo projeto
defaultConfig.resolver.assetExts.push('csv');

module.exports = defaultConfig;