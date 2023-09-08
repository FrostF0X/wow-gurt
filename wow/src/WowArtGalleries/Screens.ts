import {LEFT} from "./Scroller";

export default class Screens {
    public activeScreen: Screen;
    public activeSection: Section;

    constructor(private screens: Screen[]) {
        this.activeScreen = this.screens[0];
        this.activeSection = this.activeScreen.first();
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
