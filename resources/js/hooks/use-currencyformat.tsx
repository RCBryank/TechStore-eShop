export function ConverttoCurrency(number: number) {
    return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
        number,
    );
}