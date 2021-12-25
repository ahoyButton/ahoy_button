import {addSourcePrefix} from './utils'

export class Player {
    constructor(audioPrefix = '', volume = 100, handle = null) {
        this.audio = new Audio()
        this.audio.preload = 'auto'
        this.audioPrefix = audioPrefix
        this.addEndHandle(handle)
        this.volume = volume
    }

    set volume(value) {
        if (value < 0 || value > 100) {
            return
        }
        this.audio.volume = value/100
    }

    async play(source) {
        this.audio.src = addSourcePrefix(source, this.audioPrefix)
        await this.audio.play()
    }

    async continuePlay() {
        if (this.audio.currentSrc !== '') {
            await this.audio.play()
        }
    }

    pause() {
        this.audio.pause()
    }

    stop() {
        this.pause()
        this.audio.currentTime = 0
        this.audio.src = ''
    }

    addEndHandle(handle) {
        if (handle === undefined || handle === null || typeof handle !== 'function') {
            return
        }
        this.audio.addEventListener('ended', handle, false)
    }
}
