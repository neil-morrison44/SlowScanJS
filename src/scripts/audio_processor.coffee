FFT = require "fft"

class AudioProcessor
  BUFFER_SIZE: 256

  fft: new FFT.complex(128, false)

  onProcess: (event) ->
    input = event.inputBuffer.getChannelData(0)
    output = []

    @fft.simple(output, input)

    max = Math.max.apply null, output

    maxIndex = output.indexOf max

    if maxIndex isnt 0
      @renderer.drawPixel maxIndex

    event.outputBuffer.getChannelData(0).set input

module.exports = AudioProcessor