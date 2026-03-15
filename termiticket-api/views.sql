CREATE VIEW vw_disponibilidad_viajes AS
SELECT 
    v.id AS viaje_id,
    v.ciudad_origen,
    v.fecha_salida,
    v.estado,
    veh.placa,
    veh.capacidad_maxima,
    -- Contamos cuántos boletos válidos o usados existen para las paradas de este viaje
    (SELECT COUNT(b.id) 
     FROM boletos b 
     INNER JOIN viaje_paradas vp ON b.viaje_parada_id = vp.id 
     WHERE vp.viaje_id = v.id AND b.estado != 'ANULADO') AS boletos_vendidos,
     
    -- Calculamos los asientos disponibles
    (veh.capacidad_maxima - (
        SELECT COUNT(b.id) 
        FROM boletos b 
        INNER JOIN viaje_paradas vp ON b.viaje_parada_id = vp.id 
        WHERE vp.viaje_id = v.id AND b.estado != 'ANULADO'
    )) AS asientos_disponibles
FROM viajes v
INNER JOIN vehiculos veh ON v.vehiculo_id = veh.id;