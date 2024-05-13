import { useEffect, useState } from "react"

export const useFetch = <T = unknown>(fetcher: () => Promise<T>) => {
    const [dados, setdados] = useState<T>()
    const [carregando, setcarregando] = useState(false)
    const [erro, seterro] =  useState<Error>()

    useEffect(() => {
        setcarregando(true)

        fetcher()
            .then(data => {
                setdados(data)
            })
            .catch(error => {
                seterro(error)
            })
            .finally(() => {
                setcarregando(false)
            })
    }, []) 

    return { dados, carregando, erro}
}