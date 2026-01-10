import { customAlphabet } from "nanoid";

// Create a custom alphabet generator (uppercase letters only)
const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 6);

export function createUniqueCode(): string {
	return nanoid(); // Generates a 6-character unique code like "XKTPMZ"
}
