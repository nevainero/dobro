// Открытие молального окна авторизации
$('.landing-header-login-btn').on('click', function () {
  $('.modal-wrapper').addClass('modal-active')
  $('.modal-auth-1').addClass('modal-active')
})

// Валидация ввода номера телефона
$('.modal #input-num').on('input', function (event) {
  const { length } = event.target.value
  if (length === 11) {
    $('.btn-enter-1').addClass('btn-enter-active')
  } else if (length < 11) {
    $('.btn-enter-1').removeClass('btn-enter-active')
  }
})

// Валидация ввода кода из смс
$('.modal #input-code').on('input', function (event) {
  const { length } = event.target.value
  if (length === 4) {
    $('.btn-enter-2').addClass('btn-enter-active')
  } else if (length < 4) {
    $('.btn-enter-2').removeClass('btn-enter-active')
  }
})

// Переход от первого модального окна авторизации ко второму по нажатию кнопки
$('.modal .btn-enter-1').on('click', function () {
  const isActive = $('.btn-enter-1').hasClass('btn-enter-active')
  if (isActive) {
    $('.modal-auth-2').addClass('modal-active')
    $('.modal-auth-1').removeClass('modal-active')
  }
})

// Переход от второго модального окна авторизации к авторизации
$('.modal .btn-enter-2').on('click', function (e) {
  if ($('.btn-enter-2').hasClass('btn-enter-active')) {
    // Временная затычка
    alert('Успешная авторизация')
    clearInputs()
    $('.modal-wrapper').removeClass('modal-active')
    $('.modal-auth-1').removeClass('modal-active')
    $('.modal-auth-2').removeClass('modal-active')
  }
})

// Выход из модального окна
$('.modal .exit').on('click', function () {
  $('.modal-wrapper').removeClass('modal-active')
  $('.modal-auth-1').removeClass('modal-active')
  $('.modal-auth-2').removeClass('modal-active')
  clearInputs()
})

function clearInputs () {
  $('.modal #input-code').val('')
  $('.modal #input-num').val('')
}
