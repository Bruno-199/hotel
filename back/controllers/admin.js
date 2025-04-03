const {conection} = require("../config/db");

const loguear = (req, res) => {
    const { username, password } = req.body;

    const query = "SELECT * FROM administradores WHERE usuario = ? AND contraseña = ?";

    conection.query(query, [username, password], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false });
        }

        if (results.length > 0) {
            res.json({
                success: true,
                user: {
                    funcion: results[0].funcion
                }
            });
        } else {
            res.status(401).json({ success: false });
        }
    });
};

module.exports = {
    loguear
};