const { Factura, Boleto, Pasajero, Viaje, ViajeParada, Vehiculo, sequelize } = require('../models');

exports.venderBoletos = async (req, res) => {
    const t = await sequelize.transaction(); // Iniciamos transacción

    try {
        const { viaje_id, viaje_parada_id, metodo_pago, pasajeros } = req.body;
        const usuario_id = req.user.id; // Obtenido del token

        // 1. Validar Capacidad
        const viaje = await Viaje.findByPk(viaje_id, {
            include: [{ model: Vehiculo }, { model: ViajeParada, as: 'paradas' }]
        });

        const boletosVendidos = await Boleto.count({
            include: [{ model: ViajeParada, where: { viaje_id } }]
        });

        const asientosDisponibles = viaje.Vehiculo.capacidad_maxima - boletosVendidos;

        if (pasajeros.length > asientosDisponibles) {
            throw new Error(`No hay suficientes asientos. Disponibles: ${asientosDisponibles}`);
        }

        // 2. Obtener precio de la parada seleccionada
        const parada = await ViajeParada.findByPk(viaje_parada_id);
        const totalFactura = parada.precio * pasajeros.length;

        // 3. Crear Factura
        const factura = await Factura.create({
            usuario_vendedor_id: usuario_id,
            total: totalFactura,
            metodo_pago
        }, { transaction: t });

        // 4. Registrar Pasajeros y crear Boletos
        for (const p of pasajeros) {
            // findOrCreate: Si el pasajero ya existe por cédula, lo usa; si no, lo crea.
            const [pasajeroObj] = await Pasajero.findOrCreate({
                where: { cedula: p.cedula },
                defaults: { nombre: p.nombre, telefono: p.telefono },
                transaction: t
            });

            await Boleto.create({
                factura_id: factura.id,
                viaje_parada_id: parada.id,
                pasajero_id: pasajeroObj.id,
                precio_pagado: parada.precio
            }, { transaction: t });
        }

        await t.commit(); // Todo bien, guardamos cambios permanentemente

        // 5. Notificación de pocos asientos (lógica para el front)
        const nuevosDisponibles = asientosDisponibles - pasajeros.length;
        
        res.status(201).json({
            message: "Venta realizada con éxito",
            factura_id: factura.id,
            asientos_restantes: nuevosDisponibles,
            alerta: nuevosDisponibles <= 3 ? "¡Atención! Quedan pocos asientos." : null
        });

    } catch (error) {
        await t.rollback(); // Error, revertimos todo lo que se hizo en la BD
        res.status(400).json({ error: error.message });
    }
};