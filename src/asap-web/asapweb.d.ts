export namespace asapWeb {
    function stop(): void;
    function playContent(filename: any, content: any, song: any): void;
    function togglePause(): boolean;
    function isPaused(): boolean;
    function playUrl(url: any, song: any): void;
    function playFile(file: any): void;
    function seek(position: any): void;
}
