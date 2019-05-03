import React, { useEffect } from "react";

export default function Callback(props) {
  const { hash } = props.location;
  const { auth } = props;
  useEffect(() => {
    if (/access_token|id_token|error/.test(hash)) {
      auth.handleAuthentication();
    } else {
      throw new Error("Invalid Callback URL.");
    }
  }, [hash]);

  return (
    <div>
      return <h1>Loading...</h1>;
    </div>
  );
}
