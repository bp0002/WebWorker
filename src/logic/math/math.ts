/**
 * 数学函数库
 */

export class MathTools {
    public static sin(x: number) {
        return Math.sin(x);
    }
    public static cos(x: number) {
        return Math.cos(x);
    }
    public static polarCoordToCartesian = (num: number) => {
        return {
            x: Math.cos(num) * num,
            y: Math.sin(num) * num
        };
    }
    public static isPrimeNumber(n: number) {
        if (n < 2) {
            return false;
        }
        for (let i = 2; i <= n - 1; i++) {
            if (n % i == 0) {
                return false;
            }
        }
        return true;
    }
}