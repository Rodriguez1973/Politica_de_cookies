/*
Proyecto realizado por: José A. Rodríguez López
Fecha: 09/12/2022
*/
const diasExpiracion = 7 //Constante que establece los días de expiración de las cookies.
let cookies = new Array() //Array donde se almacenaran las cookies.

//-------------------------------------------------------------------------------------------------
//Referencias de los objetos del formulario.
const grabarCookie = document.getElementById('grabarCookie')
const mostrarCookies = document.getElementById('mostrarCookies')
const iTarea = document.getElementById('tarea')
const iTProgramado = document.getElementById('tProgramado')
const iTEmpleado = document.getElementById('tEmpleado')
const iDescripcion = document.getElementById('descripcion')
const tablaDatos = document.getElementById('tablaDatos')

//--------------------------------------------------------------------------------------------------
//Definición de eventos de los objetos.
grabarCookie.addEventListener('click', guardarCookie, false) //Evento click sobre el ícono de grabar cookie.
mostrarCookies.addEventListener('click', mostrarCookiesAlmacenadas, false) //Evento click sobre el ícono de mostrar cookies.

//--------------------------------------------------------------------------------------------------
//Función que almacena una cookie en el navegador.
function guardarCookie() {
  if (validarCookie()) {
    let valorCookie =
      iTarea.value.trim() +
      '*/*' +
      iTProgramado.value.trim() +
      '*/*' +
      iTEmpleado.value.trim() +
      '*/*' +
      iDescripcion.value.trim()
    establecerCookie(valorCookie, diasExpiracion)
    limpiaCampos();
  }
}

//--------------------------------------------------------------------------------------------------
//Función que establece una cookie.
function establecerCookie(valorCookie, diasExpiracion) {
  let fecha = new Date() //Fecha actual.
  let claveCookie = fecha.getTime()
  let fechaExpiracion = new Date(
    fecha.getTime() + diasExpiracion * 24 * 60 * 60 * 1000,
  ) //Fecha de expiración.
  document.cookie =
    claveCookie +
    '=' +
    valorCookie +
    '; expires=' +
    fechaExpiracion.toUTCString() +
    '; path=/'

  Swal.fire({
    title: 'Cookie guardada',
    confirmButtonText: 'Aceptar',
  })
}

//--------------------------------------------------------------------------------------------------
//Presenta una tabla con las cookies almacenadas.
function mostrarCookiesAlmacenadas() {
  let registros = document.cookie.split(';') //Obtiene los registros de las cookies del documento.
  cookies = new Array()
  for (let registro in registros) {
    let cadena = registros[registro].replaceAll('=', '*/*') //Adapta el registro.
    if (cadena.split('*/*').length == 5) {
      cookies.push(cadena.split('*/*'))
    }
  }
  mostrarTabla()
}

//--------------------------------------------------------------------------------------------------
//Función que muestra la tabla en la interfaz.
function mostrarTabla() {
  tablaDatos.innerHTML = '' //Borra la tabla.
  if (cookies.length > 0) {
    let indice = 1 //Indice del elemento
    let tabla = document.createElement('table') //Tabla
    tablaDatos.appendChild(tabla)
    let thead = document.createElement('thead') //Encabezado
    tabla.appendChild(thead)
    let trEncabezado = document.createElement('tr') //Fila encabezado.
    thead.appendChild(trEncabezado)
    let thColumna = document.createElement('th') //Columna1.
    thColumna.innerText = 'NºReg.'
    trEncabezado.appendChild(thColumna)
    thColumna = document.createElement('th') //Columna2.
    thColumna.innerText = 'Clave'
    trEncabezado.appendChild(thColumna)
    thColumna = document.createElement('th') //Columna3.
    thColumna.innerText = 'Tarea'
    trEncabezado.appendChild(thColumna)
    thColumna = document.createElement('th') //Columna4.
    thColumna.innerText = 'Tiempo\nProgramado'
    trEncabezado.appendChild(thColumna)
    thColumna = document.createElement('th') //Columna5.
    thColumna.innerText = 'Tiempo\nEmpleado'
    trEncabezado.appendChild(thColumna)
    thColumna = document.createElement('th') //Columna6.
    thColumna.innerText = 'Descripción'
    trEncabezado.appendChild(thColumna)
    let tbody = document.createElement('tbody') //Cuerpo de la tabla
    tabla.appendChild(tbody)

    //Recorre todas las cookies.
    for (const cookie of cookies) {
      let fila = document.createElement('tr') //Crea una fila.
      tbody.appendChild(fila) //Añade la fila al cuerpo de la tabla.
      let celda = document.createElement('td') //Crea celda nº registro.
      celda.innerText = indice
      fila.appendChild(celda)
      celda = document.createElement('td') //Crea celda clave.
      let iBorrar = document.createElement('input') //Botón de borrado.
      iBorrar.type = 'button'
      iBorrar.id = cookie[0]
      iBorrar.value = 'Borrar'
      iBorrar.addEventListener('click', borrarCookie, false)
      celda.appendChild(iBorrar)
      fila.appendChild(celda)
      celda = document.createElement('td') //Crea celda tarea.
      celda.innerText = cookie[1]
      fila.appendChild(celda)
      celda = document.createElement('td') //Crea celda tiempo programado
      celda.innerText = cookie[2]
      fila.appendChild(celda)
      celda = document.createElement('td') //Crea celda tiempo empleado
      celda.innerText = cookie[3]
      fila.appendChild(celda)
      celda = document.createElement('td') //Crea celda descripción.
      celda.innerText = cookie[4]
      fila.appendChild(celda)
      indice++
    }
  }
}

//--------------------------------------------------------------------------------------------------
//Función que borra una cookie almacenada.
function borrarCookie(evt) {
  let fechaActual=new Date()
  let fechaExpiracion=new Date()
  fechaExpiracion.setTime(fechaActual.getTime()-1)
  document.cookie = evt.target.id + '=; expires='+fechaExpiracion.toUTCString()+'; max-age=0; path=/'
  cookies = new Array()
  mostrarCookiesAlmacenadas()
}

//--------------------------------------------------------------------------------------------------
//Muestra la ventana emergente de aviso de uso de cookies.
//Mensaje a mostrar en la ventana emergente.
function mostrarVentanaAvisoCookies() {
  let mensajeCookies =
    '<p style="text-align:justify;">Utilizamos cookies de análisis para estudiar el comportamiento de los usuarios en la plataforma con el objetivo de introducir mejoras en el servicio.</p><p style="text-align:justify;"> Puedes informarte más en nuestra página de <a style="margin:0" target="_blank" href="./politica_de_cookies.html">Política de Cookies</a> o desactivarlas en los ajustes del navegador.</p><p style="text-align:center;">Haga click en Cancelar si no desea que almacenemos cookies en su equipo.</p>'

  Swal.fire({
    title: 'Este sitio web utiliza cookies',
    showCancelButton: true,
    html: mensajeCookies, //Mensaje a mostrar.
    imageUrl: './images/JARL_Logo.jpg', //Url de la imagen.
    imageHeight: 120,
    imageAlt: 'JARL_Logo',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Aceptar',
  }).then(function (result) {
    //Ventana emergente de éxito.
    if (result.isConfirmed) {
      swal.fire('Cookies aceptadas', '', 'success')
    } else {
      //Ventana emergente de información.
      swal.fire(
        'Cookies rechazadas, no serán utilizadas\n',
        '<a style="margin:0" href="./politica_de_cookies.html" target="_blank">Politica de Cookies</a>',
        'info',
      )
      grabarCookie.removeEventListener('click', guardarCookie, false) //Elimina el evento click del ícono grabarCookie.
      mostrarCookies.removeEventListener(
        'click',
        mostrarCookiesAlmacenadas,
        false,
      ) //Elimina el evento click del ícono mostrarCookies.
    }
  })
}

//--------------------------------------------------------------------------------------------------
//Functión que valida los datos de las cookies.
function validarCookie() {
  let valido = true
  if (iTarea.value.trim() === '' || iTarea.value.trim().includes('*/*')) {
    valido = false
    let mensaje = 'La tarea no puede estar vacía o contener la subcadena "*/*".'
    mostrarMensajeValidacion(mensaje)
  } else if (iTProgramado.value == '' || iTProgramado.value <= 0) {
    valido = false
    let mensaje = 'El tiempo programado no puede ser nulo o negativo.'
    mostrarMensajeValidacion(mensaje)
  } else if (iTEmpleado.value == '' || iTEmpleado.value <= 0) {
    valido = false
    let mensaje = 'El tiempo empleado no puede ser nulo o negativo.'
    mostrarMensajeValidacion(mensaje)
  } else if (
    iDescripcion.value.trim() === '' ||
    iDescripcion.value.trim().includes('*/*')
  ) {
    valido = false
    let mensaje =
      'La descripción no puede estar vacía o contener la subcadena "*/*".'
    mostrarMensajeValidacion(mensaje)
  }
  return valido
}

//--------------------------------------------------------------------------------------------------
function mostrarMensajeValidacion(mensaje) {
  Swal.fire({
    title: 'Error de validación',
    text: mensaje,
    icon: 'warning',
    confirmButtonText: 'Aceptar',
  })
}

//--------------------------------------------------------------------------------------------------
//Función que límpia los campos tras guardar una cookie.
function limpiaCampos() {
  iTarea.value = ''
  iTEmpleado.value = 1
  iTProgramado.value = 1
  iDescripcion.value = ''
}

//--------------------------------------------------------------------------------------------------

mostrarVentanaAvisoCookies() //Muesrtra la ventana de aviso de cookies.
