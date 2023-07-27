import { guardarMascota, leerMascot } from "../persistencia/mascotas.dao.js"

export const guardarMascotasService = (mascota)=>{
    guardarMascota(mascota)
    return
}

export const leerMascotsService = ()=>{
    leerMascot()
    return
}

//aca se harian todas la validaciones nesecairias
