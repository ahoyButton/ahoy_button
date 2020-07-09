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

    play(source) {
        this.audio.src = addSourcePrefix(source, this.audioPrefix)
        this.audio.play()
    }

    continuePlay() {
        if (this.audio.currentSrc !== '') {
            this.audio.play()
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
