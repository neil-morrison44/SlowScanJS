AudioProcessor = require "./audio_processor"
CanvasRenderer = require "./canvas_renderer"

main = ->
  audioElement = document.getElementById "audio"
  canvas = document.getElementById("canvas")

  canvasRenderer = new CanvasRenderer()

  canvasRenderer.setup canvas

  audioContext = new AudioContext()
  audioProcessor = new AudioProcessor()

  audioProcessor.renderer = canvasRenderer
  
  processor = audioContext.createScriptProcessor(audioProcessor.BUFFER_SIZE)
  processor.onaudioprocess = (event) ->
    audioProcessor.onProcess event

  source = audioContext.createMediaElementSource(audioElement)
  source.connect(processor)

  audioElement.playbackRate = 0.5
  processor.connect(audioContext.destination)

  audioElement.play()



main()