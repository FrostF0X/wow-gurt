import {Theme} from '@rainbow-me/rainbowkit';
import {ThemeVars} from "@rainbow-me/rainbowkit/dist/css/sprinkles.css";

const vars: ThemeVars = {
    colors: {
        connectButtonBackground: "transparent",
        modalBackdrop: "#b8b3f682",
        modalBackground: "linear-gradient(104deg, #ffc9d8, #c3e1ff)",
        accentColor: "transparent",
        accentColorForeground: "#483dcc",
        actionButtonBorder: "#483dcc",
        actionButtonBorderMobile: "#483dcc",
        actionButtonSecondaryBackground: "transparent",
        closeButton: "#483dcc",
        closeButtonBackground: "transparent",
        connectButtonBackgroundError: "transparent",
        connectButtonInnerBackground: "transparent",
        connectButtonText: "#483dcc",
        connectButtonTextError: "#483dcc",
        connectionIndicator: "linear-gradient(104deg, #ffc9d8, #c3e1ff)",
        downloadBottomCardBackground: "transparent",
        downloadTopCardBackground: "transparent",
        error: "linear-gradient(104deg, #ffc9d8, #c3e1ff)",
        generalBorder: "#483dcc",
        generalBorderDim: "#483dcc",
        menuItemBackground: "transparent",
        modalBorder: "#483dcc",
        modalText: "#483dcc",
        modalTextDim: "#483dcc",
        modalTextSecondary: "#483dcc",
        profileAction: "transparent",
        profileActionHover: "transparent",
        profileForeground: "linear-gradient(104deg, #ffc9d8, #c3e1ff)",
        selectedOptionBorder: "#483dcc",
        standby: "linear-gradient(104deg, #ffc9d8, #c3e1ff)",
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
        actionButton: "#483dcc",
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
