const express = require('express');
const pool = require('../database/db');
const router = express.Router();

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    let { seccion, idProfesor, idMateria, cantidadEstudiantes } = req.body;

    // Convertir valores numéricos
    idProfesor = parseInt(idProfesor);
    idMateria = parseInt(idMateria);
    cantidadEstudiantes = parseInt(cantidadEstudiantes);

    // Validar tipos de datos
    if (isNaN(idProfesor)) {
        return res.status(400).json({ 
            error: "ID de profesor debe ser un número válido"
        });
    }
    if (isNaN(idMateria)) {
        return res.status(400).json({ 
            error: "ID de materia debe ser un número válido"
        });
    }
    if (isNaN(cantidadEstudiantes)) {
        return res.status(400).json({ 
            error: "Cantidad de estudiantes debe ser un número válido"
        });
    }

    // Validar campos requeridos
    if (!seccion || !idProfesor || !idMateria || !cantidadEstudiantes) {
        return res.status(400).json({ 
            error: "Faltan datos para actualizar la sección",
            details: {
                seccion: !seccion ? "Campo requerido" : undefined,
                idProfesor: !idProfesor ? "Campo requerido" : undefined,
                idMateria: !idMateria ? "Campo requerido" : undefined,
                cantidadEstudiantes: !cantidadEstudiantes ? "Campo requerido" : undefined
            }
        });
    }

    try {
        // Actualizar la sección en la base de datos
        const result = await pool.query(`
            UPDATE public.seccion
            SET 
                seccion = $1,
                "idProfesor" = $2,
                "idMateria" = $3,
                "cantEstudiantes" = $4
            WHERE "idSeccion" = $5
            RETURNING *;
        `, [seccion, idProfesor, idMateria, cantidadEstudiantes, id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Sección no encontrada" });
        }

        res.json({ message: "Sección actualizada exitosamente", seccion: result.rows[0] });
    } catch (error) {
        console.error("Error al actualizar la sección:", error);
        res.status(500).json({ 
            error: "Error al actualizar la sección",
            details: error.message,
            code: error.code
        });
    }
});

module.exports = router;