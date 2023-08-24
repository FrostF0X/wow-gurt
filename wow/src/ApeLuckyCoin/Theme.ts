import {Theme} from '@rainbow-me/rainbowkit';
import {ThemeVars} from "@rainbow-me/rainbowkit/dist/css/sprinkles.css";

const vars: ThemeVars = {
    colors: {
        connectButtonBackground: "transparent",
        modalBackdrop: "transparent",
        modalBackground: "black",
        accentColor: "black",
        accentColorForeground: "white",
        actionButtonBorder: "black",
        actionButtonBorderMobile: "black",
        actionButtonSecondaryBackground: "black",
        closeButton: "white",
        closeButtonBackground: "black",
        connectButtonBackgroundError: "black",
        connectButtonInnerBackground: "black",
        connectButtonText: "white",
        connectButtonTextError: "white",
        connectionIndicator: "black",
        downloadBottomCardBackground: "black",
        downloadTopCardBackground: "black",
        error: "black",
        generalBorder: "black",
        generalBorderDim: "black",
        menuItemBackground: "black",
        modalBorder: "white",
        modalText: "white",
        modalTextDim: "white",
        modalTextSecondary: "white",
        profileAction: "black",
        profileActionHover: "black",
        profileForeground: "black",
        selectedOptionBorder: "black",
        standby: "black",
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
        body: "GT America Regular, Roboto Light, serif"
    },
    radii: {
        actionButton: "white",
        connectButton: "",
        menuButton: "",
        modal: "",
        modalMobile: "",
    },
    blurs: {
        modalOverlay: "transparent"
    }
};
export const theme: Theme = {darkMode: vars, lightMode: vars};
