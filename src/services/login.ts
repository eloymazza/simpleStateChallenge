export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch(
      "https://02ede33a-b196-40a7-87ea-40cc76ac4399.mock.pstmn.io/test/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error: ", error);
  }
};
