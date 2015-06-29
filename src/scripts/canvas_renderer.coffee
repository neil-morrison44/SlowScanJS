RESOLUTION = 3

class CanvasRenderer
  setup: (@canvas) ->
    @width = canvas.width
    @height = canvas.height
    @context = @canvas.getContext("2d")

    # @render()

    @position = 0

  getColourForValue: (value) ->
    g = (value - 200) * 2
    "rgb(#{g},#{g},#{g})"

  render: ->
    window.requestAnimationFrame =>
      @render()
    @context.clearRect 0, 0, @width, @height

    arrayPos = 0

    for y in [0...@height]
      for x in [0...@width]
        @context.fillStyle = @getColourForPos arrayPos++
        @context.fillRect x, y, 1, 1

        if arrayPos > @audioProcessor.output.length
          return

  drawPixel: (value) ->
    y = Math.floor @position / (@height / RESOLUTION)
    x = Math.floor @position % (@height / RESOLUTION)

    @context.fillStyle = @getColourForValue value
    @context.fillRect x*RESOLUTION, y*RESOLUTION, RESOLUTION, RESOLUTION

    @position++

    if @position > (@height * @width) / (RESOLUTION * RESOLUTION)
      @position = 0

      img = new Image()
      img.src = @canvas.toDataURL("png")

      document.getElementsByTagName("body")[0].appendChild img

      @context.clearRect 0, 0, @width, @height



module.exports = CanvasRenderer