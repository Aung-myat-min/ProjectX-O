import { createUniqueCode } from "@/utils/create-unique-code";

class Profile {
	private readonly _userCode: string;
	displayName: string;
	private _createdGame: string[];
	private _wonMatches: string[];
	private _currentGame: string | null;
	createdAt: Date;

	private constructor(
		userCode: string,
		displayName: string,
		createdGame: string[],
		wonMatches: string[],
		currentGame: string | null,
		createdAt: Date
	) {
		this._userCode = userCode;
		this.displayName = displayName;
		this._createdGame = createdGame;
		this._wonMatches = wonMatches;
		this._currentGame = currentGame;
		this.createdAt = createdAt;
	}

	public static init(displayName: string) {
		const newUserCode = createUniqueCode();
		return new Profile(newUserCode, displayName, [], [], null, new Date());
	}

	//region: getters
	get userCode() {
		return this._userCode;
	}

	get createdGame() {
		return this._createdGame;
	}

	get wonMatches() {
		return this._wonMatches;
	}

	get currentGame() {
		return this._currentGame;
	}
	//endregion

	public addNewGame(gameId: string) {
		this._createdGame.push(gameId);
	}

	public updateWonMatches(gameId: string) {
		this._wonMatches.push(gameId);
	}

	public updateCurrentGame(gameId: string | null) {
		this._currentGame = gameId;
	}

	//region: JSON conversion methods
	public toJSON(): object {
		return {
			userCode: this._userCode,
			displayName: this.displayName,
			createdGame: this._createdGame,
			wonMatches: this._wonMatches,
			currentGame: this._currentGame,
			createdAt: this.createdAt.toISOString(),
		};
	}

	public static fromJSON(json: any): Profile {
		return new Profile(
			json.userCode,
			json.displayName,
			json.createdGame || [],
			json.wonMatches || [],
			json.currentGame || null,
			new Date(json.createdAt)
		);
	}
	//endregion
}

export { Profile };