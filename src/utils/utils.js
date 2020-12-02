// 拼接路径，删除拼接后开头的'/'
// prefix需要以/结尾
// path不能以/开头
import {confetti} from "dom-confetti";

export function addSourcePrefix(path, prefix) {
    if (prefix === undefined || path === undefined) {
        return path
    }

    const ret =  prefix + path
    return ret.slice(1)
}

// 将人名连接成一句话。
// 默认分隔符为'、'
export function genMessage(names, splitter = '、') {
    if (names.length === 1) {
        return names[0]
    }
    return names.join(splitter)
}

export function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|micromessenger|MQQBrowser/i.test(navigator.userAgent)
}

export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export function doConfetti(domNode, elemCount = 60) {
    confetti(domNode, {
        elementCount: elemCount
    })
}
