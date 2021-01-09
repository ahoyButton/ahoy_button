import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'

import 'dayjs/locale/zh-cn'
import 'dayjs/locale/ja'

dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)
