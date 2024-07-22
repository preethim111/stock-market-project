import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
 url: "https://auth.gstinc.link/auth",
 realm: "gst",
 clientId: "react-app",
});

export default keycloak;