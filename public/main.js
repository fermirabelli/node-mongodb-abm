var update = document.getElementById('update')
var del = document.getElementById('delete')


update.addEventListener('click', function () {
  	  fetch('ambientes', {
	  method: 'put',
	  headers: {'Content-Type': 'application/json'},
	  body: JSON.stringify({
		'nombreambiente': 'Mendoza',
		'usuario': 'Verificar si actualizó la fecha'
	  })
	})
	.then(res => {
	  if (res.ok) return res.json()
	})
	.then(data => {
	  console.log(data)
	  window.location.reload(true)
	})
})


del.addEventListener('click', function () {
  fetch('ambientes', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'nombreambiente': 'Test'
    })
  })
  .then(res => {
    if (res.ok) return res.json()
  }).
  then(data => {
    console.log(data)
    window.location.reload(true)
  })
})