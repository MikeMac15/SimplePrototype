export class Player {
    public name:string;
    public color:string;
    public length:number;
    public scorecard:number[] = []; // 1-indexed
    public buy_in:number;
    public skin:number;
    public won:number = 0;
    public lost:number = 0;
    public total:number = 0;
    constructor(playerName: string, color:string, buyIn: number, holesToPlay: number) {
        this.name = playerName;
        this.color = color;
        this.buy_in = buyIn;
        this.length = holesToPlay;
        this.skin = buyIn/holesToPlay;
    }

    public addScore(score: number) {
        this.scorecard.push(score);
    }

    public winSkin(amount: number) {
        this.won += amount;
        this.total += amount;
    }

    public loseSkin(): number {
        this.lost  += this.skin;
        this.total -= this.skin;
        return this.skin;
    }

    public winMatch(amount: number) {
        this.won   += amount;
        this.total += amount;
    }

    public loseMatch() {
        this.lost  += this.buy_in;
        this.total -= this.buy_in;
    }


}

interface HoleWinner{
    name: string;
    color: string;
}
export class SkinsGame {
    public players: Player[];
    public length: number;
    public pot: number;
    public currentHole: number = 1;
    public holeWinners: HoleWinner[] = [];
    public holeMultiplier: number = 1;
    // pusher?: Player;

    constructor(holesToPlay: number, players: Player[], pot: number) {
        this.length = holesToPlay;
        this.players = players;
        this.pot = pot;
        // create pusher
    }

    public getHoleWinnerOrPush() {
        let pushFlag = false;
        let winner: Player = this.players[0];

        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].scorecard[this.currentHole] < winner.scorecard[this.currentHole]) {
                winner = this.players[i];
                pushFlag = false;
            } else if (this.players[i].scorecard[this.currentHole] === winner.scorecard[this.currentHole]) {
                pushFlag = true;
            }
        }

        if (pushFlag) {
            this.holeMultiplier += 1;
            this.holeWinners.push({name:'-', color:'#666'});
        } else {  
            
            // if there is a winner //
            
            this.holeWinners.push({name: winner.name[0], color: winner.color});

            // start payout logic
            let total = 0;

            for (let i = 0; i < this.players.length; i++) {
                if (this.players[i] !== winner) {
                    let skinsMultiplier = this.holeMultiplier;
                    while (skinsMultiplier > 0) {
                        total += this.players[i].loseSkin();
                        skinsMultiplier--;
                    }
                }

            }
            winner.winSkin(total);
            this.holeMultiplier = 1;

        }

    }
}