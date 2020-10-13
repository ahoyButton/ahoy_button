import {MODIFY_VOLUME} from '@/store/mutation-types'

export default {
    computed: {
        volume: {
            get: function () {
                return this.$store.state.volume
            },
            set: function (value) {
                this.$store.commit(MODIFY_VOLUME, value)
            }
        }
    }
}
