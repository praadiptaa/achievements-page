import React, { useState } from 'react'
// removed Calendar icon per user request
import podiumImg from '../assets/images/podium.png'

export default function AwardCard({ award, onOpen = () => {} }) {
  const [orientation, setOrientation] = useState('landscape') // 'portrait' | 'landscape'
  const placeholder = 'https://via.placeholder.com/800x1200?text=No+Image'

  function onImgLoad(e) {
    try {
      const img = e.target
      if (img.naturalHeight > img.naturalWidth) setOrientation('portrait')
      else setOrientation('landscape')
    } catch {
      setOrientation('landscape')
    }
  }

  function handleActivate() {
    try { onOpen(award) } catch { /* no-op */ }
  }

  const podiumSrc = award?.podiumImage || podiumImg

  return (
  <article
    onClick={handleActivate}
    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleActivate(); } }}
    role="button" tabIndex={0} className="group transform transition cursor-pointer flex flex-col h-full"
  >
        {orientation === 'landscape' ? (
          <>
            <div className="flex justify-center pt-8">
              <div className="relative w-64 h-40 flex items-center justify-center">
                {podiumSrc ? (
                  // use provided podium image or local asset (podium z-10)
                  <img src={podiumSrc} alt="podium" className="absolute bottom-0 w-56 h-auto object-contain z-10" draggable={false} />
                ) : (
                  <>
                    {/* large disc base */}
                    <div className="absolute bottom-0 w-56 h-12 bg-white rounded-full shadow-lg" />
                    {/* rim */}
                    <div className="absolute bottom-4 w-48 h-10 rounded-full bg-gradient-to-b from-gray-50 to-gray-100 border border-gray-200" />
                    {/* subtle reflection */}
                    <div className="absolute bottom-6 w-40 h-2 bg-white/60 rounded-full blur-sm opacity-60" />
                  </>
                )}
                {/* trophy: absolute centered above podium with orientation-aware sizing */}
                <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center">
                  {orientation === 'portrait' ? (
                    <div className="w-36 h-36 flex items-center justify-center">
                      <img src={award?.image || placeholder} onLoad={onImgLoad} alt={award?.title || 'award image'} className="w-36 h-36 object-contain" draggable={false} />
                    </div>
                  ) : (
                    <div className="w-44 h-28 flex items-center justify-center">
                      <img src={award?.image || placeholder} onLoad={onImgLoad} alt={award?.title || 'award image'} className="w-44 h-28 object-contain" draggable={false} />
                    </div>
                  )}
                </div>
                {/* year will be shown centered under the podium */}
              </div>
            </div>

            <div className="text-center mt-2">
              <div className="inline-flex items-center gap-2 text-base font-semibold px-4 py-2 rounded-full justify-center mx-auto">
                <span className="text-blue-600">{award?.year}</span>
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col">
              <div className="mb-2">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">{award?.category}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">{award?.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-2 flex-1 overflow-hidden">{award?.description}</p>
              {/* whole card is clickable now; actions removed */}
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center pt-8">
              <div className="relative w-64 h-40 flex items-center justify-center">
                {podiumSrc ? (
                  <img src={podiumSrc} alt="podium" className="absolute bottom-0 w-56 h-auto object-contain z-10" draggable={false} />
                ) : (
                  <>
                    <div className="absolute bottom-0 w-56 h-12 bg-white rounded-full shadow-lg" />
                    <div className="absolute bottom-4 w-48 h-10 rounded-full bg-gradient-to-b from-gray-50 to-gray-100 border border-gray-200" />
                    <div className="absolute bottom-6 w-40 h-2 bg-white/60 rounded-full blur-sm opacity-60" />
                  </>
                )}
                <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center">
                  {orientation === 'portrait' ? (
                    <div className="w-36 h-36 flex items-center justify-center">
                      <img src={award?.image || placeholder} onLoad={onImgLoad} alt={award?.title || 'award image'} className="w-36 h-36 object-contain" draggable={false} />
                    </div>
                  ) : (
                    <div className="w-44 h-28 flex items-center justify-center">
                      <img src={award?.image || placeholder} onLoad={onImgLoad} alt={award?.title || 'award image'} className="w-44 h-28 object-contain" draggable={false} />
                    </div>
                  )}
                </div>
                {/* removed dark overlay to keep podium background clean */}
              </div>
            </div>

            <div className="text-center mt-2">
              <div className="inline-flex items-center gap-2 text-base font-semibold px-4 py-2 rounded-full justify-center mx-auto">
                <span className="text-blue-600">{award?.year}</span>
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col">
              <div className="mb-2">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">{award?.category}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{award?.title}</h3>
              <p className="text-gray-700 text-sm line-clamp-2 flex-1 overflow-hidden">{award?.description}</p>
              {/* whole card is clickable now; actions removed */}
            </div>
          </>
        )}
      </article>
  )
}
