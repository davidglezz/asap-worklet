/**
 * Atari 8-bit chip music emulator.
 * This class performs no I/O operations - all music data must be passed in byte arrays.
 */
export class ASAP {
    /**
     * Default output sample rate.
     */
    static SAMPLE_RATE: number;
    static "__#1@#putLittleEndian"(buffer: Uint8Array, offset: number, value: number): void;
    static "__#1@#fourCC"(s: string): number;
    static "__#1@#putLittleEndians"(buffer: Uint8Array, offset: number, value1: number, value2: number): void;
    static "__#1@#putWavMetadata"(buffer: Uint8Array, offset: number, fourCC: string, value: string): number;
    nextEventCycle: number;
    /**
     * Returns the output sample rate.
     */
    getSampleRate(): number;
    /**
     * Sets the output sample rate.
     */
    setSampleRate(sampleRate: number): void;
    /**
     * Enables silence detection.
     * Causes playback to stop after the specified period of silence.
     * @param seconds Length of silence which ends playback. Zero disables silence detection.
     */
    detectSilence(seconds: number): void;
    peekHardware(addr: number): number;
    pokeHardware(addr: number, data: number): void;
    isIrq(): boolean;
    handleEvent(): void;
    /**
     * Loads music data ("module").
     * @param filename Filename, used to determine the format.
     * @param module Contents of the file.
     * @param moduleLen Length of the file.
     */
    load(filename: string, module: Uint8Array, moduleLen: number): void;
    /**
     * Returns information about the loaded module.
     */
    getInfo(): ASAPInfo;
    /**
     * Mutes the selected POKEY channels.
     * @param mask An 8-bit mask which selects POKEY channels to be muted.
     */
    mutePokeyChannels(mask: number): void;
    /**
     * Prepares playback of the specified song of the loaded module.
     * @param song Zero-based song index.
     * @param duration Playback time in milliseconds, -1 means infinity.
     */
    playSong(song: number, duration: number): void;
    /**
     * Returns current playback position in blocks.
     * A block is one sample or a pair of samples for stereo.
     */
    getBlocksPlayed(): number;
    /**
     * Returns current playback position in milliseconds.
     */
    getPosition(): number;
    /**
     * Changes the playback position.
     * @param block The requested absolute position in samples (always 44100 per second, even in stereo).
     */
    seekSample(block: number): void;
    /**
     * Changes the playback position.
     * @param position The requested absolute position in milliseconds.
     */
    seek(position: number): void;
    /**
     * Fills leading bytes of the specified buffer with WAV file header.
     * Returns the number of changed bytes.
     * @param buffer The destination buffer.
     * @param format Format of samples.
     * @param metadata Include metadata (title, author, date).
     */
    getWavHeader(buffer: Uint8Array, format: 0 | 1 | 2, metadata: boolean): number;
    /**
     * Fills the specified buffer with generated samples.
     * @param buffer The destination buffer.
     * @param bufferLen Number of bytes to fill.
     * @param format Format of samples.
     */
    generate(buffer: Uint8Array, bufferLen: number, format: 0 | 1 | 2): number;
    /**
     * Returns POKEY channel volume - an integer between 0 and 15.
     * @param channel POKEY channel number (from 0 to 7).
     */
    getPokeyChannelVolume(channel: number): number;
    #private;
}
/**
 * Exception thrown when the input file is invalid.
 */
export class ASAPFormatException extends Error {
}
/**
 * Exception thrown when an invalid argument is passed.
 */
export class ASAPArgumentException extends Error {
}
/**
 * Information about a music file.
 */
export class ASAPInfo {
    /**
     * ASAP version - major part.
     */
    static VERSION_MAJOR: number;
    /**
     * ASAP version - minor part.
     */
    static VERSION_MINOR: number;
    /**
     * ASAP version - micro part.
     */
    static VERSION_MICRO: number;
    /**
     * ASAP version as a string.
     */
    static VERSION: string;
    /**
     * Years ASAP was created in.
     */
    static YEARS: string;
    /**
     * Short credits for ASAP.
     */
    static CREDITS: string;
    /**
     * Short license notice.
     * Display after the credits.
     */
    static COPYRIGHT: string;
    /**
     * Maximum length of a supported input file.
     * You may assume that files longer than this are not supported by ASAP.
     */
    static MAX_MODULE_LENGTH: number;
    /**
     * Maximum length of text metadata.
     */
    static MAX_TEXT_LENGTH: number;
    /**
     * Maximum number of songs in a file.
     */
    static MAX_SONGS: number;
    static "__#3@#isValidChar"(c: number): boolean;
    static getWord(array: Uint8Array, i: number): number;
    static "__#3@#isDltTrackEmpty"(module: Uint8Array, pos: number): boolean;
    static "__#3@#isDltPatternEnd"(module: Uint8Array, pos: number, i: number): boolean;
    static "__#3@#getRmtInstrumentFrames"(module: Uint8Array, instrument: number, volume: number, volumeFrame: number, onExtraPokey: boolean): number;
    static "__#3@#validateRmt"(module: Uint8Array, moduleLen: number): boolean;
    static "__#3@#parseTmcTitle"(title: Uint8Array, titleLen: number, module: Uint8Array, moduleOffset: number): number;
    static "__#3@#afterFF"(module: Uint8Array, moduleLen: number, currentOffset: number): number;
    static "__#3@#getFcTrackCommand"(module: Uint8Array, trackpos: number, n: number): number;
    static "__#3@#isFcSongEnd"(module: Uint8Array, trackpos: number): boolean;
    static "__#3@#validateFc"(module: Uint8Array, moduleLen: number): boolean;
    static "__#3@#parseText"(module: Uint8Array, i: number, argEnd: number): string;
    static "__#3@#hasStringAt"(module: Uint8Array, moduleIndex: number, s: string): boolean;
    static "__#3@#parseDec"(module: Uint8Array, i: number, argEnd: number, minVal: number, maxVal: number): number;
    static "__#3@#parseHex"(module: Uint8Array, i: number, argEnd: number): number;
    /**
     * Returns the number of milliseconds represented by the given string.
     * @param s Time in the <code>"mm:ss.xxx"</code> format.
     */
    static parseDuration(s: string): number;
    static "__#3@#validateSap"(module: Uint8Array, moduleLen: number): boolean;
    static packExt(ext: string): number;
    static getPackedExt(filename: string): number;
    static "__#3@#isOurPackedExt"(ext: string): boolean;
    /**
     * Checks whether the filename represents a module type supported by ASAP.
     * Returns <code>true</code> if the filename is supported by ASAP.
     * @param filename Filename to check the extension of.
     */
    static isOurFile(filename: string): boolean;
    /**
     * Checks whether the filename extension represents a module type supported by ASAP.
     * Returns <code>true</code> if the filename extension is supported by ASAP.
     * @param ext Filename extension without the leading dot.
     */
    static isOurExt(ext: string): boolean;
    static "__#3@#guessPackedExt"(module: Uint8Array, moduleLen: number): 7364979 | 7630194 | 2122598;
    static "__#3@#checkValidText"(s: string): void;
    /**
     * Returns human-readable description of the filename extension.
     * @param ext Filename extension without the leading dot.
     */
    static getExtDescription(ext: string): "Slight Atari Player" | "Chaos Music Composer" | "CMC \"3/4\"" | "CMC \"Rzog\"" | "Stereo Double CMC" | "CMC DoublePlay" | "Delta Music Composer" | "Music ProTracker" | "MPT DoublePlay" | "Raster Music Tracker" | "Theta Music Composer 1.x" | "Theta Music Composer 2.x" | "Future Composer" | "Atari 8-bit executable";
    static RMT_INIT: number;
    static "__#3@#GET_RMT_INSTRUMENT_FRAMES_RMT_VOLUME_SILENT": Uint8Array;
    type: ASAPModuleType;
    player: number;
    headerLen: number;
    songPos: Uint8Array;
    /**
     * Loads file information.
     * @param filename Filename, used to determine the format.
     * @param module Contents of the file.
     * @param moduleLen Length of the file.
     */
    load(filename: string, module: Uint8Array, moduleLen: number): void;
    /**
     * Returns author's name.
     * A nickname may be included in parentheses after the real name.
     * Multiple authors are separated with <code>" &amp; "</code>.
     * An empty string means the author is unknown.
     */
    getAuthor(): string;
    /**
     * Sets author's name.
     * A nickname may be included in parentheses after the real name.
     * Multiple authors are separated with <code>" &amp; "</code>.
     * An empty string means the author is unknown.
     * @param value New author's name for the current music.
     */
    setAuthor(value: string): void;
    /**
     * Returns music title.
     * An empty string means the title is unknown.
     */
    getTitle(): string;
    /**
     * Sets music title.
     * An empty string means the title is unknown.
     * @param value New title for the current music.
     */
    setTitle(value: string): void;
    /**
     * Returns music title or filename.
     * If title is unknown returns filename without the path or extension.
     */
    getTitleOrFilename(): string;
    /**
     * Returns music creation date.
     *
     * <p>Some of the possible formats are:
     * <ul>
     * <li>YYYY</li>
     * <li>MM/YYYY</li>
     * <li>DD/MM/YYYY</li>
     * <li>YYYY-YYYY</li>
     * </ul>
     * <p>An empty string means the date is unknown.
     */
    getDate(): string;
    /**
     * Sets music creation date.
     *
     * <p>Some of the possible formats are:
     * <ul>
     * <li>YYYY</li>
     * <li>MM/YYYY</li>
     * <li>DD/MM/YYYY</li>
     * <li>YYYY-YYYY</li>
     * </ul>
     * <p>An empty string means the date is unknown.
     * @param value New music creation date.
     */
    setDate(value: string): void;
    /**
     * Returns music creation year.
     * -1 means the year is unknown.
     */
    getYear(): number;
    /**
     * Returns music creation month (1-12).
     * -1 means the month is unknown.
     */
    getMonth(): number;
    /**
     * Returns day of month of the music creation date.
     * -1 means the day is unknown.
     */
    getDayOfMonth(): number;
    /**
     * Returns 1 for mono or 2 for stereo.
     */
    getChannels(): number;
    /**
     * Returns number of songs in the file.
     */
    getSongs(): number;
    /**
     * Returns 0-based index of the "main" song.
     * The specified song should be played by default.
     */
    getDefaultSong(): number;
    /**
     * Sets the 0-based index of the "main" song.
     * @param song New default song.
     */
    setDefaultSong(song: number): void;
    /**
     * Returns length of the specified song.
     * The length is specified in milliseconds. -1 means the length is indeterminate.
     * @param song Song to get length of, 0-based.
     */
    getDuration(song: number): number;
    /**
     * Sets length of the specified song.
     * The length is specified in milliseconds. -1 means the length is indeterminate.
     * @param song Song to set length of, 0-based.
     * @param duration New length in milliseconds.
     */
    setDuration(song: number, duration: number): void;
    /**
     * Returns information whether the specified song loops.
     *
     * <p>Returns:
     * <ul>
     * <li><code>true</code> if the song loops</li>
     * <li><code>false</code> if the song stops</li>
     * </ul>
     * @param song Song to check for looping, 0-based.
     */
    getLoop(song: number): boolean;
    /**
     * Sets information whether the specified song loops.
     *
     * <p>Use:
     * <ul>
     * <li><code>true</code> if the song loops</li>
     * <li><code>false</code> if the song stops</li>
     * </ul>
     * @param song Song to set as looping, 0-based.
     * @param loop <code>true</code> if the song loops.
     */
    setLoop(song: number, loop: boolean): void;
    /**
     * Returns <code>true</code> for an NTSC song and <code>false</code> for a PAL song.
     */
    isNtsc(): boolean;
    /**
     * Returns <code>true</code> if NTSC can be set or removed.
     */
    canSetNtsc(): boolean;
    /**
     * Marks a SAP file as NTSC or PAL.
     * @param ntsc <code>true</code> for NTSC, <code>false</code> for PAL.
     */
    setNtsc(ntsc: boolean): void;
    /**
     * Returns the letter argument for the TYPE SAP tag.
     * Returns zero for non-SAP files.
     */
    getTypeLetter(): 0 | 67 | 66 | 68 | 83;
    /**
     * Returns player routine rate in Atari scanlines.
     */
    getPlayerRateScanlines(): number;
    /**
     * Returns approximate player routine rate in Hz.
     */
    getPlayerRateHz(): number;
    /**
     * Returns the address of the module.
     * Returns -1 if unknown.
     */
    getMusicAddress(): number;
    /**
     * Causes music to be relocated.
     * Use only with <code>ASAPWriter.Write</code>.
     * @param address New music address.
     */
    setMusicAddress(address: number): void;
    /**
     * Returns the address of the player initialization routine.
     * Returns -1 if no initialization routine.
     */
    getInitAddress(): number;
    /**
     * Returns the address of the player routine.
     */
    getPlayerAddress(): number;
    /**
     * Returns the address of the COVOX chip.
     * Returns -1 if no COVOX enabled.
     */
    getCovoxAddress(): number;
    /**
     * Returns the length of the SAP header in bytes.
     */
    getSapHeaderLength(): number;
    /**
     * Returns the offset of instrument names for RMT module.
     * Returns -1 if not an RMT module or RMT module without instrument names.
     * @param module Content of the RMT file.
     * @param moduleLen Length of the RMT file.
     */
    getInstrumentNamesOffset(module: Uint8Array, moduleLen: number): number;
    getRmtSapOffset(module: Uint8Array, moduleLen: number): number;
    getOriginalModuleType(module: Uint8Array, moduleLen: number): ASAPModuleType;
    /**
     * Returns the extension of the original module format.
     * For native modules it simply returns their extension.
     * For the SAP format it attempts to detect the original module format.
     * @param module Contents of the file.
     * @param moduleLen Length of the file.
     */
    getOriginalModuleExt(module: Uint8Array, moduleLen: number): "dmc" | "cmc" | "cm3" | "cmr" | "cms" | "dlt" | "mpd" | "mpt" | "rmt" | "tmc" | "tm2" | "fc";
    #private;
}
export namespace ASAPSampleFormat {
    const U8: 0;
    const S16_L_E: 1;
    const S16_B_E: 2;
}

type ASAPModuleType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
