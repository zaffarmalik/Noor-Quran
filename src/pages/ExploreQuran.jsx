import { useEffect, useMemo, useRef, useState } from 'react'
import PageIntro, { Eyebrow } from '../components/PageIntro.jsx'

async function fetchQuranData(path, signal) {
  const response = await fetch(`https://api.alquran.cloud/v1${path}`, { signal })
  if (!response.ok) throw new Error('Quran data could not be loaded. Please try again.')

  const result = await response.json()
  if (result.code !== 200) throw new Error('Quran data could not be loaded. Please try again.')
  return result.data
}

export default function ExploreQuran() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')
  const [surahs, setSurahs] = useState([])
  const [selectedSurah, setSelectedSurah] = useState(null)
  const [verses, setVerses] = useState([])
  const [selectedWord, setSelectedWord] = useState(null)
  const [audioIndex, setAudioIndex] = useState(0)
  const [playRequest, setPlayRequest] = useState(0)
  const [playingSurah, setPlayingSurah] = useState(false)
  const [surahsLoading, setSurahsLoading] = useState(true)
  const [readerLoading, setReaderLoading] = useState(false)
  const [error, setError] = useState('')
  const audioRef = useRef(null)

  useEffect(() => {
    const controller = new AbortController()
    fetchQuranData('/surah', controller.signal)
      .then(setSurahs)
      .catch((loadError) => {
        if (loadError.name !== 'AbortError') setError(loadError.message)
      })
      .finally(() => setSurahsLoading(false))

    return () => controller.abort()
  }, [])

  useEffect(() => {
    if (!selectedSurah) return undefined

    const controller = new AbortController()
    Promise.all([
      fetchQuranData(`/surah/${selectedSurah.number}/quran-uthmani`, controller.signal),
      fetchQuranData(`/surah/${selectedSurah.number}/ur.jalandhry`, controller.signal),
      fetchQuranData(`/surah/${selectedSurah.number}/ar.alafasy`, controller.signal),
    ])
      .then(([arabic, translation, recitation]) => {
        if (arabic.ayahs.length !== translation.ayahs.length || arabic.ayahs.length !== recitation.ayahs.length) {
          throw new Error('The verses did not match. Please try again.')
        }

        const translationsByVerse = new Map(translation.ayahs.map((ayah) => [ayah.numberInSurah, ayah.text]))
        const audioByVerse = new Map(recitation.ayahs.map((ayah) => [ayah.numberInSurah, ayah.audio]))
        const alignedVerses = arabic.ayahs.map((ayah) => {
          const translatedText = translationsByVerse.get(ayah.numberInSurah)
          const audio = audioByVerse.get(ayah.numberInSurah)
          if (!translatedText || !audio) throw new Error('A verse translation or recitation was missing.')

          return { ...ayah, translation: translatedText, audio }
        })

        setVerses(alignedVerses)
      })
      .catch((loadError) => {
        if (loadError.name !== 'AbortError') setError(loadError.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setReaderLoading(false)
      })

    return () => controller.abort()
  }, [selectedSurah])

  const currentAudio = verses[audioIndex]?.audio

  useEffect(() => {
    if (playRequest && audioRef.current) {
      audioRef.current.play().catch(() => setError('Audio playback was blocked. Press play to try again.'))
    }
  }, [playRequest, audioIndex])

  const filteredSurahs = useMemo(() => surahs.filter((surah) => {
    const matchesQuery = `${surah.englishName} ${surah.englishNameTranslation} ${surah.number}`.toLowerCase().includes(query.toLowerCase())
    return matchesQuery && (filter === 'All' || surah.revelationType === filter)
  }), [surahs, query, filter])

  const playVerse = (index) => {
    setAudioIndex(index)
    setPlayingSurah(false)
    setError('')
    setPlayRequest((request) => request + 1)
  }

  const openSurah = (surah) => {
    setSelectedSurah(surah)
    setReaderLoading(true)
    setError('')
    setVerses([])
    setSelectedWord(null)
    setAudioIndex(0)
    setPlayingSurah(false)
  }

  const speakTranslation = () => {
    const translation = verses[audioIndex]?.translation
    if (!translation || !('speechSynthesis' in window)) {
      setError('Urdu voice playback is not available in this browser.')
      return
    }

    const urduVoice = window.speechSynthesis.getVoices().find((voice) => voice.lang.toLowerCase().startsWith('ur'))
    if (!urduVoice) {
      setError('No Urdu voice is enabled on this device. Quran recitation is available above.')
      return
    }

    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(translation)
    utterance.lang = 'ur-PK'
    utterance.voice = urduVoice
    window.speechSynthesis.speak(utterance)
  }

  const handleAudioEnded = () => {
    if (playingSurah && audioIndex < verses.length - 1) {
      setAudioIndex((index) => index + 1)
      setPlayRequest((request) => request + 1)
    } else {
      setPlayingSurah(false)
    }
  }

  return <><PageIntro label="Read & reflect" title="The Quran, at your pace." subtitle="Find a surah, settle into a translation, and take the time you need." /><main className="section-wrap content-section">
    <div className="reading-feature"><div><span className="feature-label">A PLACE TO BEGIN</span><h2>Al-Baqarah</h2><p>A thoughtful place to continue your reading</p><div className="reading-progress"><span /></div><span className="progress-caption">A featured chapter</span></div><a href="#surah-list" className="button button-dark">Browse chapters <span>→</span></a><div className="feature-arabic" lang="ar" dir="rtl">اقْرَأْ</div></div>
    {selectedSurah ? <section className="surah-reader" aria-labelledby="reader-title">
      <div className="reader-heading">
        <button className="reader-back" type="button" onClick={() => { setSelectedSurah(null); setError('') }}>← All surahs</button>
        <Eyebrow>{selectedSurah.revelationType} · {selectedSurah.numberOfAyahs} verses</Eyebrow>
        <h2 id="reader-title">{selectedSurah.englishName}</h2>
        <p>{selectedSurah.englishNameTranslation}</p>
        <div className="reader-arabic-title" lang="ar" dir="rtl">{selectedSurah.name}</div>
        <p className="reader-source-note">Arabic text: Uthmani · Urdu translation: Jalandhry</p>
      </div>
      {readerLoading && <p className="reader-status" role="status">Loading Quran text and translation…</p>}
      {error && <p className="reader-error" role="alert">{error}</p>}
      {verses.length > 0 && <>
        <div className="reader-audio-bar">
          <span>Recitation · Mishary Alafasy</span>
          <button type="button" onClick={() => { setAudioIndex(0); setPlayingSurah(true); setError(''); setPlayRequest((request) => request + 1) }}>▶ Play surah</button>
          <button type="button" onClick={() => { setPlayingSurah(false); audioRef.current?.pause() }}>Ⅱ Pause</button>
          <button type="button" onClick={speakTranslation}>Speak Urdu translation</button>
          <audio ref={audioRef} src={currentAudio} controls onEnded={handleAudioEnded} aria-label="Surah recitation audio" />
        </div>
        {selectedWord && <p className="word-help" aria-live="polite"><span lang="ar" dir="rtl">{selectedWord.word}</span> · Meaning in context: <span lang="ur" dir="rtl">{selectedWord.translation}</span></p>}
        <div className="reader-verses">
          {verses.map((verse, index) => <article className={`reader-verse${audioIndex === index ? ' active' : ''}`} key={verse.number}>
            <span className="reader-verse-number">{verse.numberInSurah}</span>
            <p className="reader-arabic" lang="ar" dir="rtl">{verse.text.split(/(\s+)/).map((part, partIndex) => part.trim()
              ? <button className={selectedWord?.verseIndex === index && selectedWord.word === part ? 'selected-word' : ''} key={`${verse.numberInSurah}-${partIndex}`} type="button" onClick={() => { setSelectedWord({ word: part, translation: verse.translation, verseIndex: index }); playVerse(index) }} aria-label={`Play verse ${verse.numberInSurah} containing ${part}`}>{part}</button>
              : part)}</p>
            <p className="reader-translation" lang="ur" dir="rtl">{verse.translation}</p>
          </article>)}
        </div>
      </>}
    </section> : <>
      <div className="list-heading" id="surah-list"><div><Eyebrow>The chapters</Eyebrow><h2>Find a surah</h2></div><span>114 SURAHS</span></div>
      <div className="explore-controls"><label className="search-field"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name or meaning" aria-label="Search surahs" /></label><div className="filter-tabs" aria-label="Filter by revelation"><button className={filter === 'All' ? 'active' : ''} onClick={() => setFilter('All')}>All</button><button className={filter === 'Meccan' ? 'active' : ''} onClick={() => setFilter('Meccan')}>Meccan</button><button className={filter === 'Medinan' ? 'active' : ''} onClick={() => setFilter('Medinan')}>Medinan</button></div></div>
      {error && <p className="reader-error" role="alert">{error}</p>}
      {surahsLoading ? <p className="reader-status" role="status">Loading surahs…</p> : <div className="surah-list">{filteredSurahs.map((surah) => <button className="surah-row" key={surah.number} type="button" onClick={() => openSurah(surah)}><span className="surah-number">{String(surah.number).padStart(3, '0')}</span><span className="surah-name"><strong>{surah.englishName}</strong><small>{surah.englishNameTranslation} · {surah.revelationType}</small></span><span className="surah-count">{surah.numberOfAyahs} verses</span><span className="surah-arabic" lang="ar" dir="rtl">{surah.name}</span><span className="surah-arrow" aria-hidden="true">↗</span></button>)}{filteredSurahs.length === 0 && <p className="empty-state">No chapters match that search. Try another name or meaning.</p>}</div>}
    </>}
  </main></>
}