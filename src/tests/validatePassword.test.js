import validatePassword from "../Pages/validatePassword.js";
import { test, expect } from 'vitest';

test("validates matching and strong password", () => {
  const result = validatePassword("Password123", "Password123");
  expect(result).toEqual([]);
});

test("catches short password", () => {
  const result = validatePassword("Pass1", "Pass1");
  expect(result).toContain("Passwords too short, needs to be 8 characters!");
});

test("catches mismatched password", () => {
  const result = validatePassword("Password123", "Password456");
  expect(result).toContain("Passwords don't match!");
});

test("uppercase Letter check", () => {
    const result = validatePassword("password123","password123")
    expect(result).toContain("Passwords must contain at least one uppercase letter!")
});

test("Lowercase Letter check", () => {
    const result = validatePassword("PASSWORD123","PASSWORD123")
    expect(result).toContain("Passwords must contain at least one lowercase letter!")
});

test("Number check", () => {
    const result = validatePassword("password","password")
    expect(result).toContain("Passwords must contain at least one number!")
});
