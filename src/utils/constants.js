export const AUDIO_PREFIX = '/voices/'
export const MUTE_ICON_PATH = '/images/sound-Mute.png'
export const FILLING_ICON_PATH = '/images/sound-filling.png'

export const languages = [
    {
        title: '中文',
        value: 'zh_CN'
    },
    {
        title: 'English',
        value: 'en'
    },
    {
        title: '日本語',
        value: 'ja_JP'
    }
]

const mobileHomePath = '/#/mobile/main'
const mobileHomeIcon = '/images/home.png' // bg-color: #848484
const mobileHomeActiveIcon = '/images/home-active.png' // bg-color: #f0250f
const mobilePlaylistPath = '/#/mobile/playlist'
const mobilePlaylistIcon = '/images/playlist.png'
const mobilePlaylistActiveIcon = '/images/playlist-active.png'
export const tabList = {
    zh_CN: [
        {
            'tabTitle': '主页',
            'curr': true,
            'href': mobileHomePath,
            'icon': mobileHomeIcon,
            'activeIcon': mobileHomeActiveIcon
        },
        {
            'tabTitle': '播放列表',
            'curr': false,
            'href': mobilePlaylistPath,
            'icon': mobilePlaylistIcon,
            'activeIcon': mobilePlaylistActiveIcon
        },
    ],
    ja_JP: [
        {
            'tabTitle': 'ホーム',
            'curr': true,
            'href': mobileHomePath, // vue router path
            'icon': mobileHomeIcon,
            'activeIcon': mobileHomeActiveIcon
        },
        {
            'tabTitle': '再生リスト',
            'curr': false,
            'href': mobilePlaylistPath,
            'icon': mobilePlaylistIcon,
            'activeIcon': mobilePlaylistActiveIcon
        },
    ],
    en: [
        {
            'tabTitle': 'Home',
            'curr': true,
            'href': mobileHomePath,
            'icon': mobileHomeIcon,
            'activeIcon': mobileHomeActiveIcon
        },
        {
            'tabTitle': 'Playlist',
            'curr': false,
            'href': mobilePlaylistPath,
            'icon': mobilePlaylistIcon,
            'activeIcon': mobilePlaylistActiveIcon
        },
    ]
}
