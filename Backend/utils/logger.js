const getTimestamp = () => new Date().toISOString();

const buildPrefix = (level, scope) => {
  return `[${getTimestamp()}] [${level.toUpperCase()}]${scope ? ` [${scope}]` : ""}`;
};

const writeLog = (level, scope, message, meta) => {
  const prefix = buildPrefix(level, scope);
  if (meta === undefined) {
    console[level](`${prefix} ${message}`);
    return;
  }

  console[level](`${prefix} ${message}`, meta);
};

const createLogger = (scope = "app") => ({
  info: (message, meta) => writeLog("log", scope, message, meta),
  warn: (message, meta) => writeLog("warn", scope, message, meta),
  error: (message, meta) => writeLog("error", scope, message, meta),
});

export { createLogger };
