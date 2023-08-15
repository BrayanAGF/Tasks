

export const getDiasDiff = (f1, f2) => {
    let fecha1 = new Date(f1);
    let fecha2 = new Date(f2);
    let diferencia = fecha2.getTime() - fecha1.getTime();
    let diasDeDiferencia = diferencia / (1000 * 60 * 60 * 24);
    return Math.floor(diasDeDiferencia);
}
