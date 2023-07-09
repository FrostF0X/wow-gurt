export default class Size {
    static set(scene) {
        document.getElementsByTagName('body')[0].style.setProperty('--scene-size', scene + "px");
        Size.imageSize = (scene / 8);
    }

    static image() {
        return Size.imageSize;
    }
}
