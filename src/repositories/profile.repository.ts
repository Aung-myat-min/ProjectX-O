import { Profile } from "@/models/profile.model";
import { CustomResponse } from "@/utils/custom-response";
import { redisClient } from "@/config/redis";

const PROFILE_PREFIX = "profile:";
const PROFILE_TTL = 86400 * 30; // 30 days
const MAX_RETRIES = 7;

//region: CRUD Profile
async function createProfile(
	displayName: string
): Promise<CustomResponse<Profile>> {
	try {
		let profile: Profile | null = null;
		let attempts = 0;

		// Try up to 7 times to create a unique profile
		while (attempts < MAX_RETRIES) {
			attempts++;

			// Create new profile with unique code
			profile = Profile.init(displayName);
			const profileKey = `${PROFILE_PREFIX}${profile.userCode}`;

			// Check if profile already exists
			const existingProfile = await redisClient.get(profileKey);

			if (!existingProfile) {
				// Unique code found! Save profile
				await redisClient.setEx(
					profileKey,
					PROFILE_TTL,
					JSON.stringify(profile.toJSON())
				);

				return CustomResponse.success("Profile created successfully", profile);
			}

			// If this was the last attempt
			if (attempts === MAX_RETRIES) {
				return CustomResponse.fail(
					`Failed to generate unique profile code after ${MAX_RETRIES} attempts`
				);
			}
		}

		// This should never be reached, but TypeScript needs it
		return CustomResponse.fail("Failed to create profile");
	} catch (e) {
		console.error("Error creating profile: ", e);
		return CustomResponse.serverErr("Failed to create profile");
	}
}

async function getProfile(
	profileCode: string
): Promise<CustomResponse<Profile>> {
	try {
		const profileKey = `${PROFILE_PREFIX}${profileCode}`;

		// Get profile from Redis
		const profileStr = await redisClient.get(profileKey);

		if (!profileStr) {
			return CustomResponse.notFound("Profile not found");
		}

		const profile = Profile.fromJSON(JSON.parse(profileStr));

		// Refresh TTL when profile is accessed
		await redisClient.expire(profileKey, PROFILE_TTL);

		return CustomResponse.success("Profile retrieved successfully", profile);
	} catch (e) {
		console.error("Error getting profile: ", e);
		return CustomResponse.serverErr("Failed to retrieve profile");
	}
}

async function getAllProfiles(): Promise<CustomResponse<Profile[]>> {
	try {
		// Get all profile keys
		const keys = await redisClient.keys(`${PROFILE_PREFIX}*`);

		if (keys.length === 0) {
			return CustomResponse.success("No profiles found", []);
		}

		// Get all profiles
		const profiles: Profile[] = [];
		for (const key of keys) {
			const profileStr = await redisClient.get(key);
			if (profileStr) {
				profiles.push(Profile.fromJSON(JSON.parse(profileStr)));
			}
		}

		return CustomResponse.success(
			`Retrieved ${profiles.length} profile(s)`,
			profiles
		);
	} catch (e) {
		console.error("Error getting all profiles: ", e);
		return CustomResponse.serverErr("Failed to retrieve profiles");
	}
}

async function updateProfile(
	profileCode: string,
	modifiedProfile: Profile
): Promise<CustomResponse<Profile>> {
	try {
		const profileKey = `${PROFILE_PREFIX}${profileCode}`;

		// Check if profile exists
		const existingProfileStr = await redisClient.get(profileKey);
		if (!existingProfileStr) {
			return CustomResponse.notFound("Profile not found");
		}

		// Verify the profile code matches
		if (modifiedProfile.userCode !== profileCode) {
			return CustomResponse.invalidData(
				"Profile code mismatch - cannot update userCode"
			);
		}

		// Update profile in Redis with full TTL
		await redisClient.setEx(
			profileKey,
			PROFILE_TTL,
			JSON.stringify(modifiedProfile.toJSON())
		);

		return CustomResponse.success(
			"Profile updated successfully",
			modifiedProfile
		);
	} catch (e) {
		console.error("Error updating profile: ", e);
		return CustomResponse.serverErr("Failed to update profile");
	}
}

async function deleteProfile(
	profileCode: string
): Promise<CustomResponse<null>> {
	try {
		const profileKey = `${PROFILE_PREFIX}${profileCode}`;

		// Check if profile exists
		const existingProfile = await redisClient.get(profileKey);
		if (!existingProfile) {
			return CustomResponse.notFound("Profile not found");
		}

		// Delete profile from Redis
		await redisClient.del(profileKey);

		return CustomResponse.success("Profile deleted successfully");
	} catch (e) {
		console.error("Error deleting profile: ", e);
		return CustomResponse.serverErr("Failed to delete profile");
	}
}
//endregion

export {
	createProfile,
	getProfile,
	getAllProfiles,
	updateProfile,
	deleteProfile,
};
