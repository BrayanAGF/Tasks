import { useEffect, useState } from "react"

export const useForm = (initialState = {}) => {
  
    const [formState, setFormState] = useState(initialState)

    useEffect(() => {
        setFormState(initialState);
    }, [initialState])

    const onInputChange = ( {target} ) => {
        const {name, value} = target;

        setFormState({
          ...formState,
          [name]: value
        });
    }

    const onResetForm = () => {
        setFormState(initialState);
    }

    return {
        ...formState,
        formState,
        setFormState,
        onInputChange,
        onResetForm
    }

}
