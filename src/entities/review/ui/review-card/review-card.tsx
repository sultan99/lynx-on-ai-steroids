import type { Review } from '../../model/types'
import { joinCss } from '@/shared/lib/css-utils'
import { Icon } from '@/shared/ui/icon/icon'
import * as css from './review-card.module.scss'

type ReviewCardProps = {
  review: Review
} & Omit<JSX.IntrinsicElements['view'], 'children'>

const StarRating = ({ value }: { value: number }) => (
  <view className={css.stars}>
    {Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        className={i < value ? css.starFilled : css.starEmpty}
        glyph={i < value ? 'star-filled' : 'star'}
        size='xs'
      />
    ))}
  </view>
)

export const ReviewCard = ({ className, review, ...rest }: ReviewCardProps) => (
  <view {...rest} className={joinCss(css.root, className)}>
    <view className={css.header}>
      <image className={css.avatar} src={review.authorAvatar} />
      <text className={css.name}>{review.authorName}</text>
      <text className={css.date}>{review.date}</text>
      <StarRating value={review.rating} />
    </view>
    <text className={css.text}>{review.text}</text>
  </view>
)
