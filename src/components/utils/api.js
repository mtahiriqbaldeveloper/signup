const checkUserEmail = async (email) => {
  const url = "https://api.raisely.com/v3/check-user";
  let body = {
    campaignUuid: "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a",
    data: {
      email: email,
    },
  };
  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await resp.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

const signup = async (initialValues) => {
  const url = "https://api.raisely.com/v3/signup";
  let body = {
    campaignUuid: "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a",
    data: initialValues,
  };
  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await resp.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export { checkUserEmail, signup };
