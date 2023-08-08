import "./style.css";
import shaka from "shaka-player/dist/shaka-player.ui";
import "shaka-player/dist/controls.css";

if (shaka.Player.isBrowserSupported()) {
    const videoElem = document.querySelector("#video");
    const ui = new shaka.ui.Overlay(
        new shaka.Player(videoElem),
        document.querySelector("#video-container"),
        videoElem
    );
    const player = ui.getControls().getPlayer();

    ui.configure({
        castReceiverAppId: "8D8C71A7",
        castAndroidReceiverCompatible: true
    });

    const support = await shaka.Player.probeSupport();
    const params = new URLSearchParams(location.search);

    const prefix = `${location.origin}${location.pathname.endsWith("/") ? location.pathname : location.pathname + "/"}`;
    console.log(prefix);
    const manifest = `${prefix}${decodeURIComponent(params.get("id"))}/stream.${support.manifest.mpd ? "mpd" : "m3u8"}`;
    console.log(manifest);

    try {
        await player.load(manifest);
        document.title = `${decodeURIComponent(params.get("id"))} - quickvod`;
    } catch (e) {
        console.error(e);
    }
} else {
    console.error("Browser not supported!");
}