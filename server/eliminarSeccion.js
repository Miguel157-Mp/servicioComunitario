const express = require('express');
const pool = require('../database/db');
const router = express.Router();

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(`
            DELETE FROM public.seccion
            WHERE "idSeccion" = $1
            RETURNING *;
        `, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Sección no encontrada" });
        }

        res.json({ message: "Sección eliminada exitosamente", seccion: result.rows[0] });
    } catch (error) {
        console.error("Error al eliminar la sección:", error);
        res.status(500).json({ error: "Error al eliminar la sección", details: error.message });
    }
});

module.exports = router;