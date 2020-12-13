const state = [1, 2, 3]
const max = 3

if (screen.width < 992) $(`#item${state[1]}`).css('display', 'none')
$(`#item${state[2]}`).css('display', 'none')

const render = () => {
  if (screen.width > 992) {
    $(`#item${state[0]}`).css({ display: 'block', order: 1 })
    $(`#item${state[1]}`).css({ display: 'block', order: 2 })
    $(`#item${state[2]}`).css({ display: 'none' })
  } else {
    $(`#item${state[0]}`).css({ display: 'block' })
    $(`#item${state[1]}`).css({ display: 'none' })
    $(`#item${state[2]}`).css({ display: 'none' })
  }
  console.log(state)
}

$('.arrow-prev').on('click', () => {
  state.forEach((item, i, state) => {
    state[i] = item > 1 ? --item : 3
  })
  render()
})

$('.arrow-next').on('click', () => {
  state.forEach((item, i, state) => {
    state[i] = item < max ? ++item : 1
  })
  render()
})
