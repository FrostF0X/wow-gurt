import {Theme} from '@rainbow-me/rainbowkit';
import {ThemeVars} from "@rainbow-me/rainbowkit/dist/css/sprinkles.css";

const vars: ThemeVars = {
    colors: {
        connectButtonBackground: "#FE2AAA",
        modalBackdrop: "black",
        modalBackground: "#FE2AAA",
        accentColor: "#FE2AAA",
        accentColorForeground: "white",
        actionButtonBorder: "#FE2AAA",
        actionButtonBorderMobile: "#FE2AAA",
        actionButtonSecondaryBackground: "#FE2AAA",
        closeButton: "white",
        closeButtonBackground: "#FE2AAA",
        connectButtonBackgroundError: "#FE2AAA",
        connectButtonInnerBackground: "#FE2AAA",
        connectButtonText: "white",
        connectButtonTextError: "white",
        connectionIndicator: "#FE2AAA",
        downloadBottomCardBackground: "#FE2AAA",
        downloadTopCardBackground: "#FE2AAA",
        error: "#FE2AAA",
        generalBorder: "#FE2AAA",
        generalBorderDim: "#FE2AAA",
        menuItemBackground: "#FE2AAA",
        modalBorder: "white",
        modalText: "white",
        modalTextDim: "white",
        modalTextSecondary: "white",
        profileAction: "#FE2AAA",
        profileActionHover: "#FE2AAA",
        profileForeground: "black",
        selectedOptionBorder: "#FE2AAA",
        standby: "#FE2AAA",
    },
    shadows: {
        connectButton: 'none',
        dialog: 'none',
        profileDetailsAction: 'none',
        selectedOption: 'none',
        selectedWallet: 'none',
        walletLogo: 'none',
    },
    fonts: {
        body: "Machina ub, serif"
    },
    radii: {
        actionButton: "white",
        connectButton: "",
        menuButton: "",
        modal: "",
        modalMobile: "",
    },
    blurs: {
        modalOverlay: "#FE2AAA"
    }
};
export const theme: Theme = {darkMode: vars, lightMode: vars};
