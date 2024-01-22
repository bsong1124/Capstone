import * as userApi from "./user-api";

export async function createMyProfile(data) {
  // console.log({data})
  try {
    const portfolio = userApi.createProfile(data);
    return portfolio;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}

export async function getMyProfile(data) {
  // console.log('---SERVICE WORKING')
  try {
    const profile = userApi.getProfile(data);
    return profile;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}

export async function editMyProfile(data) {
  console.log("---SERVICE WORKING");
  console.log({ data });
  try {
    const profile = userApi.editProfile(data);
    return profile;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}
