import filepath from 'filepath'

export function addSourcePrefix(path, prefix) {
    if (prefix === undefined || path === undefined) {
        return path
    }

    const ret =  filepath.create(prefix)
    const sourcePath = ret.append(path).path
    return sourcePath.slice(1)
}