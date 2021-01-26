let userRole

// Валидация ввода номера телефона
$('.register-choise .input-num').on('input', function (event) {
  checkValidation()
})

// Выбор роли пользователя
$('.register-choise .volunteer-block').on('click', function () {
  $('.register-choise .volunteer-block').addClass('choise-block-active')
  $('.register-choise .needy-block').removeClass('choise-block-active')
  checkValidation()
  userRole = 'volunteer'
})

$('.register-choise .needy-block').on('click', function () {
  $('.register-choise .needy-block').addClass('choise-block-active')
  $('.register-choise .volunteer-block').removeClass('choise-block-active')
  checkValidation()
  userRole = 'needy'
})

// Валидация номера телефона и проверка на сделанный выбор роли
function checkValidation () {
  const length = $('.register-choise .input-num').val().length
  const isChoise =
    $('.register-choise .volunteer-block').hasClass('choise-block-active') ||
    $('.register-choise .needy-block').hasClass('choise-block-active')

  if (length === 11 && isChoise) {
    $('.register-choise .btn-enter').addClass('btn-enter-active')
  } else if (length < 11 || !isChoise) {
    $('.register-choise .btn-enter').removeClass('btn-enter-active')
  }
}

// Переход от выбора роли и ввода телефона к вводу кода из смс
$('.register-choise .btn-enter').on('click', function () {
  const isActive = $('.register-choise .btn-enter').hasClass('btn-enter-active')
  if (isActive) {
    $('.register-choise').addClass('disabled-block')
    $('.register-check-code').removeClass('disabled-block')
  }
})

// Валидация ввода кода из смс
$('.register-check-code .input-code').on('input', function (event) {
  const { length } = event.target.value
  if (length === 4) {
    $('.register-check-code .btn-enter').addClass('btn-enter-active')
  } else if (length < 4) {
    $('.register-check-code .btn-enter').removeClass('btn-enter-active')
  }
})

// Переход от ввода кода из смс к форме
$('.register-check-code .btn-enter').on('click', function () {
  const isActive = $('.register-check-code .btn-enter').hasClass(
    'btn-enter-active'
  )
  if (isActive) {
    $('.register-check-code').addClass('disabled-block')
    $('.register-form').removeClass('disabled-block')
  }

  if (userRole === 'volunteer') {
    $('#city').after(
      '<input class="input" type="number" id="code" placeholder="Код организации *" />'
    )
  }
})

// Валидация формы
$('.register-form form').on('change', function () {
  const surname = $('#surname').val()
  const name = $('#name').val()
  // const patronymic = $('#patronymic').val()
  const email = $('#email').val()
  const city = $('#city').val()

  const surnameResilt = surname.length > 4 && surname.length < 20
  const nameResilt = name.length > 4 && name.length < 20
  const emailResilt = email.length > 6 && email.length < 30
  const cityResilt = city.length > 3 && city.length < 20

  const checkbox1Res = $('#check1').prop('checked')
  const checkbox2Res = $('#check2').prop('checked')

  let result =
    surnameResilt &&
    nameResilt &&
    emailResilt &&
    cityResilt &&
    checkbox1Res &&
    checkbox2Res

  // Проверка поля кода организации для волонеров
  if (userRole === 'volunteer') {
    const code = $('#code').val()
    result = result && code
  }

  if (result) $('.register-form .btn-enter').addClass('btn-enter-active')
  else $('.register-form .btn-enter').removeClass('btn-enter-active')
})

// Регистрация
$('.register-form .btn-enter').on('click', function () {
  alert('Успешная регистрация')
})
