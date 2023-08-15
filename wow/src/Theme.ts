import {Theme} from '@rainbow-me/rainbowkit';
import {ThemeVars} from "@rainbow-me/rainbowkit/dist/css/sprinkles.css";

const vars: ThemeVars = {
    colors: {
        connectButtonBackground: "A0D1F4",
        modalBackdrop: "white",
        modalBackground: "A0D1F4",
        accentColor: "A0D1F4",
        accentColorForeground: "white",
        actionButtonBorder: "A0D1F4",
        actionButtonBorderMobile: "A0D1F4",
        actionButtonSecondaryBackground: "A0D1F4",
        closeButton: "white",
        closeButtonBackground: "A0D1F4",
        connectButtonBackgroundError: "A0D1F4",
        connectButtonInnerBackground: "A0D1F4",
        connectButtonText: "white",
        connectButtonTextError: "white",
        connectionIndicator: "A0D1F4",
        downloadBottomCardBackground: "A0D1F4",
        downloadTopCardBackground: "A0D1F4",
        error: "A0D1F4",
        generalBorder: "A0D1F4",
        generalBorderDim: "A0D1F4",
        menuItemBackground: "A0D1F4",
        modalBorder: "white",
        modalText: "white",
        modalTextDim: "white",
        modalTextSecondary: "white",
        profileAction: "A0D1F4",
        profileActionHover: "A0D1F4",
        profileForeground: "white",
        selectedOptionBorder: "A0D1F4",
        standby: "A0D1F4",
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
        modalOverlay: "A0D1F4"
    }
};
export const theme: Theme = {darkMode: vars, lightMode: vars};
