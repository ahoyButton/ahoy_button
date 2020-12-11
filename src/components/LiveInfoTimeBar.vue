<template>
    <div class="time-bar">
        <span>
            {{startAt.locale(dayjsLocale).format('LLLL')}}
        </span>
        <span class="relative-time">
            {{startAt.locale(dayjsLocale).from(now)}}
        </span>
    </div>
</template>

<script>
import dayjs from 'dayjs'
import GetLangMixin from '@/mixins/get-lang'

export default {
    name: "LiveInfoTimeBar",
    mixins: [
        GetLangMixin
    ],
    props: {
        "startAt": {
            type: dayjs,
            required: true,
            validator(value) {
                return value.isValid()
            }
        }
    },
    data() {
        return {
            now: null
        }
    },
    created() {
        this.now = dayjs()
        setInterval(()=>{
            this.now = dayjs()
        }, 1000)
    },
    computed: {
        dayjsLocale() {
            switch (this.lang) {
            case 'zh_CN':
                return 'zh-cn'
            case 'ja_JP':
                return 'ja'
            default:
                return 'en'
            }
        }
    }
}
</script>

<style scoped lang="scss">
.time-bar {
    display: inline;
}

.relative-time {
    display: inline-block;
    margin-left: 1.5em;
}
</style>
