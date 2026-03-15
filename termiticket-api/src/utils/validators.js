const { z } = require('zod');

const personalSchema = z.object({
    cedula: z.string().min(6, "Cédula muy corta"),
    nombre: z.string().min(3, "Nombre demasiado corto"),
    rol: z.enum(['CHOFER', 'COLECTOR'], {
        errorMap: () => ({ message: "El rol debe ser CHOFER o COLECTOR" })
    }),
    telefono: z.string().optional()
});

module.exports = { personalSchema };