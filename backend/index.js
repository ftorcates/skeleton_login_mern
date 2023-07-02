import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import conectarDB from './config/db.js';
import usuarioRoutes from './routes/usuarioRoutes.js'

const app = express();
dotenv.config();
app.use(express.json());
conectarDB();

//Configurar CORS
const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function(origin, callback) {
        if (whitelist.includes(origin)){
            //Puede consultar la API
            callback(null, true);
        } else {
            //Request no permitido
            callback(new Error('Error de CORS'))

        }
    }
}

app.use(cors(corsOptions));

// routing
app.use('/api/usuarios', usuarioRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);    
});