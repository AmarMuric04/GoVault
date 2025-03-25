# Next.js Password Manager

## The General Statistics Overview Page

![Project Screenshot](./Overview.PNG)

**Features in this page**

- Comparing user's passwords with other user's passwords
- Showing the user the strength of their passwords
- Displaying user's overall statistics
- Displaying user's activity over time

---

## The User's Vault Page

![Project Screenshot](./Vault.PNG)

**Features in this page**

- Displaying the user's services in which they have stored passwords
- Ability to show individual passwords (Only after authenticating themselves)
- Ability to show all information, including the strength and the actual password (After authenticating)
- Ability to copy an individual password (After authenticating)
- Ability to create a new password immediatelly, or to generate a new one

---

## The Generate A Password Page

![Project Screenshot](./Generate.PNG)

**Features in this page**

- User gets shown an immediatelly generated password on the first render
- User has full control over the password
- User can choose if they want their password to have
  - Uppercase characters
  - Lowercase characters
  - Digits
  - Symbols
- They can also choose how their password can look based on visibility
  - Easy to say (Only uppercase & lowercase characters)
  - Easy to read (Only uppercase, lowercase & digits)
  - All characters
- User can freely choose how long their password is
- User can also enter their own password in and get feedback on the strength of their password
- User can save their password to their Vault, or choose to only copy the password
- User can regenerate the password with the same configuartions if they don't like the current generated password

---

# The Flow of the Application

## The application was made with security as It's no.1 priority.

**ANY** action that interacts with the user's secure information will <u>require authentication.</u>
That includes

- Showing the information for all passwords (The passwords themselves & their strength)
- Showing individual passwords information
- Deleting a password
- Editing a password

---

A feature that will be added in the future is a timer the user can set which would set their status as authorized. So in the end the user doesn't have to enter their password every time an authorization-based action is being performed.

```bash
npm install
```

```bash
npm run dev
```
