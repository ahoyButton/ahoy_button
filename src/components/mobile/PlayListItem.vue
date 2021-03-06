<template>
    <div>
        <nut-cell :title="title"
                  :show-icon="showIcon" class="play-item"
                  v-touch:swipeleft="showDelete"
                  v-touch:swiperight="hideDelete">
                <template v-slot:icon>
                    <nut-button :class="{ 'slip-delete-in': inAnime, 'slip-delete-out': outAnime}" @click="delItem(path)">
                        {{$t('playList.delete')}}
                    </nut-button>
                </template>
        </nut-cell>
    </div>
</template>

<script>
    import {REMOVE_ORDER_BY_PATH} from '@/store/mutation-types'
    import TouchEventMixin from '@/mixins/touch-event'

    export default {
        name: "PlayListItem",
        mixins: [TouchEventMixin],
        props: {
            title: {
                type: String,
                required: true
            },
            path: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                showIcon: false,
                inAnime: false,
                outAnime: false,
                timeoutId: null
            }
        },
        methods: {
            showDelete() {
                this.clearTimeoutId()
                this.showIcon = true
                this.outAnime = false
                this.inAnime = true
                this.timeoutId = setTimeout(() => {
                    this.hideDelete()
                }, 3000)
            },
            hideDelete() {
                this.clearTimeoutId()
                this.inAnime = false
                this.outAnime = true
                setTimeout(() => this.showIcon = false, 300)
            },
            delItem(path) {
                this.showIcon = false
                this.clearTimeoutId()
                this.$store.commit(REMOVE_ORDER_BY_PATH, path)
            },
            clearTimeoutId() {
                if (this.timeoutId !== null) {
                    clearTimeout(this.timeoutId)
                    this.timeoutId = null
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.play-item {
    overflow: hidden;
    padding-right: 0;
    margin: 0 10px;
}

.slider {
    margin: 0;
    padding: 0 10px;
    position: relative;
    right: -100%;
}

@mixin animeHelper($transX, $animeClass) {
    transform: translateX($transX);
    animation: $animeClass 0.3s linear;
    animation-fill-mode: forwards;
}

.slip-delete-in {
    @extend .slider;
    @include animeHelper(0%, moveIn);
}

@keyframes moveIn {
    0% {
        transform: translateX(0%);
    }

    100% {
        transform: translateX(-100%);
    }
}

.slip-delete-out {
    @extend .slider;
    @include animeHelper(-100%, moveOut);
}

@keyframes moveOut {
    0% {
        transform: translateX(-100%);
    }

    100% {
        transform: translateX(0%);
    }
}
</style>
