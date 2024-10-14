export function detectTheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'; // 用户偏好深色主题
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light'; // 用户偏好浅色主题
  }
  return null; // 无法确定用户偏好
}