export function setTheme(theme) {
  document.cookie = `theme=${theme}; path=/; max-age=31536000`;
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(theme);
}
