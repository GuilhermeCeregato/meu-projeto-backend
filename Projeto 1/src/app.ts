// Importa a biblioteca Express
import express from "express";
import type { Express, Request, Response } from "express";
import fs from "fs";

// Importa a classe Player
import { Player } from "./models/player.js";

// Cria uma aplicação Express
const app: Express = express();

// Middleware para permitir que o servidor entenda JSON
app.use(express.json());

// Define a porta do servidor
const PORT: number = 8081;

// Define o nome do diretorio onde os arquivos de log serão salvos
const DATA_FILE = "./data/players.json";

/*
Função para garantir que o diretório de dados exista antes de salvar os arquivos.
se o diretorio não existir, ele será criado.
*/
function ensureDataDirectoryExists() {
    const datafolder = "./data";

    if (!fs.existsSync(datafolder)) {
        fs.mkdirSync(datafolder, { recursive: true });
    }
}

// Chama a função para garantir que o diretório de dados exista
ensureDataDirectoryExists();

// Função para salvar os dados do jogador em um arquivo JSON
// convertendo o objeto player em uma string JSON.
function savePlayerData(player: Player) {
    const playerData = JSON.stringify(player, null, 2);

    // Salva os dados do jogador no arquivo players.json
    fs.writeFileSync(DATA_FILE, playerData, "utf-8");
}

// Função para carregar os dados do jogador de um arquivo JSON
function loadPlayerData(): Player {
    // verifica se o arquivo players.json existe
    if (fs.existsSync(DATA_FILE)) {
        const playerData = fs.readFileSync(DATA_FILE, "utf-8");

        /*
        Atenção: Aqui estamos assumindo que o arquivo JSON contém os dados do jogador no formato correto.
        Se o arquivo estiver corrompido ou em um formato inesperado, isso pode causar erros.
        */

        const data = JSON.parse(playerData);

        return new Player(
            data.name,
            data.health,
            data.level
        );
    }

    // Cria um novo jogador caso o arquivo não exista com nome "Jogador1", vida 100 e nível 1
    const newPlayer = new Player("Jogador1", 100, 1);

    savePlayerData(newPlayer);

    return newPlayer;
}

// inicializa o jogador carregando os dados do arquivo ou criando um novo jogador
let player: Player = loadPlayerData();

// GET
// Quando o usuário acessa /player,
// o servidor retorna os dados do jogador
app.get("/player", (req: Request, res: Response) => {
    res.json({
        message: "Informações do Player",
        player: player,
    });
});

// POST
// Faz o jogador atacar
app.post("/player/attack", (req: Request, res: Response) => {
    const attackMessage = player.attack();

    res.json({
        message: attackMessage,
    });
});

// POST
// Faz o jogador receber dano
app.post("/player/damage", (req: Request, res: Response) => {
    const { damage } = req.body;

    const damageMessage = player.takeDamage(damage);

    // Salva o estado atualizado do jogador
    savePlayerData(player);

    res.json({
        action: damageMessage,
        currentHealth: player.health,
        currentLevel: player.level,
    });
});

// POST
// Faz o jogador recuperar vida
app.post("/player/heal", (req: Request, res: Response) => {
    const { healAmount } = req.body;

    const healMessage = player.takeHealth(healAmount);

    // Salva o estado atualizado do jogador
    savePlayerData(player);

    res.json({
        action: healMessage,
        currentHealth: player.health,
        currentLevel: player.level,
    });
});

// POST
// Faz o jogador subir de nível
app.post("/player/levelup", (req: Request, res: Response) => {
    const levelMessage = player.upLevel();

    // Salva o estado atualizado do jogador
    savePlayerData(player);

    res.json({
        action: levelMessage,
        currentHealth: player.health,
        currentLevel: player.level,
    });
});

// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log("Rotas disponíveis:");
    console.log("GET /player - Obter informações do jogador");
    console.log("POST /player/attack - Jogador realiza um ataque");
    console.log("POST /player/damage - Jogador recebe dano");
    console.log("POST /player/heal - Jogador recupera vida");
    console.log("POST /player/levelup - Jogador sobe de nível");
});