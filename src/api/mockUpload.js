export function uploadMock(file) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newFile = {
        id: Date.now(),
        name: file.name,
        size: Math.round(file.size/1024) + ' KB',
        type: file.name.split('.').pop(),
        provider: 'Yerel',
        updatedAt: new Date().toISOString().slice(0,10),
        category: 'Tüm Dosyalar'
      }
      resolve(newFile)
    }, 700)
  })
}