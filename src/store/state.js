import buttonData from '@/assets/voices.json'

// 分离彩蛋和普通按钮
let btnGroups = buttonData
const targetIndex = btnGroups.findIndex((elem)=>{
    return elem.egg
})
let egg = {}
if (targetIndex !== -1) {
    [egg] = btnGroups.splice(targetIndex, 1)
}

const state = () => ({
    playList: [],
    showPlayListDialog: false,
    volume: 100,
    liveInfo: {},
    upcoming: [],
    btnGroups,
    egg
})

export default state
