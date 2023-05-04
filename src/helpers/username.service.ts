const USERNAME_KEY = "LS_USERNAME";

export function saveUsername(username: string) {
  localStorage.setItem(USERNAME_KEY, username);
}

export function getUsername(): string | null {
  return localStorage.getItem(USERNAME_KEY);
}
