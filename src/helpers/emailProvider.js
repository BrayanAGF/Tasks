import emailjs from 'emailjs-com';
export const enviarEmailTareaAsignada = (emailDestino, nombreDestino, nombreOrigen, nombreTarea, nombreProyecto) => {

    var templateParams = {
        to_email: emailDestino,
        to_name: nombreDestino,
        from_name: nombreOrigen,
        taskName: nombreTarea,
        projectName: nombreProyecto,
    };

    emailjs.send('service_3mb079d', 'template_ahj0vsi', templateParams, '34daACVL_9jCjmbwe')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
}

export const enviarEmailEquipoAsignado = (emailDestino, nombreEquipo) => {
    
    var templateParams = {
        to_email: emailDestino,
        teamName: nombreEquipo
    }

    emailjs.send('service_3mb079d', 'template_ud6cy0r', templateParams, '34daACVL_9jCjmbwe')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
}
