export class Email {
	private value: string;

	private constructor(value: string) {
		this.value = value;
	}

	/**
	 * Returns the string representation of the email
	 */
	toString(): string {
		return this.value;
	}

	/**
	 * Returns the value of the email
	 */
	toValue(): string {
		return this.value;
	}

	/**
	 * Checks if this email is equal to another email
	 *
	 * @param email {Email} - The email to compare with
	 * @returns {boolean} - True if emails are equal
	 */
	equals(email: Email): boolean {
		return email.toValue() === this.value;
	}

	static create(value: string): Email {
		if (!Email.isValid(value)) {
			throw new Error("Invalid email format");
		}
		return new Email(value);
	}

	/**
	 * Validates if the provided string is a valid email format.
	 *
	 * @param email {string} - The email to validate
	 * @returns {boolean} - True if email is valid, false otherwise
	 */
	static isValid(email: string): boolean {
		// Basic email validation pattern
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	/**
	 * Normalizes an email address.
	 * For example: " Example.User@DOMAIN.com " => "example.user@domain.com"
	 *
	 * @param email {string} - The email to normalize
	 */
	static normalize(email: string): string {
		return email.trim().toLowerCase();
	}

	/**
	 * Creates a normalized Email object from a raw email string.
	 *
	 * @param email {string} - The raw email string
	 */
	static createNormalized(email: string): Email {
		const normalizedEmail = Email.normalize(email);
		return Email.create(normalizedEmail);
	}

	/**
	 * Returns the domain part of the email.
	 *
	 * @returns {string} - The domain part of the email
	 */
	getDomain(): string {
		return this.value.split("@")[1];
	}

	/**
	 * Returns the local part of the email (before the @ symbol).
	 *
	 * @returns {string} - The local part of the email
	 */
	getLocalPart(): string {
		return this.value.split("@")[0];
	}
}
