// The Url class encapsulates the logic for handling and validating URLs.
export class Url {
    // The actual URL string is stored in a private variable.
    // Private means it can only be accessed within this class.
    private url: string;

    // The constructor is called when a new instance of Url is created.
    // It takes a string as an input, which represents the URL.
    constructor(url: string) {
        this.url = url;
        // Immediately validate the URL when an instance is created.
        this.validateForDev();   // change for validate in production
    }

    // A temporary validation method for development purposes
    private validateForDev(): void {
        const validUrlPrefixes = [
            'https://',
            'http//127.0.0.1'
        ];
        const isValidUrl = validUrlPrefixes.some(prefix => this.url.startsWith(prefix));
        if (!isValidUrl) {
            // If the URL is not valid, throw an error.
            throw new Error('Invalid URL prefix');
        }
    }

    // The validate method checks if the URL starts with the required prefixes.
    // This method is private and can only be called within this class.
    private validate(): void {
        // Define an array of valid URL prefixes.
        // You can add more prefixes to this array if needed in the future.
        const validUrlPrefixes = [
            'https://monde-singulier.com/',
            'https://www.monde-singulier.com'
        ];

        // Check if the URL starts with any of the valid prefixes.
        // The `some` method tests whether at least one element in the array
        // passes the test implemented by the provided function.
        const isValidUrl = validUrlPrefixes.some(prefix => this.url.startsWith(prefix));
        if (!isValidUrl) {
            // If the URL is not valid, throw an error.
            throw new Error('Invalid URL prefix');
        }
    }

    // This method allows external code to get the URL string.
    // It's useful when you need to pass the URL to other functions or services.
    public toString(): string {
        return this.url;
    }
}
