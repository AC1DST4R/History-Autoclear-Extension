const DEFAULT_INTERVAL_MINUTES = 60;

async function clearHistory() {
  await browser.browsingData.remove(
    { since: 0 },
    { history: true }
  );
}

async function schedule(interval) {
  await browser.alarms.clear("clear-history");
  browser.alarms.create("clear-history", {
    periodInMinutes: interval
  });
}

browser.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === "clear-history") {
    clearHistory();
  }
});

browser.runtime.onInstalled.addListener(async () => {
  const { interval } = await browser.storage.local.get("interval");
  await schedule(interval || DEFAULT_INTERVAL_MINUTES);
});
