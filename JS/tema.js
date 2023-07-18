
function cambiarTema(theme) {
    var customTheme = document.getElementById('customTheme');

    if (theme === 'light') {
      customTheme.textContent = `
        body {
          background-color: #f4f4f4;
          color: #333;
        }
        .modal-content{
            color: #333;
        }
        .form-text{
          color: #333;
        }
      `;
    } else if (theme === 'dark') {
      customTheme.textContent = `
        body {
          background-color: #333;
          color: #f4f4f4;
        }
        .modal-content{
            color: #333;
        }
        .form-text{
          color: #f4f4f4;
        }
      `;
    }

    localStorage.setItem('theme', theme);
  }

  function shiftTema() {
    var miTema = localStorage.getItem('theme');
    if (miTema == 'light') {
      cambiarTema('dark')
    } else if (miTema == 'dark') {
      cambiarTema('light')
    }
  }
  // Obtener el tema del Local Storage al cargar la página
  var savedTheme = localStorage.getItem('theme')||"dark";
  if (savedTheme) {
    cambiarTema(savedTheme);
  }

  document.querySelector('#Intercambiar')
    .addEventListener('click', function (e){
        console.log("hola");
        e.preventDefault();
        shiftTema();
    })