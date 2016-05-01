'use strict'

const m3u8 = require('./')
const fs = require('fs')
const playlist = fs.readFileSync('test.m3u8', 'utf8')
const test = require('tape')

const template = [
  { MEDIA: { 
      TYPE: 'VIDEO',
      'GROUP-ID': 'chunked',
      NAME: 'Source',
      AUTOSELECT: 'YES',
      DEFAULT: 'YES' 
    }
  },
  { 'STREAM-INF': {
      'PROGRAM-ID': '1',
      BANDWIDTH: '3454382',
      RESOLUTION: '1280x720',
      VIDEO: 'chunked' 
    }
  },
  'http://1.example.com/index.m3u8',
  { MEDIA: {
      TYPE: 'VIDEO',
      'GROUP-ID': 'high',
      NAME: 'High',
      AUTOSELECT: 'YES',
      DEFAULT: 'YES'
    }
  },
  { 'STREAM-INF': {
      'PROGRAM-ID': '1',
      BANDWIDTH: '1760000',
      RESOLUTION: '1280x720',
      VIDEO: 'high',
      CODECS: 'avc1.42C01E,mp4a.40.2'
    }
  },
  'http://2.example.com/index.m3u8',
  { 'PLAYLIST-TYPE': 'VOD' },
  { 'EXTINF': '10' }
]

test('m3u8', function (t) {
  const parsed = m3u8(playlist)

  t.deepEqual(parsed, template)
  t.end()
})
