// Валидация ввода номера телефона
$('.register-choise .input-num').on('input', function (event) {
  checkValidation()
})


$('.volunteer-block').on('click', function () {
  $('.volunteer-block').addClass('choise-block-active')
  $('.needy-block').removeClass('choise-block-active')
  checkValidation()
})

$('.needy-block').on('click', function () {
  $('.needy-block').addClass('choise-block-active')
  $('.volunteer-block').removeClass('choise-block-active')
  checkValidation()
})

function checkValidation () {
  const length = $('.register-choise .input-num').val().length
  const isChoise =
    $('.volunteer-block').hasClass('choise-block-active') ||
    $('.needy-block').hasClass('choise-block-active')

  if (length === 11 && isChoise) {
    $('.btn-enter').addClass('btn-enter-active')
  } else if (length < 11 || !isChoise) {
    $('.btn-enter').removeClass('btn-enter-active')
  }
}