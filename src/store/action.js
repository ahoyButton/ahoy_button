import {FETCH_LIVE_INFO, FETCH_UPCOMING} from "./action-types"
import axios from 'axios'
import {VTB_BILIBILI_CHANNEL, VTB_YTB_CHANNEL} from "../utils/constants"
import {ADD_UPCOMING, CHANGE_LIVE_INFO} from "./mutation-types"
import moment from 'moment'

const TIME_FORMAT = 'Y-M-D LTS'
const BILI_TYPE = 'bb'
const YTB_TYPE = 'ytb'

function setData(liveInfo, currentLive, linkType) {
    if (!currentLive) {
        return
    }

    if (linkType === YTB_TYPE) {
        liveInfo.ytb = {}
        liveInfo = liveInfo.ytb
        liveInfo.link = `https://youtube.com/watch?v=${currentLive.yt_video_key}`
    } else if (linkType === BILI_TYPE) {
        liveInfo.bb = {}
        liveInfo = liveInfo.bb
        liveInfo.link = `https://live.bilibili.com/${currentLive.bb_video_id}`
    } else {
        return
    }
    liveInfo.title = currentLive.title
    liveInfo.start = moment(currentLive.live_start).format(TIME_FORMAT)
    liveInfo.schedule = moment(currentLive.live_schedule).format(TIME_FORMAT)
}

let cached_data = {
    data: null,
    cached_time: null
}
async function fetchData() {
    if (cached_data.cached_time !== null && moment().unix() - cached_data.cached_time.unix() <= 600) {
        return
    }

    const resp = await axios.get('https://api.holotools.app/v1/live')
    if (resp.status !== 200) {
        throw new Error('cannot get live info')
    }
    cached_data.cached_time = moment()
    cached_data.data =  resp.data
}

const actions = {
    async [FETCH_LIVE_INFO]({state, commit}) {
        if (Object.keys(state.liveInfo).length !== 0) {
            return
        }
        await fetchData()
        const live = cached_data.data.live
        // 处理转播
        let liveInfo = {}
        setData(liveInfo, live.find((elem) => elem.channel.yt_channel_id === VTB_YTB_CHANNEL), YTB_TYPE)
        setData(liveInfo, live.find((elem) => elem.channel.bb_space_id === VTB_BILIBILI_CHANNEL), BILI_TYPE)
        commit(CHANGE_LIVE_INFO, liveInfo)
    },
    async [FETCH_UPCOMING]({state, commit}) {
        if (state.upcoming.length !== 0) {
            return
        }
        await fetchData()
        for (let elem of cached_data.data.upcoming) {
            if (elem.channel.yt_channel_id === VTB_YTB_CHANNEL && elem.title.search(/freechat/i) === -1) {
                commit(ADD_UPCOMING, {
                    title: elem.title,
                    schedule: moment(elem.live_schedule).format('Y-M-D LTS'),
                    link: `https://youtube.com/watch?v=${elem.yt_video_key}`
                })
            }
        }
    }
}

export default actions
