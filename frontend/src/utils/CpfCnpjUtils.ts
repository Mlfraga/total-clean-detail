
export default class CpfCnpjUtils {
  static isCpfValid(cpf: string): boolean {
    const cpfLength = 11;
    const weights = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    return this.isValid(cpf, cpfLength, weights);
  }

  static isCnpjValid(cnpj: string): boolean {
    const cpfLength = 14;
    const weights = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5, 6];
    return this.isValid(cnpj, cpfLength, weights);
  }

  static formatCpf(cpf: string): string {
    const correctDigitsLength = 11;
    const firstDotPosition = 2;
    const secondDotPosition = 5;
    const slashPosition = -1;
    const dashPosition = 8;
    return this.format(cpf, correctDigitsLength, firstDotPosition, secondDotPosition, slashPosition, dashPosition);
  }

  static formatCnpj(cnpj: string): string {
    const correctDigitsLength = 14;
    const firstDotPosition = 1;
    const secondDotPosition = 4;
    const slashPosition = 7;
    const dashPosition = 11;
    return this.format(cnpj, correctDigitsLength, firstDotPosition, secondDotPosition, slashPosition, dashPosition);
  }

  private static format(
    digits: string,
    correctDigitsLength: number,
    firstDotPosition: number,
    secondDotPosition: number,
    slashPosition: number,
    dashPosition: number
  ): string {
    const cleanDigits = this.getOnlyNumbers(digits);
    return cleanDigits
      .slice(0, correctDigitsLength)
      .split('')
      .reduce((acc, digit, idx) => {
        const result = `${acc}${digit}`;
        if (idx !== digits.length - 1) {
          if (idx === firstDotPosition || idx === secondDotPosition) {
            return `${result}.`;
          }
          if (idx === slashPosition) {
            return `${result}/`;
          }
          if (idx === dashPosition) {
            return `${result}-`;
          }
        }
        return result;
      }, '');
  }

  private static isValid(digits: string, correctDigitsLength: number, weights: number[]): boolean {
    const cleanDigits = this.getOnlyNumbers(digits);
    if (cleanDigits.length !== correctDigitsLength || this.isAllTheSameDigits(cleanDigits)) {
      return false;
    }
    const digitsWithoutChecker = cleanDigits.substring(0, correctDigitsLength - 2);
    const digitsChecker = cleanDigits.substring(correctDigitsLength - 2, correctDigitsLength);
    const calculetedChecker = this.calcChecker(digitsWithoutChecker, weights);
    return digitsChecker === calculetedChecker;
  }

  private static getOnlyNumbers(digits: string): string {
    return digits.replace(/\D/g, '');
  }

  private static isAllTheSameDigits(digits: string): boolean {
    return !digits.split('').some((digit) => digit !== digits[0]);
  }

  private static calcChecker(digits: string, weights: number[]): string {
    const digitsLength = digits.length;
    const digitsLengthWithoutChecker = weights.length - 1;

    const sum = digits.split('').reduce((acc, digit, idx) => {
      return acc + +digit * weights[digitsLength - 1 - idx];
    }, 0);
    const sumDivisionRemainder = sum % 11;
    const checker = sumDivisionRemainder < 2 ? 0 : 11 - sumDivisionRemainder;

    if (digitsLength === digitsLengthWithoutChecker) {
      return this.calcChecker(`${digits}${checker}`, weights);
    }

    return `${digits[digitsLength - 1]}${checker}`;
  }
}

