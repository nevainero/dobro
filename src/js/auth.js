$('#input-num').on('input', function (event) {
  if (event.target.value.length === 11) {
    $('.btn-enter-1').addClass('btn-enter-active')
  } else if (event.target.value.length < 11) {
    $('.btn-enter-1').removeClass('btn-enter-active')
  }
})

$('.landing-header-login-btn').on('click', function (e) {
  $('.modal-wrapper').addClass('modal-active')
  $('.modal-auth').addClass('modal-active')
})

$('.exit').on('click', function (e) {
  $('.modal-wrapper').removeClass('modal-active')
  $('.modal-auth').removeClass('modal-active')
  $('.modal-auth-step-2').removeClass('modal-active')
})

$('.modal-auth .btn-enter-1').on('click', function (e) {
  if ($('.btn-enter-1').hasClass('btn-enter-active')) {
    $('.modal-auth-step-2').addClass('modal-active')
    $('.modal-auth').removeClass('modal-active')
  }
})

$('.modal-auth-step-2 .btn-enter').on('click', function (event) {
  if (event.target.value.length === 11) {
    $('.btn-enter-2').addClass('btn-enter-active')
  } else if (event.target.value.length < 11) {
    $('.btn-enter-2').removeClass('btn-enter-active')
  }
})

$('#input-code').on('input', function (event) {
  if (event.target.value.length === 4) {
    $('.btn-enter-2').addClass('btn-enter-active')
  } else if (event.target.value.length < 4) {
    $('.btn-enter-2').removeClass('btn-enter-active')
  }
})

$('.modal-auth-step-2 .btn-enter-2').on('click', function (e) {
  if ($('.btn-enter-2').hasClass('btn-enter-active')) {
    alert('Успешная авторизация')
  }
})
