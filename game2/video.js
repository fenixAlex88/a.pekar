export function video() {
    const app = document.getElementById('app');
    app.innerHTML = null;
    const video = document.createElement('video');
    app.append(video);
    video.src = './assets/video/1.mp4';
    video.style.width = '100%';
    video.style.height = '100vh';
    video.controls = false;
    video.autoplay ="autoplay";
    video.muted="muted";
}