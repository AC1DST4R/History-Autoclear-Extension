const intervalInput = document.getElementById("interval");
const status = document.getElementById("status");

async function load() {
  const { interval } = await browser.storage.local.get("interval");
  intervalInput.value = interval || 60;
}

document.getElementById("save").addEventListener("click", async () => {
  const interval = Number(intervalInput.value);

  if (interval < 1) {
    status.textContent = "Interval must be at least 1 minute.";
    return;
  }

  await browser.storage.local.set({ interval });

  await browser.alarms.clear("clear-history");
  browser.alarms.create("clear-history", {
    periodInMinutes: interval
  });

  status.textContent = "Saved.";
});

load();
