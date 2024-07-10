// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import {EventType, PublicClientApplication} from "@azure/msal-browser";

// import Main from "./main";
// import { msalConfig } from "./_mock/login";




// /**
// * MSAL should be instantiated outside of the component tree to prevent it from being re-instantiated on re-renders.
// * For more, visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
// */
// const msalInstance = new PublicClientApplication(msalConfig);

// // Default to using the first account if no account is active on page load
// if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
//     // Account selection logic is app dependent. Adjust as needed for different use cases.
//     msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
// }

// msalInstance.addEventCallback((event) => {
//     if (
//         (event.eventType === EventType.LOGIN_SUCCESS ||
//             event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS ||
//             event.eventType === EventType.SSO_SILENT_SUCCESS) &&
//         event.payload.account
//     ) {
//         msalInstance.setActiveAccount(event.payload.account);
//     }
// });

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//     <React.StrictMode>
//         <BrowserRouter>
//             <Main instance={msalInstance} />
//         </BrowserRouter>
//     </React.StrictMode>
// );