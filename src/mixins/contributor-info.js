import {genMessage} from '../utils/utils'
import {Authors, Contributors} from '../utils/constants'

export default {
    data() {
        return {
            // 开发者
            authors: Authors,
            // 素材提供者
            contributors: Contributors,
        }
    },
    computed: {
        authorMessage() {
            return genMessage(this.authors)
        },
        contributorMessage() {
            return genMessage(this.contributors)
        }
    }
}
