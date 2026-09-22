// A palavra Classe define que estamos criando um molde.
// A export permite que esse arquivo seja usado por outros arquivos (.ts)

export class Player {
    public name: string; // Nome do jogador (texto)
    public health: number; // Vida do jogador (número)
    public level: number; // Nível do jogador (número)

    // O construtor é executado toda vez que uma nova instância da classe é criada.
    constructor(name: string, health: number = 100, level: number = 1) {
        // "this" faz referência à própria classe.
        this.name = name;
        this.health = health;
        this.level = level;
    }

    // Métodos representam os comportamentos da classe.
    public attack(): string {
        const damage = this.level * 10; // Calcula o dano baseado no nível do jogador

        return `${this.name} atacou e causou ${damage} de Dano!`;
    }

    // Recebe uma quantidade de dano e diminui a vida do jogador.
    public takeDamage(amount: number): string {
        this.health -= amount;

        if (this.health < 0) {
            this.health = 0;
            return `${this.name} foi derrotado!`;
        }

        return `${this.name} recebeu ${amount} de dano e agora tem ${this.health} de vida.`;
    }

    // Recupera a vida do jogador.
    public takeHealth(amount: number): string {
        this.health += amount;

        // Impede que a vida ultrapasse 100.
        if (this.health > 100) {
            this.health = 100;
        }

        return `${this.name} recuperou ${amount} de vida e agora tem ${this.health} de vida.`;
    }

    // Aumenta o nível do jogador.
    public upLevel(): string {
        this.level += 1;

        return `${this.name} subiu para o nível ${this.level}!`;
    }
}