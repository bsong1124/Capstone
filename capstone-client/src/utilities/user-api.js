import config from "../config";

export async function createProfile(data) {
  const profileResponse = await fetch(`${config.BASE_URL}/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (profileResponse.ok) {
    const profileData = await profileResponse.json();
    return profileData;
  } else {
    console.log(err.message);
  }
}

export async function getProfile(data) {
  // console.log('---API WORKING')
  // console.log({data})
  const profileResponse = await fetch(`${config.BASE_URL}/profile?q=${data}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (profileResponse.ok) {
    const profileData = await profileResponse.json();
    console.log("PROFILERESPONSE", profileData);
    return profileData;
  } else {
    console.log(err.message);
  }
}

export async function editProfile(data) {
  console.log("---API WORKING");
  console.log({ data });
  const profileResponse = await fetch(`${config.BASE_URL}/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (profileResponse.ok) {
    const profileData = await profileResponse.json();
    console.log("PROFILERESPONSE", profileData);
    return profileData;
  } else {
    console.log(err.message);
  }
}
