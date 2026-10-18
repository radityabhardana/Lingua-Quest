import { useState, type ReactNode } from 'react'

export interface FactItem {
  icon: ReactNode
  label: string
  value: string
  detail?: string
  image?: string
  imageCaption?: string
}

interface FactRowProps {
  fact: FactItem
  flip?: boolean
}

export function FactRow({ fact, flip }: FactRowProps) {
  const [imgFailed, setImgFailed] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  const hasImage = Boolean(fact.image) && !imgFailed

  return (
    <div className={`fact-row ${flip ? 'fact-row-flip' : ''} ${hasImage ? '' : 'fact-row-noimage'}`}>
      {hasImage && (
        <figure className="fact-row-media">
          <img
            src={fact.image}
            alt=""
            loading="lazy"
            decoding="async"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgFailed(true)}
            className={imgLoaded ? 'is-loaded' : ''}
          />
          {fact.imageCaption && <figcaption>{fact.imageCaption}</figcaption>}
        </figure>
      )}

      <div className="fact-row-body">
        <div className="fact-row-head">
          <span className="fact-row-icon" aria-hidden="true">{fact.icon}</span>
          <span className="fact-row-label">{fact.label}</span>
        </div>
        <p className="fact-row-value">{fact.value}</p>
        {fact.detail && <p className="fact-row-detail">{fact.detail}</p>}
      </div>
    </div>
  )
}
