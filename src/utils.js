import filepath from 'filepath'

// 拼接路径，删除拼接后开头的'/'
export function addSourcePrefix(path, prefix) {
    if (prefix === undefined || path === undefined) {
        return path
    }

    const ret =  filepath.create(prefix)
    const sourcePath = ret.append(path).path
    return sourcePath.slice(1)
}

// 将人名连接成一句话。
// 默认分隔符为'、'
export function genMessage(names, splitter = '、') {
    if (names.length === 1) {
        return names[0]
    }
    return names.join(splitter)
}

// 替换字符串中的值，类似python的format
// 默认替换{}，只能替换一次
//TODO support more than one content
export function formatStr(source, content, substitution='{}') {
    return source.replace(substitution, content.toString())
}
