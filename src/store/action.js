import {FETCH_LIVE_INFO, FETCH_UPCOMING} from './action-types'
import axios from 'axios'
import {ADD_UPCOMING, CHANGE_LIVE_INFO, CLEAR_UPCOMING} from './mutation-types'
import dayjs from 'dayjs'

const vtb_id = 'marine'

let cacheData = {
    data: {
        inStreaming: null,
        schedule: null
    },
    cachedTime: null
}

async function fetchStream(id) {
    const {data: {streams}, status} = await axios.get('https://holoapi.poi.cat/api/v4/youtube_streams', {
        params: {
            ids: id,
            status: "live,ended",
            startAt: dayjs(dayjs().format("YYYY-MM-DD")).unix(),
            endAt: dayjs().unix()
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

    const index = streams.findIndex((elem)=>{return elem.endTime === undefined})
    if (index !== -1) {
        streamInfo.title = streams[index].title
        streamInfo.start = dayjs(streams[index].startTime)
        streamInfo.link = `https://youtube.com/watch?v=${streams[index].streamId}`
        streamInfo.averageViewerCount = streams[index].averageViewerCount
        streamInfo.maxViewerCount = streams[index].maxViewerCount
    }

    return streamInfo
}

async function fetchSchedule(id) {
    const {data: {streams: schedule}, status} = await axios.get('https://holoapi.poi.cat/api/v4/youtube_streams', {
        params: {
            ids: id,
            status: "scheduled",
            orderBy: "schedule_time:asc"
        }
    })
    if (status !== 200) {
        throw new Error('cannot get schedule info')
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

    const stream = await fetchStream(id)
    const schedule = await fetchSchedule(id)

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
        for (let elem of cacheData.data.schedule) {
            // 过滤掉不用来进行直播预告的聊天室，正则会经常变动
            if (elem.title.search(/free *?chat|chat(ting)? *?room|チャット広場/i) === -1) {
                commit(ADD_UPCOMING, {
                    title: elem.title,
                    schedule: dayjs(elem.scheduleTime),
                    link: `https://youtube.com/watch?v=${elem.streamId}`
                })
            }
        }
    }
}
