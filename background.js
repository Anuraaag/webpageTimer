chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.type === "setTimer") {
		chrome.webpageTimerTime = request.time;
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tab => {
			chrome.website = tab[0].url.split('/')[2];
			chrome.timerTabId = tab[0].id;
			chrome.alarms.create("webpageTimer", {
				delayInMinutes: parseInt(request.time, 10)
			});
		});
	}
});

chrome.tabs.onRemoved.addListener(function (removedTabId, removeInfo) {
	if (removedTabId === chrome.timerTabId) {
		chrome.alarms.clearAll();
	}
});

chrome.alarms.onAlarm.addListener(function (alarm) {
	if (alarm.name === "webpageTimer") {
		var time = chrome.webpageTimerTime;
		chrome.notifications.create({
			type: "basic",
			iconUrl: "icons/icon128.png",
			title: "Webpage Timer",
			message: `Your ${time} minute${time > 1 ? 's' : ''} timer for ${chrome.website} is up!`
		});
	}
});
