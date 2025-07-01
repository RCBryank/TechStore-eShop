export function CalculatePrice(originalprice: number = 0, discount: number = 0): number {
    let _discount = originalprice * (discount * .01);

    return originalprice - _discount;
}