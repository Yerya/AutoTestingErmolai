import { describe, it, expect } from 'vitest';
import CalculationTool from '../src/Calculator';
import { promises as fs } from 'fs';

describe('CalculationTool', () => {
    const calc = new CalculationTool();
    expect(calc.sum()).toBe(0);

    it('should correctly add multiple numbers', () => {
        expect(calc.sum(1, 2, 3, 4)).toBe(10);
        expect(calc.sum(5)).toBe(5);
    });

    it('should correctly subtract two numbers', () => {
        expect(calc.subduct(10, 5)).toBe(5);
        expect(calc.subduct(5, 10)).toBe(-5);
    });

    it('should correctly multiply multiple numbers', () => {
        expect(calc.multiply(2, 3, 4)).toBe(24);
        expect(calc.multiply()).toBe(1);
        expect(calc.multiply(5)).toBe(5);
    });

    it('should correctly divide two numbers', () => {
        expect(calc.divide(10, 2)).toBe(5);
        expect(calc.divide(-10, 2)).toBe(-5);
        expect(calc.divide(10, 0.5)).toBe(20);
    });

    it('should throw an error when dividing by zero', () => {
        expect(() => calc.divide(10, 0)).toThrow("Cannot divide by zero");
    });

    it('should sum numbers from a file', async () => {
        const filePath = './tests/temp.txt';
        await fs.writeFile(filePath, '1 2 3 4');
        const result = await calc.sumFromFile(filePath);
        expect(result).toBe(10);
        await fs.unlink(filePath);
    });

    it('should throw an error if file contains non-numeric values', async () => {
        const filePath = './tests/temp_invalid.txt';
        await fs.writeFile(filePath, '1 2 three 4');
        await expect(calc.sumFromFile(filePath)).rejects.toThrow("Error reading file or invalid file format");
        await fs.unlink(filePath);
    });

    it('should throw an error if file cannot be read', async () => {
        await expect(calc.sumFromFile('./tests/non_existent_file.txt')).rejects.toThrow("Error reading file or invalid file format");
    });

    it('should write result to file', async () => {
        const filePath = './tests/output.txt';
        await CalculationTool.writeToFile(filePath, 42);
        const content = await fs.readFile(filePath, 'utf-8');
        expect(content).toBe('Result: 42');
        await fs.unlink(filePath);
    });
});
