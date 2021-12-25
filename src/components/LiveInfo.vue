<template>
    <div class="info-panel">
        <details :open="hasLiveInfo || hasUpcoming">
            <summary class="info-title" :style="{fontSize: titleSize}">
                {{$t('liveInfo.title')}}
            </summary>
            <div v-if="!hasLiveInfo && !hasUpcoming">
                <div class="non-content">
                    {{$t('liveInfo.nonContent')}}
                </div>
            </div>
            <div v-else class="info-content">
                <ul>
                    {{$t('liveInfo.streaming')}}
                    <li v-if="hasLiveInfo">
                        <section>
                            <ul>
                                <li>
                                    <el-icon class="iconfont el-icon-abstreaming live-icon">
                                    </el-icon>
                                    :
                                    <LiveInfoTimeBar :start-at="liveInfo.start"></LiveInfoTimeBar>
                                </li>
                                <li>
                                    <el-icon class="iconfont el-icon-abyoutube1 title-icon">
                                    </el-icon>
                                    :
                                    <el-link class="stream-link"
                                             :href="liveInfo.link"
                                             type="danger">
                                        {{liveInfo.title}}
                                    </el-link>
                                </li>
                                <li>
                                    <el-icon class="iconfont el-icon-abeye viewer-count-icon">
                                    </el-icon>
                                    :
                                    <span class="view-count">
                                      <el-tooltip>
                                          <template v-slot:content>
                                              <div class="view-count-tooltip">{{$t('liveInfo.averageViewerCount')}}</div>
                                          </template>
                                          <span>{{liveInfo.averageViewerCount}}</span>
                                      </el-tooltip>
                                      &nbsp;/&nbsp;
                                      <el-tooltip>
                                          <template v-slot:content>
                                              <div class="view-count-tooltip">{{$t('liveInfo.maxViewerCount')}}</div>
                                          </template>
                                          <span>{{liveInfo.maxViewerCount}}</span>
                                      </el-tooltip>
                                    </span>
                                </li>
                            </ul>
                        </section>
                    </li>
                    <li v-else>
                        <span style="color: gray">
                            {{$t('liveInfo.nonStreaming')}}
                        </span>
                    </li>
                </ul>
                <el-divider></el-divider>
                <ul v-if="hasUpcoming">
                    {{$t('liveInfo.schedule')}}
                    <li v-for="(schedule, key) in upcoming" :key="key">
                        <details open>
                        <summary class="schedule-summary">{{schedule.title}}</summary>
                        <section>
                            <ul style="margin-top: 10px;">
                                <li>
                                    <el-icon class="iconfont el-icon-abalarm time-icon">
                                    </el-icon>
                                    :
                                    <LiveInfoTimeBar :start-at="schedule.schedule"></LiveInfoTimeBar>
                                </li>
                                <li>
                                    <el-icon class="iconfont el-icon-abyoutube1 title-icon">
                                    </el-icon>
                                    :
                                    <el-link class="stream-link"
                                             :href="schedule.link"
                                             type="danger">
                                        {{schedule.title}}
                                    </el-link>
                                </li>
                            </ul>
                        </section>
                        </details>
                    </li>
                </ul>
            </div>
        </details>
    </div>
</template>

<script>
    import {FETCH_LIVE_INFO, FETCH_UPCOMING} from '@/store/action-types'
    import {mapState} from 'vuex'
    import LiveInfoTimeBar from '@/components/LiveInfoTimeBar'

    export default {
        name: "LiveInfo",
        components: {LiveInfoTimeBar},
        created() {
            this.$store.dispatch(FETCH_LIVE_INFO)
            this.$store.dispatch(FETCH_UPCOMING)
        },
        props: {
            titleSize: {
                required: true,
                type: String
            }
        },
        computed: {
            ...mapState(
                ['liveInfo', 'upcoming']
            ),
            hasLiveInfo() {
                return Object.keys(this.liveInfo).length !== 0 && this.liveInfo.title !== ''
            },
            hasUpcoming() {
                return this.upcoming.length !== 0
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '../styles/variables';
@import '../styles/animations';

.info-panel {
    padding: 10px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}

.info-title {
    list-style: none;
    position: relative;
    border-top: 0;
    border-bottom: 1px solid #ebeef5;

    &::before {
        margin: 0 10px;
        content: "⏱";
        font-size: 1em;
    }

    &::after {
        margin: 0 10px;
        content: "▶";
        position: absolute;
        right: 0;
        font-size: 0.5em;
        transform-origin: center;
        transition: 0.2s linear;
    }
}

details {
    &[open] .info-title::after {
        transform: rotate(90deg);
    }

    &[open] summary ~ * {
        animation: fadeIn 0.5s ease-in-out;
    }

    summary::marker {
        display: none;
    }

    summary {
        outline: 0;
        cursor: pointer;
    }
}

.info-content {
    margin: 10px;

    li {
        margin-left: 2em;
        list-style: none;
    }
}

// 内容提示图标的大小
$content-icon-size: 1.75em;

.time-icon {
    font-size: $content-icon-size;
    color: $schedule-alarm-color;
}

.title-icon {
    font-size: $content-icon-size;
    color: $youtube-color;
}

.schedule-summary {
    color: $ahoy-primary-color;
}

.non-content {
    margin: 0 auto;
    text-align: center;
    color: gray;
}

.live-icon {
    font-size: $content-icon-size;
    color: greenyellow;
}

.viewer-count-icon {
  font-size: $content-icon-size;
  color: $view-count-color;
}

.view-count {
  color: $view-count-color;
}

.view-count-tooltip {
  font-size: $content-icon-size;
}

.stream-link {
    font-size: unset;
}
</style>
