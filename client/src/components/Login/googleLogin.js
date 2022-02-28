import React from "react";
import GoogleLogin from "react-google-login";

const clientId =
  "828263528533-ja90a5bpsr4tve8tqm3oceacq1otkcl5.apps.googleusercontent.com";

export default function GoogleButton({ onSocial }) {
  const onSuccess = async (response) => {
    console.log(response);

    const { googleId, profileObj } = await response;

    // await onSocial({
    //   socialId: googleId,
    //   socialType: "google",
    //   email,
    //   nickname: name,
    // });
    console.log(profileObj);
    localStorage.setItem("accessToken", JSON.stringify(profileObj));
  };

  const onFailure = (error) => {
    console.log(error);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        responseType={"id_token"}
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  );
}
