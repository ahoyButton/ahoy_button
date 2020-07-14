import {FETCH_LIVE_INFO, FETCH_UPCOMING} from "./action-types"
import axios from 'axios'
import {VTB_BILIBILI_CHANNEL, VTB_YTB_CHANNEL} from "../utils/constants"
import {ADD_UPCOMING, CHANGE_LIVE_INFO} from "./mutation-types"
import moment from 'moment'

function setYtbData(liveInfo, currentLive) {
    liveInfo.ytb = {}
    liveInfo.ytb.title = currentLive.title
    liveInfo.ytb.start = currentLive.start
    liveInfo.ytb.viewers = currentLive.viewers
    liveInfo.ytb.url = `https://youtube.com/watch?v=${currentLive.id}`
}

function setBBData(liveInfo, currentLive) {
    liveInfo.bb = {}
    liveInfo.bb.title = currentLive.title
    liveInfo.bb.start = currentLive.startTime
    liveInfo.bb.viewers = currentLive.viewers
    liveInfo.bb.url = `https://live.bilibili.com/${currentLive.bbRoomId}`
}

let cached_data = {
    data: null,
    cached_time: null
}
async function fetchData() {
    if (cached_data.cached_time === null || moment().unix() - cached_data.cached_time.unix() > 600) {
        const resp = await axios.get('https://api.jetri.co/live/1.1')
        if (resp.status !== 200) {
            throw new Error('cannot get live info')
        }
        cached_data.cached_time = moment().unix()
        cached_data.data =  resp.data
    }
}

const actions = {
    async [FETCH_LIVE_INFO]({state, commit}) {
        if (state.liveInfo !== null) {
            return
        }
        await fetchData()
        const live = cached_data.data.live
        // 处理转播
        let liveInfo = {}
        setYtbData(liveInfo, live.find((elem) => elem.channel === VTB_YTB_CHANNEL))
        setBBData(liveInfo, live.find((elem) => elem.bbUid === VTB_BILIBILI_CHANNEL))
        commit(CHANGE_LIVE_INFO, liveInfo)
    },
    async [FETCH_UPCOMING]({state, commit}) {
        if (state.upcoming.length !== 0) {
            return
        }
        await fetchData()
        for (let elem of cached_data.data.upcoming) {
            if (elem.channel === VTB_YTB_CHANNEL && elem.title.search(/freechat/i) === -1) {
                commit(ADD_UPCOMING, {
                    title: elem.title,
                    startTime: elem.startTime,
                    link: `https://youtube.com/watch?v=${elem.id}`
                })
            }
        }
    }
}

export default actions
