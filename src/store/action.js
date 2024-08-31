import {FETCH_LIVE_INFO, FETCH_UPCOMING} from './action-types'
import axios from 'axios'
import {ADD_UPCOMING, CHANGE_LIVE_INFO, CLEAR_UPCOMING} from './mutation-types'
import dayjs from 'dayjs'

const vtb_id = '22,119'

let cacheData = {
    data: {
        inStreaming: null,
        schedule: null
    },
    cachedTime: null
}

async function fetchStream(id) {
    const {streams, status} = await axios.get('https://vt-api.poi.cat/api/v4/streams/live', {
        params: {
            channelIds: id,
            startAt: dayjs(dayjs().format("YYYY-MM-DD")).valueOf(),
        },
        headers: {
            Referer: "https://vt.poi.cat/",
            Origin: "https://vt.poi.cat",
        },
        withCredentials: true,
        transformResponse: (data) => {
            console.log(data)
            return data
        }
    })
    if (status !== 200) {
        throw new Error('cannot get streaming info')
    }

    let streamInfo = {
        title: '',
        start: '',
        link: '',
        averageViewerCount: NaN,
        maxViewerCount: NaN
    }

    const index = streams.findIndex((elem)=>{return elem.platform === 'YOUTUBE' && elem.status === 'LIVE'})
    if (index !== -1) {
        streamInfo.title = streams[index].title
        streamInfo.start = dayjs(streams[index].startTime)
        streamInfo.link = `https://youtube.com/watch?v=${streams[index].platformId}`
        streamInfo.averageViewerCount = streams[index].viewerAvg
        streamInfo.maxViewerCount = streams[index].viewerMax
    }

    return streamInfo
}

async function fetchSchedule(id) {
    const resp = await fetch(`https://vt-api.poi.cat/api/v4/streams/scheduled?channelIds=${id}&startAt=${dayjs().valueOf()}`, {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "ja,zh-CN;q=0.9,zh;q=0.8,en-US;q=0.7,en;q=0.6,zh-TW;q=0.5",
            "priority": "u=1, i",
        },
        "referrer": "https://vt.poi.cat/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "no-cors",
        "credentials": "omit"
    });
    if (resp.type !== 'opaque' && resp.status !== 200) {
        throw new Error('cannot get schedule info')
    }

    const data = await resp.json()
    let schedule = new Array; 
    for (const info of data) {
        if (info.platform !== 'YOUTUBE') {
            continue
        }
        const scheduleInfo = {
            schedule: dayjs(info.scheduleTime),
            title: info.title,
            link: `https://youtube.com/watch?v=${info.platformId}`,
            thumbnail: info.thumbnailUrl,
        }
        schedule.push(scheduleInfo)
    }

    return schedule
}

function isCacheTimeout() {
    return !(cacheData.cachedTime !== null && dayjs().diff(cacheData.cachedTime) <= 600000)
}

async function fetchData(id) {
    if (!isCacheTimeout()) {
        return
    }

    let stream = {}
    try {
    stream = await fetchStream('74'+','+id)
    } catch(e) {
        console.log(e)
    }
    const schedule = await fetchSchedule('26')

    cacheData.cachedTime = dayjs()
    cacheData.data.inStreaming = stream
    cacheData.data.schedule = schedule
}

export default {
    async [FETCH_LIVE_INFO]({state, commit}) {
        if (Object.keys(state.liveInfo).length !== 0 && !isCacheTimeout()) {
            return
        }
        await fetchData(vtb_id)
        const liveInfo = cacheData.data.inStreaming
        commit(CHANGE_LIVE_INFO, liveInfo)
    },
    async [FETCH_UPCOMING]({state, commit}) {
        if (state.upcoming.length !== 0 && !isCacheTimeout()) {
            return
        }
        await fetchData(vtb_id)
        commit(CLEAR_UPCOMING)
        for (const elem of cacheData.data.schedule) {
            commit(ADD_UPCOMING, elem)
        }
    }
}
