<template>
    <div>
        <div class="btn-panel-title">船长按钮</div>
        <el-card v-for="(group, index) in btnGroups" :key="index" class="group">
            <div slot="header">
                <span style="font-size: 32px">{{group.group_name}}</span>
            </div>
            <el-row :gutter="15" class="btn-row">
                <el-button class="sound-btn" type="danger" round v-for="(btn, i) in group.buttons" :key="i" @click="play(btn.path)">
                    {{btn.name}}
                </el-button>
            </el-row>
        </el-card>
        <el-popover placement="bottom-start">
            <el-button class="sound-control"  slot="reference"  type="danger" circle icon="el-icon-headset"></el-button>
            <div>
                <span>音量</span>
                <el-icon class="el-icon-headset sound-icon"></el-icon>
                <el-slider max="100" v-model="volume"></el-slider>
            </div>
        </el-popover>
    </div>
</template>

<script>
    import groups from '../assets/voices.json'
    import {addSourcePrefix} from '../utils'
    export default {
        name: "Buttons",
        data() {
            return {
                btnGroups: groups,
                // to use a absolute path avoiding resolving a relative one
                sourcePrefix: "/voices/",
                volume: 100,
                a:0,
            }
        },
        methods: {
            play(source) {
                const voicePath = addSourcePrefix(source, this.sourcePrefix)
                console.log(voicePath)
                const player = new Audio(voicePath)
                player.preload = 'auto'
                player.volume = this.volume / 100
                player.play()
            }
        }
    }
</script>

<style scoped>
.group {
    padding: 10px;
    margin-bottom: 10px;

    margin-left: 80px;
    margin-right: 80px;
}

.sound-btn {
    font-size: 20px;
    margin-bottom: 10px;
}

.sound-control {
    height: 60px;
    width: 60px;
    position: fixed;
    bottom: 30px;
    left: 20px;
    font-size: 30px;
}

.btn-panel-title {
    font-weight: bold;
    font-size: 60px;
    text-align: center;
    margin-bottom: 10px;
}

.btn-row {
    text-align: left;
}

.sound-icon {
    display: inline-block;
    margin-left: 5px;
}
</style>