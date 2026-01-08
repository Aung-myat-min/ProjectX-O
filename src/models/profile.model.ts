import { createUniqueCode } from "@/utils/create-unique-code";

class Profile {
	private _userCode: string;
	displayName: string;
	private _createdGame: string[];
	private _wonMatches: string[];
	private _currentGame: string | null;
	createdAt: Date;

	private constructor(userCode: string, displayName: string, createdGame: string[], wonMatches: string[], currentGame: string | null, createdAt: Date) {
		this._userCode = userCode;
		this.displayName = displayName;
		this._createdGame = createdGame;
		this._wonMatches = wonMatches;
		this._currentGame = currentGame;
		this.createdAt = createdAt;
	}

	public static init(displayName: string){
		const newUserCode = createUniqueCode();
		return new Profile(newUserCode, displayName, [], [],  null, new Date());
	}
}

export { Profile };