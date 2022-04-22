(function initializeDarkMode() {
	const cachedIsDarkModeName = "isDarkModeActivated";
	function isDarkModeActivated() {
		const cachedDarkModePreference = localStorage.getItem(cachedIsDarkModeName);
		const isSystemPrefersDarkMode =
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches;
		const isCachedDarkModeActivated = Boolean(
			JSON.parse(cachedDarkModePreference)
		);

		const isDarkModeActivated =
			isSystemPrefersDarkMode && !cachedDarkModePreference
				? isSystemPrefersDarkMode
				: isCachedDarkModeActivated;

		return isDarkModeActivated;
	}

	const darkModeSwitcher = document.getElementById("darkModeSwitcher");

	const isDarkModeActive = isDarkModeActivated();
	if (isDarkModeActive) {
		darkModeSwitcher.checked = isDarkModeActive;
		document.body.classList.add("dark-mode");
	}

	darkModeSwitcher.addEventListener("click", function (e) {
		document.body.classList.toggle("dark-mode");
		localStorage.setItem(cachedIsDarkModeName, e.currentTarget.checked);
	});
})();
