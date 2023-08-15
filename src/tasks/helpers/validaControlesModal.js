
export const validaControlesModal = (formState, setFormValid) => {

        let errores = {};
        let cont = 0;

        for (const [key, value] of Object.entries(formState)) {
                if (value.length <= 1) { 
                        errores = { ...errores, [key]: `El campo se encuentra vacio` } 
                        cont++;
                };
        }

      
        setFormValid(errores);

        return cont === 0 ? false : true;

}
