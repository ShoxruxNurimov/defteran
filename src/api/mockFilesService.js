// Basit mock servis - gerçek backend yerine
import raw from '../data/files.json'
let files = JSON.parse(JSON.stringify(raw))

export function listFiles() {
  // simule gecikme
  return new Promise((res) => {
    setTimeout(() => res({ data: files.slice() }), 500)
  })
}

export function uploadFileMock(file, onProgress) {
  return new Promise((resolve) => {
    let uploaded = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      name: file.name,
      size: `${Math.max(1, Math.round(file.size / 1024))} KB`,
      type: (file.name.split('.').pop() || 'file'),
      category: 'Tüm Dosyalar',
      date: new Date().toISOString().slice(0, 10),
      thumbnail: null
    }
    // fake progress
    let loaded = 0
    const total = 100
    const t = setInterval(() => {
      loaded += 10
      onProgress && onProgress(Math.min(loaded, total))
      if (loaded >= total) {
        clearInterval(t)
        files.unshift(uploaded)
        resolve({ data: uploaded })
      }
    }, 100)
  })
}

export function deleteFileMock(id) {
  return new Promise((res) => {
    setTimeout(() => {
      files = files.filter(f => f.id !== id)
      res({ success: true })
    }, 300)
  })
}

export function renameFileMock(id, newName) {
  return new Promise((res) => {
    setTimeout(() => {
      const f = files.find(x => x.id === id)
      if (f) f.name = newName
      res({ data: f })
    }, 300)
  })
}
