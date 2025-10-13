import React, { useEffect, useState } from 'react'

export default function Modal({ open, onClose, title, children, wide = false }) {
  const [visible, setVisible] = useState(open)
  const [leaving, setLeaving] = useState(false)
  const [entering, setEntering] = useState(false)

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    if (visible) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [visible, onClose])

  useEffect(() => {
    if (open) {
      setVisible(true)
      setLeaving(false)
      // trigger entering animation: mount with start-class then switch to final class
      setEntering(true)
      const enterTimer = setTimeout(() => setEntering(false), 20)
      return () => clearTimeout(enterTimer)
    } else if (visible) {
      // start exit animation then unmount
      setLeaving(true)
      const t = setTimeout(() => {
        setVisible(false)
        setLeaving(false)
      }, 300)
      return () => clearTimeout(t)
    }
  }, [open, visible])

  if (!visible) return null

  const base = wide ? 'relative max-w-6xl w-full mx-2 sm:mx-4 bg-white rounded-lg shadow-xl overflow-hidden' : 'relative max-w-4xl w-full mx-2 sm:mx-4 bg-white rounded-lg shadow-xl overflow-hidden'
  // entering: start slightly lower and faded, then animate to full. leaving: fade out.
  const anim = entering ? 'opacity-0 translate-y-6 scale-95' : leaving ? 'opacity-0 -translate-y-4 scale-95' : 'opacity-100 translate-y-0 scale-100'
  const containerClasses = `${base} transform transition-all duration-300 ease-out ${anim}`
  const overlayAnim = entering ? 'opacity-0' : leaving ? 'opacity-0' : 'opacity-95'
  const overlayClasses = `absolute inset-0 bg-black/70 transition-opacity duration-300 ${overlayAnim}`

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true">
      <div className={overlayClasses} onClick={onClose} />
      <div className={containerClasses} onMouseLeave={onClose} onMouseEnter={() => { /* keep open while hovering */ }}>
        <div className="flex items-center justify-between p-3 sm:p-4 border-b">
          <h3 className="text-base sm:text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">Close</button>
        </div>
        <div className="p-3 sm:p-4 max-h-[85vh] overflow-auto">{children}</div>
      </div>
    </div>
  )
}
