const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const dbConfig = require('../config/config');
const sequelize = dbConfig.sequelize || dbConfig;
const User = sequelize.define('User', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true }
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: {
        type: DataTypes.ENUM('ADMIN', 'TAQUILLA'),
        defaultValue: 'TAQUILLA'
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'usuarios',
    hooks: {
        // Antes de crear un usuario, encriptamos la clave automáticamente
        beforeCreate: async (user) => {
            const salt = await bcrypt.genSalt(10);
            user.password_hash = await bcrypt.hash(user.password_hash, salt);
        }
    }
});

// Método personalizado para comparar contraseñas
User.prototype.validPassword = async function(password) {
    return await bcrypt.compare(password, this.password_hash);
};

module.exports = User;