

export const getDiasDiff = (f1, f2) => {
    const fecha1 = moment(f1);
    const fecha2 = moment(f2);
    const dias = fecha2.diff(fecha1, 'days')+1;
    return dias;
}
