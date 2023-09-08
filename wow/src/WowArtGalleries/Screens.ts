import {LEFT} from "./Scroller";


export class ActiveScreens implements ScreensIterator {
    private screens: Screens | null;
    private readonly rememberedScreens: Screen[] = [];

    constructor() {
        this.screens = null;
        this.rememberedScreens = [];
    }

    add(screen: Screen) {
        this.rememberedScreens.push(screen);
        if (!this.screens) {
            this.screens = new Screens(this.rememberedScreens, this.rememberedScreens[0], this.rememberedScreens[0].first());
        } else {
            this.screens = new Screens(this.rememberedScreens, this.screens.activeScreen, this.screens.activeSection);
        }
    }

    moveScreen(direction: "left" | "right"): Screen | null {
        return this.getScreens().moveScreen(direction);
    }

    moveSection(direction: "left" | "right"): Section | null {
        return this.getScreens().moveSection(direction);
    }

    nextScreen(): Screen | null {
        return this.getScreens().nextScreen();
    }

    nextSection(): Section | null {
        return this.getScreens().nextSection();
    }

    prevScreen(): Screen | null {
        return this.getScreens().prevScreen();
    }

    prevSection(): Section | null {
        return this.getScreens().prevSection();
    }

    private getScreens(): Screens {
        if (!this.screens) {
            throw new Error('No screens added');
        }
        return this.screens;
    }

    getActiveScreen(): Screen {
        return this.getScreens().getActiveScreen();
    }

    getActiveSection(): Section {
        return this.getScreens().getActiveSection();
    }
}

interface ScreensIterator {
    moveSection(direction: "left" | "right"): Section | null;

    moveScreen(direction: "left" | "right"): Screen | null;

    getActiveScreen(): Screen;

    getActiveSection(): Section;

    nextSection(): Section | null;

    prevSection(): Section | null;

    nextScreen(): Screen | null;

    prevScreen(): Screen | null;
}

export default class Screens implements ScreensIterator {

    constructor(private screens: Screen[], public activeScreen: Screen, public activeSection: Section) {
    }

    moveSection(direction: "left" | "right") {
        if (direction === LEFT) {
            return this.prevSection();
        }
        return this.nextSection();
    }

    moveScreen(direction: "left" | "right") {
        if (direction === LEFT) {
            return this.prevScreen();
        }
        return this.nextScreen();
    }

    nextSection() {
        let nextSection = this.activeScreen.next(this.activeSection);
        if (nextSection) {
            this.activeSection = nextSection;
            return this.activeSection;
        }
        return null;
    }

    prevSection() {
        let prevSection = this.activeScreen.prev(this.activeSection);
        if (prevSection) {
            this.activeSection = prevSection;
            return this.activeSection;
        }
        return null;
    }

    nextScreen() {
        const index = this.screens.indexOf(this.activeScreen);
        if (index === -1) {
            throw new Error('Screen not found, raise condition');
        }
        if (index === this.screens.length - 1) {
            return null;
        }
        this.activeScreen = this.screens[index + 1];
        this.activeSection = this.activeScreen.first();
        return this.activeScreen;
    }

    prevScreen() {
        const index = this.screens.indexOf(this.activeScreen);
        if (index === -1) {
            throw new Error('Screen not found, raise condition');
        }
        if (index === 0) {
            return null;
        }
        this.activeScreen = this.screens[index - 1];
        this.activeSection = this.activeScreen.last();
        return this.activeScreen;
    }

    getActiveScreen(): Screen {
        return this.activeScreen;
    }

    getActiveSection(): Section {
        return this.activeSection;
    }
}

export class Screen {

    constructor(private sections: Section[], public reference: any) {
    }

    first() {
        return this.sections[0];
    }

    last() {
        return this.sections[this.sections.length - 1];
    }

    next(activeSection: Section) {
        const index = this.sections.indexOf(activeSection);
        if (index === -1) {
            throw new Error('Section not found, raise condition');
        }
        if (index === this.sections.length - 1) {
            return null;
        }
        return this.sections[index + 1];
    }

    prev(activeSection: Section) {
        const index = this.sections.indexOf(activeSection);
        if (index === -1) {
            throw new Error('Section not found, raise condition');
        }
        if (index === 0) {
            return null;
        }
        return this.sections[index - 1];
    }
}

export class Section {
    constructor(public reference: any) {
    }

    getScrollTo() {
        return this.reference;
    }

    is(section: any) {
        return this.reference === section;
    }
}
