export default class Size {
    static size(scene, el) {
        el.style.setProperty('--scene-size', scene + "px");
        Size.imageSize = (scene / 8);
    }

    static image() {
        return Size.imageSize;
    }
}
