import { promises as fs } from 'fs';

class CalculationTool {
    sum(...values: number[]): number {
        return values.reduce((acc, num) => acc + num, 0);
    }

    subduct(numOne: number, numTwo: number): number {
        return numOne - numTwo;
    }

    multiply(...values: number[]): number {
        return values.reduce((acc, num) => acc * num, 1);
    }

    divide(numOne: number, numTwo: number): number {
        if (numTwo === 0) throw new Error("Cannot divide by zero");
        return numOne / numTwo;
    }

    async sumFromFile(pathToFile: string): Promise<number> {
        try {
            const content = await fs.readFile(pathToFile, 'utf-8');
            const numbers = content.split(/\s+/).map(Number);
            if (numbers.some(isNaN)) throw new Error("File contains non-numeric values");
            return this.sum(...numbers);
        } catch (error) {
            throw new Error("Error reading file or invalid file format");
        }
    }

    static async writeToFile(pathToFile: string, outcome: any): Promise<void> {
        await fs.writeFile(pathToFile, `Result: ${outcome}`);
    }
}

export default CalculationTool;
