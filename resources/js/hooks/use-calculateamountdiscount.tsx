export function CalculateAmountDiscount(originalprice: number = 0, discount: number = 0): number {
    return originalprice * (discount * .01);
}