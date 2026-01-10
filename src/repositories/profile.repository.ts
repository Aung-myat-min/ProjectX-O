import { Profile } from "@/models/profile.model";

async function createdProfile(newProfile: Profile) {}
async function getProfile(profileCode: string) {}
async function getAllProfiles() {}
async function updateProfile(profileCode: string, modifiedProfile: Profile) {}
async function deleteProfile(profileCode: string) {}

export {
	createdProfile,
	getProfile,
	getAllProfiles,
	updateProfile,
	deleteProfile,
};
